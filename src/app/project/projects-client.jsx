 'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

import { SimpleLayout } from '@/components/SimpleLayout'
import projectsData from '@/lib/projects-client'
import ProjectModal from '@/components/ProjectModal'

const tabs = [
  { name: 'All Projects', value: 'all' },
  { name: 'Games', value: 'game' },
  { name: 'Websites', value: 'website' },
  { name: 'Mods', value: 'mod' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function getCountByCategory(category) {
  if (category === 'all') return projectsData.length
  return projectsData.filter((project) => project.type === category).length
}

function Section({ onFilterChange }) {
  const [currentTab, setCurrentTab] = useState('all')

  const handleTabChange = (value) => {
    setCurrentTab(value)
    onFilterChange(value)
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:hidden">
        <select
          value={currentTab}
          onChange={(e) => handleTabChange(e.target.value)}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-zinc-800 dark:text-zinc-100 dark:outline-zinc-700"
        >
          {tabs.map((tab) => (
            <option key={tab.value} value={tab.value}>
              {tab.name} ({getCountByCategory(tab.value)})
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <nav
          aria-label="Tabs"
          className="isolate flex divide-x divide-zinc-200 rounded-lg bg-zinc-50 shadow dark:divide-zinc-700 dark:bg-zinc-800"
        >
          {tabs.map((tab, tabIdx) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={classNames(
                'group relative min-w-0 flex-1 overflow-hidden px-4 py-4 text-center text-sm font-medium inline-flex items-center justify-center',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
              )}
            >
              <span>{tab.name}</span>
              <span
                className={classNames(
                  currentTab === tab.value ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-200/20 dark:bg-white/10 text-zinc-600 dark:text-gray-300',
                  'ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium'
                )}
              >
                {getCountByCategory(tab.value)}
              </span>

              <span
                aria-hidden="true"
                className={classNames(
                  currentTab === tab.value ? 'bg-indigo-400' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5 transition'
                )}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAll, setShowAll] = useState(false)
  const [modalProjectId, setModalProjectId] = useState(null)

  const filteredProjects =
    selectedCategory === 'all'
      ? projectsData
      : projectsData.filter((project) => project.type === selectedCategory)

  // order by release date (newest first) for navigation
  const orderedFilteredIds = filteredProjects
    .slice()
    .sort((a, b) => +new Date(b.releaseDate) - +new Date(a.releaseDate))
    .map((p) => p.id)

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6)

  return (
    <SimpleLayout
      title="Projects, Experiments & Technical Explorations"
      intro="This section showcases projects I have developed to expand. It includes playable experiences, technical prototypes, and production-ready systems, with GitHub repositories available to explore implementation details, gameplay mechanics, and architectural decisions."
    >
      <Section onFilterChange={setSelectedCategory} />
      <p className="mb-10 mt-6 text-sm text-center text-zinc-600 dark:text-zinc-400">
        Explore my projects by area of expertise: video games, web applications, and developer tools.
      </p>

      <div className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={() => setModalProjectId(project.id)}
          />
        ))}
      </div>

      {filteredProjects.length > 6 && !showAll && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center rounded-md bg-indigo-500/20 px-3.5 py-2.5 text-sm font-semibold text-indigo-400 hover:bg-indigo-500/30"
          >
            Show All Projects
          </button>
        </div>
      )}

      {modalProjectId && (
        <ProjectModal
          projectId={modalProjectId}
          onClose={() => setModalProjectId(null)}
          onNavigate={(id) => setModalProjectId(id)}
          allProjectIds={orderedFilteredIds}
        />
      )}
    </SimpleLayout>
  )
}

function truncateWords(text, maxWords = 5) {
  if (!text) return ''
  const words = text.split(/\s+/).filter(Boolean)
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '...'
}

function ProjectCard({ project, onOpen }) {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    let mounted = true
    fetch(`/projects/${project.id}.json`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed')
        return r.json()
      })
      .then((d) => mounted && setDetails(d))
      .catch(() => {
        if (mounted) setDetails(null)
      })
    return () => {
      mounted = false
    }
  }, [project.id])

  const thumb = details?.thumbnail?.src || project.thumbnail
  const title = details?.title || details?.name || project.name
  const date = details?.date || ''
  const shortDesc = details?.shortDescription || project.shortDescription || ''
  const truncated = truncateWords(shortDesc, 5)

  return (
    <article className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-6 pb-6 pt-56 sm:pt-36 lg:pt-36 min-h-[256px] bg-zinc-900/5 dark:bg-zinc-900">
      {/* background image */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
        <Image
          src={thumb}
          alt={title}
          fill
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
      </div>

      {/* title + description */}
      <div className="relative z-10 mt-auto transform-gpu transition-all duration-300 group-hover:-translate-y-16">
        <h3 className="text-2xl font-semibold text-white">
          {title}
        </h3>
        <p className="mt-2 max-w-xs text-sm text-white/80">
          <span className="inline-block group-hover:hidden">{truncated}</span>
          <span className="hidden group-hover:inline">{shortDesc}</span>
        </p>
      </div>

      {/* See project button */}
      <div className="absolute inset-x-0 bottom-6 z-10 px-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          onClick={onOpen}
          className="pointer-events-none group-hover:pointer-events-auto inline-flex w-full items-center justify-center rounded-md bg-white/90 px-4 py-2 text-sm font-medium text-zinc-900 shadow-lg dark:bg-white/10 dark:text-white"
          rel="noopener noreferrer"
        >
          See project
        </button>
      </div>
    </article>
  )
}