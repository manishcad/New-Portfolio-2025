import prisma from '../lib/prisma'

export default async function sitemap() {
  const baseUrl = 'https://manishcad.vercel.app'
  
  // Get all projects for dynamic URLs
  let projects = []
  try {
    projects = await prisma.project.findMany({
      select: {
        id: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch (error) {
    console.error('Failed to fetch projects for sitemap:', error)
  }

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(project.createdAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...projectPages]
}
