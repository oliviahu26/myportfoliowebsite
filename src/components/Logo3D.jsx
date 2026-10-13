import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import logoSvg from '@/assets/chrome-logo.svg?raw'
import './Logo3D.css'

// how far the logo starts from center, as a fraction of the room it has to move in (negative is left)
const START_OFFSET_X = -0.6
// radians of rotation per pixel dragged
const DRAG_SENSITIVITY = 0.01

// the svg is y-down, so flip the geometry and reverse its triangles to keep faces outward
function flipGeometryY(geometry) {
  geometry.scale(1, -1, 1)
  for (const name of ['position', 'normal', 'uv']) {
    const attribute = geometry.attributes[name]
    if (!attribute) continue
    const size = attribute.itemSize
    const array = attribute.array
    for (let vertex = 0; vertex < attribute.count; vertex += 3) {
      for (let k = 0; k < size; k++) {
        const a = (vertex + 1) * size + k
        const b = (vertex + 2) * size + k
        const temp = array[a]
        array[a] = array[b]
        array[b] = temp
      }
    }
    attribute.needsUpdate = true
  }
  return geometry
}

function Logo3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    try {
      return setupScene(container)
    } catch (error) {
      container.textContent = `logo error: ${error.message}`
    }
  }, [])

  return <div className="logo-3d" ref={containerRef} aria-hidden="true" />
}

function setupScene(container) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  // looking down at the logo from above gives the diagonal view
  camera.position.set(0, 6, 7)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.appendChild(renderer.domElement)

  // a studio environment gives the metal something to reflect
  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environmentIntensity = 1.4

  const material = new THREE.MeshStandardMaterial({
    color: 0x0a1aff,
    metalness: 1,
    roughness: 0.08,
    envMapIntensity: 1.6,
    side: THREE.DoubleSide,
  })

  const logo = new THREE.Group()
  const { paths } = new SVGLoader().parse(logoSvg)
  for (const path of paths) {
    for (const shape of path.toShapes()) {
      const geometry = flipGeometryY(
        new THREE.ExtrudeGeometry(shape, {
          depth: 30,
          bevelEnabled: true,
          bevelThickness: 12,
          bevelSize: 8,
          bevelSegments: 6,
          curveSegments: 8,
        }),
      )
      logo.add(new THREE.Mesh(geometry, material))
    }
  }
  const pivot = new THREE.Group()
  pivot.rotation.z = Math.PI / 6
  pivot.add(logo)
  scene.add(pivot)

  // logo-space center and size, before any scaling
  const box = new THREE.Box3().setFromObject(logo)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  // the pivot sits at the logo's center, so rotation happens around it
  logo.position.copy(center).multiplyScalar(-1)

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.5)
  keyLight.position.set(4, 6, 8)
  scene.add(keyLight)

  // drag offset in world units, applied on top of the centered position
  const offset = new THREE.Vector2()
  let placed = false
  // scroll zoom multiplier on top of the fitted size
  let zoom = 1.5625
  // half the logo's on-screen size, used to keep it inside the frame
  const half = new THREE.Vector2()

  // mouse drag rotation, in radians
  const rotation = new THREE.Vector2()

  // the frame's height at the logo's distance from the camera
  const visibleHeight = () => 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.length()

  // scales the logo to fit the whole frame with a margin, then places it
  const fitLogo = () => {
    const height = visibleHeight()
    const width = height * camera.aspect
    // sized to a circle around the logo, so no rotation can push it out of frame
    const scale = ((Math.min(width, height) * 0.9) / Math.hypot(size.x, size.y)) * zoom
    pivot.scale.setScalar(scale)
    half.set((size.x * scale) / 2, (size.y * scale) / 2)

    const maxX = Math.max(0, width / 2 - half.x)
    const maxY = Math.max(0, height / 2 - half.y)
    // start the logo to the left until the user moves it
    if (!placed) {
      offset.set(maxX * START_OFFSET_X, 0)
      placed = true
    }
    offset.set(THREE.MathUtils.clamp(offset.x, -maxX, maxX), THREE.MathUtils.clamp(offset.y, -maxY, maxY))
    pivot.position.set(offset.x, offset.y, 0)
  }

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = container
    // hidden (e.g. on mobile) means zero size, which would poison the camera and the offset
    if (!width || !height) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    fitLogo()
  }
  resize()
  const observer = new ResizeObserver(resize)
  observer.observe(container)

  // dragging rotates the logo in any direction
  let dragging = false
  let last = { x: 0, y: 0 }

  const onPointerDown = (event) => {
    dragging = true
    last = { x: event.clientX, y: event.clientY }
    container.setPointerCapture(event.pointerId)
    container.style.cursor = 'grabbing'
  }

  const onPointerMove = (event) => {
    if (!dragging) return
    rotation.y += (event.clientX - last.x) * DRAG_SENSITIVITY
    rotation.x += (event.clientY - last.y) * DRAG_SENSITIVITY
    last = { x: event.clientX, y: event.clientY }
  }

  const onPointerUp = (event) => {
    dragging = false
    container.style.cursor = 'grab'
    container.releasePointerCapture(event.pointerId)
  }

  const onWheel = (event) => {
    event.preventDefault()
    zoom = THREE.MathUtils.clamp(zoom * Math.exp(-event.deltaY * 0.001), 0.6, 4)
    fitLogo()
  }

  container.style.cursor = 'grab'
  container.style.touchAction = 'none'
  container.addEventListener('wheel', onWheel, { passive: false })
  container.addEventListener('pointerdown', onPointerDown)
  container.addEventListener('pointermove', onPointerMove)
  container.addEventListener('pointerup', onPointerUp)
  container.addEventListener('pointercancel', onPointerUp)

  // a slow continuous spin on top of the drag rotation
  let frame
  const animate = (time) => {
    pivot.rotation.x = rotation.x
    pivot.rotation.y = rotation.y + time / 6000
    renderer.render(scene, camera)
    frame = requestAnimationFrame(animate)
  }
  frame = requestAnimationFrame(animate)

  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    container.removeEventListener('pointerdown', onPointerDown)
    container.removeEventListener('pointermove', onPointerMove)
    container.removeEventListener('pointerup', onPointerUp)
    container.removeEventListener('pointercancel', onPointerUp)
    container.removeEventListener('wheel', onWheel)
    logo.traverse((child) => child.geometry?.dispose())
    material.dispose()
    pmrem.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}

export default Logo3D
