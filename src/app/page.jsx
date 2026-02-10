import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'

import PhotosGallery from '@/components/Photos'
import { Contact } from '@/components/Contact'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from '@/components/SocialIcons'
import logoIsart from '@/images/logos/isart.svg'
import logoOfppt from '@/images/logos/ofppt.svg'
import logoUir from '@/images/logos/uir.svg'
import logoUm5s from '@/images/logos/um5s.svg'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import {
  personalInfo,
  socialLinks,
  getResumeEducation,
  getTimelineEducation,
  homePhotos,
  getAllStats,
} from '@/lib/profile'
import { RecentProjects } from '@/components/RecentProjects'
import { EducationTimeline } from '@/components/EducationTimeline'

// Logo map for dynamic resolution
const logoMap = {
  isart: logoIsart,
  ofppt: logoOfppt,
  uir: logoUir,
  um5s: logoUm5s,
}

// Icon map for social links
const iconMap = {
  XIcon,
  InstagramIcon,
  LinkedInIcon,
  GitHubIcon,
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StatCard({ value, label }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-zinc-100 bg-zinc-50 px-6 py-6 dark:border-zinc-700/40 dark:bg-zinc-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30">
      <span className="text-4xl font-bold text-indigo-400/90">{value}</span>
      <span className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
    </div>
  )
}

StatCard.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read documentation</Card.Cta>
    </Card>
  )
}

Article.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

SocialLink.propTypes = {
  icon: PropTypes.elementType.isRequired,
}

function Role({ role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">university</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.university}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  // Get education data from profile and resolve logos
  const resume = getResumeEducation().map(edu => ({
    ...edu,
    logo: logoMap[edu.logo] || null,
  }))

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Education & Training</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role) => (
          <Role key={`${role.university}-${role.title}`} role={role} />
        ))}
      </ol>
      <Button 
        href="/cv.pdf" 
        variant="secondary" 
        className="group mt-6 w-full" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  );
}

async function loadPhotos() {
  return homePhotos
}

function Photos({ images }) {
  const imgs = images.map((img) => ({
    src: img?.src || img,
    alt: img?.alt || '',
  }))

  return (
    <div className="mt-16 sm:mt-20">
      <PhotosGallery images={imgs} height={300} gap={25} />
    </div>
  )
}


export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)
  const photos = await loadPhotos()
  const stats = getAllStats()
  // Get education data without descriptions
  const educationItems = getTimelineEducation().map(({ date, title, institution }) => ({
    date,
    title,
    institution,
  }))

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-4xl">
          <h1 className="whitespace-pre-line text-2xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {personalInfo.titles.tagline}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {personalInfo.shortDescription}
          </p>
          <div className="mt-6 flex gap-6">
            {socialLinks.map((link) => (
              <SocialLink
                key={link.id}
                href={link.href}
                aria-label={link.label}
                icon={iconMap[link.icon]}
              />
            ))}
          </div>
        </div>
      </Container>
      <Photos images={photos} />
      
      {/* CTA Buttons and Stats */}
      <Container className="mt-16">
        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md dark:bg-zinc-700/30 bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-400 dark:hover:bg-zinc-500/30 hover:bg-zinc-300/50 transition-colors"
          >
            <MailIcon className="h-5 w-5 stroke-current" />
            Contact Me
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-indigo-500/20 px-6 py-3 text-sm font-semibold text-indigo-400 hover:bg-indigo-500/30 transition-colors"
          >
            <ArrowDownIcon className="h-5 w-5 stroke-current" />
            Download CV
          </a>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard value={stats.yearsOfExperience.replace(' years', '').replace(' year', '')} label="Years Experience" />
          <StatCard value={stats.games} label="Games Created" />
          <StatCard value={stats.websites} label="Web Apps" />
          <StatCard value={stats.modsAndTools} label="Mods & Tools" />
        </div>
      </Container>

      {/* Education Timeline */}
      <Container className="mt-24">
        <EducationTimeline title="Education" items={educationItems} />
      </Container>

      {/* Recent Projects */}
      <Container className="mt-24">
        <RecentProjects />
      </Container>

      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-14">
            <div>
              <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                Latest Articles
              </h2>
            </div>
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
            <div id="contact">
              <Contact />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
