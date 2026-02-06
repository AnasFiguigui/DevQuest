# Project Images Directory

This folder holds all static images served publicly for project modals and JSON-based content.

## Structure

```
public/images/
├── photos/
│   └── Games/          # Game project images
│       ├── LISC-1.jpg
│       ├── LISC-2.jpg
│       ├── Eden-1.jpg
│       └── ...
└── technologies/       # Technology stack icons
    ├── unity.svg
    ├── csharp.svg
    ├── react.svg
    └── ...
```

## How to Add Images

### Game/Project Photos
1. Place image files in `public/images/photos/Games/`
2. Reference in JSON as: `/images/photos/Games/LISC-1.jpg`

### Technology Icons (SVG)
1. Place SVG files in `public/images/technologies/`
2. Reference in JSON as: `/images/technologies/unity.svg`

## JSON Reference Pattern

```json
{
  "banner": { "type": "image", "src": "/images/photos/Games/game-name-1.jpg" },
  "pictures": [
    "/images/photos/Games/game-name-1.jpg",
    "/images/photos/Games/game-name-2.jpg"
  ],
  "technologies": [
    { "name": "Unity", "svg": "/images/technologies/unity.svg" }
  ]
}
```

## Image Optimization

- **Photos**: Use optimized JPG (compressed) or PNG for quality
- **Icons**: Use SVG for crisp tech stack icons at any size
- **Banner**: Recommend 1600x900px or similar wide aspect ratio (object-cover)
- **Gallery**: Square or landscape orientation works best

## Notes

- All paths are relative to `/public`, so use absolute paths starting with `/`
- Images are served statically—no Next.js Image optimization applied
- For Next.js `<Image>` component, use imports from `src/images/` instead
