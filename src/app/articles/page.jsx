import Link from 'next/link'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function Article({ article }) {
  return (
    <article className="group relative md:grid md:grid-cols-4 md:items-baseline">
      {/* Hover background that covers the entire article including date */}
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-80 bg-zinc-50 opacity-0 transition group-hover:scale-80 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
      
      {/* Clickable overlay */}
      <Link href={`/articles/${article.slug}`} className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
      
      {/* Card content - left columns */}
      <Card className="md:col-span-3">
        <Card.Title as="h2">
          <span className="relative z-10">{article.title}</span>
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      
      {/* Desktop date - right column */}
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="relative z-10 mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata = {
  title: 'DevQuest.',
  description:
    'A space where I document my development journey.',
}

export default async function ArticlesIndex() {
  let articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Dev Journal"
      intro="Explore my development journey through detailed dev logs, project breakdowns, events, and behind-the-scenes insights. A space where I document my progress, experiments, challenges, and lessons learned as a game and web developer."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
