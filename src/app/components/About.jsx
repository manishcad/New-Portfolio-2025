'use client'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg ">
        <span className='underline decoration-wavy decoration-pink-500 underline-offset-4'>About</span> <span className="underline decoration-wavy decoration-pink-500 underline-offset-4">Me</span>
      </h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-10">
        <Image
          src="/profile.jpg" // Replace with your actual image path
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
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
          {/* Replace with your own skill logos */}
          <Image src="https://images.ctfassets.net/23aumh6u8s0i/6pjUKboBuFLvCKkE3esaFA/5f2101d6d2add5c615db5e98a553fc44/nextjs.jpeg" alt="HTML" width={60} height={60} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width={100} height={100} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width={100} height={100} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width={100} height={100} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width={100} height={100} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width={100} height={100} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width={100} height={100} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width={100} height={100} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width={100} height={100} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width={100} height={100} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width={100} height={100} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width={100} height={100} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width={100} height={100} />
          <Image src="https://ucarecdn.com/19205348-9397-400e-89c5-053a6da9adeb/-/resize/1050/" alt="CSS" width={100} height={100} />
          
          {/* Add more as needed */}
        </div>
      </div>
    </div>
  )
}
