import { NavLink } from 'react-router-dom'

const Navbar = (props) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const handleSearch = (e) => {
    props.searchEvent(e.target.value)
  }

  return (
    <nav className="backdrop-blur-md bg-[#0b1120]/80 border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <NavLink to="/">
          <h1 className='text-3xl text-white text-3xl'>
            <span className='text-xl text-white'>my</span>Events<span className="text-xl font-bold tracking-tight text-blue-400">IQ</span>
          </h1>
        </NavLink>

        {/* Links */}
        <div className="flex gap-8">
          {props.search && (
            <div className="relative">
              <input
                type="search"
                placeholder="Search events..."
                onChange={handleSearch}
                className="
        w-64
        pl-10 pr-4 py-2
        rounded-full
        bg-white/10
        text-white
        placeholder-gray-400
        border border-white/10
        backdrop-blur-md
        focus:outline-none
        focus:ring-2 focus:ring-blue-400/60
        focus:border-blue-400
        transition-all duration-300
      "
              />

              {/* Search Icon */}
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
          )}

          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium transition-all duration-200 ${isActive
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
              `text-lg font-medium transition-all duration-200 ${isActive
                ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                : "text-gray-300 hover:text-blue-400"
              }`
            }
          >
            Events
          </NavLink>

          {
            isLoggedIn == 'true' ?
              <NavLink
                to="/"
                className="text-lg font-medium transition-all duration-200 text-gray-300 hover:text-blue-400"
                onClick={()=>localStorage.setItem('isLoggedIn','false')}
              >
                logout
              </NavLink>
              :
              <NavLink
                to="/"
                className="text-lg font-medium transition-all duration-200 text-gray-300 hover:text-blue-400"
                onClick={()=>localStorage.setItem('isLoggedIn','true')}
              >
                login
              </NavLink>
          }
        </div>

      </div>
    </nav>
  )
}

export default Navbar
