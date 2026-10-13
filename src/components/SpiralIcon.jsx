import { useEffect, useRef } from 'react'

const MAX_SPEED = 240 // degrees per second when fully spun up
const RATE = 1.2 // how quickly the speed eases toward its target

// spiral icon, used as the sidebar link to the playground
function SpiralIcon({ size = 117, color = 'currentColor', strokeWidth = 9, spinning = false, className, ...props }) {
  const svgRef = useRef(null)
  const spinningRef = useRef(spinning)
  const angleRef = useRef(0)
  const speedRef = useRef(0)
  const frameRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    spinningRef.current = spinning
    // skip the spin for users who ask for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // the speed eases toward its target every frame, so the spin ramps up and winds down smoothly
    const tick = (now) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05)
      lastTimeRef.current = now
      const target = spinningRef.current ? MAX_SPEED : 0
      speedRef.current += (target - speedRef.current) * (1 - Math.exp(-RATE * dt))
      angleRef.current = (angleRef.current + speedRef.current * dt) % 360
      svgRef.current.style.transform = `rotate(${angleRef.current}deg)`

      const stillMoving = spinningRef.current || speedRef.current > 1
      frameRef.current = stillMoving ? requestAnimationFrame(tick) : 0
    }

    // start the loop only when it isn't already running
    if (!frameRef.current && (spinning || speedRef.current > 1)) {
      lastTimeRef.current = performance.now()
      frameRef.current = requestAnimationFrame(tick)
    }
  }, [spinning])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="42 32 104 117"
      width={(size * 104) / 117}
      height={size}
      role="img"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M121.2 142.3 L108.5 144.2 L95.8 143.6 L83.8 140.5 L72.9 135.0 L63.5 127.5 L55.9 118.4 L50.6 108.1 L47.5 97.1 L46.8 85.9 L48.4 74.9 L52.3 64.7 L58.0 55.7 L65.4 48.2 L74.1 42.5 L83.5 38.8 L93.4 37.2 L103.2 37.7 L112.6 40.1 L121.0 44.4 L128.3 50.3 L134.0 57.4 L138.1 65.4 L140.4 73.9 L140.8 82.6 L139.4 90.9 L136.4 98.7 L131.9 105.5 L126.1 111.1 L119.5 115.3 L112.3 117.9 L104.9 119.0 L97.6 118.4 L90.7 116.4 L84.5 113.1 L79.3 108.7 L75.2 103.4 L72.4 97.5 L71.0 91.2 L70.8 85.0 L72.0 79.1 L74.4 73.6 L77.7 69.0 L81.8 65.2 L86.5 62.5 L91.6 60.8 L96.7 60.3 L101.6 60.9 L106.2 62.4 L110.2 64.9 L113.5 68.0 L115.9 71.6 L117.5 75.5 L118.2 79.5 L118.0 83.4 L117.0 87.0 L115.3 90.2 L113.1 92.8 L110.5 94.8 L107.6 96.2 L104.7 96.8 L101.8 96.8 L99.2 96.1 L96.8 95.0 L95.0 93.5 L93.6 91.7 L92.7 89.7 L92.3 87.8 L92.4 85.9 L92.9 84.2 L93.7 82.9 L94.7 81.9 L95.9 81.2"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SpiralIcon
