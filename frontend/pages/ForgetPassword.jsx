import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const navigate = useNavigate();
  /* ================= SEND OTP ================= */
  const handleOtpSent = async () => {
    if (!email) {
      toast.error("Enter email first");
      return;
    }

    try {
      setIsSending(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/send-otp`,
        {
          receiver_email: email,
          password_reset: true,
        }
      );

      setIsSending(false);

      if (response.data.message === "success") {
        toast.success("OTP sent to email");
        setOtpSent(true);
      } else if (response.data.message === "email not found") {
        toast.error("Email not registered");
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (err) {
      setIsSending(false);
      toast.error("Something went wrong");
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleOtpVerification = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/verify-email-otp`,
        {
          email: email,
          email_otp: otp,
        }
      );

      if (response.data.message === "success") {
        setVerified(true);
        toast.success("OTP verified");
      } else if (response.data.message === "expired") {
        toast.error("OTP expired");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      toast.error("Verification failed");
    }
  };

  /* ================= RESET PASSWORD ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/reset-password`,
        {
          email,
          password,
        }
      );

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success(response.data.message);
        navigate('/login')
      }
    } catch (err) {
      toast.error("Failed to reset password");
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
            Securely reset your password and regain access to
            <span className="text-blue-400 font-medium"> your personalized tech events dashboard</span>.
          </p>

          <ul className="space-y-4 text-gray-300">
            <li className="flex gap-3">
              <span className="text-blue-400 text-xl">🔐</span>
              <span>Email-based OTP verification</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 text-xl">⚡</span>
              <span>Quick & secure password reset</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 text-xl">🚀</span>
              <span>Back to discovering tech events</span>
            </li>
          </ul>

          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="bg-white/10 p-8 md:p-10 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              Reset Password
            </h2>
            <p className="text-center text-gray-400 mb-6">
              Verify your email to continue
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* EMAIL + OTP */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    disabled={verified}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {!verified && (
                    <button
                      type="button"
                      onClick={handleOtpSent}
                      disabled={isSending}
                      className="px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    >
                      {isSending ? "Sending..." : "Send OTP"}
                    </button>
                  )}
                </div>

                {otpSent && !verified && (
                  <div className="flex gap-2">
                    <input
                      placeholder="Enter OTP"
                      onChange={(e) => setOtp(e.target.value)}
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

                {verified && (
                  <p className="text-green-400 text-sm">
                    ✅ Email verified
                  </p>
                )}
              </div>

              {/* PASSWORDS */}
              <input
                type="password"
                required
                disabled={!verified}
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                required
                disabled={!verified}
                placeholder="Confirm Password"
                onChange={(e) => setConfPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                disabled={!verified}
                className={`w-full py-2 rounded-lg text-white font-semibold transition ${
                  !verified
                    ? "bg-blue-400 opacity-70 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
