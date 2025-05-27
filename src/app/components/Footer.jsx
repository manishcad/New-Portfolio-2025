import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <h4 className="text-xl font-semibold mb-2">About Me</h4>
          <p>A passionate full-stack developer building modern web apps.</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-2">Quick Links</h4>
          <ul>
            <li><a href="/" className="hover:text-yellow-400">Home</a></li>
            <li><a href="/projects" className="hover:text-yellow-400">Projects</a></li>
            <li><a href="/contact" className="hover:text-yellow-400">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-2">Follow Me</h4>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} className="hover:text-yellow-400" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} className="hover:text-yellow-400" />
            </a>
            <a href="mailto:your@email.com">
              <FaEnvelope size={24} className="hover:text-yellow-400" />
            </a>
          </div>
          <div className="mt-4">
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3y2YuTNlHFCJ00nuputMwtPN_lVoh0ge_Q&s" alt="Logo" width={100} height={40} />
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} MyPortfolio. All rights reserved.
      </div>
    </footer>
  )
}
