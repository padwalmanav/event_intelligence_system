import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullname] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const fullPhoneNumber = `${countryCode}${phoneNo}`

  const navigate = useNavigate();

  /* Reset OTP state if email changes */
  useEffect(() => {
    setOtpSent(false);
    setOtpVerified(false);
    setEmailOtp("");
  }, [email]);

  /* ================== SIGNUP ================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      toast.error("Please verify your email first");
      return;
    }

    if (phoneNo.length !== 10) {
      toast.error("Please enter a valid 10 digit phone number");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/create-user`,
        {
          full_name: fullName,
          phone_no: fullPhoneNumber,
          email: email,
          password: password,
        }
      );

      setIsSubmitting(false);

      if (res.data.message === "success") {
        toast.success("Signup successful");
        navigate("/login");

        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user-registration-email`,
          {
            full_name: fullName,
            email: email,
          }
        );
      } else if (res.data.message === "present") {
        toast.error("email already registered");
      } else {
        toast.error("Signup failed");
      }
    } catch (err) {
      setIsSubmitting(false);
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  /* ================== SEND OTP ================== */
  const handleOtpSubmit = async () => {
    if (!email) {
      toast.error("Enter email first");
      return;
    }

    try {
      setOtpSending(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/send-otp`,
        { receiver_email: email }
      );

      setOtpSending(false);

      if (response.data.message === "success") {
        setOtpSent(true);
        toast.success("OTP sent to email");
      }
    } catch (err) {
      setOtpSending(false);
      toast.error("Failed to send OTP");
    }
  };

  /* ================== VERIFY OTP ================== */
  const handleOtpVerification = async () => {
    if (!emailOtp) {
      toast.error("Enter OTP");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/verify-email-otp`,
        {
          email: email,
          email_otp: emailOtp,
        }
      );

      if (response.data.message === "success") {
        setOtpVerified(true);
        toast.success("Email verified");
      } else if (response.data.message === "expired") {
        toast.error("OTP expired, Please try again");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      toast.error("OTP verification failed");
    }
  };

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
            Discover, track, and stay ahead of the most exciting
            <span className="text-blue-400 font-medium"> tech events, hackathons, and meetups </span>
            happening around you.
          </p>

          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 text-xl">⚡</span>
              <span>
                Personalized event recommendations based on your interests
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 text-xl">📅</span>
              <span>
                Never miss important deadlines, registrations, or updates
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 text-xl">🚀</span>
              <span>
                Built for developers, students, and tech communities
              </span>
            </li>
          </ul>

          <div className="mt-10 text-sm text-gray-400">
            Join hundreds of tech enthusiasts already using myEventsIQ
          </div>

          {/* Decorative glow */}
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* ================= RIGHT SECTION (FORM) ================= */}
        <div className="bg-white/10 p-8 md:p-10 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              Create your account
            </h2>
            <p className="text-center text-gray-400 mb-6">
              Start exploring tech events today
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                required
                placeholder="Full Name"
                onChange={(e) => setFullname(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex gap-2">
                {/* Country Code Dropdown */}
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="px-3 py-2 rounded-lg 
                    bg-[#333644] text-white 
                    border border-white/10 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="+91" style={{ backgroundColor: "#1C1F2F", color: "#fff" }}>
                    🇮🇳 +91
                  </option>
                  <option value="+1" style={{ backgroundColor: "#1C1F2F", color: "#fff" }}>
                    🇺🇸 +1
                  </option>
                  <option value="+44" style={{ backgroundColor: "#1C1F2F", color: "#fff" }}>
                    🇬🇧 +44
                  </option>
                  <option value="+61" style={{ backgroundColor: "#1C1F2F", color: "#fff" }}>
                    🇦🇺 +61
                  </option>
                  <option value="+971" style={{ backgroundColor: "#1C1F2F", color: "#fff" }}>
                    🇦🇪 +971
                  </option>
                </select>

                {/* Phone Number Input */}
                <input
                  required
                  placeholder="Phone Number"
                  maxLength={10}
                  onChange={(e) => setPhoneNo(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email + OTP */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    disabled={otpVerified}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {!otpVerified && (
                    <button
                      type="button"
                      onClick={handleOtpSubmit}
                      disabled={otpSending}
                      className="px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    >
                      {otpSending ? "Sending..." : "Send OTP"}
                    </button>
                  )}
                </div>

                {otpSent && !otpVerified && (
                  <div className="flex gap-2">
                    <input
                      placeholder="Enter OTP"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={handleOtpVerification}
                      className="px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium"
                    >
                      Verify
                    </button>
                  </div>
                )}

                {otpVerified && (
                  <p className="text-green-400 text-sm">
                    ✅ Email verified successfully
                  </p>
                )}
              </div>

              <input
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                disabled={isSubmitting || !otpVerified}
                className={`w-full py-2 rounded-lg text-white font-semibold transition ${isSubmitting || !otpVerified
                  ? "bg-blue-400 opacity-70 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-gray-400 mt-6 text-sm">
              Already have an account?{" "}
              <NavLink to="/login" className="text-blue-400 hover:underline">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
