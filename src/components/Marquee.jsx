import { useLayoutEffect, useRef, useState } from 'react'
import './Marquee.css'

// repeats the text inside each copy so the loop never shows an empty gap
const REPEATS = 12
// pixels per second, so the speed stays the same whatever the text length
const SPEED = 20

function Marquee({ text }) {
  const groupRef = useRef(null)
  const [duration, setDuration] = useState(20)

  useLayoutEffect(() => {
    const group = groupRef.current
    const updateDuration = () => {
      // a hidden or not-yet-measured marquee reports 0 width; keep the last good duration instead of a 0s loop that stops
      const width = group.offsetWidth
      if (width) setDuration(width / SPEED)
    }
    updateDuration()
    // re-measure whenever the text's size changes, e.g. when the webfont loads or the window resizes
    const observer = new ResizeObserver(updateDuration)
    observer.observe(group)
    return () => observer.disconnect()
  }, [text])

  const copy = Array.from({ length: REPEATS }, (_, index) => (
    <span key={index} className="marquee-item">
      {text}
    </span>
  ))

  return (
    <header className="marquee">
      <div className="marquee-track" style={{ animationDuration: `${duration}s` }}>
        <div className="marquee-group" ref={groupRef}>
          {copy}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {copy}
        </div>
      </div>
    </header>
  )
}

export default Marquee
