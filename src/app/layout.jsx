import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - Anas Figuigui',
    default:
      'Anas Figuigui - Junior Back-end developer MACH architecture',
  },
  description:
    'Anas Figuigui, développeur backend spécialisé dans l\'architecture MACH.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" async></script>
      </head>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
