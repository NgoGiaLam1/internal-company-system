"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotify, setEmailNotify] = useState(true);

  return (
    <div className="space-y-6">

      {/* Header */}
      <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>

      {/* Profile */}
      <div className="bg-white p-4 rounded shadow border space-y-4">
        <h2 className="font-semibold">Thông tin tài khoản</h2>

        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/60"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-medium">Admin</p>
            <p className="text-sm text-gray-500">admin@gmail.com</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Tên hiển thị" />
          <input className="border p-2 rounded" placeholder="Email" />
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Lưu thay đổi
        </button>
      </div>

      {/* System Settings */}
      <div className="bg-white p-4 rounded shadow border space-y-4">
        <h2 className="font-semibold">Cài đặt hệ thống</h2>

        <div className="flex items-center justify-between">
          <span>Dark mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Thông báo email</span>
          <input
            type="checkbox"
            checked={emailNotify}
            onChange={() => setEmailNotify(!emailNotify)}
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Tự động backup dữ liệu</span>
          <input type="checkbox" defaultChecked />
        </div>
      </div>

      {/* Security */}
      <div className="bg-white p-4 rounded shadow border space-y-4">
        <h2 className="font-semibold">Bảo mật</h2>

        <input
          type="password"
          placeholder="Mật khẩu hiện tại"
          className="border p-2 rounded w-full"
        />

        <input
          type="password"
          placeholder="Mật khẩu mới"
          className="border p-2 rounded w-full"
        />

        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          className="border p-2 rounded w-full"
        />

        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Đổi mật khẩu
        </button>
      </div>

      {/* System Info */}
      <div className="bg-white p-4 rounded shadow border space-y-2">
        <h2 className="font-semibold">Thông tin hệ thống</h2>
        <p className="text-sm text-gray-600">Version: 1.0.0</p>
        <p className="text-sm text-gray-600">Environment: Development</p>
        <p className="text-sm text-gray-600">Server: Localhost</p>
      </div>

    </div>
  );
}