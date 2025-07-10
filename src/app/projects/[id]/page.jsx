import { notFound } from 'next/navigation'
import prisma from '../../../lib/prisma'

// Generate metadata for individual projects
export async function generateMetadata({ params }) {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  return {
    title: project.title,
    description: project.description || `View ${project.title} - A web development project by Manish Chand`,
    keywords: [
      project.title,
      'Web Development',
      'React Project',
      'Next.js Project',
      'JavaScript Project',
      'Full Stack Project',
      'Manish Chand',
      'manishcad'
    ],
    openGraph: {
      title: `${project.title} - Manish Chand Portfolio`,
      description: project.description || `View ${project.title} - A web development project by Manish Chand`,
      url: `https://manishcad.vercel.app/projects/${params.id}`,
      images: [
        {
          url: project.imageUrl || '/project-default.jpg',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Manish Chand Portfolio`,
      description: project.description || `View ${project.title} - A web development project by Manish Chand`,
    },
  }
}

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    select: { id: true }
  })

  return projects.map((project) => ({
    id: project.id.toString(),
  }))
}

export default async function ProjectPage({ params }) {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen px-6 py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  View on GitHub
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 