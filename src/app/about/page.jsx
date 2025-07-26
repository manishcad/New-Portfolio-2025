import React from 'react'
import About from '../components/About'

export const metadata = {
  title: 'About Me',
  description: 'Learn more about Manish Chand, a passionate Full Stack Developer with expertise in React, Next.js, Node.js, and modern web technologies. Discover my journey, skills, and experience.',
  keywords: [
    'About Manish Chand',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Web Developer',
    'JavaScript Developer',
    'Skills',
    'Experience'
  ],
  openGraph: {
    title: 'About Manish Chand - Full Stack Developer',
    description: 'Learn more about Manish Chand, a passionate Full Stack Developer with expertise in React, Next.js, Node.js, and modern web technologies.',
    url: 'https://manishcad.vercel.app/about',
    images: [
      {
        url: '/profile.jpg',
        width: 400,
        height: 400,
        alt: 'Manish Chand - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Manish Chand - Full Stack Developer',
    description: 'Learn more about Manish Chand, a passionate Full Stack Developer with expertise in React, Next.js, Node.js, and modern web technologies.',
  },
}

const AboutPage = () => {
  return (
    <div>
        <About />
    </div>
  )
}

export default AboutPage