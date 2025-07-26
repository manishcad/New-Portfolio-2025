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

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "image": project.imageUrl,
    "url": `https://manishcad.vercel.app/projects/${params.id}`,
    "author": {
      "@type": "Person",
      "name": "Manish Chand",
      "url": "https://manishcad.vercel.app"
    },
    "dateCreated": project.createdAt,
    "sameAs": [
      project.githubLink,
      project.liveDemo
    ].filter(Boolean)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="min-h-screen px-6 py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </a>
              </li>
              <li className="before:content-['/'] before:mx-2">
                <a href="/projects" className="hover:text-blue-600 transition-colors">
                  Projects
                </a>
              </li>
              <li className="before:content-['/'] before:mx-2 text-gray-500">
                {project.title}
              </li>
            </ol>
          </nav>

          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={project.imageUrl}
                alt={`${project.title} project screenshot showing the application interface`}
                className="w-full h-64 md:h-96 object-cover"
                loading="eager"
              />
            </div>
            <div className="p-8">
              <header className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {project.title}
                </h1>
                <time 
                  dateTime={project.createdAt} 
                  className="text-sm text-gray-500"
                >
                  Created: {new Date(project.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </header>
              
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <footer className="flex flex-wrap gap-4">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    View on GitHub
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    aria-label={`View ${project.title} live demo`}
                  >
                    Live Demo
                  </a>
                )}
                <a
                  href="/projects"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  ← Back to Projects
                </a>
              </footer>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
