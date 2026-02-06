# Project JSON Schema

Each project file in `public/projects/{id}.json` should follow this structure:

```json
{
  "id": "unique-project-id",
  "slug": "unique-project-slug",
  "name": "Project Display Name",
  "date": "YYYY-MM-DD",
  "type": "game|website|mod",
  "category": "Genre or category description",
  "banner": { "type": "image", "src": "/path/to/banner.jpg" },
  "thumbnail": { "type": "image", "src": "/path/to/thumbnail.jpg" },
  "shortDescription": "One-line description for cards",
  "longDescription": "<p>HTML description with full details</p>",
  "media": { "type": "video", "src": "/projects/id/video.mp4" },
  "youtubeUrl": "https://www.youtube.com/watch?v=...",
  "pictures": [
    "/images/photos/Games/img1.jpg",
    "/images/photos/Games/img2.jpg"
  ],
  "technologies": [
    { "name": "Unity", "svg": "/images/technologies/unity.svg" },
    { "name": "C#", "svg": "/images/technologies/csharp.svg" }
  ],
  "contributors": [
    "Role: Name",
    "Role: Name"
  ],
  "articleUrl": "/projects/page-slug",
  "projectUrl": "https://example.com",
  "tags": ["tag1", "tag2"]
}
```

## Field Descriptions

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | Yes | Unique identifier (matches filename without .json) |
| `slug` | string | Yes | URL-friendly slug for articles |
| `name` | string | Yes | Display name shown in modal |
| `date` | string | Yes | Release date (YYYY-MM-DD) for sorting |
| `type` | string | Yes | One of: `game`, `website`, `mod` |
| `category` | string | No | Genre/category (e.g., "Action-Adventure / Survival Horror") |
| `banner` | object | Yes | Full-width banner image: `{ "type": "image", "src": "..." }` |
| `thumbnail` | object | Yes | Card thumbnail: `{ "type": "image", "src": "..." }` |
| `shortDescription` | string | Yes | One-line description for project cards |
| `longDescription` | string | No | HTML formatted long description |
| `media` | object | No | Video file: `{ "type": "video", "src": "/projects/id/video.mp4" }` |
| `youtubeUrl` | string | No | YouTube video link (auto-generates thumbnail) |
| `pictures` | array | No | Gallery images (max 4 displayed, 5+ shows "Display more") |
| `technologies` | array | No | Tech stack: `[{ "name": "...", "svg": "/path.svg" }]` |
| `contributors` | array | No | Team members: `["Role: Name", "Role: Name"]` |
| `articleUrl` | string/array | No | Single or multiple article links |
| `projectUrl` | string | No | Link to project (GitHub, itch.io, etc.) |
| `tags` | array | No | Search/filter tags |

## Modal Layout Order

1. **Banner** — Full-width banner image with close button overlay
2. **Title & Date** — Positioned on banner (bottom-left)
3. **Long Description** — HTML content
4. **Category** — Genre/type label
5. **Video** — Either `media.src` (MP4) OR `youtubeUrl` (YouTube thumbnail) OR empty
6. **Pictures Gallery** — 2 per row, max 4; 4th blurs with "Display more" if additional exist
7. **Technologies** — SVG icons with names
8. **Contributors** — Simple text list
9. **Articles** — Links (supports 1 or multiple)
10. **Navigation** — Previous/Next buttons centered at bottom

## Example: Minimal Project

```json
{
  "id": "my-game",
  "slug": "my-game",
  "name": "My Game",
  "date": "2024-01-15",
  "type": "game",
  "banner": { "type": "image", "src": "/images/photos/Games/game-1.jpg" },
  "thumbnail": { "type": "image", "src": "/images/photos/Games/game-1.jpg" },
  "shortDescription": "A simple game",
  "longDescription": "<p>Game details here</p>",
  "tags": ["action"]
}
```

## Notes

- Images are displayed as-is; ensure they're optimized for web
- SVG icons for technologies should be square (recommend 64x64 or higher)
- YouTube URLs are automatically parsed to show thumbnails
- `articleUrl` can be a string or array of strings
- Dates newer than others appear first in navigation order
