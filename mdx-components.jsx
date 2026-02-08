import Image from 'next/image'
import Link from 'next/link'
import { ImageLightbox } from '@/components/ImageLightbox'
import { ArticleVideo } from '@/components/ArticleVideo'
import Carousel3D from '@/components/Carousel3D'

export function useMDXComponents(components) {
  return {
    ...components,
    // Standard Next.js Image
    Image: (props) => <Image {...props} />,
    // Clickable image with lightbox
    ImageLightbox,
    // Video component
    ArticleVideo,
    // 3D Carousel
    Carousel3D,
    // Custom link component
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http')
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
            {...props}
          >
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300" {...props}>
          {children}
        </Link>
      )
    },
  }
}

