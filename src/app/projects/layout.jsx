export const metadata = {
  title: 'Projects',
  description: 'Explore my latest web development projects built with React, Next.js, Node.js, and modern technologies. View live demos, GitHub repositories, and project details.',
  keywords: [
    'Web Development Projects',
    'React Projects',
    'Next.js Projects',
    'JavaScript Projects',
    'Full Stack Projects',
    'Portfolio Projects',
    'GitHub Projects'
  ],
  openGraph: {
    title: 'Projects - Manish Chand Portfolio',
    description: 'Explore my latest web development projects built with React, Next.js, Node.js, and modern technologies.',
    url: 'https://manishcad.vercel.app/projects',
    images: [
      {
        url: '/projects-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Manish Chand Projects Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Manish Chand Portfolio',
    description: 'Explore my latest web development projects built with React, Next.js, Node.js, and modern technologies.',
  },
}

export default function ProjectsLayout({ children }) {
  return children
} 