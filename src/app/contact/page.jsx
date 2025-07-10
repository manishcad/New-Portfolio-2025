'use client'

import { useState } from 'react'

export const metadata = {
  title: 'Contact Me',
  description: 'Get in touch with Manish Chand for web development projects, collaboration opportunities, or just to say hello. Available for freelance work and full-time positions.',
  keywords: [
    'Contact Manish Chand',
    'Hire Web Developer',
    'Freelance Developer',
    'React Developer for Hire',
    'Next.js Developer',
    'Web Development Services',
    'Collaboration'
  ],
  openGraph: {
    title: 'Contact Manish Chand - Full Stack Developer',
    description: 'Get in touch with Manish Chand for web development projects, collaboration opportunities, or just to say hello.',
    url: 'https://manishcad.vercel.app/contact',
    images: [
      {
        url: '/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Manish Chand',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Manish Chand - Full Stack Developer',
    description: 'Get in touch with Manish Chand for web development projects, collaboration opportunities, or just to say hello.',
  },
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('Message sent successfully!')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('Failed to send message.')
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-full mx-auto px-6 py-16"
    style={{ backgroundImage: "url('/3418448.jpg')" }}>
      <h1 className="text-4xl mt-5 font-bold mb-8 text-center">Contact Me</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border border-gray-400 rounded px-4 py-3 focus:outline-yellow-400 focus:ring-1 focus:ring-yellow-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border border-gray-400 rounded px-4 py-3 focus:outline-yellow-400 focus:ring-1 focus:ring-yellow-400"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
          className="border border-gray-400 rounded px-4 py-3 resize-none focus:outline-yellow-400 focus:ring-1 focus:ring-yellow-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 text-black font-semibold rounded px-6 py-3 hover:bg-yellow-500 transition-colors"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        {status && (
          <p
            className={`mt-4 text-center ${
              status.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  )
}
