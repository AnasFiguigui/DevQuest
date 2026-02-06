'use client'

import { useEffect, useRef, useState } from 'react'

function getYouTubeVideoId(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  return match?.[1] || null
}

function PictureGallery({ pictures }) {
  const [showAll, setShowAll] = useState(false)
  const [failedImages, setFailedImages] = useState({})
  const displayPics = showAll ? pictures : pictures.slice(0, 4)
  const hasMore = pictures.length > 4

  const handleImageError = (pic) => {
    setFailedImages((prev) => ({ ...prev, [pic]: true }))
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-white">Gallery</h3>
      <div className="mb-4 grid grid-cols-2 gap-4">
        {displayPics.map((pic, idx) => {
          const isBlurred = hasMore && !showAll && idx === 3
          const failed = failedImages[pic]
          return (
            <div
              key={pic}
              className="relative h-64 overflow-hidden rounded-lg bg-zinc-700"
            >
              {!failed ? (
                <>
                  <img
                    src={pic}
                    alt={`project gallery ${idx + 1}`}
                    className={`h-full w-full object-cover ${isBlurred ? 'blur-md' : ''}`}
                    onError={() => handleImageError(pic)}
                  />
                  {isBlurred && (
                    <button
                      onClick={() => setShowAll(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-all text-white font-semibold"
                    >
                      Display more
                    </button>
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
    </div>
  )
}

export default function ProjectModal({ projectId, onClose, onNavigate, allProjectIds }) {
  const [details, setDetails] = useState(null)
  const [bannerFailed, setBannerFailed] = useState(false)
  const ref = useRef()

  useEffect(() => {
    if (!projectId) return
    let mounted = true
    fetch(`/projects/${projectId}.json`)
      .then((res) => res.json())
      .then((data) => mounted && setDetails(data))
      .catch(() => mounted && setDetails({ error: 'Could not load details.' }))
    return () => {
      mounted = false
      setDetails(null)
    }
  }, [projectId])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!projectId) return null

  const idx = allProjectIds.indexOf(projectId)
  const prevId = idx > 0 ? allProjectIds[idx - 1] : null
  const nextId = idx < allProjectIds.length - 1 ? allProjectIds[idx + 1] : null

  const youtubeId = details?.youtubeUrl ? getYouTubeVideoId(details.youtubeUrl) : null

  return (
    <div
      ref={ref}
      onMouseDown={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      {/* Loading state */}
      {!details ? (
        <div className="rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-8 text-white">
          Loading…
        </div>
      ) : details.error ? (
        <div className="rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-8 text-red-400">
          {details.error}
        </div>
      ) : (
        /* Main modal */
        <div className="max-h-[95vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white/15 dark:bg-zinc-900/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl flex flex-col">
          {/* Banner Section */}
          <div className="relative h-50 w-full overflow-hidden shrink-0 bg-gradient-to-br from-zinc-600 to-zinc-800">
            {!bannerFailed ? (
              <>
                <img
                  src={details.banner?.src || details.thumbnail?.src}
                  alt={details.name}
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
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-2xl transition-all"
            >
              ✕
            </button>

          </div>

          {/* Content Section */}
          <div className="overflow-y-auto flex-1 px-8 py-8">
            
            {/* Title overlay */}
            <div className=" text-white">
              <h2 className="text-4xl font-bold mb-2">{details.name}</h2>
              <p className="text-sm text-white/80">{details.date}</p>
            </div>
            {/* Long Description */}
            {details.longDescription && (
              <div className="prose dark:prose-invert max-w-none mb-8">
                <div
                  className="text-white/90"
                  dangerouslySetInnerHTML={{ __html: details.longDescription }}
                />
              </div>
            )}

            {/* Category */}
            {details.category && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-white/70 uppercase tracking-wide">Genre</p>
                <p className="text-lg text-white">{details.category}</p>
              </div>
            )}

            {/* Video Section */}
            {(details.media?.src || youtubeId) && (
              <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-white">Video</h3>
                {details.media?.type === 'video' && details.media?.src && (
                  <video
                    controls
                    src={details.media.src}
                    className="w-full rounded-lg bg-black/50"
                  />
                )}
                {youtubeId && (
                  <a
                    href={details.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                      alt="YouTube thumbnail"
                      className="w-full rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/30 transition rounded-lg">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition">
                        ▶
                      </div>
                    </div>
                  </a>
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
                <h3 className="mb-4 text-lg font-semibold text-white">Technologies</h3>
                <div className="flex flex-wrap gap-6">
                  {details.technologies.map((tech) => (
                    <div key={tech.name} className="flex flex-col items-center gap-2">
                      {tech.svg ? (
                        <img
                          src={tech.svg}
                          alt={tech.name}
                          className="h-16 w-16 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="h-16 w-16 bg-zinc-600 rounded flex items-center justify-center text-white/40 text-xs text-center">
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
                <h3 className="mb-4 text-lg font-semibold text-white">Contributors</h3>
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
                onClick={() => prevId && onNavigate(prevId)}
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
                onClick={() => nextId && onNavigate(nextId)}
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
      )}
    </div>
  )
}
