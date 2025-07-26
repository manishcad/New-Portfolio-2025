import ProjectCard from '../components/ProjectCard'
import prisma from '../../lib/prisma'

// SEO metadata for Projects page
export const metadata = {
  title: 'Projects',
  description: 'Explore my web development projects showcasing React, Next.js, Node.js, and full-stack applications. View live demos and source code of innovative web solutions built by Manish Chand.',
  keywords: [
    'Web Development Projects',
    'React Projects',
    'Next.js Projects',
    'Full Stack Projects',
    'JavaScript Projects',
    'Node.js Projects',
    'Portfolio Projects',
    'Manish Chand Projects',
    'manishcad',
    'Web Applications'
  ],
  openGraph: {
    title: 'Projects - Manish Chand Portfolio',
    description: 'Explore my web development projects showcasing React, Next.js, Node.js, and full-stack applications. View live demos and source code.',
    url: 'https://manishcad.vercel.app/projects',
    images: [
      {
        url: '/projects-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Manish Chand Web Development Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Manish Chand Portfolio',
    description: 'Explore my web development projects showcasing React, Next.js, Node.js, and full-stack applications.',
  },
}

// Server-side data fetching
async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return projects
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen px-6 py-20 bg-gray-100">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 drop-shadow-md">
        My <span className="underline decoration-wavy decoration-yellow-500 underline-offset-4">Projects</span>
      </h1>

      {projects.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No projects found.</p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.imageUrl}
              github={project.githubLink}
              demo={project.liveDemo}
              projectId={project.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}
