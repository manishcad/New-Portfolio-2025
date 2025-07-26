'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ProjectCard({ title, description, image, github, demo, projectId }) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const wordLimit = 40
  const words = description?.split(' ') || []
  const isLongDescription = words.length > wordLimit
  const truncatedDescription = isLongDescription 
    ? words.slice(0, wordLimit).join(' ') + '...'
    : description

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative">
        <Link href={`/projects/${projectId}`} aria-label={`View ${title} project details`}>
          <img
            src={image}
            alt={`${title} project screenshot`}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
      </div>
      <div className="p-5">
        <Link href={`/projects/${projectId}`}>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
            {title}
          </h2>
        </Link>
        <div className="text-gray-600 mb-4">
          <p>{showFullDescription ? description : truncatedDescription}</p>
          {isLongDescription && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              aria-expanded={showFullDescription}
              aria-label={showFullDescription ? 'Show less description' : 'Show more description'}
            >
              {showFullDescription ? 'Show less' : 'See more'}
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href={`/projects/${projectId}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            View Details
          </Link>
          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              aria-label={`View ${title} source code on GitHub`}
            >
              GitHub
            </Link>
          )}
          {demo && (
            <Link
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-medium hover:underline border border-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200"
              aria-label={`View ${title} live demo`}
            >
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
