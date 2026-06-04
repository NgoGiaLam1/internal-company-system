"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/providers/toast-provider";

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { showToast } = useToast();
  const validateEmail = () => {

    const value =
      email.trim();

    if (!value) {

      setEmailError(
        "Email không được để trống"
      );

      return false;

    }

    if (
      !EMAIL_REGEX.test(
        value
      )
    ) {

      setEmailError(
        "Email không đúng định dạng"
      );

      return false;

    }

    setEmailError("");

    return true;

  };

  const validatePassword =
    () => {

      const value =
        password.trim();

      if (!value) {

        setPasswordError(
          "Mật khẩu không được để trống"
        );

        return false;

      }

      setPasswordError("");

      return true;

    };

  const handleLogin = async () => {
    const emailValid =
      validateEmail();

    const passwordValid =
      validatePassword();
    if (!emailValid || !passwordValid) {
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(true);

    if (result?.ok) {
      router.push("/");

      showToast(
        "Đăng nhập thành công!",
        "success");
    } else {
      showToast("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.", "error");
    }
    setLoading(false);
  };

  return (  
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Đăng nhập
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >

            {/* Email */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">
                Email
              </label>

              <div className="flex items-center border rounded mt-1 px-3">
                <Mail
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="text"
                  value={email}
                  placeholder="user@example.com"
                  className="
              w-full
              p-2
              outline-none
            "
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  onFocus={() =>
                    setEmailError("")
                  }
                  onBlur={validateEmail}
                />
              </div>

              {emailError && (
                <p className="
            text-sm
            text-red-500
            mt-1
          ">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">
                Mật khẩu
              </label>

              <div className="flex items-center border rounded mt-1 px-3">
                <Lock
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  placeholder="••••••••"
                  className="
              w-full
              p-2
              outline-none
            "
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  onFocus={() =>
                    setPasswordError("")
                  }
                  onBlur={validatePassword}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
              text-sm
              text-blue-500
            "
                >
                  {
                    showPassword
                      ? "Ẩn"
                      : "Hiện"
                  }
                </button>
              </div>

              {passwordError && (
                <p className="
            text-sm
            text-red-500
            mt-1
          ">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="
        flex
        justify-between
        items-center
        mb-6
        text-sm
      ">
              <span className="
          text-blue-500
          cursor-pointer
          hover:underline
        ">
                Quên mật khẩu?
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
          w-full
          bg-slate-800
          cursor-pointer
          text-white
          p-2
          rounded
          hover:bg-slate-700
          disabled:bg-gray-400
          disabled:cursor-not-allowed
          transition
        "
            >
              {loading
                ? "Đang đăng nhập..."
                : "Đăng nhập"}
            </button>

          </form>

        </div>
      </div>
  );
}