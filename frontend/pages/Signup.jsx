import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullname] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      if(phoneNo.length != 10){
        toast.error("Please Enter 10 digit phone number")
        return;
      }

      setIsSubmitting(true)
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/create-user`,{
        "full_name": fullName,
        "phone_no": phoneNo,
        "email": email,
        "password": password
      })
      setIsSubmitting(false)
      if(res.data.message == 'success'){
        toast.success("signup Successfull")
        navigate('/login')
      }else if(res.data.message == 'present'){
        toast.error("Mobile number already registered")
      }else if(res.data.message == 'fail'){
        toast.error("Failed to signup, please try again later")
      }else{
        toast.error("Failed to sign up")
      }
    }catch(err){
      toast.error("Something went wrong, please try again later")
      console.log(`error while sending signup user data to backend, ${err}`)
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
          Create your account to explore tech events
        </p>

        {/* Form */}
        <form 
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div>
            <label className="block text-md text-gray-300 mb-1">
              Full Name
            </label>
            <input
              required
              type="text"
              placeholder="John Doe"
              onChange={(e)=>setFullname(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition"
            />
          </div>

          {/* Phone no */}
          <div>
            <label className="block text-md text-gray-300 mb-1">
              Phone number
            </label>
            <input
              required
              type="text"
              placeholder="XXXXX XXXXX"
              onChange={(e)=>setPhoneNo(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-md text-gray-300 mb-1">
              Email Address <span className="text-sm">(optional)</span>
            </label>
            <input
              required
              type="email"
              placeholder="john@example.com"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-md text-gray-300 mb-1">
              Password
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-md text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-lg text-white font-semibold shadow-lg ${
              isSubmitting ? 
                "bg-blue-400 cursor-not-allowed opacity-70 transition" 
                : 
                "bg-blue-500 hover:bg-blue-600 transition"
            }`}
          >
            {
              isSubmitting ?
                "Creating Account" :
                "Create Account"
            }
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
