import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [logging, setLogging] = useState(false);

  const {setUserName} = useContext(UserContext);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (logging) return;

    try {
      setLogging(true)
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        "email": email,
        "password": password
      })
      setLogging(false)
      if (res.data.message == 'success') {
        setUserName(res.data.user_first_name)
        localStorage.setItem('myEventsIq_userName', res.data.user_first_name)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('myEventsIq_user_id',res.data.user_id)
        toast.success('Login Successfull')
        navigate(`/${res.data.user_id}/events`)
      } else if (res.data.message == 'password') {
        toast.error('Incorrect Password')
      } else if (res.data.message == 'fail') {
        toast.error('Invalid user')
      } else {
        toast.error("Failed to login")
      }
    } catch (err) {
      toast.error("Something went wrong, please try again later")
      console.log(`error while sending login user data to backend: ${err}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-xl">

        {/* ================= LEFT SECTION ================= */}
        <div className="relative bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-700/20 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            <span className="text-gray-300">my</span>
            Events<span className="text-blue-400">IQ</span>
          </h1>

          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            Welcome back 👋
            Jump straight into discovering
            <span className="text-blue-400 font-medium"> upcoming tech events, hackathons, </span>
            and meetups curated just for you.
          </p>

          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 text-xl">🔔</span>
              <span>Stay updated with the latest tech events</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 text-xl">🧠</span>
              <span>Smart recommendations based on your interests</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 text-xl">🌍</span>
              <span>Explore events across colleges, companies & communities</span>
            </li>
          </ul>

          <div className="mt-10 text-sm text-gray-400">
            Trusted by developers & students across India 🚀
          </div>

          {/* Decorative glow */}
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* ================= RIGHT SECTION (LOGIN FORM) ================= */}
        <div className="bg-white/10 p-8 md:p-10 flex items-center">
          <div className="w-full max-w-md mx-auto">

            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              Login to your account
            </h2>
            <p className="text-center text-gray-400 mb-6">
              Continue exploring amazing tech events
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <input
                required
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              {/* Password */}
              <input
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              {/* Forgot Password */}
              <div className="flex justify-end">
                <NavLink
                  to="/reset-password"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Forgot password?
                </NavLink>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={logging}
                className={`w-full py-2 rounded-lg text-white font-semibold transition ${logging
                    ? "bg-blue-400 opacity-70 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                {logging ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-gray-400 mt-6 text-sm">
              Don’t have an account?{" "}
              <NavLink to="/signup" className="text-blue-400 hover:underline">
                Sign up
              </NavLink>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;