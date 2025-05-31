'use client'

import { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/projects')

        if (!res.ok) {
          throw new Error('Failed to fetch projects')
        }

        const data = await res.json()
        setProjects(data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return (
    <div className="min-h-screen px-6 py-20 bg-gray-100">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 drop-shadow-md">
        My <span className="underline decoration-wavy decoration-yellow-500 underline-offset-4">Projects</span>
      </h1>

      {loading && (
        <p className="text-center text-gray-600 text-lg animate-pulse">Loading projects...</p>
      )}

      {error && (
        <p className="text-center text-red-600 text-lg">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.imageUrl}
              github={project.githubLink}
              demo={project.liveDemo}
            />
          ))}
        </div>
      )}
    </div>
  )
}
