'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ProjectCard({ title, description, image, github, demo }) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const wordLimit = 40
  const words = description.split(' ')
  const isLongDescription = words.length > wordLimit
  const truncatedDescription = isLongDescription 
    ? words.slice(0, wordLimit).join(' ') + '...'
    : description

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <div className="text-gray-600 mb-4">
          <p>{showFullDescription ? description : truncatedDescription}</p>
          {isLongDescription && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              {showFullDescription ? 'Show less' : 'See more'}
            </button>
          )}
        </div>
        <div className="flex gap-4">
          {github && (
            <Link
              href={github}
              target="_blank"
              className="text-blue-600 font-medium hover:underline"
            >
              GitHub
            </Link>
          )}
          {demo && (
            <Link
              href={demo}
              target="_blank"
              className="text-green-600 font-medium hover:underline"
            >
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
