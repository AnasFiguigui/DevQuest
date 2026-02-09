# DevQuest - Personal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

Open-source personal portfolio showcasing my games and web projects.

![Portfolio Preview](public/images/photos/Projects/Portfolio/banner.avif)

## ✨ Features

- **Project Showcase** - Interactive modal galleries with image viewer and swipe support
- **3D Carousel** - Smooth, physics-based image carousel component
- **Blog/Articles** - MDX-powered articles with rich content support
- **Dark Mode** - Full dark/light theme support
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **SEO Optimized** - Meta tags, OpenGraph, and structured data

## 🖼️ Screenshots

<div align="center">
  <img src="public/images/photos/Projects/Portfolio/image-1.avif" width="45%" alt="Home Page" />
  <img src="public/images/photos/Projects/Portfolio/image-2.avif" width="45%" alt="Projects Page" />
</div>

<div align="center">
  <img src="public/images/photos/Projects/Portfolio/image-3.avif" width="45%" alt="Project Modal" />
  <img src="public/images/photos/Projects/Portfolio/image-4.avif" width="45%" alt="Articles" />
</div>

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnasFiguigui/DevQuest.git
   cd DevQuest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
DevQuest/
├── public/
│   ├── images/           # Static images and media
│   └── projects/         # Project JSON data files
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── articles/     # Blog articles (MDX)
│   │   ├── project/      # Projects page
│   │   └── about/        # About page
│   ├── components/       # React components
│   │   ├── Carousel3D.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── ImageLightbox.jsx
│   │   └── ...
│   ├── lib/              # Utility functions
│   └── styles/           # Global styles
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Headless UI](https://headlessui.com/)
- **Content**: [MDX](https://mdxjs.com/)
- **Icons**: [Heroicons](https://heroicons.com/)
- **Typography**: [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)

## 📝 Adding Content

### New Project

Create a JSON file in `public/projects/`:

```json
{
  "id": "project-name",
  "name": "Project Name",
  "date": "2024-01-01",
  "category": "Game / Web App",
  "thumbnail": { "type": "image", "src": "/images/photos/Projects/..." },
  "shortDescription": "Brief description",
  "longDescription": "<p>Full HTML description</p>",
  "technologies": [
    { "name": "Unity", "svg": "/images/technologies/unity.svg" }
  ],
  "pictures": ["/images/photos/Projects/.../image-1.avif"]
}
```

### New Article

Create a folder in `src/app/articles/your-article/` with a `page.mdx` file:

```mdx
import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  author: 'Your Name',
  date: '2024-01-01',
  title: 'Article Title',
  description: 'Article description',
}

export const metadata = {
  title: article.title,
  description: article.description,
}

export default (props) => <ArticleLayout article={article} {...props} />

Your article content here...
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Anas Figuigui**

- GitHub: [@AnasFiguigui](https://github.com/AnasFiguigui)
- LinkedIn: [Anas Figuigui](https://www.linkedin.com/in/anas-figuigui/)
- Twitter: [@AnasFiguigui_](https://x.com/AnasFiguigui_)

---

<p align="center">
  Made with ❤️ by Anas Figuigui
</p>
