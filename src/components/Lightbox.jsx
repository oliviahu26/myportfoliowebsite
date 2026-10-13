import { useEffect, useRef } from 'react'
import './Lightbox.css'

// full-screen image viewer built on the native dialog element, so Escape and focus are handled for us
function Lightbox({ image, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (image && !dialog.open) dialog.showModal()
    if (!image && dialog.open) dialog.close()
  }, [image])

  // clicking the dark area outside the picture closes it
  const onClick = (event) => {
    if (event.target === event.currentTarget) event.currentTarget.close()
  }

  return (
    <dialog ref={dialogRef} className="lightbox" onClick={onClick} onClose={onClose}>
      {image && (
        <>
          <button type="button" className="lightbox-close" onClick={() => dialogRef.current.close()}>
            <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 5L19 19M19 5L5 19" />
            </svg>
          </button>
          <img src={image.src} alt={image.alt} className="lightbox-image" />
        </>
      )}
    </dialog>
  )
}

export default Lightbox
