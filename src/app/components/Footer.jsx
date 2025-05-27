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
            <a href="https://github.com/manishcad" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} className="hover:text-yellow-400" />
            </a>
            <a href="https://www.linkedin.com/in/manish-chand-3b7b4a158/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} className="hover:text-yellow-400" />
            </a>
            <a href="/contact">
              <FaEnvelope size={24} className="hover:text-yellow-400" />
            </a>
          </div>
          <div className="mt-6 flex justify-center sm:block md:block" style={{cursor:"pointer"}}>
            <Image src="/coding.jpg" alt="Logo" width={100} height={40} />
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} MyPortfolio. All rights reserved.
      </div>
    </footer>
  )
}
