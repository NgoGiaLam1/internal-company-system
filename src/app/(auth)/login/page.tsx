"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.ok) {
    router.push("/");
  } else {
    alert("Sai tài khoản hoặc mật khẩu");
  }
};

  return (
    <div className="min-h-screen flex">   

      {/* RIGHT - Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Đăng nhập
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex items-center border rounded mt-1 px-3">
              <Mail size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="user@example.com"
                className="w-full p-2 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Mật khẩu</label>
            <div className="flex items-center border rounded mt-1 px-3">
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full p-2 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-blue-500"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <span className="text-blue-500 cursor-pointer hover:underline">
              Quên mật khẩu?
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-slate-800 text-white p-2 rounded hover:bg-slate-700 transition"
          >
            Đăng nhập
          </button>

        </div>
      </div>
    </div>
  );
}