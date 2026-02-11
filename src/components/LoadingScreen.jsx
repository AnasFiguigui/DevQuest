'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

// Critical assets to preload
const PRELOAD_IMAGES = [
  '/images/photos/image-1.webp',
  '/images/photos/image-2.webp',
  '/images/photos/image-3.webp',
  '/images/photos/image-4.webp',
  '/images/photos/image-5.webp',
]

const PRELOAD_PROJECTS = [
  '/projects/lost-in-sala-colonia.json',
  '/projects/eden.json',
  '/projects/project-75.json',
]

export function LoadingScreen({ onLoadingComplete }) {
  const [animationData, setAnimationData] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const loadedRef = useRef(false)

  useEffect(() => {
    // Fetch the Lottie animation JSON
    fetch('/images/photos/Loading.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true

    const preloadAssets = async () => {
      const totalAssets = PRELOAD_IMAGES.length + PRELOAD_PROJECTS.length
      let loadedCount = 0
      const startTime = Date.now()
      const MIN_LOADING_TIME = 2500

      const updateProgress = () => {
        loadedCount++
        setProgress(Math.round((loadedCount / totalAssets) * 100))
      }

      // Preload images
      const imagePromises = PRELOAD_IMAGES.map((src) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => {
            updateProgress()
            resolve()
          }
          img.onerror = () => {
            updateProgress()
            resolve()
          }
          img.src = src
        })
      })

      // Preload project JSON data
      const projectPromises = PRELOAD_PROJECTS.map((url) => {
        return fetch(url)
          .then((res) => res.json())
          .then(() => updateProgress())
          .catch(() => updateProgress())
      })

      // Wait for all assets to load
      await Promise.all([...imagePromises, ...projectPromises])

      // Wait for minimum loading time (2500ms total)
      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed)
      await new Promise((resolve) => setTimeout(resolve, remainingTime))

      // Start exit animation
      setIsExiting(true)

      // Wait for exit animation then complete
      setTimeout(() => {
        sessionStorage.setItem('hasLoadedOnce', 'true')
        onLoadingComplete()
      }, 700)
    }

    preloadAssets()
  }, [onLoadingComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Lottie Animation */}
      <div className="w-48 h-48 sm:w-64 sm:h-64">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          // Fallback spinner while loading animation JSON
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Loading text */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-medium text-white tracking-wider animate-pulse">
          Loading...
        </p>
        
        {/* Progress bar */}
        <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-400/90 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm text-zinc-500">{progress}%</p>
      </div>
    </div>
  )
}

export default LoadingScreen
