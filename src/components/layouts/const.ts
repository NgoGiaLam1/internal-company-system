import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  CalendarDays,
  Settings,
  Building2,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";

export const menuItems = {
  ADMIN: [
    {
      name: "Tổng quan",
      icon: LayoutDashboard,
      href: "/",
    },

    {
      name: "Dự án",
      icon: FolderKanban,
      href: "/projects",
    },

    {
      name: "Công việc",
      icon: CheckSquare,
      href: "/tasks",
    },

    {
      name: "Nhân viên",
      icon: Users,
      href: "/employees",
    },

    {
      name: "Phòng ban",
      href: "/departments",
      icon: Building2,
    },

    {
      name: "Nghỉ phép",
      icon: CalendarDays,
      href: "/leave",
    },

    {
      name: "Chức vụ",
      href: "/roles",
      icon: BriefcaseBusiness,
    },

    {
      name: "Phân quyền",
      href: "/permissions",
      icon: ShieldCheck,
    },

    {
      name: "Cài đặt",
      icon: Settings,
      href: "/settings",
    },
  ],

  MANAGER: [
    {
      name: "Tổng quan",
      icon: LayoutDashboard,
      href: "/",
    },

    {
      name: "Dự án",
      icon: FolderKanban,
      href: "/projects",
    },

    {
      name: "Công việc",
      icon: CheckSquare,
      href: "/tasks",
    },

    {
      name: "Nghỉ phép",
      icon: CalendarDays,
      href: "/leave",
    },
  ],

  EMPLOYEE: [
    {
      name: "Tổng quan",
      icon: LayoutDashboard,
      href: "/",
    },

    {
      name: "Công việc",
      icon: CheckSquare,
      href: "/tasks",
    },

    {
      name: "Nghỉ phép",
      icon: CalendarDays,
      href: "/leave",
    },
  ],
};