import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { EducationTimeline } from '@/components/EducationTimeline'
import Carousel3D from '@/components/Carousel3D'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import hoverImage from '@/images/portrait22.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-indigo-400 dark:text-zinc-200 dark:hover:text-indigo-400"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:text-indigo-500" />
        <span className="ml-4">{children}</span>
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
  const educationItems = [
    {
      date: 'Jan 2025 - Oct 2025',
      title: 'Video game creator',
      institution: 'ISART DIGITAL',
      description: 'Certified in Video Game Creation, covering game design, programming, and production pipelines.',
    },
    {
      date: 'May 2024',
      title: 'AWS Cloud Solution Architect Certification',
      institution: 'Amazon Web Services',
      description: 'Professional certification in cloud architecture',
    },
    {
      date: 'Dec 2023 - Nov 2024',
      title: 'Bachelors degree, Computer Engineering',
      institution: 'International University of Rabat',
      description: 'Graduated in Computer Engineering with a focus on software development, cloud architecture, and AI applications.',
    },
    {
      date: 'Sep 2021 - Jul 2023',
      title: 'Digital Developpement option Web Full Stack',
      institution: 'Specialized Institute Of Applied Technology NTIC',
      description: 'Completed a comprehensive program in web development, covering both frontend and backend technologies, with a focus on modern frameworks and best practices.',
    },
  ]

  // Favorite games images
  const favoriteGames = [
    '/images/photos/FavGames/arc.avif',
    '/images/photos/FavGames/bdo.avif',
    '/images/photos/FavGames/crimson.avif',
    '/images/photos/FavGames/d3.avif',
    '/images/photos/FavGames/diablo2.avif',
    '/images/photos/FavGames/diablo4.avif',
    '/images/photos/FavGames/hades2.avif',
    '/images/photos/FavGames/khazan.avif',
    '/images/photos/FavGames/minecraft.avif',
    '/images/photos/FavGames/poe.avif',
    '/images/photos/FavGames/witcher3.avif',
  ]

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
            Anas Figuigui, Game & Backend Developer specializing in MACH architecture
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I am a Game and backend engineer with a strong background in cloud-based architectures and interactive experiences. I specialize in designing and implementing gameplay systems, immersive worlds, and scalable backend solutions using Unity, Unreal Engine, and modern cloud technologies.
            </p>
            <p>
              My recent work includes leading the development of a horror game set in a Moroccan location featuring zombies, where I oversaw gameplay systems, technical direction, and team collaboration while contributing to level design and atmosphere creation.
            </p>
            <p>
              Alongside game development, I continue to deepen my expertise in cloud and backend technologies, having earned the <b>AWS Cloud Solution Architect</b> certification.
            </p>
            <p>
              Driven, curious, and hands-on, I enjoy tackling challenging projects, blending technical rigor with creative vision, and building engaging experiences that leave a lasting impact.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/_AnasFiguigui" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href="https://www.instagram.com/anasfiguigui/" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/anas-figuigui/" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink href="https://github.com/AnasFiguigui" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="mailto:anas.production.af@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              anas.production.af@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>

      {/* Education Timeline Section */}
      <div className="mt-24 sm:mt-32">
        <EducationTimeline title="Education & Certifications" items={educationItems} />
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
