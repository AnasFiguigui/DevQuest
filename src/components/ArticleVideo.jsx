'use client'

import PropTypes from 'prop-types'

export function ArticleVideo({ 
  src, 
  caption, 
  autoPlay = true, 
  loop = true, 
  muted = true,
  controls = false,
  className = '' 
}) {
  return (
    <figure className={`my-8 ${className}`}>
      <video
        src={src}
        className="w-full rounded-xl"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        preload="metadata"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

ArticleVideo.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  controls: PropTypes.bool,
  className: PropTypes.string,
}
