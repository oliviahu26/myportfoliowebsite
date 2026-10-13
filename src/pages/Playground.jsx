import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTitle } from '../utils/usePageTitle.js'
import Lightbox from '../components/Lightbox.jsx'
import { Button } from '@/components/ui/button'
import './Playground.css'

// placeholder gallery, images live in public/images/playground
const images = [
  '/images/playground/playground_nightbykeshi.mp4',
  '/images/playground/playground_sugarhoneylove.webp',
  '/images/playground/playground_nissanaltima.webp',
  '/images/playground/playground_PUSH2START.webp',
  '/images/playground/playground_crazycover.webp',
  '/images/playground/playground_1800hotnfun.webp',
  '/images/playground/playground_nyfwposter.webp',
  '/images/playground/playground_nyfwposter2.webp',
  '/images/playground/playground_submarinetshirt.webp',
  '/images/playground/playground_submarinevinyl.webp',
  '/images/playground/playground_submarine.webp',
  '/images/playground/playground_scarlettourposters.webp',
  '/images/playground/playground_members.webp',
  '/images/playground/playground_easy.webp',
  '/images/playground/playground_FINALlowcholesterol.webp',
  '/images/playground/playground_tshirt.webp',
  '/images/playground/playground_dojacatmasc.webp',
  '/images/playground/playground_scarlettourshirts.webp',
  '/images/playground/playground_joyluckclub.webp',
  '/images/playground/playground_unforgiven.webp',
  '/images/playground/playground_noreturn.webp',
  '/images/playground/playground_burnthebridge.webp',
  '/images/playground/playground_anti.webp',
  '/images/playground/playground_goodparts.webp',
  '/images/playground/playground_nocelestial.webp',
  '/images/playground/playground_hearingvoices.webp',
  '/images/playground/playground_treeamongtheshrubs.webp',
  '/images/playground/playground_katsucurry.gif',
]

const NUANCES_HOLD_MS = 400

function PlaygroundLetter({ letter }) {
  const [active, setActive] = useState(false)
  const timerRef = useRef(null)

  const handleEnter = () => {
    clearTimeout(timerRef.current)
    setActive(true)
  }

  const handleLeave = () => {
    timerRef.current = setTimeout(() => setActive(false), NUANCES_HOLD_MS)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <span
      className={`playground-letter${active ? ' is-nuances' : ''}`}
      aria-hidden="true"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {letter}
    </span>
  )
}

// tail is 4x the length of the head
function ArrowIcon({ className }) {
  return (
    <svg className={className} width="64" height="24" style={{ width: 'var(--arrow-width)', height: 'var(--arrow-height)', flexShrink: 0 }} viewBox="0 0 64 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5L2 12L9 19" />
      <path d="M2 12H62" />
    </svg>
  )
}

// arrow spacing: 64px arrow + 12px gap; hovering scrolls one step per loop
const ARROW_STEP = 76
const ARROW_SPEED = 84 // px per second once spun up
const SPRING = 220 // stiffness of the return to the middle; the return is critically damped so it lands without bouncing

function Playground() {
  const navigate = useNavigate()
  usePageTitle('Playground | Olivia Hu')
  const [activeImage, setActiveImage] = useState(null)

  // hovering scrolls the arrows; leaving springs the closest arrow back to the middle, keeping its momentum
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const speedRef = useRef(0)
  const returnToRef = useRef(null)
  const frameRef = useRef(0)
  const lastTimeRef = useRef(0)

  const applyOffset = () => {
    trackRef.current.style.transform = `translateX(${-(offsetRef.current % ARROW_STEP)}px)`
  }

  const tick = (now) => {
    const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05)
    lastTimeRef.current = now
    const returnTo = returnToRef.current

    if (returnTo !== null) {
      const damping = 2 * Math.sqrt(SPRING)
      speedRef.current += (-SPRING * (offsetRef.current - returnTo) - damping * speedRef.current) * dt
      offsetRef.current += speedRef.current * dt
      applyOffset()
      if (Math.abs(offsetRef.current - returnTo) < 0.05 && Math.abs(speedRef.current) < 0.5) {
        offsetRef.current = returnTo
        speedRef.current = 0
        returnToRef.current = null
        applyOffset()
        trackRef.current.classList.remove('is-moving')
        frameRef.current = 0
        return
      }
    } else {
      speedRef.current += (ARROW_SPEED - speedRef.current) * (1 - Math.exp(-2.5 * dt))
      offsetRef.current += speedRef.current * dt
      applyOffset()
    }
    frameRef.current = requestAnimationFrame(tick)
  }

  const ensureRunning = () => {
    if (!frameRef.current) {
      lastTimeRef.current = performance.now()
      frameRef.current = requestAnimationFrame(tick)
    }
  }

  // the arrow animation is desktop only; on phones the arrow just sits still
  const isMobile = () => window.matchMedia('(max-width: 800px)').matches

  const handleEnter = () => {
    if (isMobile()) return
    returnToRef.current = null
    trackRef.current.classList.add('is-moving')
    ensureRunning()
  }

  const handleLeave = () => {
    if (isMobile()) return
    // the closest arrow to the current position is the one that returns to the middle
    returnToRef.current = Math.round(offsetRef.current / ARROW_STEP) * ARROW_STEP
    ensureRunning()
  }

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  return (
    <main className="playground-page">
      <header className="playground-header">
        <Button
          variant="outline"
          aria-label="Go back"
          className="back-button h-10 w-[104px] rounded-4xl border-black p-0 hover:bg-[#F5A9E0] hover:text-[rgb(51,47,27)]"
          onClick={() => navigate(-1)}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {/* four arrows side by side; the middle one is the resting arrow */}
          <span className="arrow-window">
            <span className="arrow-track" ref={trackRef}>
              <ArrowIcon className="arrow-side" />
              <ArrowIcon />
              <ArrowIcon className="arrow-side" />
              <ArrowIcon className="arrow-side" />
            </span>
          </span>
        </Button>
        <h1 className="playground-title" aria-label="playground">
          {/* each letter switches font on hover and holds it briefly after the pointer leaves */}
          {'playground'.split('').map((letter, index) => (
            <PlaygroundLetter key={index} letter={letter} />
          ))}
        </h1>
      </header>
      <div className="playground-gallery">
        {images.map((src, index) =>
          src.endsWith('.mp4') ? (
            // videos play in place with their sound and controls rather than opening the lightbox, which only shows images
            <video
              key={src}
              src={src}
              className="playground-video"
              controls
              loop
              playsInline
              preload="metadata"
              aria-label={`Playground ${index + 1}`}
            />
          ) : (
            <button
              key={src}
              type="button"
              className="image-button"
              aria-label={`view playground ${index + 1}`}
              onClick={() => setActiveImage({ src, alt: `Playground ${index + 1}` })}
            >
              <img src={src} alt={`Playground ${index + 1}`} className="playground-image" loading="lazy" decoding="async" />
            </button>
          ),
        )}
      </div>
      <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </main>
  )
}

export default Playground
