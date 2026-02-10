'use client'

import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'
import clsx from 'clsx'
import LoadingScreen from '@/components/LoadingScreen'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      let systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export const AppContext = createContext({})

export function Providers({ children }) {
  let pathname = usePathname()
  let previousPathname = usePrevious(pathname)
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasLoadedOnce = sessionStorage.getItem('hasLoadedOnce')
    if (hasLoadedOnce) {
      setIsLoading(false)
    }
    setIsReady(true)
  }, [])

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ previousPathname }), [previousPathname])

  // Don't render anything until we've checked sessionStorage
  if (!isReady) {
    return <div className="fixed inset-0 bg-black" />
  }

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeWatcher />
        {isLoading && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
        <div className={clsx('flex w-full', isLoading ? 'invisible' : 'visible')}>
          {children}
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  )
}
