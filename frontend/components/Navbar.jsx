import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="backdrop-blur-md bg-[#0b1120]/80 border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <h1 className="text-2xl font-bold tracking-tight text-blue-400">
          Events IQ
        </h1>

        {/* Links */}
        <div className="flex gap-8">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium transition-all duration-200 ${
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                  : "text-gray-300 hover:text-blue-400"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) =>
              `text-lg font-medium transition-all duration-200 ${
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                  : "text-gray-300 hover:text-blue-400"
              }`
            }
          >
            Events
          </NavLink>

        </div>

      </div>
    </nav>
  )
}

export default Navbar
