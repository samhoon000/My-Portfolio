// The hero's living data organism: a few thousand particles forming one slowly morphing body that runs from
// the headline toward the portrait.
// Each particle springs toward a procedurally animated home. Homes sit in lobes and threads that drift and
// breathe on their own clocks, and the whole body is domain-warped by layered sines with incommensurate
// periods, so the shape never visibly loops. The cursor adds forces on top of that: a near-field push, a
// fading wake held in a coarse velocity grid, and a spring-lagged lean of the whole body. A click compresses,
// ripples and scatters a region; the scattered particles lose most of their spring, glide to a stop, then
// get it back and re-form.
// Physics runs on the CPU in typed arrays. Drawing is WebGL points plus a few faint links, on two canvases:
// one behind the hero grid (far and mid layers) and one above it (near layer), both under the hero content.

export const ORGANISM_DEFAULTS = {
  particleCount: 4200,      // desktop total across all layers
  mobileScale: .55,         // particle share on touch devices / small screens
  size: 1,                  // body size, relative to the span between headline and portrait
  particleSize: 1,          // multiplier on every particle's size
  opacity: 1,               // multiplier on every particle's and link's alpha
  interactionRadius: 130,   // px, reach of the cursor's push (near layer; deeper layers feel less of it)
  repulsion: 4200,          // px/s², push at the cursor's centre
  spring: 26,               // 1/s², pull back toward the flowing home position
  damping: .62,             // damping ratio; below 1 gives the return a slight overshoot
  morphSpeed: 1,            // multiplier on all self-driven motion (breathing, morphing, drift, idle ripples)
  connectionDistance: 58,   // px, longest link drawn between neighbouring nodes
  explosionStrength: 1100,   // px/s, outward kick at the click point
  recovery: 1.25,           // s for a scattered particle to regain its full spring
  bend: 30,                 // px, how far each region of the body leans toward the cursor
  trail: 1,                 // multiplier on the cursor's wake
}

// Far → near. share of particles, depth, cursor response, own-motion speed, size px, alpha, edge softness
// (0 = blurred, higher = crisper), spring multiplier, which canvas
const LAYERS = [
  { share: .44, z: [0, .4], resp: .28, speed: .6, size: [1.2, 2.4], alpha: [.3, .55], soft: 0, stiff: .7, front: false },
  { share: .34, z: [.4, .75], resp: .65, speed: .85, size: [1.3, 2.7], alpha: [.42, .74], soft: .3, stiff: .88, front: false },
  { share: .22, z: [.75, 1], resp: 1, speed: 1.15, size: [1.5, 3.2], alpha: [.55, .92], soft: .55, stiff: 1, front: true },
]

// Lobes in body units (u along the headline→portrait axis, v across it): centre, radius, weight.
// The mass sits in the gap between headline and portrait (u ≈ 0) and wraps the portrait's edges; the lobes
// behind the headline are dimmed by the quiet zones, so they read as the body thinning out under the type.
const LOBES = [
  [.1, .02, .34, 1.7], [.04, -.46, .26, 1], [.16, .5, .28, 1], [.66, -.8, .24, .75], [.72, .8, .22, .55],
  [1.14, -.12, .2, .5], [-.55, -.16, .34, .8], [-.95, .36, .26, .5], [-.3, -.66, .22, .45],
]
const THREADS = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [0, 6], [6, 7], [6, 8], [1, 8], [4, 5]]

const COLORS = {
  far: [[[112, 156, 124], .7], [[84, 124, 96], 1]],
  mid: [[[200, 216, 194], .55], [[150, 188, 156], .92], [[213, 250, 101], .99], [[234, 114, 83], 1]],
  near: [[[240, 238, 231], .82], [[214, 228, 206], .9], [[213, 250, 101], .98], [[234, 114, 83], 1]],
}

const MAX_RIPPLES = 8
const GRID_CELL = 32
const QUIET_CELL = 12
const LINK_COLOR = [.8, .87, .78]

const mulberry32 = seed => () => {
  seed |= 0; seed = seed + 0x6D2B79F5 | 0
  let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
  return ((t ^ t >>> 14) >>> 0) / 4294967296
}
const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v
// Fast sine for the per-particle warp (parabolic fit plus one refinement, max error ≈ .001): Math.sin was
// most of the frame at a few thousand particles × eight calls
const fsin = x => {
  x *= .15915494309189535; x -= Math.floor(x + .5)
  const y = 8 * x - 16 * x * (x < 0 ? -x : x)
  return .225 * (y * (y < 0 ? -y : y) - y) + y
}
const smooth = v => v * v * (3 - 2 * v)

const POINT_VERT = `
attribute vec2 aPos; attribute vec3 aStyle; attribute vec3 aColor;
uniform vec2 uView; uniform float uDpr;
varying vec4 vColor; varying float vSoft;
void main() {
  gl_Position = vec4(aPos.x / uView.x * 2. - 1., 1. - aPos.y / uView.y * 2., 0., 1.);
  gl_PointSize = (aStyle.x + 1.) * uDpr;
  vColor = vec4(aColor, aStyle.y); vSoft = aStyle.z;
}`
const POINT_FRAG = `
precision mediump float;
varying vec4 vColor; varying float vSoft;
void main() {
  float d = length(gl_PointCoord * 2. - 1.);
  float a = vColor.a * (1. - smoothstep(vSoft, 1., d));
  gl_FragColor = vec4(vColor.rgb * a, a);
}`
const LINE_VERT = `
attribute vec2 aPos; attribute float aAlpha;
uniform vec2 uView; varying float vA;
void main() { gl_Position = vec4(aPos.x / uView.x * 2. - 1., 1. - aPos.y / uView.y * 2., 0., 1.); vA = aAlpha; }`
const LINE_FRAG = `
precision mediump float;
uniform vec3 uColor; varying float vA;
void main() { gl_FragColor = vec4(uColor * vA, vA); }`

function createRenderer(canvas, onLost) {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'default' })
  if (!gl) return null
  const program = (vs, fs) => {
    const p = gl.createProgram()
    for (const [type, src] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]]) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); gl.attachShader(p, s); gl.deleteShader(s) }
    gl.linkProgram(p)
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { console.warn('hero-organism:', gl.getProgramInfoLog(p)); return null }
    return p
  }
  const points = program(POINT_VERT, POINT_FRAG), lines = program(LINE_VERT, LINE_FRAG)
  if (!points || !lines) return null
  const loc = (p, names) => Object.fromEntries(names.map(n => [n, n[0] === 'a' ? gl.getAttribLocation(p, n) : gl.getUniformLocation(p, n)]))
  const pl = loc(points, ['aPos', 'aStyle', 'aColor', 'uView', 'uDpr']), ll = loc(lines, ['aPos', 'aAlpha', 'uView', 'uColor'])
  const pointBuf = gl.createBuffer(), lineBuf = gl.createBuffer()
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  let w = 1, h = 1, dpr = 1, lost = false
  const handleLost = e => { e.preventDefault(); lost = true; onLost() }
  canvas.addEventListener('webglcontextlost', handleLost)

  return {
    resize(width, height, ratio) {
      w = width; h = height; dpr = ratio
      canvas.width = Math.max(1, Math.round(width * ratio)); canvas.height = Math.max(1, Math.round(height * ratio))
      gl.viewport(0, 0, canvas.width, canvas.height)
    },
    draw(pointData, pointCount, lineData, lineCount) {
      if (lost) return
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      if (lineCount) {
        gl.useProgram(lines)
        gl.bindBuffer(gl.ARRAY_BUFFER, lineBuf)
        gl.bufferData(gl.ARRAY_BUFFER, lineData.subarray(0, lineCount * 6), gl.STREAM_DRAW)
        gl.enableVertexAttribArray(ll.aPos); gl.vertexAttribPointer(ll.aPos, 2, gl.FLOAT, false, 12, 0)
        gl.enableVertexAttribArray(ll.aAlpha); gl.vertexAttribPointer(ll.aAlpha, 1, gl.FLOAT, false, 12, 8)
        gl.uniform2f(ll.uView, w, h); gl.uniform3fv(ll.uColor, LINK_COLOR)
        gl.drawArrays(gl.LINES, 0, lineCount * 2)
        gl.disableVertexAttribArray(ll.aAlpha)
      }
      if (pointCount) {
        gl.useProgram(points)
        gl.bindBuffer(gl.ARRAY_BUFFER, pointBuf)
        gl.bufferData(gl.ARRAY_BUFFER, pointData.subarray(0, pointCount * 8), gl.STREAM_DRAW)
        gl.enableVertexAttribArray(pl.aPos); gl.vertexAttribPointer(pl.aPos, 2, gl.FLOAT, false, 32, 0)
        gl.enableVertexAttribArray(pl.aStyle); gl.vertexAttribPointer(pl.aStyle, 3, gl.FLOAT, false, 32, 8)
        gl.enableVertexAttribArray(pl.aColor); gl.vertexAttribPointer(pl.aColor, 3, gl.FLOAT, false, 32, 20)
        gl.uniform2f(pl.uView, w, h); gl.uniform1f(pl.uDpr, dpr)
        gl.drawArrays(gl.POINTS, 0, pointCount)
        gl.disableVertexAttribArray(pl.aStyle); gl.disableVertexAttribArray(pl.aColor)
      }
    },
    destroy() {
      canvas.removeEventListener('webglcontextlost', handleLost)
      if (lost) return
      gl.deleteBuffer(pointBuf); gl.deleteBuffer(lineBuf); gl.deleteProgram(points); gl.deleteProgram(lines)
      // (no loseContext: React may remount onto the same canvas, e.g. StrictMode in development)
    },
  }
}

export function createHeroOrganism(backCanvas, frontCanvas, hero, options = {}) {
  const o = { ...ORGANISM_DEFAULTS, ...options }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const touch = matchMedia('(pointer: coarse)').matches
  const compact = touch || innerWidth < 700
  const weak = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4
  const N = Math.round(o.particleCount * (compact ? o.mobileScale : 1) * (weak ? .7 : 1))
  const radius = o.interactionRadius * (compact ? .8 : 1)

  let destroyed = false
  const back = createRenderer(backCanvas, () => destroy()), front = back && createRenderer(frontCanvas, () => destroy())
  if (!back || !front) { back?.destroy(); return null }

  // ---- Particles (seeded, so the body has the same character on every visit) ----
  const rand = mulberry32(20261013)
  const gauss = () => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(Math.PI * 2 * rand())
  const pick = list => { const r = rand(); return list.find(([, p]) => r <= p)[0] }
  const lobeTotal = LOBES.reduce((s, l) => s + l[3], 0)
  const F = () => new Float32Array(N)
  const layer = new Uint8Array(N), home = new Int8Array(N), node = new Uint8Array(N)
  const ou = F(), ov = F(), depth = F(), spin = F(), wobA = F(), wobF = F(), wobP = F(), glint = F()
  const size = F(), alpha = F(), soft = F(), cr = F(), cg = F(), cb = F(), rank = F(), sparse = F(), born = F()
  const x = F(), y = F(), vx = F(), vy = F(), detach = F(), bu = F(), arc = F()
  // Spin offsets and wobble phasors, rotated a little each frame instead of re-evaluating sin/cos
  const ru = F(), rv = F(), pc = F(), ps = F()
  let n = 0
  LAYERS.forEach((L, li) => {
    const end = li === LAYERS.length - 1 ? N : n + Math.round(N * L.share)
    const palette = li === 0 ? COLORS.far : li === 1 ? COLORS.mid : COLORS.near
    for (; n < end; n++) {
      layer[n] = li
      const r = rand()
      if (r < .07) {
        // Diffuse haze through the whole body
        const a = rand() * Math.PI * 2, d = Math.sqrt(rand()) * 1.08
        home[n] = -1; ou[n] = Math.cos(a) * d; ov[n] = Math.sin(a) * d
      } else if (r < .19) {
        // Threads between lobes: s along the thread, small offset across it
        home[n] = -2 - Math.floor(rand() * THREADS.length); ou[n] = rand(); ov[n] = gauss() * .035; arc[n] = Math.sin(Math.PI * ou[n])
      } else {
        let w = rand() * lobeTotal, k = 0
        while ((w -= LOBES[k][3]) > 0) k++
        // Squared radius bias: dense cores that thin out toward a soft edge
        const s = LOBES[k][2] * (.3 + .2 * rand())
        let gx = gauss(), gy = gauss()
        const len = Math.hypot(gx, gy)
        if (len > 2.4) { gx *= 2.4 / len; gy *= 2.4 / len }
        home[n] = k; ou[n] = gx * s; ov[n] = gy * s
      }
      const z = L.z[0] + rand() * (L.z[1] - L.z[0])
      depth[n] = z * 2 - 1
      spin[n] = (rand() < .5 ? -1 : 1) * (.02 + rand() * .05) * L.speed
      wobA[n] = (.008 + rand() * .022) * (li === 2 ? 1.3 : 1)
      wobF[n] = (.2 + rand() * .55) * L.speed
      wobP[n] = rand() * Math.PI * 2
      pc[n] = Math.cos(wobP[n]); ps[n] = Math.sin(wobP[n])
      glint[n] = rand() < .1 ? .15 + rand() * .2 : 0
      let sz = L.size[0] + rand() * rand() * (L.size[1] - L.size[0]), al = L.alpha[0] + rand() * (L.alpha[1] - L.alpha[0]), sf = L.soft
      // A few large, out-of-focus particles very close to the viewer
      if (li === 2 && rand() < .025) { sz = 7 + rand() * 6; al = .06 + rand() * .06; sf = 0 }
      // Deep haze: big, very faint blobs that give the body volume, so it reads as a mass and not only as dots
      if (li === 0 && home[n] >= 0 && rand() < .07) { sz = 26 + rand() * 30; al = .04 + rand() * .035; sf = 0 }
      size[n] = sz * o.particleSize; alpha[n] = al; soft[n] = sf
      const [cR, cG, cB] = pick(palette)
      cr[n] = cR / 255; cg[n] = cG / 255; cb[n] = cB / 255
      rank[n] = rand(); sparse[n] = rand(); born[n] = rand()
      node[n] = li === 1 && rand() < .2 ? 1 : 0
      ru[n] = ou[n]; rv[n] = ov[n]
    }
  })

  // ---- Layout: the body's centre, axes and the zones kept quiet behind the text ----
  let W = 1, H = 1, cx = 0, cy = 0, ax = 1, ay = 0, Rx = 1, Ry = 1, quiet = [], quietField = new Float32Array(1), qw = 1, qh = 1
  const measure = () => {
    const rect = hero.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    W = rect.width; H = rect.height
    originStale = true
    const rel = el => { if (!el) return null; const r = el.getBoundingClientRect(); return r.width ? { x0: r.left - rect.left, y0: r.top - rect.top, x1: r.right - rect.left, y1: r.bottom - rect.top } : null }
    const title = rel(hero.querySelector('h1')), photo = rel(hero.querySelector('.hero-photo-frame'))
    const a = title ? [(title.x0 + title.x1) / 2, (title.y0 + title.y1) / 2] : [W * .35, H * .5]
    const b = photo ? [(photo.x0 + photo.x1) / 2, (photo.y0 + photo.y1) / 2] : [W * .8, H * .45]
    const dx = b[0] - a[0], dy = b[1] - a[1], dist = Math.hypot(dx, dy) || 1
    ax = dx / dist; ay = dy / dist
    // Side by side, the body fills the gap; stacked (small screens), the portrait is below the fold, so the
    // body centres on the headline and paragraph instead
    const stacked = Math.abs(ay) > .7, along = stacked ? .22 : .45
    cx = a[0] + dx * along; cy = a[1] + dy * along
    Rx = Math.max(dist * (stacked ? .85 : .75), Math.min(W, H) * .34) * o.size
    Ry = Math.min(Rx * .68, Math.max(W, H) * .46) * o.size
    // Quiet zones follow the text's own line boxes (block elements span the whole column, gap included)
    const lines = (selector, strength) => {
      const el = hero.querySelector(selector)
      if (!el) return []
      const range = document.createRange()
      range.selectNodeContents(el)
      return [...range.getClientRects()].filter(r => r.width > 2).map(r => [{ x0: r.left - rect.left, y0: r.top - rect.top, x1: r.right - rect.left, y1: r.bottom - rect.top }, strength])
    }
    quiet = [...lines('h1', .8), ...lines('.hero-bottom-row p', .6), ...lines('.hero-overline', .4), ...lines('.hero-profile-caption', .5)]
    qw = Math.ceil(W / QUIET_CELL) + 1; qh = Math.ceil(H / QUIET_CELL) + 1
    quietField = new Float32Array(qw * qh)
    for (let j = 0; j < qh; j++) for (let i = 0; i < qw; i++) quietField[j * qw + i] = quietAt(i * QUIET_CELL, j * QUIET_CELL)
    const ratio = Math.min(devicePixelRatio || 1, compact ? 1.5 : 2)
    back.resize(W, H, Math.min(ratio, 1.5)); front.resize(W, H, ratio)
    resizeGrid()
  }
  // 0 outside a text block, rising to 1 inside it over a soft edge
  const quietAt = (px, py) => {
    let q = 0
    for (const [r, s] of quiet) {
      const e = Math.min(px - r.x0, r.x1 - px, py - r.y0, r.y1 - py)
      if (e > -40) q = Math.max(q, smooth(clamp01((e + 40) / 70)) * s)
    }
    return q
  }
  // The same, sampled from a grid built once per layout (per-particle rect tests were the hottest code)
  const quietNear = (px, py) => {
    const gx = Math.min(Math.max(px / QUIET_CELL, 0), qw - 1.001), gy = Math.min(Math.max(py / QUIET_CELL, 0), qh - 1.001)
    const i = gx | 0, j = gy | 0, fx = gx - i, fy = gy - j, k = j * qw + i
    return (quietField[k] * (1 - fx) + quietField[k + 1] * fx) * (1 - fy) + (quietField[k + qw] * (1 - fx) + quietField[k + qw + 1] * fx) * fy
  }

  // ---- The cursor's wake: a coarse velocity grid that the pointer writes into and that fades and spreads ----
  let gw = 0, gh = 0, gvx = new Float32Array(0), gvy = gvx, tvx = gvx, tvy = gvx
  function resizeGrid() {
    const w = Math.ceil(W / GRID_CELL) + 1, h = Math.ceil(H / GRID_CELL) + 1
    if (w === gw && h === gh) return
    gw = w; gh = h
    gvx = new Float32Array(w * h); gvy = new Float32Array(w * h); tvx = new Float32Array(w * h); tvy = new Float32Array(w * h)
  }
  const splat = (px, py, fx, fy) => {
    const gx = px / GRID_CELL, gy = py / GRID_CELL
    for (let j = Math.max(0, Math.floor(gy - 2)); j <= Math.min(gh - 1, Math.ceil(gy + 2)); j++)
      for (let i = Math.max(0, Math.floor(gx - 2)); i <= Math.min(gw - 1, Math.ceil(gx + 2)); i++) {
        const d2 = (i - gx) ** 2 + (j - gy) ** 2, wgt = Math.exp(-d2 / 2.4) * .3, k = j * gw + i
        gvx[k] += fx * wgt; gvy[k] += fy * wgt; gridLive = true
        const m = Math.sqrt(gvx[k] * gvx[k] + gvy[k] * gvy[k])
        if (m > 1100) { gvx[k] *= 1100 / m; gvy[k] *= 1100 / m }
      }
  }
  let gridLive = false
  const relaxGrid = dt => {
    if (!gridLive) return
    const decay = Math.exp(-dt * 2.1), spread = Math.min(1, dt * 7)
    let peak = 0
    for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) {
      const k = j * gw + i, l = i > 0 ? k - 1 : k, r = i < gw - 1 ? k + 1 : k, u = j > 0 ? k - gw : k, d = j < gh - 1 ? k + gw : k
      tvx[k] = (gvx[k] + ((gvx[l] + gvx[r] + gvx[u] + gvx[d]) * .25 - gvx[k]) * spread) * decay
      tvy[k] = (gvy[k] + ((gvy[l] + gvy[r] + gvy[u] + gvy[d]) * .25 - gvy[k]) * spread) * decay
      peak = Math.max(peak, Math.abs(tvx[k]) + Math.abs(tvy[k]))
    }
    ;[gvx, tvx] = [tvx, gvx]; [gvy, tvy] = [tvy, gvy]
    // Once the wake has faded, stop relaxing and sampling it until the pointer writes again
    if (peak < 1) { gvx.fill(0); gvy.fill(0); gridLive = false }
  }
  let sx = 0, sy = 0
  const sampleGrid = (px, py) => {
    const gx = Math.min(Math.max(px / GRID_CELL, 0), gw - 1.001), gy = Math.min(Math.max(py / GRID_CELL, 0), gh - 1.001)
    const i = gx | 0, j = gy | 0, fx = gx - i, fy = gy - j, k = j * gw + i
    const a = (1 - fx) * (1 - fy), b = fx * (1 - fy), c = (1 - fx) * fy, d = fx * fy
    sx = gvx[k] * a + gvx[k + 1] * b + gvx[k + gw] * c + gvx[k + gw + 1] * d
    sy = gvy[k] * a + gvy[k + 1] * b + gvy[k + gw] * c + gvy[k + gw + 1] * d
  }

  // ---- Bend: five springs along the body that lean toward the cursor; nearer ones answer faster ----
  const anchors = Array.from({ length: 5 }, (_, i) => ({ u: i * .5 - 1, x: 0, y: 0, vx: 0, vy: 0 }))

  // ---- Ripples: from clicks and, now and then, from the body itself ----
  const ripples = []
  const addRipple = (px, py, amp, speed, width, life, glow) => {
    if (ripples.length >= MAX_RIPPLES) ripples.shift()
    ripples.push({ x: px, y: py, age: 0, amp, speed, width, life, glow })
  }

  // ---- Pointer ----
  const pointer = { x: 0, y: 0, sx: 0, sy: 0, vx: 0, vy: 0, inside: false, fresh: true, presence: 0, moved: false }
  const pending = []
  let lastBurst = -1e9, downAt = 0, downX = 0, downY = 0
  // The hero's viewport origin, cached: reading layout on every pointer event forced style recalcs
  let originX = 0, originY = 0, originStale = true
  const local = e => {
    if (originStale) { const r = hero.getBoundingClientRect(); originX = r.left; originY = r.top; originStale = false }
    return [e.clientX - originX, e.clientY - originY]
  }
  const staleOrigin = () => { originStale = true }
  const onMove = e => {
    if (e.pointerType === 'touch' && !pointer.inside) return
    ;[pointer.x, pointer.y] = local(e)
    if (pointer.fresh) { pointer.sx = pointer.x; pointer.sy = pointer.y; pointer.fresh = false }
    pointer.inside = true; pointer.moved = true
    wake()
  }
  const onLeave = e => { if (e.pointerType !== 'touch') { pointer.inside = false; pointer.fresh = true } }
  const interactive = e => e.target.closest?.('a, button, input, textarea, select, label, [role="button"]')
  const insideBody = (px, py) => {
    const dx = px - cx, dy = py - cy, u = (dx * ax + dy * ay) / Rx, v = (dy * ax - dx * ay) / Ry
    return u * u / 1.5 + v * v / 1.1 < 1
  }
  const burst = (px, py) => {
    const now = performance.now()
    if (now - lastBurst < 160 || !insideBody(px, py)) return
    lastBurst = now
    pending.length = 0
    pending.push({ at: now, kind: 'compress', x: px, y: py }, { at: now + 80, kind: 'scatter', x: px, y: py })
    wake()
  }
  const onDown = e => {
    if (interactive(e)) return
    const [px, py] = local(e)
    if (e.pointerType === 'touch') {
      // Touch: the finger pushes the body like the cursor does, sends out a soft ripple, and a tap bursts it
      pointer.x = pointer.sx = px; pointer.y = pointer.sy = py; pointer.inside = true; pointer.fresh = false
      downAt = performance.now(); downX = px; downY = py
      if (insideBody(px, py)) addRipple(px, py, 8, 360, 70, 1.4, .25)
      wake()
    } else if (e.button === 0) burst(px, py)
  }
  const onUp = e => {
    if (e.pointerType !== 'touch') return
    const [px, py] = local(e)
    if (performance.now() - downAt < 350 && Math.hypot(px - downX, py - downY) < 14) burst(px, py)
    pointer.inside = false; pointer.fresh = true
  }
  const onCancel = e => { if (e.pointerType === 'touch') { pointer.inside = false; pointer.fresh = true } }

  // ---- Simulation ----
  let t = Math.random() * 400, life = 0, placed = false, nextIdleRipple = t + 4, active = 1
  const lobeX = new Float32Array(LOBES.length), lobeY = new Float32Array(LOBES.length), lobeS = new Float32Array(LOBES.length)
  const pointData = new Float32Array(N * 8), lineData = new Float32Array(N * 6 * 3)
  let frontStart = 0
  for (let i = 0; i < N; i++) if (!LAYERS[layer[i]].front) frontStart = i + 1

  // Home position of particle i, in screen px, written to hx/hy; also its depth scale and its body u
  let hx = 0, hy = 0, hp = 1, yawC = 1, yawS = 0
  // (Hot path: plain typed-array math only; small-angle rotations use series terms, exact to ~1e-9 here)
  const threadBow = new Float32Array(THREADS.length)
  const threadP = Int8Array.from(THREADS, t => t[0]), threadQ = Int8Array.from(THREADS, t => t[1])
  const homeOf = (i, tm, dts) => {
    const h = home[i]
    let u, v
    if (h > -2) {
      const th = spin[i] * dts * (h < 0 ? .5 : 1), c = 1 - th * th * .5, s = th - th * th * th / 6
      const a = ru[i] * c - rv[i] * s, b = ru[i] * s + rv[i] * c
      ru[i] = a; rv[i] = b
      if (h >= 0) { u = lobeX[h] + a * lobeS[h]; v = lobeY[h] + b * lobeS[h] } else { u = a; v = b * .82 }
    } else {
      const k = -2 - h, p = threadP[k], q = threadQ[k], s = ou[i]
      const dx = lobeX[q] - lobeX[p], dy = lobeY[q] - lobeY[p], len = Math.sqrt(dx * dx + dy * dy) || 1
      const bow = arc[i] * (threadBow[k] + ov[i])
      u = lobeX[p] + dx * s - dy / len * bow; v = lobeY[p] + dy * s + dx / len * bow
    }
    const th = wobF[i] * dts, c = 1 - th * th * .5, s = th - th * th * th / 6
    const wc = pc[i] * c - ps[i] * s, ws = pc[i] * s + ps[i] * c
    pc[i] = wc; ps[i] = ws
    u += wobA[i] * ws; v += wobA[i] * .85 * wc
    // Breathing that travels along the body rather than scaling it uniformly
    const br = 1 + .035 * fsin(tm * .47 - u * 2.1) + .018 * fsin(tm * .29 + v * 3.3)
    u *= br; v *= br
    // Layered domain warp: the silhouette and the interior keep re-forming
    const wu = .14 * fsin(v * 1.7 + tm * .21 + 1.3) + .06 * fsin(v * 3.3 - u * 1.1 - tm * .33 + .7) + .022 * fsin((u + v) * 5.1 + tm * .52)
    const wv = .16 * fsin(u * 1.4 - tm * .17 + 4.1) + .07 * fsin(u * 2.9 + v * .8 + tm * .29 + 2.2) + .022 * fsin((u - v) * 4.7 - tm * .46 + 1.9)
    u += wu; v += wv
    bu[i] = u
    // A slow turn in depth: near particles swing wider than far ones
    const d = depth[i], u3 = u * yawC + d * .35 * yawS, w3 = d * yawC - u * .35 * yawS
    hp = 1 / (1 - w3 * .16)
    const spread = (.9 + .1 * d) * hp
    const X = u3 * Rx * spread, Y = v * Ry * spread
    hx = cx + X * ax - Y * ay; hy = cy + X * ay + Y * ax
  }

  const applyEvent = ev => {
    const scatter = ev.kind === 'scatter', R = scatter ? Math.max(240, Rx * .55) : 190
    if (!scatter) addRipple(ev.x, ev.y, 16, 620, 60, 1.4, .45)
    for (let i = 0; i < N; i++) {
      const dx = x[i] - ev.x, dy = y[i] - ev.y, d = Math.sqrt(dx * dx + dy * dy)
      if (d >= R) continue
      const L = LAYERS[layer[i]], nx = d > .01 ? dx / d : Math.cos(i), ny = d > .01 ? dy / d : Math.sin(i), f = 1 - d / R
      if (!scatter) { vx[i] -= nx * 240 * f * f * L.resp; vy[i] -= ny * 240 * f * f * L.resp; continue }
      // Repeat clicks on an already scattered region add less, so nothing ends up flung away
      const k = o.explosionStrength * f ** 1.5 * (.6 + .55 * rank[i]) * (.45 + .55 * L.resp) * (1 - .6 * detach[i])
      const swirl = (sparse[i] - .5) * .5
      vx[i] += (nx - ny * swirl) * k; vy[i] += (ny + nx * swirl) * k
      detach[i] = Math.max(detach[i], Math.min(1, f * 1.7))
    }
  }

  const update = (dt, now) => {
    const dts = dt * o.morphSpeed * (reduced ? .25 : 1), tm = (t += dts)
    for (let k = 0; k < THREADS.length; k++) threadBow[k] = .08 * Math.sin(tm * .23 + k * 1.7)
    life += dt
    const yaw = .22 * Math.sin(tm * .071) + .1 * Math.sin(tm * .043 + 1)
    yawC = Math.cos(yaw); yawS = Math.sin(yaw)
    for (let k = 0; k < LOBES.length; k++) {
      const [u, v] = LOBES[k], p = k * 2.39
      lobeX[k] = u + .07 * Math.sin(tm * (.11 + k * .013) + p)
      lobeY[k] = v + .06 * Math.cos(tm * (.09 + k * .017) + p * 1.3)
      lobeS[k] = 1 + .08 * Math.sin(tm * (.31 + k * .041) + p)
    }

    // Pointer: lightly smoothed, so direction changes curve instead of snapping
    const px0 = pointer.sx, py0 = pointer.sy
    if (pointer.inside) {
      const k = 1 - Math.exp(-dt * 30)
      pointer.sx += (pointer.x - pointer.sx) * k; pointer.sy += (pointer.y - pointer.sy) * k
      const mvx = (pointer.sx - px0) / dt, mvy = (pointer.sy - py0) / dt
      pointer.vx += (mvx - pointer.vx) * Math.min(1, dt * 14); pointer.vy += (mvy - pointer.vy) * Math.min(1, dt * 14)
      const seg = Math.hypot(pointer.sx - px0, pointer.sy - py0)
      if (seg > .5) {
        const steps = Math.ceil(seg / (GRID_CELL * .5))
        for (let s = 1; s <= steps; s++) splat(px0 + (pointer.sx - px0) * s / steps, py0 + (pointer.sy - py0) * s / steps, mvx / steps, mvy / steps)
      }
    } else { pointer.vx *= Math.exp(-dt * 6); pointer.vy *= Math.exp(-dt * 6) }
    // Arrives fast, lets go slowly
    pointer.presence += ((pointer.inside ? 1 : 0) - pointer.presence) * (1 - Math.exp(-dt * (pointer.inside ? 16 : 3)))
    relaxGrid(dt)

    while (pending.length && pending[0].at <= now) applyEvent(pending.shift())

    if (!reduced && (tm > nextIdleRipple)) {
      const k = Math.floor(Math.random() * LOBES.length), X = lobeX[k] * Rx, Y = lobeY[k] * Ry
      addRipple(cx + X * ax - Y * ay, cy + X * ay + Y * ax, 7, 150, 85, 3.6, .22)
      nextIdleRipple = tm + 5 + Math.random() * 7
    }
    for (let r = ripples.length - 1; r >= 0; r--) if ((ripples[r].age += dt) > ripples[r].life) ripples.splice(r, 1)

    // Bend springs
    const pres = pointer.presence, speed = Math.hypot(pointer.vx, pointer.vy)
    const dragCap = Math.min(1, 900 / (speed || 1))
    for (const a of anchors) {
      const X = a.u * Rx, ancX = cx + X * ax, ancY = cy + X * ay
      const dx = pointer.sx - ancX, dy = pointer.sy - ancY, d = Math.hypot(dx, dy) || 1
      const g = Math.exp(-((d / (Rx * .9)) ** 2)) * pres
      const tx = (dx / d * o.bend + pointer.vx * dragCap * .03) * g + 5 * Math.sin(tm * .31 + a.u * 3.4)
      const ty = (dy / d * o.bend + pointer.vy * dragCap * .03) * g + 4 * Math.cos(tm * .23 + a.u * 4.1)
      const k = 34 * (.3 + .7 * g), c = 2 * .42 * Math.sqrt(k)
      a.vx += ((tx - a.x) * k - a.vx * c) * dt; a.vy += ((ty - a.y) * k - a.vy * c) * dt
      a.x += a.vx * dt; a.y += a.vy * dt
    }

    const R0 = radius * (1 + Math.min(speed / 2200, .35)), repel = o.repulsion * pres, spr = o.spring, zeta = o.damping
    const birthing = life < 3.2
    for (let i = 0; i < N; i++) {
      if (rank[i] > active) continue
      const L = LAYERS[layer[i]]
      homeOf(i, tm, dts)
      let tx = hx, ty = hy
      const par = .55 + .65 * (depth[i] * .5 + .5)
      // Bend, interpolated between the anchors by position along the body
      const fu = Math.min(Math.max((bu[i] + 1) * 2, 0), 3.999), ai = fu | 0, af = smooth(fu - ai), A = anchors[ai], B = anchors[ai + 1]
      tx += (A.x + (B.x - A.x) * af) * par; ty += (A.y + (B.y - A.y) * af) * par
      let glow = 0
      for (const r of ripples) {
        const dx = tx - r.x, dy = ty - r.y, d = Math.sqrt(dx * dx + dy * dy) || 1, s = (d - r.speed * r.age) / r.width
        if (s < -2.5 || s > 2.5) continue
        const env = Math.exp(-s * s) * (1 - r.age / r.life) ** 2
        const disp = r.amp * env * Math.sin(s * 2.4) * (.5 + .5 * L.resp)
        tx += dx / d * disp; ty += dy / d * disp; glow += r.glow * env
      }
      if (birthing) {
        // Entrance: the body unfurls from its centre, inner particles first
        const b = smooth(clamp01((life - .1 - Math.sqrt((tx - cx) ** 2 + (ty - cy) ** 2) / Rx * .55 - born[i] * .4) / 1.5))
        tx = cx + (tx - cx) * (.55 + .45 * b); ty = cy + (ty - cy) * (.55 + .45 * b)
      }
      if (!placed) { x[i] = tx; y[i] = ty }

      const det = detach[i] > 0 ? (detach[i] = Math.max(0, detach[i] - dt / o.recovery)) : 0
      const k = spr * L.stiff * (1 - .9 * smooth(det)), c = 2 * zeta * Math.sqrt(k) + 3.4 * det
      let axx = (tx - x[i]) * k - vx[i] * c, ayy = (ty - y[i]) * k - vy[i] * c
      if (pres > .001) {
        const R = R0 * (.75 + .25 * L.resp), dx = x[i] - pointer.sx, dy = y[i] - pointer.sy, d2 = dx * dx + dy * dy
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1, q = 1 - d / R, f = repel * q * q * (1 + q * q) * L.resp
          axx += dx / d * f; ayy += dy / d * f
        }
      }
      if (gridLive) { sampleGrid(x[i], y[i]); axx += sx * 1.15 * L.resp * o.trail; ayy += sy * 1.15 * L.resp * o.trail }
      vx[i] += axx * dt; vy[i] += ayy * dt
      const v2 = vx[i] * vx[i] + vy[i] * vy[i]
      if (v2 > 2560000) { const m = 1600 / Math.sqrt(v2); vx[i] *= m; vy[i] *= m }
      x[i] += vx[i] * dt; y[i] += vy[i] * dt

      // Appearance
      const q = quietNear(x[i], y[i]) * (L.front ? 1 : .65)
      let a = alpha[i] * o.opacity * (1 - q * (.55 + .4 * sparse[i])) * (1 + glow) * (1 - .3 * det) * Math.min(1.25, hp)
      if (glint[i]) a *= 1 + glint[i] * 6 * Math.max(0, Math.sin(tm * .37 * L.speed + wobP[i] * 7)) ** 12
      if (birthing) a *= smooth(clamp01((life - .1 - born[i] * .9) / 1.2))
      const p = i * 8
      pointData[p] = x[i]; pointData[p + 1] = y[i]; pointData[p + 2] = size[i] * hp * (1 - .25 * q); pointData[p + 3] = Math.min(1, a)
      pointData[p + 4] = soft[i]; pointData[p + 5] = cr[i]; pointData[p + 6] = cg[i]; pointData[p + 7] = cb[i]
    }
    placed = true
  }

  // Links: only between nearby "node" particles of the mid layer, faint, and gone while a region is scattered
  const cellHead = new Int32Array(4096), cellNext = new Int32Array(N)
  const buildLinks = () => {
    const D = o.connectionDistance, cols = Math.ceil(W / D) + 1, rows = Math.ceil(H / D) + 1
    if (cols * rows > cellHead.length) return 0
    cellHead.fill(-1, 0, cols * rows)
    for (let i = 0; i < N; i++) {
      if (!node[i] || rank[i] > active) continue
      const cx = Math.floor(x[i] / D), cy = Math.floor(y[i] / D)
      if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue
      const c = cy * cols + cx
      cellNext[i] = cellHead[c]; cellHead[c] = i
    }
    let m = 0
    const maxLinks = lineData.length / 6, D2 = D * D, base = .17 * o.opacity
    for (let i = 0; i < N && m < maxLinks; i++) {
      if (!node[i] || rank[i] > active) continue
      const icx = Math.floor(x[i] / D), icy = Math.floor(y[i] / D)
      for (let oy = 0; oy <= 1; oy++) for (let ox = oy ? -1 : 0; ox <= 1; ox++) {
        const gx = icx + ox, gy = icy + oy
        if (gx < 0 || gy < 0 || gx >= cols || gy >= rows) continue
        for (let j = cellHead[gy * cols + gx]; j !== -1; j = cellNext[j]) {
          if ((ox === 0 && oy === 0 && j <= i) || m >= maxLinks) continue
          const dx = x[j] - x[i], dy = y[j] - y[i], d2 = dx * dx + dy * dy
          if (d2 > D2) continue
          const f = 1 - Math.sqrt(d2) / D
          const a = base * f * f * f * (1 - detach[i]) * (1 - detach[j]) * pointData[i * 8 + 3] * pointData[j * 8 + 3] * 6
          if (a < .004) continue
          const p = m++ * 6
          lineData[p] = x[i]; lineData[p + 1] = y[i]; lineData[p + 2] = a; lineData[p + 3] = x[j]; lineData[p + 4] = y[j]; lineData[p + 5] = a
        }
      }
    }
    return m
  }

  const render = () => {
    // Particles with rank above the active share were skipped this frame; give them zero alpha
    if (active < 1) for (let i = 0; i < N; i++) if (rank[i] > active) pointData[i * 8 + 3] = 0
    back.draw(pointData, frontStart, lineData, buildLinks())
    front.draw(pointData.subarray(frontStart * 8), N - frontStart, null, 0)
  }

  // ---- Loop: rAF while visible; reduced motion redraws a few times a second; off-screen nothing runs ----
  let raf = 0, timer = 0, last = 0, visible = document.visibilityState === 'visible', onScreen = true, started = false
  let slowFrames = 0, frames = 0
  const running = () => started && visible && onScreen && !destroyed
  const frame = now => {
    raf = 0
    const elapsed = (now - last) / 1000
    last = now
    if (!reduced && ++frames > 90) {
      // Graceful degradation: if frames keep running long, thin the body out (never below 45%)
      slowFrames = elapsed > .024 ? slowFrames + 1 : Math.max(0, slowFrames - 2)
      if (slowFrames > 45 && active > .45) { active -= .15; slowFrames = 0 }
    }
    update(Math.min(Math.max(elapsed, 1 / 240), 1 / 30), now)
    render()
    schedule()
  }
  const schedule = () => {
    if (raf || timer || !running()) return
    if (reduced) timer = setTimeout(() => { timer = 0; frame(performance.now()) }, 90)
    else raf = requestAnimationFrame(frame)
  }
  function wake() { schedule() }
  const resume = () => { cancelAnimationFrame(raf); clearTimeout(timer); raf = timer = 0; last = performance.now(); schedule() }

  const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; resume() })
  const onVisibility = () => { visible = document.visibilityState === 'visible'; resume() }
  const ro = new ResizeObserver(() => { measure(); resume() })
  // Wait for the intro to hand off, so the body unfurls in view
  const start = () => { if (started || destroyed) return; started = true; measure(); life = reduced ? 10 : 0; resume() }
  const introWatch = new MutationObserver(() => { if (!document.documentElement.classList.contains('intro-on')) { introWatch.disconnect(); start() } })

  measure()
  io.observe(hero); ro.observe(hero)
  document.addEventListener('visibilitychange', onVisibility)
  addEventListener('scroll', staleOrigin, { passive: true })
  document.fonts?.ready.then(() => { if (!destroyed) measure() })
  if (!reduced) {
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    hero.addEventListener('pointerdown', onDown)
    hero.addEventListener('pointerup', onUp)
    hero.addEventListener('pointercancel', onCancel)
  }
  if (document.documentElement.classList.contains('intro-on')) introWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  else start()

  function destroy() {
    if (destroyed) return
    destroyed = true
    cancelAnimationFrame(raf); clearTimeout(timer)
    io.disconnect(); ro.disconnect(); introWatch.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    removeEventListener('scroll', staleOrigin)
    hero.removeEventListener('pointermove', onMove)
    hero.removeEventListener('pointerleave', onLeave)
    hero.removeEventListener('pointerdown', onDown)
    hero.removeEventListener('pointerup', onUp)
    hero.removeEventListener('pointercancel', onCancel)
    back.destroy(); front.destroy()
  }
  return { destroy }
}
