"use client"; // 👈 BẮT BUỘC vì dùng useState

import { useState } from "react";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/sidebar/Sidebar"; // 👈 thêm

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false); // 👈 thêm

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}