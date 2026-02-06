'use client'

import { useEffect, useRef, useState } from 'react'

export default function ProjectModal({ projectId, onClose, onNavigate, allProjectIds }) {
  const [details, setDetails] = useState(null)
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

  return (
    <div
      ref={ref}
      onMouseDown={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="max-h-full w-full max-w-4xl overflow-auto rounded bg-white dark:bg-zinc-900" role="dialog" aria-modal="true">
        <div className="flex items-start justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">{details?.name ?? 'Loading...'}</h2>
          <button onClick={onClose} aria-label="Close" className="text-gray-600 hover:text-gray-800">✕</button>
        </div>

        <div className="p-6">
          {details ? (
            details.error ? (
              <div className="text-red-500">{details.error}</div>
            ) : (
              <div>
                <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">{details.date}</p>
                {details.media?.type === 'image' && (
                  <img src={details.media.src} alt="media" className="mb-4 max-h-80 w-full object-cover" />
                )}
                {details.media?.type === 'video' && (
                  <video controls src={details.media.src} className="mb-4 w-full" />
                )}
                {details.longDescription && <div className="prose mb-4 dark:prose-invert" dangerouslySetInnerHTML={{ __html: details.longDescription }} />}

                {details.pictures?.length > 0 && (
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    {details.pictures.map((p) => (
                      <img key={p} src={p} alt="project pic" className="h-32 w-full object-cover" />
                    ))}
                  </div>
                )}

                {details.technologies && (
                  <div className="mb-4">
                    <strong>Technologies:</strong> {details.technologies.join(', ')}
                  </div>
                )}

                {details.contributors && (
                  <div className="mb-4">
                    <strong>Contributors:</strong> {details.contributors.join(', ')}
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <button
                      onClick={() => prevId && onNavigate(prevId)}
                      disabled={!prevId}
                      className={`mr-2 inline-flex items-center rounded px-4 py-2 text-sm ${prevId ? 'bg-zinc-200 hover:bg-zinc-300' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}`}
                    >
                      Previous Project
                    </button>
                    <button
                      onClick={() => nextId && onNavigate(nextId)}
                      disabled={!nextId}
                      className={`inline-flex items-center rounded px-4 py-2 text-sm ${nextId ? 'bg-zinc-200 hover:bg-zinc-300' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}`}
                    >
                      Next Project
                    </button>
                  </div>
                  {details.videoUrl && (
                    <a href={details.videoUrl} target="_blank" rel="noreferrer" className="text-sm text-indigo-600">Open video</a>
                  )}
                </div>
              </div>
            )
          ) : (
            <div>Loading…</div>
          )}
        </div>
      </div>
    </div>
  )
}
