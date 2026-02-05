import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllProjects } from '@/lib/projects'
import { formatDate } from '@/lib/formatDate'

function Project({ project }) {
  return (
    <project className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/projects/${project.slug}`}>
          {project.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={project.date}
          className="md:hidden"
          decorate
        >
          {formatDate(project.date)}
        </Card.Eyebrow>
        <Card.Description>{project.description}</Card.Description>
        <Card.Cta>Read project</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={project.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(project.date)}
      </Card.Eyebrow>
    </project>
  )
}

export const metadata = {
  title: 'Projects',
  description:
    'Découvrez des analyses approfondies sur la conception de jeux vidéo, les mécaniques de gameplay et les technologies utilisées. Une ressource idéale pour explorer les aspects techniques et créatifs de chaque réalisation.',
}

export default async function ProjectsIndex() {
  let projects = await getAllProjects()

  return (
    <SimpleLayout
      title="Retrouvez ici les présentations techniques et les explications détaillées de mes projets."
      intro="Découvrez des analyses approfondies sur la conception de jeux vidéo, les mécaniques de gameplay et les technologies utilisées. Une ressource idéale pour explorer les aspects techniques et créatifs de chaque réalisation."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {projects.map((project) => (
            <Project key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
