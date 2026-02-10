/**
 * Centralized profile data - Edit all personal information here
 * This file is used by both the home page and about page
 */

import summaries from './projects-client'

// ============================================================================
// PERSONAL INFORMATION
// ============================================================================

export const personalInfo = {
  name: 'Anas Figuigui',
  email: 'anas.production.af@gmail.com',
  
  // Titles displayed on pages
  titles: {
    primary: 'Game Developer',
    secondary: 'Backend Developer',
    tagline: 'Anas Figuigui,\nGame & Backend Developer',
  },
  
  // Short description for home page
  shortDescription: `I'm Anas Figuigui, a game developer specializing in gameplay systems and interactive experiences. With a background in backend development and cloud technologies, I approach game creation with both technical precision and creative vision, mainly working with Unity and Unreal Engine to build engaging, atmospheric worlds.`,
  
  // Long description paragraphs for about page
  longDescription: [
    'Game and backend developer focused on building immersive gameplay systems and scalable cloud architectures. I work with Unity, Unreal Engine, and modern backend technologies to create interactive experiences backed by solid infrastructure.',
    'I recently led the development of a horror game set in a Moroccan environment, directing gameplay systems, technical implementation, and team collaboration while shaping level design and atmosphere.',
    'AWS Certified Solutions Architect, continuously expanding my expertise in distributed systems and backend scalability.',
    'Driven by both technical precision and creative ambition, I build experiences that are as robust under the hood as they are engaging on screen.',
  ],
  
  // About page headline
  aboutHeadline: 'Anas Figuigui, Game & Backend Developer',
}

// ============================================================================
// SOCIAL LINKS - Add new links here
// ============================================================================

export const socialLinks = [
  {
    id: 'x',
    href: 'https://x.com/_AnasFiguigui',
    label: 'Follow on X',
    icon: 'XIcon',
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/anasfiguigui/',
    label: 'Follow on Instagram',
    icon: 'InstagramIcon',
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/anas-figuigui/',
    label: 'Follow on LinkedIn',
    icon: 'LinkedInIcon',
  },
  {
    id: 'github',
    href: 'https://github.com/AnasFiguigui',
    label: 'Follow on GitHub',
    icon: 'GitHubIcon',
  },
]

// ============================================================================
// INTERESTS / BADGES - For about page
// ============================================================================

export const interests = [
  { id: 'horror', label: 'Horror Movies', emoji: '🎬' },
  { id: 'pizza', label: 'Pizza', emoji: '🍕' },
  { id: 'anime', label: 'Animes', emoji: '👀' },
  { id: 'gaming', label: 'Survival Games', emoji: '🎮' },
  { id: 'music', label: 'Dark Souls Music', emoji: '🎵' },
  { id: 'cats', label: 'Cats', emoji: '🐈‍⬛' },
]

// ============================================================================
// EDUCATION - Timeline entries
// ============================================================================

export const education = [
  {
    id: 'isart',
    institution: 'ISART DIGITAL',
    degree: 'Video Game Creator',
    // Logo filename - will be imported in component
    logo: 'isart',
    startMonth: 'Jan',
    startYear: 2025,
    endMonth: 'Oct',
    endYear: 2025,
    description: 'Certified in Video Game Creation, covering game design, programming, and production pipelines.',
  },
  {
    id: 'aws',
    institution: 'Amazon Web Services',
    degree: 'AWS Cloud Solution Architect Certification',
    logo: null,
    startMonth: 'May',
    startYear: 2024,
    endMonth: 'May',
    endYear: 2024,
    description: 'Professional certification in cloud architecture.',
  },
  {
    id: 'uir',
    institution: 'International University of Rabat',
    degree: 'Computer Engineering - Executive',
    logo: 'uir',
    startMonth: 'Dec',
    startYear: 2023,
    endMonth: 'Nov',
    endYear: 2024,
    description: 'Graduated in Computer Engineering with a focus on software development, cloud architecture, and AI applications.',
  },
  {
    id: 'ofppt',
    institution: 'Specialized Institute Of Applied Technology',
    degree: 'Digital Development - Web Full Stack',
    logo: 'ofppt',
    startMonth: 'Sep',
    startYear: 2021,
    endMonth: 'Jul',
    endYear: 2023,
    description: 'Completed a comprehensive program in web development, covering both frontend and backend technologies, with a focus on modern frameworks and best practices.',
  },
  {
    id: 'um5s',
    institution: 'FSJES-Souissi - University Of Mohammed V',
    degree: 'Economics and Management',
    logo: 'um5s',
    startMonth: 'Sep',
    startYear: 2019,
    endMonth: 'Jul',
    endYear: 2021,
    description: 'Foundation studies in economics and business management.',
  },
]

// ============================================================================
// PROFESSIONAL EXPERIENCE - Add entries as you gain experience
// ============================================================================

export const professionalExperience = [
  // Example format for future entries:
  // {
  //   id: 'company-name',
  //   company: 'Company Name',
  //   position: 'Job Title',
  //   logo: 'company-logo',
  //   startMonth: 'Jan',
  //   startYear: 2026,
  //   endMonth: null, // null = Present
  //   endYear: null,
  //   description: 'Description of responsibilities and achievements.',
  //   technologies: ['Unity', 'C#', 'AWS'],
  // },
]

// ============================================================================
// EXPERIENCE START DATE - For calculating years of experience
// When did you start your professional/dev journey?
// ============================================================================

export const experienceStartDate = {
  month: 9, // September
  year: 2021, // When started OFPPT
}

// ============================================================================
// FAVORITE GAMES - For about page carousel
// ============================================================================

const FAV_GAMES_PATH = '/images/photos/FavGames/'
export const favoriteGames = [
  'arc', 'bdo','diablo2', 'diablo4', 'd3' , 'eldenringnr' ,
  'hades2', 'sh2', 'outlast', 're7', 'bet',
  'shpt', 'khazan', 'minecraft', 'poe', 'witcher3'
].map(name => `${FAV_GAMES_PATH}${name}.avif`)

// ============================================================================
// HOME PAGE PHOTOS
// ============================================================================

export const homePhotos = Array.from({ length: 5 }, (_, i) => `/images/photos/image-${i + 1}.webm`)

// ============================================================================
// DYNAMIC STATS CALCULATION
// ============================================================================

/**
 * Calculate project statistics from projects-client.js (single pass)
 */
export function getProjectStats() {
  const counts = summaries.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1
    return acc
  }, {})
  
  return {
    totalProjects: summaries.length,
    games: counts.game || 0,
    websites: counts.website || 0,
    modsAndTools: (counts.mod || 0) + (counts.tool || 0),
  }
}

/**
 * Calculate years of experience
 * Returns a string like "3 years", "1 year", or "< 1 year"
 */
export function getYearsOfExperience() {
  const { month, year } = experienceStartDate
  const now = new Date()
  const start = new Date(year, month - 1, 1) // month is 0-indexed
  
  const diffMs = now - start
  const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25)
  
  if (diffYears < 1) {
    return '< 1 year'
  }
  
  const years = Math.floor(diffYears)
  return years === 1 ? '1 year' : `${years} years`
}

/**
 * Get all stats for display
 */
export function getAllStats() {
  const projectStats = getProjectStats()
  const experience = getYearsOfExperience()
  
  return {
    ...projectStats,
    yearsOfExperience: experience,
  }
}

// ============================================================================
// HELPER: Format date range for display
// ============================================================================

export function formatDateRange(startMonth, startYear, endMonth, endYear) {
  if (endMonth && endYear) {
    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`
  }
  return `${startMonth} ${startYear} - Present`
}

// ============================================================================
// HELPER: Format education for Resume component (home page)
// ============================================================================

export function getResumeEducation() {
  return education
    .filter(edu => edu.logo)
    .map(edu => {
      const yearStr = edu.endYear?.toString() || new Date().getFullYear().toString()
      return {
        university: edu.institution,
        title: edu.degree,
        logo: edu.logo,
        start: edu.startYear.toString(),
        end: { label: edu.endYear ? yearStr : 'Present', dateTime: yearStr },
      }
    })
}

// ============================================================================
// HELPER: Format education for Timeline component (about page)
// ============================================================================

export function getTimelineEducation() {
  return education.map(edu => ({
    date: formatDateRange(edu.startMonth, edu.startYear, edu.endMonth, edu.endYear),
    title: edu.degree,
    institution: edu.institution,
    description: edu.description,
  }))
}
