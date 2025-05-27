'use client'

import Link from 'next/link'

export default function ProjectCard({ title, description, image, github, demo }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
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
