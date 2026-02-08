'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import './Carousel3D.css'

// Physics constants
const FRICTION = 0.95
const DRAG_SENS = 1

// Visual constants
const MAX_ROTATION = 30
const MAX_DEPTH = 150
const MIN_SCALE = 0.90
const SCALE_RANGE = 0.1
const GAP = 25
const SKELETON_COUNT = 7
const SKELETON_STEP = 215

export default function Carousel3D({ images, autoPlay = true, autoPlaySpeed = 50, aspectRatio = '3/4' }) {
  const stageRef = useRef(null)

Carousel3D.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  autoPlay: PropTypes.bool,
  autoPlaySpeed: PropTypes.number,
  aspectRatio: PropTypes.string,
}
  const cardsRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Animation state refs
  const itemsRef = useRef([])
  const positionsRef = useRef(null)
  const rafIdRef = useRef(null)
  const lastTimeRef = useRef(0)
  const isEnteringRef = useRef(true)
  
  // Layout refs
  const cardWRef = useRef(180)
  const cardHRef = useRef(240)
  const stepRef = useRef(195)
  const trackRef = useRef(0)
  const scrollXRef = useRef(0)
  const vwHalfRef = useRef(0)
  
  // Physics refs
  const vXRef = useRef(0)
  
  // Drag state refs
  const draggingRef = useRef(false)
  const lastXRef = useRef(0)
  const lastTRef = useRef(0)
  const lastDeltaRef = useRef(0)
  
  // Auto-play refs
  const pauseAutoPlayRef = useRef(false)

  // Utility: Safe modulo for negative numbers
  const mod = useCallback((n, m) => ((n % m) + m) % m, [])

  // Calculate transform components
  const computeTransformComponents = useCallback((screenX) => {
    const norm = Math.max(-1, Math.min(1, screenX / vwHalfRef.current))
    const absNorm = Math.abs(norm)
    const invNorm = 1 - absNorm

    const ry = -norm * MAX_ROTATION
    const tz = invNorm * MAX_DEPTH
    const scale = MIN_SCALE + invNorm * SCALE_RANGE

    return { norm, absNorm, invNorm, ry, tz, scale }
  }, [])

  // Calculate 3D transform
  const transformForScreenX = useCallback((screenX) => {
    const { ry, tz, scale } = computeTransformComponents(screenX)

    return {
      transform: `translate3d(${screenX}px,-50%,${tz}px) rotateY(${ry}deg) scale(${scale})`,
      z: tz,
    }
  }, [computeTransformComponents])

  // Update carousel transforms
  const updateCarouselTransforms = useCallback(() => {
    const items = itemsRef.current
    const positions = positionsRef.current
    if (!items.length || !positions) return

    const half = trackRef.current / 2
    let closestIdx = -1
    let closestDist = Infinity

    // Calculate wrapped positions
    for (let i = 0; i < items.length; i++) {
      let pos = items[i].x - scrollXRef.current
      
      if (pos < -half) pos += trackRef.current
      if (pos > half) pos -= trackRef.current
      
      positions[i] = pos

      const dist = Math.abs(pos)
      if (dist < closestDist) {
        closestDist = dist
        closestIdx = i
      }
    }

    // Get adjacent cards
    const prevIdx = (closestIdx - 1 + items.length) % items.length
    const nextIdx = (closestIdx + 1) % items.length

    // Apply transforms
    for (let i = 0; i < items.length; i++) {
      const it = items[i]
      const pos = positions[i]
      const norm = Math.max(-1, Math.min(1, pos / vwHalfRef.current))
      const { transform, z } = transformForScreenX(pos)

      it.el.style.transform = transform
      it.el.style.zIndex = String(1000 + Math.round(z))

      // Apply blur to non-core cards
      const isCore = i === closestIdx || i === prevIdx || i === nextIdx
      const blur = isCore ? 0 : 2 * Math.pow(Math.abs(norm), 1.1)
      it.el.style.filter = `blur(${blur.toFixed(2)}px)`
    }
  }, [transformForScreenX])

  // Start carousel
  const startCarousel = useCallback(() => {
    // Animation loop with smooth continuous movement
    const tick = (t) => {
      const dt = lastTimeRef.current ? (t - lastTimeRef.current) / 1000 : 0.016
      lastTimeRef.current = t

      // Apply constant velocity for auto-play (reversed direction - positive value)
      if (autoPlay && !pauseAutoPlayRef.current && !draggingRef.current && !isEnteringRef.current) {
        vXRef.current = 60 // Reversed: positive = scroll right to left
      }

      scrollXRef.current = mod(scrollXRef.current + vXRef.current * dt, trackRef.current)

      // Only apply friction when not auto-playing
      if (pauseAutoPlayRef.current || draggingRef.current) {
        const decay = Math.pow(FRICTION, dt * 60)
        vXRef.current *= decay
        if (Math.abs(vXRef.current) < 0.02) vXRef.current = 0
      }

      updateCarouselTransforms()
      rafIdRef.current = requestAnimationFrame(tick)
    }

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    lastTimeRef.current = 0
    rafIdRef.current = requestAnimationFrame((t) => {
      updateCarouselTransforms()
      tick(t)
    })
  }, [mod, updateCarouselTransforms, autoPlay])

  // Measure card dimensions (use offsetWidth to avoid scale transform affecting measurement)
  const measure = useCallback(() => {
    const items = itemsRef.current
    const sample = items[0]?.el
    if (!sample) return

    // Responsive gap: smaller on mobile
    const vw = window.innerWidth
    const gap = getResponsiveGap(vw)

    // offsetWidth gives the unscaled CSS width, unlike getBoundingClientRect
    cardWRef.current = sample.offsetWidth || cardWRef.current
    cardHRef.current = sample.offsetHeight || cardHRef.current
    stepRef.current = cardWRef.current + gap
    trackRef.current = items.length * stepRef.current

    items.forEach((it, i) => {
      it.x = i * stepRef.current
    })

    positionsRef.current = new Float32Array(items.length)
  }, [])

  // Helper function to calculate responsive gap
  const getResponsiveGap = (vw) => {
    if (vw <= 480) return 10
    if (vw <= 768) return 15
    return GAP
  }

  // Initialize carousel
  useEffect(() => {
    if (!images?.length) return

    const stage = stageRef.current
    const cardsRoot = cardsRef.current
    if (!stage || !cardsRoot) return

    // Create items array
    const cardElements = Array.from(cardsRoot.querySelectorAll('.card'))
    itemsRef.current = cardElements.map((el, i) => ({
      el,
      x: i * stepRef.current
    }))

    vwHalfRef.current = window.innerWidth * 0.5
    
    // Measure and start
    const init = async () => {
      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 100))
      
      measure()
      updateCarouselTransforms()

      // Initial animation with GSAP if available
      if (globalThis.gsap) {
        const items = itemsRef.current
        const visibleCards = []
        const viewportWidth = window.innerWidth
        const half = trackRef.current / 2

        for (let i = 0; i < items.length; i++) {
          let pos = items[i].x - scrollXRef.current
          if (pos < -half) pos += trackRef.current
          if (pos > half) pos -= trackRef.current

          const screenX = pos
          if (Math.abs(screenX) < viewportWidth * 0.6) {
            visibleCards.push({ item: items[i], screenX, index: i })
          }
        }

        visibleCards.sort((a, b) => a.screenX - b.screenX)

        await new Promise(r => requestAnimationFrame(r))

        const tl = globalThis.gsap.timeline()

        visibleCards.forEach(({ item, screenX }, idx) => {
          const state = { p: 0 }
          const { ry, tz, scale: baseScale } = computeTransformComponents(screenX)

          const START_SCALE = 0.92
          const START_Y = 40

          item.el.style.opacity = '0'
          item.el.style.transform =
            `translate3d(${screenX}px,-50%,${tz}px) ` +
            `rotateY(${ry}deg) ` +
            `scale(${START_SCALE}) ` +
            `translateY(${START_Y}px)`

          tl.to(
            state,
            {
              p: 1,
              duration: 0.6,
              ease: 'power3.out',
              onUpdate: () => {
                const t = state.p
                const currentScale = START_SCALE + (baseScale - START_SCALE) * t
                const currentY = START_Y * (1 - t)
                const opacity = t

                item.el.style.opacity = opacity.toFixed(3)

                if (t >= 0.999) {
                  const { transform } = transformForScreenX(screenX)
                  item.el.style.transform = transform
                } else {
                  item.el.style.transform =
                    `translate3d(${screenX}px,-50%,${tz}px) ` +
                    `rotateY(${ry}deg) ` +
                    `scale(${currentScale}) ` +
                    `translateY(${currentY}px)`
                }
              },
            },
            idx * 0.05
          )
        })

        await new Promise(resolve => {
          tl.eventCallback('onComplete', resolve)
        })
      }

      setIsLoading(false)
      isEnteringRef.current = false
      cardsRoot.classList.add('loaded')
      startCarousel()
    }

    init()

    // Event handlers
    const handlePointerDown = (e) => {
      if (isEnteringRef.current) return
      if (e.target.closest('.frame')) return
      
      draggingRef.current = true
      pauseAutoPlayRef.current = true
      lastXRef.current = e.clientX
      lastTRef.current = performance.now()
      lastDeltaRef.current = 0
      stage.setPointerCapture(e.pointerId)
      stage.classList.add('dragging')
    }

    const handlePointerMove = (e) => {
      if (!draggingRef.current) return

      const now = performance.now()
      const dx = e.clientX - lastXRef.current
      const dt = Math.max(1, now - lastTRef.current) / 1000

      scrollXRef.current = mod(scrollXRef.current - dx * DRAG_SENS, trackRef.current)
      lastDeltaRef.current = dx / dt
      lastXRef.current = e.clientX
      lastTRef.current = now
    }

    const handlePointerUp = (e) => {
      if (!draggingRef.current) return
      draggingRef.current = false
      stage.releasePointerCapture(e.pointerId)
      vXRef.current = -lastDeltaRef.current * DRAG_SENS
      stage.classList.remove('dragging')
      
      // Resume auto-play after a delay
      setTimeout(() => {
        pauseAutoPlayRef.current = false
      }, 1000)
    }

    const handleResize = () => {
      const prevStep = stepRef.current || 1
      const ratio = scrollXRef.current / (itemsRef.current.length * prevStep)
      measure()
      vwHalfRef.current = window.innerWidth * 0.5
      scrollXRef.current = mod(ratio * trackRef.current, trackRef.current)
      updateCarouselTransforms()
    }

    let resizeTimeout
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(handleResize, 80)
    }

    const preventDefault = (e) => e.preventDefault()

    stage.addEventListener('pointerdown', handlePointerDown)
    stage.addEventListener('pointermove', handlePointerMove, { passive: true })
    stage.addEventListener('pointerup', handlePointerUp)
    stage.addEventListener('dragstart', preventDefault)
    window.addEventListener('resize', debouncedResize, { passive: true })

    // Cleanup
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      clearTimeout(resizeTimeout)
      stage.removeEventListener('pointerdown', handlePointerDown)
      stage.removeEventListener('pointermove', handlePointerMove)
      stage.removeEventListener('pointerup', handlePointerUp)
      stage.removeEventListener('dragstart', preventDefault)
      window.removeEventListener('resize', debouncedResize)
    }
  }, [images, startCarousel, transformForScreenX, updateCarouselTransforms, computeTransformComponents, measure, mod, autoPlay])

  // Pre-compute skeleton transforms (static, computed once)
  const skeletonCards = useMemo(() => {
    const cards = []
    const center = Math.floor(SKELETON_COUNT / 2)
    for (let i = 0; i < SKELETON_COUNT; i++) {
      const offset = i - center
      const screenX = offset * SKELETON_STEP
      const norm = Math.max(-1, Math.min(1, screenX / 400))
      const invNorm = 1 - Math.abs(norm)
      const ry = -norm * MAX_ROTATION
      const tz = invNorm * MAX_DEPTH
      const scale = MIN_SCALE + invNorm * SCALE_RANGE
      cards.push({
        key: i,
        transform: `translate3d(${screenX}px,-50%,${tz}px) rotateY(${ry}deg) scale(${scale})`,
        zIndex: 1000 + Math.round(tz),
        opacity: Math.abs(offset) <= 2 ? 1 : 0.6
      })
    }
    return cards
  }, [])

  if (!images?.length) return null

  return (
    <div ref={stageRef} className="carousel3d-stage">
      {isLoading && (
        <div className="carousel3d-loader">
          <div className="carousel3d-skeleton">
            {skeletonCards.map(({ key, transform, zIndex, opacity }) => (
              <div 
                key={key} 
                className="carousel3d-skeleton__card"
                style={{ transform, zIndex, opacity }}
              />
            ))}
          </div>
        </div>
      )}
      <div ref={cardsRef} className="carousel3d-cards" data-aspect-ratio={aspectRatio}>
        {images.map((src) => (
          <article key={src} className="card">
            <Image
              src={src}
              alt={src.split('/').pop()?.split('.')[0] || 'Carousel item'}
              width={280}
              height={aspectRatio === '16/9' ? 158 : 373}
              className="card__img"
              draggable={false}
            />
          </article>
        ))}
      </div>
    </div>
  )
}
