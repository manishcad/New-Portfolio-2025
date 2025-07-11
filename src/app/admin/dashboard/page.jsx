'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    githubLink: '',
    liveDemo: '',
    imageUrl: ''
  })

  const [skillForm, setSkillForm] = useState({
    name: '',
    description: '',
    image: null
  })

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
      return
    }

    fetchData()
  }, [router])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [projectsRes, skillsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills')
      ])

      if (projectsRes.ok && skillsRes.ok) {
        const [projectsData, skillsData] = await Promise.all([
          projectsRes.json(),
          skillsRes.json()
        ])
        setProjects(projectsData)
        setSkills(skillsData)
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST'
      })
      localStorage.removeItem('adminToken')
      router.push('/admin')
    } catch (error) {
      // console.error('Logout error:', error)
      // Still redirect even if API call fails
      localStorage.removeItem('adminToken')
      router.push('/admin')
    }
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    
    if (!projectForm.imageUrl) {
      setError('Please upload an image first')
      return
    }
    
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: projectForm.title,
          description: projectForm.description,
          githubLink: projectForm.githubLink,
          liveDemo: projectForm.liveDemo,
          imageUrl: projectForm.imageUrl
        })
      })

      if (res.ok) {
        setProjectForm({
          title: '',
          description: '',
          githubLink: '',
          liveDemo: '',
          imageUrl: ''
        })
        fetchData() // Refresh data
      } else {
        throw new Error('Failed to add project')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAddSkill = async (e) => {
    e.preventDefault()
    
    try {
      const formData = new FormData()
      formData.append('name', skillForm.name)
      formData.append('description', skillForm.description)
      formData.append('image', skillForm.image)

      const res = await fetch('/api/skills', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        setSkillForm({
          name: '',
          description: '',
          image: null
        })
        fetchData() // Refresh data
      } else {
        throw new Error('Failed to add skill')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id))
      } else {
        throw new Error('Failed to delete project')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteSkill = async (id) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    try {
      const res = await fetch(`/api/skills?id=${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setSkills(skills.filter(s => s.id !== id))
      } else {
        throw new Error('Failed to delete skill')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('image', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        const data = await res.json()
        setProjectForm({ ...projectForm, imageUrl: data.url })
        setError('') // Clear any previous errors
      } else {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Upload failed')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'skills'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Skills ({skills.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Project Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Add New Project</h2>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    value={projectForm.githubLink}
                    onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Live Demo (optional)
                  </label>
                  <input
                    type="url"
                    value={projectForm.liveDemo}
                    onChange={(e) => setProjectForm({...projectForm, liveDemo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {projectForm.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={projectForm.imageUrl}
                        alt="Uploaded project image"
                        className="w-full h-32 object-cover rounded-md border"
                      />
                      <p className="text-sm text-green-600 mt-1">✓ Image uploaded successfully</p>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Project
                </button>
              </form>
            </div>

            {/* Projects List */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Current Projects</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                    <div className="flex space-x-2 text-sm">
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        GitHub
                      </a>
                      {project.liveDemo && (
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Skill Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Add New Skill</h2>
              <form onSubmit={handleAddSkill} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({...skillForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (optional)
                  </label>
                  <textarea
                    value={skillForm.description}
                    onChange={(e) => setSkillForm({...skillForm, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill Icon
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSkillForm({...skillForm, image: e.target.files[0]})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Skill
                </button>
              </form>
            </div>

            {/* Skills List */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Current Skills</h2>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="border rounded-lg p-4 text-center">
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className="w-12 h-12 mx-auto mb-2 object-contain"
                    />
                    <h3 className="font-semibold text-sm mb-1">{skill.name}</h3>
                    {skill.description && (
                      <p className="text-gray-600 text-xs mb-2">{skill.description}</p>
                    )}
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 