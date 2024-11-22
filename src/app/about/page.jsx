import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
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
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
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
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800 transition-opacity duration-500"/>
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
          Anas Figuigui, développeur backend spécialisé dans `&apos;`architecture MACH.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
            J’ai construit mon parcours autour d’une quête constante d’évolution et de perfectionnement dans des domaines clés tels que le développement web, le jeu vidéo, et les solutions d’architecture cloud. Actuellement en cours d’obtention d’une <b>Licence professionnelle en Génie Informatique</b> à l’Université Internationale de Rabat en formation continue, je suis également titulaire d’un diplôme de <b>Technicien Spécialisé en Développement Web Full Stack</b> de l’Institut de Technologie Appliquée.
            </p>
            <p>
            Parallèlement à mon expertise en développement web, je cultive depuis toujours une passion profonde pour la création de jeux vidéo. Cet intérêt, ancré depuis mon enfance, m’a conduit à concevoir des applications ludiques durant mon temps libre, renforçant ainsi ma maîtrise des outils et technologies de développement.
            </p>
            <p>
            En outre, je m’investis activement dans un programme intensif de formation dispensé par ALX, grâce auquel j’ai obtenu la certification <b>AWS Cloud Practitioner</b> et me prépare actuellement à la certification <b>AWS Solutions Architect.</b>            </p>
            <p>
            Curieux et dynamique, j’aspire à relever des défis stimulants tout en continuant à développer mes compétences dans des environnements innovants.            </p>
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
    </Container>
  )
}
