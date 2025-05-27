'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br  bg-linear-to-r from-cyan-500 to-red-600-500">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section - Text */}
        <div className="space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center md:text-left drop-shadow-lg">
  Hey, I'm{' '}
  <span className="bg-gradient-to-r from-blue-900 via-blue-950 to-black bg-clip-text text-transparent underline decoration-wavy decoration-blue-600 underline-offset-4">
    Manish Chand
  </span>
</h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-xl mx-auto md:mx-0">
            A passionate Full-Stack Developer building modern web apps with clean UI, intuitive UX, and powerful backend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/projects">
              <span className="inline-block bg-black text-white px-6 py-3 rounded-full  transition duration-300">
                View Projects   
              </span>
            </Link>
            <Link href="/contact">
              <span className="inline-block border bg-black border-black px-6 py-3 rounded-full   transition duration-300">
                Contact Me
              </span>
            </Link>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="relative  w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <Image
            src="/my-image.jpg" // <-- Replace this with your image in /public
            alt="Developer Illustration"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
    </main>
  )
}
