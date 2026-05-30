"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { useSession } from "next-auth/react";

import { menuItems } from "./const";

export default function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) {
  const pathname = usePathname();

  const { data: session } = useSession();

  const role =
    (session?.user as any)?.role || "EMPLOYEE";

  const menus =
    menuItems[role as keyof typeof menuItems] || [];

  return (
    <aside
      className={`
        bg-white border-r flex flex-col
        transition-all duration-300 relative
        ${collapsed ? "w-20" : "w-64"}
      `}
    >

      {/* Toggle */}
      <button
        className="
          absolute -right-3 top-1/3
          bg-blue-500 text-white
          p-1 rounded-full shadow
        "
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}
      </button>

      {/* Menu */}
      <nav className="flex-1 p-2 space-y-2">
        {menus.map((item, index) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={`
                flex items-center gap-3
                px-4 py-2 rounded-lg text-sm
                transition

                ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }
              `}
            >
              <Icon size={20} />

              {!collapsed && (
                <span>{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}