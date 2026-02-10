'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { skillsData as defaultSkillsData } from '@/lib/profile'

function SkillCard({ name, icon }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-lg bg-zinc-50 px-4 py-3 transition-all duration-300 hover:scale-105 hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 lg:justify-start">
      <div className="relative h-8 w-8 flex-shrink-0">
        <Image
          src={icon}
          alt={`${name} logo`}
          fill
          className="object-contain"
        />
      </div>
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {name}
      </span>
    </div>
  )
}

function CategorySection({ category, emoji, skills }) {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        <span>{emoji}</span>
        {category}
      </h3>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {skills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  )
}

export function SkillsSection({
  title = 'Skills & Technologies',
  description,
  skillsData = defaultSkillsData,
  className,
}) {
  // Split categories into two columns for larger screens
  const midpoint = Math.ceil(skillsData.length / 2)
  const leftColumn = skillsData.slice(0, midpoint)
  const rightColumn = skillsData.slice(midpoint)

  return (
    <section className={clsx('w-full', className)}>
      {title && (
        <div className="flex items-center pb-5">
          <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
          <span className="shrink-0 px-4 text-2xl font-semibold text-gray-900 dark:text-white">
            {title}
          </span>
          <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
        </div>
      )}
      
      {description && (
        <p className="mb-8 text-base text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Left Column */}
        <div className="space-y-10">
          {leftColumn.map((categoryData) => (
            <CategorySection key={categoryData.category} {...categoryData} />
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {rightColumn.map((categoryData) => (
            <CategorySection key={categoryData.category} {...categoryData} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
