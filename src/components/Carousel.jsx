import { useState } from 'react'
import Lightbox from './Lightbox.jsx'
import './Carousel.css'

function Carousel({ title, year, images, description }) {
  const [activeImage, setActiveImage] = useState(null)

  return (
    <section className="carousel">
      <h1 className="carousel-title">
        {title} <span className="carousel-year">{year}</span>
      </h1>
      <div className="image-bank">
        {images.map((src, index) =>
          // a #t= fragment sets where the video starts, so strip it before checking the file type
          src.split('#')[0].endsWith('.mp4') ? (
            <video key={index} src={src} controls muted playsInline />
          ) : (
            <button
              key={index}
              type="button"
              className="image-button"
              aria-label={`view ${title} ${index + 1}`}
              onClick={() => setActiveImage({ src, alt: `${title} ${index + 1}` })}
            >
              <img src={src} alt={`${title} ${index + 1}`} />
            </button>
          ),
        )}
      </div>
      <p className="carousel-description">{description}</p>
      <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </section>
  )
}

export default Carousel
