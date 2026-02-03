"use client"

import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Image from 'next/image';

const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];

export default function Photos({ images = [], height = 300, gap = 25 }) {
  const scrollerRef = useRef(null);
  const contentRef = useRef(null);
  const autoRafIdRef = useRef(null);
  const rafIdRef = useRef(null);

  // Memoize computed width
  const imgWidth = useMemo(
    () => `calc(var(--photo-height, ${height}px) * 0.9)`,
    [height]
  );

  // Memoize duplicated images
  const duplicatedImages = useMemo(
    () =>
      Array.from({ length: 3 }).flatMap((_, setIndex) =>
        images.map((img, i) => ({
          key: `${setIndex}-${i}`,
          ...img,
        }))
      ),
    [images]
  );

  // Callbacks
  const setInitial = useCallback(() => {
    const content = contentRef.current;
    if (!content) return;
    const total = content.scrollWidth;
    const one = total / 3;
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollLeft = one;
  }, []);

  const pauseAuto = useCallback(() => {
    if (autoRafIdRef.current) {
      globalThis.cancelAnimationFrame(autoRafIdRef.current);
      autoRafIdRef.current = null;
    }
  }, []);

  const resumeAuto = useCallback(() => {
    const prefersReducedMotion =
      typeof globalThis !== 'undefined' &&
      globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;
    if (!autoRafIdRef.current) {
      let lastTimestamp = null;
      const speed = 40;
      const scroller = scrollerRef.current;

      const autoStep = (ts) => {
        if (!lastTimestamp) lastTimestamp = ts;
        const dt = (ts - lastTimestamp) / 1000;
        lastTimestamp = ts;
        if (scroller) scroller.scrollLeft -= speed * dt;
        autoRafIdRef.current = globalThis.requestAnimationFrame(autoStep);
      };

      autoRafIdRef.current = globalThis.requestAnimationFrame(autoStep);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (rafIdRef.current) return;
    rafIdRef.current = globalThis.requestAnimationFrame(() => {
      rafIdRef.current = null;
      const scroller = scrollerRef.current;
      const content = contentRef.current;
      if (!scroller || !content) return;

      const total = content.scrollWidth;
      const one = total / 3;
      if (scroller.scrollLeft <= 1) {
        scroller.scrollLeft += one;
      } else if (scroller.scrollLeft >= one * 2 - 1) {
        scroller.scrollLeft -= one;
      }
    });
  }, []);

  const disableWheel = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onPointerDown = useCallback((e) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.setPointerCapture?.(e.pointerId);
    scroller.dataset.isDown = 'true';
    scroller.dataset.startX = e.clientX;
    scroller.dataset.startScroll = scroller.scrollLeft;
    pauseAuto();
  }, [pauseAuto]);

  const onPointerMove = useCallback((e) => {
    const scroller = scrollerRef.current;
    if (!scroller || scroller.dataset?.isDown !== 'true') return;
    const startX = Number.parseFloat(scroller.dataset.startX);
    const startScroll = Number.parseFloat(scroller.dataset.startScroll);
    const dx = e.clientX - startX;
    scroller.scrollLeft = startScroll - dx;
  }, []);

  const onPointerUp = useCallback((e) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.dataset.isDown = 'false';
    try {
      scroller.releasePointerCapture?.(e.pointerId);
    } catch (err) {
      console.error('Failed to release pointer capture:', err);
    }
    resumeAuto();
  }, [resumeAuto]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || images.length === 0) return;

    setInitial();
    scroller.addEventListener('scroll', handleScroll, { passive: true });
    scroller.addEventListener('wheel', disableWheel, { passive: false });
    scroller.addEventListener('pointerdown', onPointerDown);
    scroller.addEventListener('pointermove', onPointerMove);
    scroller.addEventListener('pointerup', onPointerUp);
    scroller.addEventListener('pointercancel', onPointerUp);
    scroller.addEventListener('mouseenter', pauseAuto);
    scroller.addEventListener('mouseleave', resumeAuto);

    const onResize = () => setInitial();
    globalThis.addEventListener('resize', onResize);

    // Delay resumeAuto to allow layout to settle
    const timeoutId = setTimeout(() => {
      resumeAuto();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      globalThis.removeEventListener('resize', onResize);
      scroller.removeEventListener('scroll', handleScroll);
      scroller.removeEventListener('wheel', disableWheel);
      scroller.removeEventListener('pointerdown', onPointerDown);
      scroller.removeEventListener('pointermove', onPointerMove);
      scroller.removeEventListener('pointerup', onPointerUp);
      scroller.removeEventListener('pointercancel', onPointerUp);
      scroller.removeEventListener('mouseenter', pauseAuto);
      scroller.removeEventListener('mouseleave', resumeAuto);
      if (rafIdRef.current) globalThis.cancelAnimationFrame(rafIdRef.current);
      if (autoRafIdRef.current) globalThis.cancelAnimationFrame(autoRafIdRef.current);
    };
  }, [images, handleScroll, disableWheel, onPointerDown, onPointerMove, onPointerUp, pauseAuto, resumeAuto, setInitial]);

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-16 sm:mt-20">
      <div
        ref={scrollerRef}
        className="-my-4 flex overflow-hidden py-4 photos-scroller"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        aria-label="Photos gallery"
      >
        <div
          ref={contentRef}
          style={{
            display: 'flex',
            gap: `var(--photo-gap, ${gap}px)`,
            alignItems: 'center',
            padding: '8px 0',
          }}
        >
          {duplicatedImages.map(({ key, src, alt }) => (
            <div
              key={key}
              className={clsx(
                'relative flex-none overflow-hidden rounded-xl bg-zinc-100 sm:rounded-2xl dark:bg-zinc-800',
                rotations[Number.parseInt(key.split('-')[1]) % rotations.length]
              )}
              style={{ flex: '0 0 auto', height: 'var(--photo-height)', width: imgWidth }}
            >
              <Image
                src={src || ''}
                alt={alt || ''}
                fill
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
                unoptimized={false}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{` 
        .photos-scroller {
          cursor: grab;
          -ms-overflow-style: none;
        }
        .photos-scroller:active {
          cursor: grabbing;
        }
        .photos-scroller::-webkit-scrollbar {
          display: none;
        }
        .photos-scroller {
          scrollbar-width: none;
        }
        .photos-scroller > div {
          --photo-height: ${height}px;
          --photo-gap: ${gap}px;
        }
        @media (max-width: 640px) {
          .photos-scroller > div {
            --photo-height: 220px;
            --photo-gap: 15px;
          }
        }
      `}</style>
    </div>
  );
}

Photos.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  })).isRequired,
  height: PropTypes.number,
  gap: PropTypes.number,
};
