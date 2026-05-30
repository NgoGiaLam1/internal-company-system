"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  LogOut,
  ChevronDown,
} from "lucide-react";

import {
  signOut,
  useSession,
} from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  // Close dropdown outside click
  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header
      className="
        w-full h-16 bg-white
        flex items-center justify-between
        px-6 shadow-sm border-b
      "
    >

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-blue-600">
          HỆ THỐNG QUẢN LÝ
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        <div className="hidden md:block text-left">
              <p className="text-lg font-medium text-gray-700">
                Xin chào, {session?.user?.name} !
              </p>              
            </div>
        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell
            className="
              text-gray-600
              hover:text-blue-600 transition
            "
          />

          <span
            className="
              absolute -top-1 -right-1
              bg-red-500 text-white text-xs
              w-4 h-4 flex items-center
              justify-center rounded-full
            "
          >
            3
          </span>
        </div>

        {/* User Dropdown */}
        <div
          className="relative"
          ref={dropdownRef}
        >

          {/* Trigger */}
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="
              flex items-center gap-3
              hover:bg-gray-100
              rounded-xl px-2 py-1.5
              transition
            "
          >

            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="
                w-9 h-9 rounded-full
                object-cover
              "
            />

            

            <ChevronDown
              size={16}
              className={`
                text-gray-500 transition
                ${open ? "rotate-180" : ""}
              `}
            />

          </button>

          {/* Dropdown */}
          {open && (
            <div
              className="
                absolute right-0 top-14
                w-64 bg-white border
                rounded-2xl shadow-lg
                overflow-hidden z-50
              "
            >

              {/* User Info */}
              <div className="p-4 border-b">

                <div className="flex items-center gap-3">

                  <img
                    src="https://i.pravatar.cc/40"
                    alt="avatar"
                    className="
                      w-11 h-11 rounded-full
                    "
                  />

                  <div>
                    <p className="font-medium text-gray-800">
                      {session?.user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {session?.user?.email}
                    </p>
                  </div>

                </div>

              </div>

              {/* Menu */}
              <div className="p-2">

                <button
                  onClick={handleLogout}
                  className="
                    w-full flex items-center gap-3
                    px-3 py-2.5 rounded-xl
                    text-sm text-red-600
                    hover:bg-red-50 transition
                  "
                >
                  <LogOut size={16} />

                  Đăng xuất
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}