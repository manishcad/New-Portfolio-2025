'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FaBars, FaTimes, FaHome, FaUserAlt, FaProjectDiagram, FaEnvelope } from 'react-icons/fa'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
    <Link href="/" className=" font-montserrat text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text hover:opacity-90 transition-opacity duration-300">
  Manishcad
</Link>
      <div className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      <ul className={`md:flex gap-6 md:static absolute bg-black md:bg-transparent top-16 left-0 w-full px-6 md:w-auto transition-all duration-300 ease-in-out ${open ? 'block' : 'hidden md:block'}`}>
        <li className="flex items-center gap-2 py-2 md:py-0">
          <FaHome /><Link href="/" className="hover:text-yellow-400">Home</Link>
        </li>
        <li className="flex items-center gap-2 py-2 md:py-0">
          <FaUserAlt /><Link href="/about" className="hover:text-yellow-400">About</Link>
        </li>
        <li className="flex items-center gap-2 py-2 md:py-0">
          <FaProjectDiagram /><Link href="/projects" className="hover:text-yellow-400">Projects</Link>
        </li>
        <li className="flex items-center gap-2 py-2 md:py-0">
          <FaEnvelope /><Link href="/contact" className="hover:text-yellow-400">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}
