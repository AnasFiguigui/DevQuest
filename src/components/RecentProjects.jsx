'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import projectsData from '@/lib/projects-client'
import ProjectModal from '@/components/ProjectModal'

export function RecentProjects() {
  const [modalProjectId, setModalProjectId] = useState(null)

  const recentProjects = projectsData
    .slice()
    .sort((a, b) => +new Date(b.releaseDate) - +new Date(a.releaseDate))
    .slice(0, 3)

  const allProjectIds = projectsData
    .slice()
    .sort((a, b) => +new Date(b.releaseDate) - +new Date(a.releaseDate))
    .map((p) => p.id)

  return (
    <>
      <h2 className="text-center text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
        Recent Projects
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recentProjects.map((project) => (
          <button
            key={project.id}
            onClick={() => setModalProjectId(project.id)}
            className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-6 pb-6 bg-zinc-900/5 dark:bg-zinc-900 text-left aspect-[5/4]"
          >
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <h3 className="text-xl font-semibold text-white">{project.name}</h3>
            <p className="mt-1 text-sm text-white/80">{project.shortDescription}</p>
          </button>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link
          href="/project"
          className="inline-flex items-center rounded-md bg-indigo-500/20 px-4 py-2.5 text-sm font-semibold text-indigo-400 hover:bg-indigo-500/30 transition-colors"
        >
          View All Projects
        </Link>
      </div>

      {modalProjectId && (
        <ProjectModal
          projectId={modalProjectId}
          onClose={() => setModalProjectId(null)}
          onNavigate={(id) => setModalProjectId(id)}
          allProjectIds={allProjectIds}
        />
      )}
    </>
  )
}
