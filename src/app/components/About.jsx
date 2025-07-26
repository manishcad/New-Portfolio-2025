'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedDescriptions, setExpandedDescriptions] = useState({})

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/skills')
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch skills')
        }
        
        setSkills(data)
      } catch (err) {
        // console.error('Error fetching skills:', err)
        setError(err.message || 'Failed to load skills. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const toggleDescription = (skillId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [skillId]: !prev[skillId]
    }))
  }

  const truncateText = (text, wordLimit = 20) => {
    if (!text) return ''
    const words = text.split(' ')
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(' ') + '...'
  }

  return (
    <div className="min-h-screen px-6 py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg ">
        <span className='underline decoration-wavy decoration-pink-500 underline-offset-4'>About</span> <span className="underline decoration-wavy decoration-pink-500 underline-offset-4">Me</span>
      </h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-10">
        <Image
          src="/profile.jpg"
          alt="Manish Chand"
          width={200}
          height={200}
          className="rounded-full border-4 border-pink-500 shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* About Text */}
      <div className="max-w-3xl mx-auto text-center text-lg md:text-xl text-gray-300 mb-16">
        <p>
          Hey! I'm <span className="text-pink-400 font-semibold">Manish Chand</span>, a passionate full-stack developer
          focused on building modern, fast, and responsive web applications. I love clean code, great UI/UX, and turning
          ideas into real products.
        </p>
        <p className="mt-4">
          From frontend magic ✨ to backend logic ⚙️ — I enjoy solving problems with creativity and performance in mind.
        </p>
      </div>

      {/* Skills Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
          My Skills
        </h2>
        
        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 p-4 bg-red-100/10 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className="group relative flex flex-col items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
              >
                <div className="relative w-20 h-20 mb-2">
                  <Image
                    src={skill.image}
                    alt={skill.name}
                    fill
                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {skill.name}
                </h3>
                {skill.description && (
                  <div className="mt-2 text-center">
                    <p className="text-xs text-gray-400">
                      {expandedDescriptions[skill.id] 
                        ? skill.description 
                        : truncateText(skill.description)}
                    </p>
                    {skill.description.split(' ').length > 50 && (
                      <button
                        onClick={() => toggleDescription(skill.id)}
                        className="mt-1 text-xs text-pink-500 hover:text-pink-400 transition-colors"
                      >
                        {expandedDescriptions[skill.id] ? 'Show Less' : 'Read More'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
