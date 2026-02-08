'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'

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

export function ImageLightbox({ src, alt = '', caption, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)

  const openLightbox = () => setIsOpen(true)
  const closeLightbox = useCallback(() => setIsOpen(false), [])

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeLightbox])

  return (
    <>
      {/* Clickable Image */}
      <figure className={`my-8 ${className}`}>
        <button
          type="button"
          onClick={openLightbox}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="w-full rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          <div className="absolute bottom-4 right-4 rounded-full bg-black/50 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </button>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close lightbox"
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          {/* Image container */}
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

          {/* Click outside hint */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/50">
            Click anywhere or press Escape to close
          </p>
        </div>
      )}
    </>
  )
}

ImageLightbox.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  caption: PropTypes.string,
  className: PropTypes.string,
}
