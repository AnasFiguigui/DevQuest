import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { EducationTimeline } from '@/components/EducationTimeline'
import { SkillsSection } from '@/components/SkillsSection'
import Carousel3D from '@/components/Carousel3D'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import hoverImage from '@/images/portrait22.jpg'
import {
  personalInfo,
  socialLinks,
  interests,
  getTimelineEducation,
  favoriteGames,
} from '@/lib/profile'

// Icon map for social links
const iconMap = {
  XIcon,
  InstagramIcon,
  LinkedInIcon,
  GitHubIcon,
}

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-indigo-400 dark:text-zinc-200 dark:hover:text-indigo-400"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:text-indigo-500" />
        <span className="ml-4 hidden sm:inline">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata = {
  title: 'About',
  description:
    'Anas Figuigui, développeur backend spécialisé dans l\'architecture MACH.',
}

export default function About() {
  // Get education data from profile
  const educationItems = getTimelineEducation()

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <div className="relative">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800 transition-opacity duration-500"
              />
              <Image
                src={hoverImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="absolute top-0 left-0 aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800 opacity-0 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {personalInfo.aboutHeadline}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            {personalInfo.longDescription.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>

          {/* Interests Badges */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest.id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  <span>{interest.emoji}</span>
                  {interest.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul className="flex flex-wrap gap-4 sm:block">
            {socialLinks.map((link, index) => (
              <SocialLink
                key={link.id}
                href={link.href}
                icon={iconMap[link.icon]}
                className={index > 0 ? 'sm:mt-4' : ''}
              >
                {link.label}
              </SocialLink>
            ))}
          </ul>
          <Link
            href={`mailto:${personalInfo.email}`}
            className="group mt-8 flex items-center gap-4 border-t border-zinc-100 pt-8 text-sm font-medium text-zinc-800 transition hover:text-indigo-400 dark:border-zinc-700/40 dark:text-zinc-200 dark:hover:text-indigo-400"
          >
            <MailIcon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:text-indigo-500" />
            <span>{personalInfo.email}</span>
          </Link>
        </div>
      </div>

      {/* Education Timeline Section */}
      <div className="mt-24 sm:mt-32">
        <EducationTimeline title="Education & Certifications" items={educationItems} />
      </div>

      {/* Skills Section */}
      <div className="mt-24 sm:mt-32">
        <SkillsSection 
          title="Skills & Technologies"
          description="A collection of languages, frameworks, and tools I've worked with throughout my career."
        />
      </div>

      {/* Favorite Games Carousel Section */}
      <div className="mt-24 sm:mt-32">
        <div className="flex items-center pb-5">
          <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
          <span className="shrink-0 px-4 text-gray-900 dark:text-white font-semibold text-2xl">
            Favorite games
          </span>
          <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-8">
          Gaming has always driven my creativity, shaping how I design games and interactive experiences. Here are some titles that inspired me.
        </p>


        
        <Carousel3D 
          images={favoriteGames} 
          autoPlay={true}
          autoPlaySpeed={2000}
          aspectRatio="4/5"
        />
      </div>
    </Container>
  )
}
