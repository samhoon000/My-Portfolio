// Cursor-driven ink for the hero background.
// A small GPU "stable fluids" simulation produces a velocity field from cursor movement. That velocity
// advects a field of displacements (where each point's ink came from, kept as an offset so half floats stay
// precise), and a soft ink pattern is drawn through them, so the cursor pushes the existing ink aside.
// The offsets relax back to zero, letting the ink settle in ~1.5s.

const SIM_SIZE = 128          // velocity grid cells across the long side
const PRESSURE_ITERATIONS = 18
const VELOCITY_DECAY = 1.5    // per second
const RELAX = 1.9             // per second, how fast displaced ink returns
const IDLE_AFTER = 2600       // ms without input before the simulation stops stepping
const INK_AMOUNT = .5         // peak ink opacity, further scaled by the hero's --atmos-strength

const VERT = `#version 300 es
in vec2 aPos; out vec2 vUv;
void main() { vUv = aPos * .5 + .5; gl_Position = vec4(aPos, 0., 1.); }`

const FRAG = body => `#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
${body}`

const SHADERS = {
  // Directional push: an ellipse stretched along the cursor's motion
  splat: FRAG(`uniform sampler2D uVel; uniform vec2 uPoint, uForce; uniform float uRadius, uAspect;
    void main() {
      vec2 d = vUv - uPoint; d.x *= uAspect;
      vec2 dir = length(uForce) > 0. ? normalize(uForce) : vec2(1., 0.);
      float along = dot(d, dir), across = dot(d, vec2(-dir.y, dir.x));
      float g = exp(-(along * along * .45 + across * across) / uRadius);
      o = vec4(texture(uVel, vUv).xy + uForce * g, 0., 1.);
    }`),
  advect: FRAG(`uniform sampler2D uVel, uSrc; uniform vec2 uTexel; uniform float uDt, uDecay;
    void main() { vec2 p = vUv - uDt * texture(uVel, vUv).xy * uTexel; o = vec4(texture(uSrc, p).xy * uDecay, 0., 1.); }`),
  advectOffsets: FRAG(`uniform sampler2D uVel, uSrc; uniform vec2 uTexel; uniform float uDt, uRelax;
    void main() { vec2 back = uDt * texture(uVel, vUv).xy * uTexel; o = vec4((texture(uSrc, vUv - back).xy - back) * (1. - uRelax), 0., 1.); }`),
  divergence: FRAG(`uniform sampler2D uVel; uniform vec2 uTexel;
    void main() {
      float l = texture(uVel, vUv - vec2(uTexel.x, 0.)).x, r = texture(uVel, vUv + vec2(uTexel.x, 0.)).x;
      float b = texture(uVel, vUv - vec2(0., uTexel.y)).y, t = texture(uVel, vUv + vec2(0., uTexel.y)).y;
      o = vec4(.5 * (r - l + t - b), 0., 0., 1.);
    }`),
  pressure: FRAG(`uniform sampler2D uP, uDiv; uniform vec2 uTexel;
    void main() {
      float l = texture(uP, vUv - vec2(uTexel.x, 0.)).x, r = texture(uP, vUv + vec2(uTexel.x, 0.)).x;
      float b = texture(uP, vUv - vec2(0., uTexel.y)).x, t = texture(uP, vUv + vec2(0., uTexel.y)).x;
      o = vec4((l + r + b + t - texture(uDiv, vUv).x) * .25, 0., 0., 1.);
    }`),
  gradient: FRAG(`uniform sampler2D uP, uVel; uniform vec2 uTexel;
    void main() {
      float l = texture(uP, vUv - vec2(uTexel.x, 0.)).x, r = texture(uP, vUv + vec2(uTexel.x, 0.)).x;
      float b = texture(uP, vUv - vec2(0., uTexel.y)).x, t = texture(uP, vUv + vec2(0., uTexel.y)).x;
      o = vec4(texture(uVel, vUv).xy - .5 * vec2(r - l, t - b), 0., 1.);
    }`),
  // Soft, slowly drifting ink in the site's greens, sampled through the displaced coordinates
  ink: FRAG(`uniform sampler2D uOffsets; uniform float uTime, uAspect, uAmount; uniform vec3 uInk;
    // Integer hash of the cell corner: bit-exact on every GPU (float hashes left seams and blocks)
    float hash(vec2 p) { uvec2 q = uvec2(ivec2(p)) * uvec2(1597334673u, 3812015801u); return float((q.x ^ q.y) * 1597334673u) / 4294967295.; }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
      return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + 1.), f.x), f.y);
    }
    float fbm(vec2 p) { float v = 0., a = .5; for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= .5; } return v; }
    void main() {
      vec2 src = vUv + texture(uOffsets, vUv).xy;
      vec2 p = src * vec2(uAspect, 1.) * 2.2;
      float t = uTime * .018;
      vec2 q = vec2(fbm(p + vec2(0., t)), fbm(p + vec2(5.2, 1.3) - t));
      // Broad ink clouds plus a fainter web of fine filaments, so there is ink to push almost everywhere
      float clouds = smoothstep(.36, .72, fbm(p + 1.7 * q + vec2(t * .6, 0.)));
      float filaments = smoothstep(.47, .6, fbm(p * 2.4 + 2.2 * q - vec2(0., t))) * .4;
      float a = clamp(clouds + filaments * (1. - clouds), 0., 1.) * uAmount;
      o = vec4(uInk * a, a);
    }`),
}

const hexToRgb = hex => {
  const n = parseInt(hex.trim().replace('#', ''), 16)
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]
}

export function createHeroInk(canvas, hero) {
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' })
  if (!gl || !gl.getExtension('EXT_color_buffer_float')) return null

  // Colour comes from the site's --ink variable, pushed darker into a near-black green
  const inkColor = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--ink') || '#18221e').map(c => c * .35)
  const strength = parseFloat(getComputedStyle(canvas.parentElement).getPropertyValue('--atmos-strength')) || 1
  const amount = INK_AMOUNT * strength

  const compile = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s }
  const vert = compile(gl.VERTEX_SHADER, VERT)
  const programs = {}
  for (const [name, src] of Object.entries(SHADERS)) {
    const p = gl.createProgram(), frag = compile(gl.FRAGMENT_SHADER, src)
    gl.attachShader(p, vert); gl.attachShader(p, frag); gl.bindAttribLocation(p, 0, 'aPos'); gl.linkProgram(p); gl.deleteShader(frag)
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { console.warn('hero-ink:', gl.getProgramInfoLog(p)); return null }
    const uniforms = {}
    for (let i = 0; i < gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS); i++) { const { name: u } = gl.getActiveUniform(p, i); uniforms[u] = gl.getUniformLocation(p, u) }
    programs[name] = { p, uniforms }
  }
  gl.deleteShader(vert)

  const quad = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, quad)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  const targets = []
  const target = (w, h) => {
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null)
    for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v)
    const fbo = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
    const t = { tex, fbo, w, h }
    targets.push(t)
    return t
  }
  const pingPong = (w, h) => { const pair = { read: target(w, h), write: target(w, h), swap() { [pair.read, pair.write] = [pair.write, pair.read] } }; return pair }

  const run = (name, out, uniforms) => {
    const { p, uniforms: loc } = programs[name]
    gl.useProgram(p)
    let unit = 0
    for (const [k, v] of Object.entries(uniforms)) {
      if (loc[k] == null) continue
      if (v && v.tex) { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, v.tex); gl.uniform1i(loc[k], unit++) }
      else if (typeof v === 'number') gl.uniform1f(loc[k], v)
      else if (v.length === 2) gl.uniform2fv(loc[k], v)
      else gl.uniform3fv(loc[k], v)
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, out ? out.fbo : null)
    gl.viewport(0, 0, out ? out.w : gl.drawingBufferWidth, out ? out.h : gl.drawingBufferHeight)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  let vel, offsets, pressure, div, texel, aspect = 1
  const resize = () => {
    const rect = hero.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    aspect = rect.width / rect.height
    // Ink is soft, so half resolution is plenty
    canvas.width = Math.round(rect.width * .5)
    canvas.height = Math.round(rect.height * .5)
    const w = aspect >= 1 ? SIM_SIZE : Math.round(SIM_SIZE * aspect), h = aspect >= 1 ? Math.round(SIM_SIZE / aspect) : SIM_SIZE
    if (vel && vel.read.w === w && vel.read.h === h) return
    targets.splice(0).forEach(t => { gl.deleteTexture(t.tex); gl.deleteFramebuffer(t.fbo) })
    vel = pingPong(w, h); offsets = pingPong(w, h); pressure = pingPong(w, h); div = target(w, h)
    texel = [1 / w, 1 / h]
    // Everything starts at rest: no velocity, no pressure, no displacement
    for (const t of targets) { gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo); gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT) }
  }

  // Pointer: smoothed position; velocity from the smoothed path so direction changes curve instead of snapping
  const pointer = { x: 0, y: 0, sx: 0, sy: 0, inside: false, fresh: true, lastInput: -Infinity }
  const onMove = e => {
    if (e.pointerType === 'touch') return
    const rect = hero.getBoundingClientRect()
    pointer.x = e.clientX - rect.left; pointer.y = e.clientY - rect.top
    if (!pointer.inside || pointer.fresh) { pointer.sx = pointer.x; pointer.sy = pointer.y; pointer.fresh = false }
    pointer.inside = true
    pointer.lastInput = performance.now()
    wake()
  }
  const onLeave = () => { pointer.inside = false; pointer.fresh = true }

  const step = (dt, now) => {
    const rect = hero.getBoundingClientRect()
    if (pointer.inside) {
      const px = pointer.sx, py = pointer.sy
      const k = 1 - Math.exp(-dt * 22)
      pointer.sx += (pointer.x - pointer.sx) * k; pointer.sy += (pointer.y - pointer.sy) * k
      const vx = (pointer.sx - px) / dt, vy = (pointer.sy - py) / dt
      const speed = Math.hypot(vx, vy)
      if (speed > 8) {
        // px/s → sim cells/s; fast movement pushes harder, capped so it never turns violent
        const cells = vel.read.w / rect.width, gain = Math.min(1, speed / 1600) * .9 + .25
        const cap = Math.min(1, 900 / speed)
        run('splat', vel.write, { uVel: vel.read, uPoint: [pointer.sx / rect.width, 1 - pointer.sy / rect.height], uForce: [vx * cells * gain * cap * dt * 6, -vy * cells * gain * cap * dt * 6], uRadius: .0022, uAspect: aspect })
        vel.swap()
      }
    }
    run('advect', vel.write, { uVel: vel.read, uSrc: vel.read, uTexel: texel, uDt: dt, uDecay: Math.exp(-dt * VELOCITY_DECAY) })
    vel.swap()
    run('divergence', div, { uVel: vel.read, uTexel: texel })
    for (let i = 0; i < PRESSURE_ITERATIONS; i++) { run('pressure', pressure.write, { uP: pressure.read, uDiv: div, uTexel: texel }); pressure.swap() }
    run('gradient', vel.write, { uP: pressure.read, uVel: vel.read, uTexel: texel })
    vel.swap()
    run('advectOffsets', offsets.write, { uVel: vel.read, uSrc: offsets.read, uTexel: texel, uDt: dt, uRelax: 1 - Math.exp(-dt * RELAX) })
    offsets.swap()
    return now - pointer.lastInput < IDLE_AFTER
  }

  // While the cursor is (recently) moving: simulate + draw every frame. Once settled: skip the simulation and
  // redraw only the slow ink drift a few times a second. Off-screen or hidden: nothing runs.
  let raf = 0, timer = 0, last = 0, visible = true, onScreen = true
  const t0 = performance.now()
  const draw = now => run('ink', null, { uOffsets: offsets.read, uTime: (now - t0) / 1000, uAspect: aspect, uAmount: amount, uInk: inkColor })
  const schedule = busy => {
    cancelAnimationFrame(raf); clearTimeout(timer); raf = timer = 0
    if (!visible || !onScreen) return
    if (busy) raf = requestAnimationFrame(tick)
    else timer = setTimeout(() => { draw(performance.now()); schedule(false) }, 120)
  }
  const tick = now => {
    raf = 0
    const dt = Math.min((now - last) / 1000 || 1 / 60, 1 / 30)
    last = now
    const busy = step(dt, now)
    draw(now)
    schedule(busy)
  }
  const wake = () => { if (!raf && visible && onScreen) { last = performance.now(); schedule(true) } }
  const resume = () => schedule(performance.now() - pointer.lastInput < IDLE_AFTER)

  const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; resume() })
  const onVisibility = () => { visible = document.visibilityState === 'visible'; resume() }
  const ro = new ResizeObserver(() => { resize(); resume() })
  let lost = false
  const onLost = e => { e.preventDefault(); lost = true; destroy() }

  resize()
  io.observe(hero); ro.observe(hero)
  hero.addEventListener('pointermove', onMove)
  hero.addEventListener('pointerleave', onLeave)
  document.addEventListener('visibilitychange', onVisibility)
  canvas.addEventListener('webglcontextlost', onLost)
  gl.disable(gl.BLEND)
  draw(performance.now())
  resume()
  canvas.classList.add('is-ready')

  function destroy() {
    cancelAnimationFrame(raf); clearTimeout(timer)
    io.disconnect(); ro.disconnect()
    hero.removeEventListener('pointermove', onMove)
    hero.removeEventListener('pointerleave', onLeave)
    document.removeEventListener('visibilitychange', onVisibility)
    canvas.removeEventListener('webglcontextlost', onLost)
    canvas.classList.remove('is-ready')
    if (lost) return
    targets.forEach(t => { gl.deleteTexture(t.tex); gl.deleteFramebuffer(t.fbo) })
    Object.values(programs).forEach(({ p }) => gl.deleteProgram(p))
    gl.deleteBuffer(quad)
    // (no loseContext: React may remount onto the same canvas, e.g. StrictMode in development)
  }
  return { destroy }
}
