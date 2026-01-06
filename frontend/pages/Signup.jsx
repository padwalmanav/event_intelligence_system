import React from "react";
import { NavLink } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        {/* Brand */}
        <h1 className="text-3xl font-extrabold text-center text-white mb-2">
          <span className="text-gray-300">my</span>
          Events<span className="text-blue-400">IQ</span>
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Create your account to explore tech events
        </p>

        {/* Form */}
        <form className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white font-semibold shadow-lg"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-blue-400 hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
