import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [phoneNo, setPhoneNo] = useState(null);
  const [password, setPassword] = useState(null);
  const [logging, setLogging] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLogging(true)
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        phone_no: phoneNo,
        password: password
      })
      setLogging(false)
      if (res.data.message == 'success') {
        localStorage.setItem('isLoggedIn', 'true')
        toast.success('Login Successfull')
        navigate('/events')
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
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        {/* Brand */}
        <h1 className="text-3xl font-extrabold text-center text-white mb-2">
          <span className="text-gray-300">my</span>
          Events<span className="text-blue-400">IQ</span>
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Welcome back! Login to your account
        </p>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="XXXXX XXXXX"
              onChange={(e) => setPhoneNo(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <NavLink
              to="/forgot-password"
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot password?
            </NavLink>
          </div>

          {/* Button */}
          {
            logging ?
              <button
                type="submit"
                disabled={true}
                className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white font-semibold shadow-lg"
              >
                Logging in ...
              </button>
              :
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white font-semibold shadow-lg"
              >
                Login
              </button>
          }
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            className="text-blue-400 hover:underline"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;