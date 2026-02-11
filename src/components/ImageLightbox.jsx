'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'

// Tiny blur placeholder - a small colored rectangle that matches most images
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
  typeof globalThis.window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : globalThis.btoa(str)

const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 18L18 6M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ZoomIcon() {
  return (
    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    </svg>
  )
}

function LightboxModal({ src, alt, caption, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close lightbox"
      >
        <CloseIcon className="h-6 w-6" />
      </button>

      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          className="max-h-[90vh] w-auto rounded-lg object-contain"
          priority
        />
        {caption && (
          <p className="mt-4 text-center text-sm text-white/80">
            {caption}
          </p>
        )}
      </div>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/50">
        Click anywhere or press Escape to close
      </p>
    </div>
  )
}

LightboxModal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  caption: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

function ClickableImage({ src, alt, onClick, priority = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="w-full rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
        loading={priority ? 'eager' : 'lazy'}
        placeholder="blur"
        blurDataURL={blurDataURL}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
      <div className="absolute bottom-4 right-4 rounded-full bg-black/50 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ZoomIcon />
      </div>
    </button>
  )
}

ClickableImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  priority: PropTypes.bool,
}

export function ImageLightbox({ src, alt = '', caption, className = '', priority = false }) {
  const [isOpen, setIsOpen] = useState(false)

  const openLightbox = () => setIsOpen(true)
  const closeLightbox = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <figure className={`my-4 ${className}`}>
        <ClickableImage src={src} alt={alt} onClick={openLightbox} priority={priority} />
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
            {caption}
          </figcaption>
        )}
      </figure>

      {isOpen && (
        <LightboxModal src={src} alt={alt} caption={caption} onClose={closeLightbox} />
      )}
    </>
  )
}

ImageLightbox.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  caption: PropTypes.string,
  className: PropTypes.string,
  priority: PropTypes.bool,
}

// Two images side by side
export function ImageRow({ 
  images, 
  caption, 
  className = '',
  priority = false
}) {
  const [openIndex, setOpenIndex] = useState(null)
  const closeLightbox = useCallback(() => setOpenIndex(null), [])

  // Normalize images to array of objects
  const normalizedImages = images.map((img) => 
    typeof img === 'string' ? { src: img, alt: '' } : img
  )

  return (
    <>
      <figure className={`my-4 ${className}`}>
        <div className="grid grid-cols-2 gap-4">
          {normalizedImages.map((img, index) => (
            <ClickableImage
              key={img.src}
              src={img.src}
              alt={img.alt || ''}
              onClick={() => setOpenIndex(index)}
              priority={priority}
            />
          ))}
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
            {caption}
          </figcaption>
        )}
      </figure>

      {openIndex !== null && (
        <LightboxModal
          src={normalizedImages[openIndex].src}
          alt={normalizedImages[openIndex].alt}
          caption={normalizedImages[openIndex].caption}
          onClose={closeLightbox}
        />
      )}
    </>
  )
}

ImageRow.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        caption: PropTypes.string,
      }),
    ])
  ).isRequired,
  caption: PropTypes.string,
  className: PropTypes.string,
  priority: PropTypes.bool,
}
