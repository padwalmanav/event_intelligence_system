import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex gap-3">
      <input
        required
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="button"
        className="px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium flex items-center justify-center transition-all"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

export default PasswordInput;
