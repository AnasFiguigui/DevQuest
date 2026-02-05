'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { SimpleLayout } from '@/components/SimpleLayout'
import LISC from '@/images/photos/Games/LISC-1.jpg'
import Eden from '@/images/photos/Games/Eden-1.jpg'
import QL from '@/images/photos/Games/Qarn-Laroub-1.jpg'
import Snake from '@/images/photos/Games/Snake-1.jpg'
import Tower from '@/images/photos/Games/Tower-1.jpg'

const projects = [
  {
    name: 'Lost In Sala Colonia',
    description: 'Une revisite moderne du classique Snake',
    link: { href: 'https://github.com/AnasFiguigui/snake', label: 'github.com/snake' },
    imageUrl: LISC.src,
    type: 'games',
  },
  {
    name: 'Eden',
    description: "Un défi d'empilement en 3D",
    link: { href: 'https://github.com/AnasFiguigui/Stacking-tower', label: 'github.com/Stacking-tower' },
    imageUrl: Eden.src,
    type: 'games',
  },
  {
    name: 'Project 75',
    description: 'Une adaptation numérique du célèbre jeu de cartes',
    link: { href: 'https://github.com/AnasFiguigui/Uno-clone', label: 'github.com/Uno-clone' },
    imageUrl: QL.src,
    type: 'games',
  },
  {
    name: 'Snake',
    description: 'Un jeu éducatif fusionnant technologies et créativité.',
    link: { href: 'https://github.com/AnasFiguigui/DevMerge', label: 'github.com/DevMerge' },
    imageUrl: Snake.src,
    type: 'games',
  },
  {
    name: 'Stacking tower',
    description: 'Un jeu 3D de tir immersif dans un monde envahi par les zombies.',
    link: { href: 'https://github.com/AnasFiguigui/Apocalypse-Z', label: 'github.com/Apocalypse-Z' },
    imageUrl: Tower.src,
    type: 'games',
  },
    {
    name: 'Stacking tower',
    description: 'Un jeu 3D de tir immersif dans un monde envahi par les zombies.',
    link: { href: 'https://github.com/AnasFiguigui/Apocalypse-Z', label: 'github.com/Apocalypse-Z' },
    imageUrl: Tower.src,
    type: 'games',
  },
    {
    name: 'Stacking tower',
    description: 'Un jeu 3D de tir immersif dans un monde envahi par les zombies.',
    link: { href: 'https://github.com/AnasFiguigui/Apocalypse-Z', label: 'github.com/Apocalypse-Z' },
    imageUrl: Tower.src,
    type: 'games',
  },
    {
    name: 'Stacking tower',
    description: 'Un jeu 3D de tir immersif dans un monde envahi par les zombies.',
    link: { href: 'https://github.com/AnasFiguigui/Apocalypse-Z', label: 'github.com/Apocalypse-Z' },
    imageUrl: Tower.src,
    type: 'games',
  },
    {
    name: 'Stacking tower',
    description: 'Un jeu 3D de tir immersif dans un monde envahi par les zombies.',
    link: { href: 'https://github.com/AnasFiguigui/Apocalypse-Z', label: 'github.com/Apocalypse-Z' },
    imageUrl: Tower.src,
    type: 'games',
  },
    {
    name: 'Stacking tower',
    description: 'Un jeu 3D de tir immersif dans un monde envahi par les zombies.',
    link: { href: 'https://github.com/AnasFiguigui/Apocalypse-Z', label: 'github.com/Apocalypse-Z' },
    imageUrl: Tower.src,
    type: 'games',
  },
]

const tabs = [
  { name: 'All Projects', value: 'all' },
  { name: 'Games', value: 'games' },
  { name: 'Websites', value: 'websites' },
  { name: 'Mods', value: 'mods' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function getCountByCategory(category) {
  if (category === 'all') return projects.length
  return projects.filter((project) => project.type === category).length
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
                  currentTab === tab.value ? 'bg-purple-500/20 text-purple-400' : 'bg-zinc-200/20 dark:bg-white/10 text-zinc-600 dark:text-gray-300',
                  'ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium'
                )}
              >
                {getCountByCategory(tab.value)}
              </span>

              <span
                aria-hidden="true"
                className={classNames(
                  currentTab === tab.value ? 'bg-purple-400' : 'bg-transparent',
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

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.type === selectedCategory)

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
          <project
            key={project.name}
            className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-6 pb-6 pt-48 sm:pt-36 lg:pt-36 bg-zinc-900/5 dark:bg-zinc-900"
          >
            {/* background image */}
            <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
              <img
                src={project.imageUrl}
                alt={project.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
            </div>

            {/* info row (small meta) */}
            <div className="flex flex-wrap items-center gap-y-1 text-sm text-white/70">
              {/* placeholder for future meta if needed */}
            </div>

            {/* title + description */}
            <div className="relative z-10 transform-gpu transition-all duration-300 group-hover:-translate-y-16">
              <h3 className="text-2xl font-semibold text-white">
                {project.name}
              </h3>
              <p className="mt-2 max-w-xs text-sm text-white/80">
                {project.description}
              </p>
            </div>

            {/* See project button */}
            <div className="absolute inset-x-0 bottom-6 z-10 px-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Link
                href={project.link.href}
                className="pointer-events-none group-hover:pointer-events-auto inline-flex w-full items-center justify-center rounded-md bg-white/90 px-4 py-2 text-sm font-medium text-zinc-900 shadow-lg dark:bg-white/10 dark:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                See project
              </Link>
            </div>
          </project>
        ))}
      </div>

      {filteredProjects.length > 6 && !showAll && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-purple-700 transition-colors"
          >
            Show All Projects
          </button>
        </div>
      )}
    </SimpleLayout>
  )
}