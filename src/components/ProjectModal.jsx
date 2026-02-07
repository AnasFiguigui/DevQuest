'use client'

import { useCallback, useEffect, useRef, useState, memo } from 'react'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

function getYouTubeVideoId(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  return match?.[1] || null
}

function ImageViewerComponent({ pictures, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < pictures.length - 1

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }, [currentIndex])

  const handleNext = useCallback(() => {
    if (currentIndex < pictures.length - 1) setCurrentIndex(currentIndex + 1)
  }, [currentIndex, pictures.length])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && hasPrev) handlePrev()
      if (e.key === 'ArrowRight' && hasNext) handleNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext, hasPrev, hasNext, onClose])

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative flex items-center justify-center w-full h-full max-w-6xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-2xl transition-all z-10 shadow-lg"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Main image */}
        <div className="flex items-center justify-center w-full">
          <Image
            src={pictures[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-w-[90%] max-h-[85vh] object-contain rounded-lg"
            width={1200}
            height={800}
          />
        </div>

        {/* Previous button */}
        <button
          onClick={handlePrev}
          disabled={!hasPrev}
          className={`absolute left-4 inline-flex items-center rounded-l-md bg-white/10 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-white/20 focus:z-10 transition-all ${
            hasPrev ? '' : 'opacity-40 cursor-not-allowed'
          }`}
          aria-label="Previous image"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
        </button>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={!hasNext}
          className={`absolute right-4 inline-flex items-center rounded-r-md bg-white/10 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-white/20 focus:z-10 transition-all ${
            hasNext ? '' : 'opacity-40 cursor-not-allowed'
          }`}
          aria-label="Next image"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-white text-sm">
          {currentIndex + 1} / {pictures.length}
        </div>
      </div>
    </div>
  )
}

const ImageViewer = memo(ImageViewerComponent)


function PictureGalleryComponent({ pictures }) {
  const [showAll, setShowAll] = useState(false)
  const [failedImages, setFailedImages] = useState({})
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)
  const displayPics = showAll ? pictures : pictures.slice(0, 4)
  const hasMore = pictures.length > 4

  const handleImageError = useCallback(
    (pic) => {
      setFailedImages((prev) => ({ ...prev, [pic]: true }))
    },
    []
  )

  const handleImageClick = useCallback(
    (index) => {
      setViewerIndex(index)
      setViewerOpen(true)
    },
    []
  )

  const handleShowAll = useCallback(() => {
    setShowAll(true)
  }, [])

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-white tracking-wide">Gallery</h3>
      <div className="mb-4 grid grid-cols-2 gap-4">
        {displayPics.map((pic, idx) => {
          const isBlurred = hasMore && !showAll && idx === 3
          const failed = failedImages[pic]
          return (
            <div
              key={pic}
              className="relative overflow-hidden rounded-lg bg-zinc-700 cursor-pointer group"
              style={{ aspectRatio: '16 / 9' }}
              onClick={() => !isBlurred && !failed && handleImageClick(idx)}
            >
              {!failed ? (
                <>
                  <Image
                    src={pic}
                    alt={`project gallery ${idx + 1}`}
                    className={`h-full w-full object-cover transition-transform group-hover:scale-105 ${
                      isBlurred ? 'blur-md' : ''
                    }`}
                    onError={() => handleImageError(pic)}
                    fill
                  />
                  {isBlurred && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleShowAll()
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-all text-white font-semibold"
                    >
                      Display more
                    </button>
                  )}
                  {!isBlurred && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all pointer-events-none" />
                  )}
                </>
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-zinc-600">
                  <p className="text-white/60 text-sm text-center px-2">
                    Image not found
                    <br />
                    <code className="text-xs">{pic}</code>
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {viewerOpen && (
        <ImageViewer
          pictures={pictures}
          initialIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  )
}

const PictureGallery = memo(PictureGalleryComponent)

function SkeletonLoader() {
  return (
    <div className="max-h-[95vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white/0 dark:bg-zinc-950/70 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-2xl flex flex-col animate-pulse">
      {/* Banner Skeleton */}
      <div className="relative h-52 md:h-52 w-full overflow-hidden shrink-0 bg-zinc-700/50" />
      
      {/* Content Skeleton */}
      <div className="overflow-y-auto flex-1 px-14 py-8">
        {/* Title skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-zinc-700/50 rounded w-2/3 mb-3" />
          <div className="h-4 bg-zinc-700/30 rounded w-32" />
        </div>
        
        {/* Description skeleton */}
        <div className="mb-8 space-y-3">
          <div className="h-4 bg-zinc-700/30 rounded w-full" />
          <div className="h-4 bg-zinc-700/30 rounded w-full" />
          <div className="h-4 bg-zinc-700/30 rounded w-3/4" />
        </div>
        
        {/* Gallery skeleton */}
        <div className="mb-8">
          <div className="h-6 bg-zinc-700/50 rounded w-24 mb-4" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-zinc-700/30 rounded-lg" style={{ aspectRatio: '16 / 9' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(function ProjectModal({ projectId, onClose, onNavigate, allProjectIds }) {
  const [details, setDetails] = useState(null)
  const [bannerFailed, setBannerFailed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)
  const ref = useRef()

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (projectId) {
      document.body.style.overflow = 'hidden'
      // Trigger animation
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 50)
      return () => {
        document.body.style.overflow = 'unset'
        clearTimeout(timer)
      }
    }
  }, [projectId])

  // Fetch project details
  useEffect(() => {
    if (!projectId) return
    setBannerFailed(false)
    let mounted = true
    fetch(`/projects/${projectId}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
        return res.json()
      })
      .then((data) => mounted && setDetails(data))
      .catch((err) => {
        if (mounted) {
          console.error('Error loading project:', err)
          setDetails({ error: 'Could not load project details.' })
        }
      })
    return () => {
      mounted = false
      setDetails(null)
    }
  }, [projectId])

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === ref.current) onClose()
    },
    [onClose]
  )

  const idx = allProjectIds.indexOf(projectId)
  const prevId = idx > 0 ? allProjectIds[idx - 1] : null
  const nextId = idx < allProjectIds.length - 1 ? allProjectIds[idx + 1] : null

  const youtubeId = details?.youtubeUrl ? getYouTubeVideoId(details.youtubeUrl) : null

  // Memoized callbacks for navigation (defined before early return)
  const handlePrevProject = useCallback(() => {
    if (prevId) onNavigate(prevId)
  }, [prevId, onNavigate])

  const handleNextProject = useCallback(() => {
    if (nextId) onNavigate(nextId)
  }, [nextId, onNavigate])

  if (!projectId) return null

  // Determine modal content based on state
  let modalContent
  if (!details) {
    modalContent = <SkeletonLoader />
  } else if (details.error) {
    modalContent = (
      <div className="rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-8 text-red-400">
        {details.error}
      </div>
    )
  } else {
    modalContent = (
      /* Main modal */
      <div className="max-h-[95vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white/0 dark:bg-zinc-950/70 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-2xl flex flex-col">
        {/* Banner Section */}
        <div className="relative h-52 md:h-52 w-full overflow-hidden shrink-0 bg-gradient-to-br from-zinc-600 to-zinc-800">
          {!bannerFailed ? (
            <>
              <img
                src={details.banner?.src || details.thumbnail?.src}
                alt={details.name || 'Project banner'}
                className="h-full w-full object-cover"
                onError={() => setBannerFailed(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            </>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/60 text-sm">Banner image not found</p>
                <code className="text-white/40 text-xs">{details.banner?.src || details.thumbnail?.src}</code>
              </div>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/20 hover:bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-2xl transition-all shadow-lg"
          >
            ✕
          </button>

        </div>

        {/* Content Section */}
        <div className="overflow-y-auto flex-1 px-14 py-8 hide-scrollbar">
          
          {/* Title overlay */}
          <div className=" text-white">
            <h2 className="text-4xl font-bold mb-2">{details.name}</h2>
            <p className="text-sm text-white/50">{details.date}</p>
          </div>
          {/* Long Description */}
          {details.longDescription && (
            <div className="prose dark:prose-invert max-w-none mb-8 [&>*:first-child]:mt-0">

              <div
                className="text-white/90"
                dangerouslySetInnerHTML={{ __html: details.longDescription }}
              />
            </div>
          )}

          {/* Category */}
          {details.category && (
            <div className="mb-8">
              <p className="text-lg font-semibold text-white tracking-wide">Genre</p>
              <p className=" text-white/70 ">{details.category}</p>
            </div>
          )}

          {/* Video Section */}
          {(details.media?.src || youtubeId) && (
            <div className="mb-8">
              {details.media?.type === 'video' && details.media?.src && (
                <video
                  controls
                  src={details.media.src}
                  className="w-full rounded-lg bg-black/50"
                />
              )}
              {youtubeId && (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                  />
                </div>
              )}
            </div>
          )}

          {/* Pictures Gallery */}
          {details.pictures?.length > 0 && (
            <div className="mb-8">
              <PictureGallery pictures={details.pictures} />
            </div>
          )}

          {/* Technologies */}
          {details.technologies?.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-white tracking-wide">Technologies</h3>
              <div className="flex flex-wrap gap-6">
                {details.technologies.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center gap-2">
                    {tech.svg ? (
                        <Image
                          src={tech.svg}
                          alt={tech.name}
                          className="h-10 w-10 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                          width={48}
                          height={48}
                        />
                    ) : (
                      <div className="h-10 w-10 bg-zinc-600 rounded flex items-center justify-center text-white/40 text-xs text-center">
                        No icon
                      </div>
                    )}
                    <p className="text-sm text-white/80 text-center">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contributors */}
          {details.contributors?.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-white tracking-wide">Contributors</h3>
              <ul className="space-y-2">
                {details.contributors.map((contrib, idx) => (
                  <li key={idx} className="text-white/80">
                    {contrib}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Articles */}
          {details.articleUrl && (
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-white">Articles</h3>
              <div className="space-y-2">
                {Array.isArray(details.articleUrl) ? (
                  details.articleUrl.map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-indigo-400 hover:text-indigo-300 underline"
                    >
                      Read article →
                    </a>
                  ))
                ) : (
                  <a
                    href={details.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-indigo-400 hover:text-indigo-300 underline"
                  >
                    Read article →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={handlePrevProject}
              disabled={!prevId}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                prevId
                  ? 'bg-white/20 hover:bg-white/30 border border-white/30 text-white'
                  : 'bg-white/10 border border-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              ← Previous Project
            </button>
            <button
              onClick={handleNextProject}
              disabled={!nextId}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                nextId
                  ? 'bg-white/20 hover:bg-white/30 border border-white/30 text-white'
                  : 'bg-white/10 border border-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              Next Project →
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div
      ref={ref}
      onMouseDown={handleBackdropClick}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-lg p-4 transition-opacity duration-300 ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className={`transform transition-all duration-300 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        {modalContent}
      </div>

      {/* Left / Right project navigation (screen edges) */}
      {prevId && (
        <button
          onClick={handlePrevProject}
          aria-label="Previous project"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 inline-flex items-center rounded-l-md bg-white/10 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-white/20 focus:z-10"
        >
          <span className="sr-only">Previous project</span>
          <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
        </button>
      )}

      {nextId && (
        <button
          onClick={handleNextProject}
          aria-label="Next project"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 inline-flex items-center rounded-r-md bg-white/10 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-white/20 focus:z-10"
        >
          <span className="sr-only">Next project</span>
          <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
        </button>
      )}
    </div>
  )
})