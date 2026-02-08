# Carousel3D Component

A reusable 3D infinite carousel component converted from the gradientslider project.

## Features

- **3D Perspective**: Cards rotate and move in 3D space
- **Infinite Scrolling**: Seamless looping in both directions
- **Physics-based Animation**: Smooth momentum and friction
- **Multi-input Support**: Mouse wheel, drag, and touch gestures
- **Entry Animation**: Staggered card appearance using GSAP
- **Blur Effects**: Non-focused cards are subtly blurred for depth
- **Fully Responsive**: Adapts to different screen sizes

## Usage

### Basic Example

```jsx
import Carousel3D from '@/components/Carousel3D'

const images = [
  '/images/folder/image1.jpg',
  '/images/folder/image2.jpg',
  '/images/folder/image3.jpg',
  // ... more images
]

export default function MyPage() {
  return (
    <div>
      <h2>My Image Gallery</h2>
      <Carousel3D images={images} />
    </div>
  )
}
```

### With Multiple Carousels

```jsx
export default function GalleryPage() {
  const gameImages = [
    '/images/photos/FavGames/arc.avif',
    '/images/photos/FavGames/bdo.avif',
    // ... more games
  ]

  const projectImages = [
    '/images/photos/Projects/Eden/image-1.avif',
    '/images/photos/Projects/Eden/image-2.avif',
    // ... more projects
  ]

  return (
    <div>
      <section>
        <h2>Favorite Games</h2>
        <Carousel3D images={gameImages} />
      </section>

      <section className="mt-16">
        <h2>Projects</h2>
        <Carousel3D images={projectImages} />
      </section>
    </div>
  )
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `images` | `string[]` | Yes | Array of image paths (relative to public folder or absolute URLs) |

## Requirements

- GSAP library (loaded via CDN in layout.jsx)
- Next.js Image component
- React 18+

## Customization

### Adjusting Physics

Edit the constants in `Carousel3D.jsx`:

```javascript
const FRICTION = 0.9      // Velocity decay (0-1, lower = more friction)
const WHEEL_SENS = 0.6    // Mouse wheel sensitivity
const DRAG_SENS = 1       // Drag sensitivity
```

### Adjusting Visual Appearance

```javascript
const MAX_ROTATION = 28   // Maximum card rotation in degrees
const MAX_DEPTH = 140     // Maximum Z-axis depth in pixels
const MIN_SCALE = 0.92    // Minimum card scale
const SCALE_RANGE = 0.1   // Scale variation range
const GAP = 28            // Gap between cards in pixels
```

### Styling

Modify `Carousel3D.css`:

- `.carousel3d-stage`: Container height and styling
- `.carousel3d-cards .card`: Card dimensions and border-radius
- Media queries for responsive breakpoints

## Browser Compatibility

- Modern browsers with CSS 3D transforms support
- Mobile browsers with touch events
- Reduced motion support for accessibility

## Notes

- Images should be optimized (AVIF, WebP, or optimized JPG/PNG)
- Recommended card aspect ratio: 4:5
- Minimum of 3 images recommended for best effect
- Use high-quality images as they're displayed prominently
