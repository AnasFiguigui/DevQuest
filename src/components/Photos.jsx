"use client"

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Image from 'next/image';

export default function Photos({ images = [], height = 220, gap = 40 }) {
  const scrollerRef = useRef(null);
  const contentRef = useRef(null);

  // compute width from aspect ratio 9/10 to keep similar layout when using height
  const imgWidth = `${Math.round((height) * 9/ 10)}px`;

  useEffect(() => {
    const scroller = scrollerRef.current;
    const content = contentRef.current;
    if (!scroller || !content || images.length === 0) return;

    // Initialize: duplicate content 3x and jump to the middle copy
    const setInitial = () => {
      const total = content.scrollWidth;
      const one = total / 3;
      scroller.scrollLeft = one;
    };

    // Small debounce guard using requestAnimationFrame
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const total = content.scrollWidth;
        const one = total / 3;
        if (scroller.scrollLeft <= 1) {
          scroller.scrollLeft += one;
        } else if (scroller.scrollLeft >= one * 2 - 1) {
          scroller.scrollLeft -= one;
        }
      });
    };

    // Disable wheel/trackpad scrolling over the gallery (click/drag only)
    const disableWheel = (e) => {
      e.preventDefault();
    };

    // Pointer drag for mouse users
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    const onPointerDown = (e) => {
      isDown = true;
      scroller.setPointerCapture?.(e.pointerId);
      startX = e.clientX;
      startScroll = scroller.scrollLeft;
    };
    const onPointerMove = (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      scroller.scrollLeft = startScroll - dx;
    };
    const onPointerUp = (e) => {
      isDown = false;
      try {
        scroller.releasePointerCapture?.(e.pointerId);
      } catch (err) {
        console.error('Failed to release pointer capture:', err);
      }
    };

    // Attach listeners
    setInitial();
    scroller.addEventListener('scroll', handleScroll, { passive: true });
    scroller.addEventListener('wheel', disableWheel, { passive: false });
    scroller.addEventListener('pointerdown', onPointerDown);
    scroller.addEventListener('pointermove', onPointerMove);
    scroller.addEventListener('pointerup', onPointerUp);
    scroller.addEventListener('pointercancel', onPointerUp);

    // Re-center on resize (content width may change)
    const onResize = () => setInitial();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      scroller.removeEventListener('scroll', handleScroll);
      scroller.removeEventListener('wheel', disableWheel);
      scroller.removeEventListener('pointerdown', onPointerDown);
      scroller.removeEventListener('pointermove', onPointerMove);
      scroller.removeEventListener('pointerup', onPointerUp);
      scroller.removeEventListener('pointercancel', onPointerUp);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [images]);

  if (!images || images.length === 0) return null;

  const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];

  return (
    <div className="mt-16 sm:mt-20">
      <div
        ref={scrollerRef}
        // remove Tailwind gap utilities so the `gap` prop controls spacing
        className="-my-4 flex overflow-hidden py-4 photos-scroller"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        aria-label="Photos gallery"
      >
        <div
          ref={contentRef}
          style={{ display: 'flex', gap: `${gap}px`, alignItems: 'center', padding: '8px 0' }}
        >
          {Array.from({ length: 3 }).map((_, setIndex) =>
            images.map((img, i) => (
              <div
                key={`${setIndex}-${i}`}
                className={clsx(
                  'relative flex-none overflow-hidden rounded-xl bg-zinc-100 sm:rounded-2xl dark:bg-zinc-800',
                  rotations[i % rotations.length]
                )}
                style={{ flex: '0 0 auto', height: `${height}px`, width: imgWidth }}
              >
                <Image
                  src={img.src || img}
                  alt={img.alt || ''}
                  fill
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                  unoptimized={false}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{` 
        .photos-scroller {
          cursor: grab;
          -ms-overflow-style: none; /* IE and Edge */
        }
        .photos-scroller:active {
          cursor: grabbing;
        }
        /* Hide scrollbar */
        .photos-scroller::-webkit-scrollbar {
          display: none;
        }
        /* Firefox */
        .photos-scroller {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

Photos.propTypes = {
  images: PropTypes.array.isRequired,
  height: PropTypes.number,
  gap: PropTypes.number,
};
