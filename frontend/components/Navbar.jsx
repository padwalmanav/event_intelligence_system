import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../src/App";

const Navbar = (props) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userId = localStorage.getItem("myEventsIq_user_id");
  const { userName, setUserName } = useContext(UserContext);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-black to-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-22 flex items-center justify-between">

        {/* LEFT — Logo */}
        <NavLink to="https://www.myeventsiq.com" className="flex items-center gap-2">
          <img
            src="https://myeventsiq.com/wp-content/uploads/2025/11/Group-8.png"
            alt="myEventsIQ"
            className="h-full max-h-17 w-auto object-contain"
          />

        </NavLink>

        {/* CENTER — Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-md text-gray-400">
          {["Features", "Industries", "Pricing", "Blog", "Contact", "Events"].map(
            (item) => (
              <NavLink
                key={item}
                to={`/${userId ?? "1"}/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `transition ${isActive ? "text-blue-400" : "hover:text-white"}`
                }
              >
                {item}
              </NavLink>
            )
          )}

        </div>

        {/* RIGHT — Auth + CTA */}
        <div className="flex items-center gap-4">

          {/* Greeting */}
          {isLoggedIn === "true" && (
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-300">
              <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-semibold">
                {userName?.charAt(0).toUpperCase()}
              </div>
              <span>
                Hi,{" "}
                <span className="text-blue-400 font-medium capitalize">
                  {userName}
                </span>
              </span>
            </div>
          )}

          {/* Free Report Button */}
          <NavLink
            to="/free-report"
            className="
              hidden sm:inline-flex items-center justify-center
              px-4 py-2
              rounded-lg
              text-sm font-semibold text-white
              bg-gradient-to-r from-blue-500 to-cyan-400
              shadow-[0_0_22px_rgba(56,189,248,0.75)]
              transform transition-all duration-300 ease-out
              hover:-translate-y-1.5
              hover:shadow-[0_0_34px_rgba(56,189,248,0.95)]
            "
          >
            FREE Intelligence Report
          </NavLink>



          {/* Auth Button */}
          {isLoggedIn === "true" ? (
            <NavLink
              to={'/1/events'}
              onClick={() => {
                localStorage.removeItem('myEventsIq_username')
                localStorage.setItem("isLoggedIn", "false");
                localStorage.removeItem("myEventsIq_user_id");
                setUserName(null);
              }}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition rounded-lg hover:bg-blue-500"
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-blue-500 transition rounded-lg"
            >
              Sign In
            </NavLink>
          )}

          {/* Start Free */}
          <NavLink
            to="/signup"
            className="px-4 py-2 rounded-lg text-sm font-semibold
              bg-blue-500 text-white hover:bg-blue-500 transition"
          >
            Start Free
          </NavLink>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
