import { useEffect, useRef } from 'react'
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Group,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  RingGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Timer,
  WebGLRenderer,
} from 'three'

const diskVertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 p = position;
    float radius = length(p.xy);
    float angle = atan(p.y, p.x);
    float wave = sin(angle * 7.0 - uTime * 1.8 + radius * 2.1)
      + 0.45 * sin(angle * 17.0 + uTime * 1.15 - radius * 5.0);
    p.z += wave * 0.035 * smoothstep(0.9, 3.9, radius);
    vWave = wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const diskFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;
  varying float vWave;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
  }

  void main() {
    vec2 centered = vUv - 0.5;
    float radius = length(centered) * 2.0;
    float angle = atan(centered.y, centered.x);
    float inner = smoothstep(0.205, 0.255, radius);
    float outer = 1.0 - smoothstep(0.82, 1.0, radius);
    float mask = inner * outer;

    float shear = uTime * (0.48 + 1.15 / max(radius * 5.0, 0.7));
    vec2 flow = vec2(angle * 4.6 - shear, radius * 15.0);
    float turbulence = noise(flow) * 0.62 + noise(flow * 2.25 + 8.0) * 0.27
      + noise(flow * 5.4 - uTime * 0.3) * 0.11;
    float bands = 0.54 + 0.46 * sin(radius * 92.0 - angle * 9.0 + shear * 4.0 + turbulence * 8.0);
    bands = smoothstep(0.18, 1.0, bands);

    float heat = pow(1.0 - smoothstep(0.2, 1.0, radius), 1.5);
    vec3 charcoal = vec3(0.067);
    vec3 graphite = vec3(0.102);
    vec3 mutedSilver = vec3(0.467);
    vec3 softWhite = vec3(0.847);
    vec3 color = mix(charcoal, graphite, turbulence * 0.72 + bands * 0.12);

    float filaments = smoothstep(0.60, 1.03, turbulence + bands * 0.31 + vWave * 0.035);
    float compression = filaments * pow(heat, 1.7);
    color = mix(color, mutedSilver, filaments * (0.08 + heat * 0.20));
    color = mix(color, softWhite, compression * 0.13);
    float alpha = mask * (0.045 + filaments * 0.30) * (0.38 + heat * 0.34) * uOpacity;
    gl_FragColor = vec4(color * (0.52 + heat * 0.38), alpha);
  }
`

const glowFragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uOpacity;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float ring = exp(-pow((d - 0.39) * 10.0, 2.0));
    float lens = exp(-pow((d - 0.28) * 22.0, 2.0));
    float alpha = (ring * 0.035 + lens * 0.09) * uOpacity;
    vec3 grey = mix(vec3(0.18), vec3(0.62), lens);
    gl_FragColor = vec4(grey * (ring * 0.55 + lens), alpha);
  }
`

const particleVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  varying float vAlpha;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vAlpha = aAlpha;
    gl_PointSize = aSize * (120.0 / max(1.0, -mvPosition.z));
    gl_Position = projectionMatrix * mvPosition;
  }
`

const particleFragmentShader = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = 1.0 - smoothstep(0.05, 0.48, d);
    float glow = 1.0 - smoothstep(0.12, 0.5, d);
    vec3 color = mix(vec3(0.13), vec3(0.72), core);
    gl_FragColor = vec4(color, (core * 0.58 + glow * 0.16) * vAlpha);
  }
`

function createStarfield(count) {
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const alphas = new Float32Array(count)

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3
    positions[stride] = MathUtils.randFloatSpread(30)
    positions[stride + 1] = MathUtils.randFloatSpread(18)
    positions[stride + 2] = MathUtils.randFloat(-10, 1)
    sizes[index] = MathUtils.randFloat(0.55, 1.75)
    alphas[index] = MathUtils.randFloat(0.18, 0.78)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('aSize', new BufferAttribute(sizes, 1))
  geometry.setAttribute('aAlpha', new BufferAttribute(alphas, 1))
  const material = new ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const points = new Points(geometry, material)
  points.frustumCulled = false
  return points
}

function createInfallingMatter(count) {
  const particlePositions = new Float32Array(count * 3)
  const particleSizes = new Float32Array(count)
  const particleAlphas = new Float32Array(count)
  const trailPositions = new Float32Array(count * 6)
  const trailColors = new Float32Array(count * 6)
  const radii = new Float32Array(count)
  const angles = new Float32Array(count)
  const heights = new Float32Array(count)
  const drifts = new Float32Array(count)
  const phases = new Float32Array(count)

  const respawn = (index, randomize = false) => {
    radii[index] = randomize ? MathUtils.randFloat(1.0, 5.15) : MathUtils.randFloat(4.45, 5.25)
    angles[index] = Math.random() * Math.PI * 2
    heights[index] = MathUtils.randFloatSpread(0.22) * (0.35 + radii[index] / 5)
    drifts[index] = MathUtils.randFloat(0.8, 1.25)
    phases[index] = Math.random() * Math.PI * 2
    particleSizes[index] = MathUtils.randFloat(0.8, 2.15)
    particleAlphas[index] = MathUtils.randFloat(0.24, 0.68)
  }

  for (let index = 0; index < count; index += 1) respawn(index, true)

  const pointGeometry = new BufferGeometry()
  pointGeometry.setAttribute('position', new BufferAttribute(particlePositions, 3))
  pointGeometry.setAttribute('aSize', new BufferAttribute(particleSizes, 1))
  pointGeometry.setAttribute('aAlpha', new BufferAttribute(particleAlphas, 1))
  const pointMaterial = new ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })

  const trailGeometry = new BufferGeometry()
  trailGeometry.setAttribute('position', new BufferAttribute(trailPositions, 3))
  trailGeometry.setAttribute('color', new BufferAttribute(trailColors, 3))
  const trailMaterial = new LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
    blending: AdditiveBlending,
  })

  const points = new Points(pointGeometry, pointMaterial)
  const trails = new LineSegments(trailGeometry, trailMaterial)
  points.frustumCulled = false
  trails.frustumCulled = false

  const update = (delta, elapsed, motionScale) => {
    for (let index = 0; index < count; index += 1) {
      let radius = radii[index]
      const acceleration = 0.13 + 0.48 / Math.max(radius * radius, 0.55)
      radius -= delta * acceleration * drifts[index] * motionScale
      angles[index] += delta * (0.24 + 1.72 / Math.max(radius, 0.7)) * drifts[index] * motionScale

      if (radius < 0.82) {
        respawn(index)
        radius = radii[index]
      } else {
        radii[index] = radius
      }

      const angle = angles[index]
      const verticalWave = heights[index] + Math.sin(angle * 3.0 + phases[index] + elapsed) * 0.022 * radius
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      const angularStep = 0.055 + 0.18 / Math.max(radius, 0.8)
      const previousRadius = radius + 0.035 + 0.16 / Math.max(radius, 0.8)
      const tailX = Math.cos(angle - angularStep) * previousRadius
      const tailY = Math.sin(angle - angularStep) * previousRadius
      const p = index * 3
      const t = index * 6
      const heat = 1 - MathUtils.smoothstep(radius, 0.82, 5.2)

      particlePositions[p] = x
      particlePositions[p + 1] = y
      particlePositions[p + 2] = verticalWave
      particleAlphas[index] = 0.2 + heat * 0.48

      trailPositions[t] = tailX
      trailPositions[t + 1] = tailY
      trailPositions[t + 2] = verticalWave
      trailPositions[t + 3] = x
      trailPositions[t + 4] = y
      trailPositions[t + 5] = verticalWave

      trailColors[t] = 0.08 + heat * 0.14
      trailColors[t + 1] = 0.08 + heat * 0.14
      trailColors[t + 2] = 0.08 + heat * 0.14
      trailColors[t + 3] = 0.22 + heat * 0.36
      trailColors[t + 4] = 0.22 + heat * 0.36
      trailColors[t + 5] = 0.22 + heat * 0.36
    }

    pointGeometry.attributes.position.needsUpdate = true
    pointGeometry.attributes.aAlpha.needsUpdate = true
    trailGeometry.attributes.position.needsUpdate = true
    trailGeometry.attributes.color.needsUpdate = true
  }

  return { points, trails, update }
}

export function BlackHoleScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const hero = mount?.closest('.hero-section')
    if (!mount || !hero) return undefined

    let renderer
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch {
      hero.classList.add('webgl-unavailable')
      return () => hero.classList.remove('webgl-unavailable')
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 700px)').matches
    const compact = window.matchMedia('(max-width: 900px)').matches
    const scene = new Scene()
    const camera = new PerspectiveCamera(38, 1, 0.1, 100)
    const timer = new Timer()
    timer.connect(document)
    const blackHole = new Group()
    const disk = new Group()
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    let frame = 0
    let visible = true
    let disposed = false
    let lastReducedRender = 0

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : compact ? 1.4 : 1.65))
    renderer.outputColorSpace = SRGBColorSpace
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.74
    renderer.domElement.setAttribute('aria-hidden', 'true')
    mount.appendChild(renderer.domElement)

    camera.position.set(0, 0.15, 12.4)
    scene.add(createStarfield(mobile ? 260 : compact ? 420 : 720))

    const diskMaterial = new ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uOpacity: { value: mobile ? 0.92 : compact ? 0.86 : 0.82 } },
      vertexShader: diskVertexShader,
      fragmentShader: diskFragmentShader,
      side: DoubleSide,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    const diskMesh = new Mesh(new RingGeometry(1.02, 5.2, 256, 12), diskMaterial)
    disk.add(diskMesh)

    const matter = createInfallingMatter(mobile ? 140 : compact ? 190 : 270)
    disk.add(matter.trails, matter.points)
    disk.rotation.x = mobile ? 1.26 : 1.08
    disk.rotation.z = -0.18
    blackHole.add(disk)

    const core = new Mesh(
      new SphereGeometry(0.93, mobile ? 40 : 64, mobile ? 28 : 48),
      new MeshBasicMaterial({ color: 0x000000 }),
    )
    core.scale.y = 0.98
    core.renderOrder = 2
    blackHole.add(core)

    const glowMaterial = new ShaderMaterial({
      uniforms: { uOpacity: { value: mobile ? 0.92 : 0.72 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
      fragmentShader: glowFragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: AdditiveBlending,
    })
    const glow = new Mesh(new PlaneGeometry(5.7, 5.7), glowMaterial)
    glow.position.z = -0.18
    blackHole.add(glow)

    const photonRing = new Mesh(
      new RingGeometry(0.94, 1.025, 128),
      new MeshBasicMaterial({ color: 0xd8d8d8, transparent: true, opacity: mobile ? 0.17 : 0.11, side: DoubleSide, blending: AdditiveBlending }),
    )
    photonRing.renderOrder = 3
    blackHole.add(photonRing)

    blackHole.position.set(mobile ? 0.35 : compact ? 1.9 : 3.8, mobile ? -0.65 : -0.05, 0)
    blackHole.scale.setScalar(mobile ? 0.76 : compact ? 0.78 : 0.82)
    scene.add(blackHole)

    const resize = () => {
      const rect = mount.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      renderer.setSize(rect.width, rect.height, false)
      camera.aspect = rect.width / rect.height
      camera.updateProjectionMatrix()
    }

    const onPointerMove = (event) => {
      const rect = hero.getBoundingClientRect()
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const onPointerLeave = () => {
      pointer.tx = 0
      pointer.ty = 0
    }

    const render = (now) => {
      if (disposed || !visible) return
      frame = requestAnimationFrame(render)
      if (reducedMotion && now - lastReducedRender < 80) return
      lastReducedRender = now

      timer.update(now)
      const delta = Math.min(timer.getDelta(), 0.035)
      const elapsed = timer.getElapsed()
      const motionScale = reducedMotion ? 0.12 : 1
      pointer.x += (pointer.tx - pointer.x) * (reducedMotion ? 0.015 : 0.035)
      pointer.y += (pointer.ty - pointer.y) * (reducedMotion ? 0.015 : 0.035)
      camera.position.x = pointer.x * 0.16
      camera.position.y = 0.15 - pointer.y * 0.1
      camera.lookAt(pointer.x * 0.035, -pointer.y * 0.025, 0)

      diskMaterial.uniforms.uTime.value = elapsed * motionScale
      disk.rotation.z += delta * 0.018 * motionScale
      matter.update(delta, elapsed, motionScale)
      renderer.render(scene, camera)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        timer.reset()
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(render)
      } else {
        cancelAnimationFrame(frame)
      }
    })

    resize()
    hero.addEventListener('pointermove', onPointerMove, { passive: true })
    hero.addEventListener('pointerleave', onPointerLeave, { passive: true })
    window.addEventListener('resize', resize, { passive: true })
    observer.observe(hero)
    frame = requestAnimationFrame(render)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      hero.removeEventListener('pointermove', onPointerMove)
      hero.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', resize)
      timer.dispose()
      scene.traverse((object) => {
        object.geometry?.dispose()
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
        else object.material?.dispose()
      })
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} className="black-hole-scene" aria-hidden="true" />
}
