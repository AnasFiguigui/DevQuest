'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import github from '@/images/logos/github.svg'

const projects = [
    {
        name: 'Snake',
        description:
        'Une revisite moderne du classique Snake',
        link: { href: 'https://github.com/AnasFiguigui/snake', label: 'github.com/snake' },
        logo: github,
        type: 'games',
    },
    {
        name: 'Stacking tower',
        description:
        'Un défi d\'empilement en 3D',
        link: { href: 'https://github.com/AnasFiguigui/Stacking-tower', label: 'github.com/Stacking-tower' },
        logo: github,
        type: 'games',
    },
    {
        name: 'Uno clone',
        description:
        'Une adaptation numérique du célèbre jeu de cartes',
        link: { href: 'https://github.com/AnasFiguigui/Uno-clone', label: 'github.com/Uno-clone' },
        logo: github,
        type: 'games',
    },
    {
        name: 'DevMerge',
        description:
        'Un jeu éducatif fusionnant technologies et créativité.',
        link: { href: 'https://github.com/AnasFiguigui/DevMerge', label: 'github.com/DevMerge' },
        logo: github,
        type: 'games',
    },
    {
        name: 'Apocalyse Z',
        description:
        'Un jeu 3D de tir immersif dans un monde envahi par les zombies.',
        link: { href: 'https://github.com/AnasFiguigui/Apocalypse-Z', label: 'github.com/Apocalypse-Z' },
        logo: github,
        type: 'games',
    },
]

const tabs = [
  { name: 'All Projects', href: '#', current: true, value: 'all' },
  { name: 'Games', href: '#', current: false, value: 'games' },
  { name: 'Websites', href: '#', current: false, value: 'websites' },
  { name: 'Mods', href: '#', current: false, value: 'mods' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function getCountByCategory(category) {
  if (category === 'all') return projects.length
  return projects.filter(project => project.type === category).length
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
            <option key={tab.name} value={tab.value}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav aria-label="Tabs" className="isolate flex divide-x divide-zinc-200 rounded-lg bg-zinc-50 shadow dark:divide-zinc-700 dark:bg-zinc-800">
          {tabs.map((tab, tabIdx) => (
            <button
              key={tab.name}
              onClick={() => handleTabChange(tab.value)}
              aria-current={currentTab === tab.value ? 'page' : undefined}
              className={classNames(
                currentTab === tab.value ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden px-4 py-4 text-center text-sm font-medium hover:bg-zinc-100 focus:z-10 dark:hover:bg-zinc-700 inline-flex items-center justify-center',
              )}
            >
              <span>{tab.name}</span>
              <span
                className={classNames(
                  currentTab === tab.value ? 'bg-purple-500/20 text-purple-400' : 'bg-zinc-200/20 dark:bg-white/10 text-zinc-600 dark:text-gray-300',
                  'ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium',
                )}
              >
                {getCountByCategory(tab.value)}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.type === selectedCategory)

  return (
    <SimpleLayout
      title="Mises en pratique et explorations techniques"
      intro="Cette section regroupe les projets que j'ai réalisés pour approfondir mes compétences en développement de jeux vidéo et d'applications web. Vous y trouverez des dépôts GitHub pour explorer le code, tester les fonctionnalités, et comprendre les concepts techniques appliqués."
    >
      <Section onFilterChange={setSelectedCategory} />
      <p className="mb-10 mt-6 text-sm text-center text-zinc-600 dark:text-zinc-400">
        Explore my projects by area of expertise: video games, web applications, and developer tools.
      </p>
      <ul
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 mt-8"
      >
        {filteredProjects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-purple-400 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}