'use client'

import Image from 'next/image'
import clsx from 'clsx'

// Default skills data
const defaultSkillsData = [
  {
    category: 'Languages',
    emoji: '🧠',
    skills: [
      { name: 'C++', icon: '/images/technologies/c-plusplus.svg' },
      { name: 'C#', icon: '/images/technologies/c-sharp.svg' },
      { name: 'Java', icon: '/images/technologies/java.svg' },
      { name: 'PHP', icon: '/images/technologies/php.svg' },
      { name: 'JavaScript', icon: '/images/technologies/javascript.svg' },
      { name: 'TypeScript', icon: '/images/technologies/typescript.svg' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    emoji: '🏗️',
    skills: [
      { name: 'React', icon: '/images/technologies/react.svg' },
      { name: 'Next.js', icon: '/images/technologies/nextjs.svg' },
      { name: 'Express', icon: '/images/technologies/express.svg' },
      { name: 'Laravel', icon: '/images/technologies/laravel.svg' },
      { name: 'Redux', icon: '/images/technologies/redux.svg' },
      { name: 'Tailwind CSS', icon: '/images/technologies/tailwindcss.svg' },
    ],
  },
  {
    category: 'Databases',
    emoji: '🗄️',
    skills: [
      { name: 'MongoDB', icon: '/images/technologies/mongodb.svg' },
      { name: 'MySQL', icon: '/images/technologies/mysql.svg' },
      { name: 'Redis', icon: '/images/technologies/redis.svg' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    emoji: '☁️',
    skills: [
      { name: 'AWS', icon: '/images/technologies/aws.svg' },
      { name: 'Docker', icon: '/images/technologies/docker.svg' },
      { name: 'Kubernetes', icon: '/images/technologies/kubernetes.svg' },
      { name: 'Jenkins', icon: '/images/technologies/jenkins.svg' },
      { name: 'Terraform', icon: '/images/technologies/terraform.svg' },
      { name: 'Vercel', icon: '/images/technologies/vercel.svg' },
      { name: 'GitHub', icon: '/images/technologies/github.svg' },
      { name: 'Spark', icon: '/images/technologies/spark.svg' },
      { name: 'Hadoop', icon: '/images/technologies/hadoop.svg' },
    ],
  },
  {
    category: 'Game Development',
    emoji: '🎮',
    skills: [
      { name: 'Unity', icon: '/images/technologies/unity.svg' },
      { name: 'Unreal Engine', icon: '/images/technologies/Unreal.svg' },
    ],
  },
  {
    category: 'Tools & Software',
    emoji: '🛠️',
    skills: [
      { name: 'Photoshop', icon: '/images/technologies/photoshop.svg' },
      { name: 'Postman', icon: '/images/technologies/postman.svg' },
      { name: 'Jira', icon: '/images/technologies/jira.svg' },
      { name: 'WordPress', icon: '/images/technologies/wordpress.svg' },
      { name: 'Excel', icon: '/images/technologies/excel.svg' },
      { name: 'Kafka', icon: '/images/technologies/kafka.svg' },
    ],
  },
]

function SkillCard({ name, icon }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-lg bg-zinc-50 px-4 py-3 transition-all hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 lg:justify-start">
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
