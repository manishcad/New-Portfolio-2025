'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaHome, FaUserAlt, FaProjectDiagram, FaEnvelope } from 'react-icons/fa'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Optional: Lock scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  const handleLinkClick = () => setOpen(false)

  return (
    <nav className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <Link href="/" className="font-montserrat text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text hover:opacity-90 transition-opacity duration-300">
        Manishcad
      </Link>

      {/* Hamburger Menu */}
      <div className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Menu */}
      <ul
        className={`flex flex-col md:flex-row md:items-center gap-6 absolute md:static top-16 left-0 w-full md:w-auto px-6 py-4 md:p-0 bg-black md:bg-transparent transition-all duration-300 ease-in-out ${
          open ? 'block' : 'hidden md:flex'
        }`}
      >
        <li className="flex items-center gap-2">
          <FaHome />
          <a href="/" className="hover:text-yellow-400" onClick={handleLinkClick}>
            Home
          </a>
        </li>
        <li className="flex items-center gap-2">
          <FaUserAlt />
          <a href="/about" className="hover:text-yellow-400" onClick={handleLinkClick}>
            About
          </a>
        </li>
        <li className="flex items-center gap-2">
          <FaUserAlt />
          <a href="/projects" className="hover:text-yellow-400" onClick={handleLinkClick}>
            Projects
          </a>
        </li>
        <li className="flex items-center gap-2">
          <FaEnvelope />
          <a href="/contact" className="hover:text-yellow-400" onClick={handleLinkClick}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}
