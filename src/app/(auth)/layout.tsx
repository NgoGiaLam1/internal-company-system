import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Hệ thống quản lý nội bộ cho công ty",
  icons: {

    icon:
      "/logo/logo.png",

    shortcut:
      "/favicon.ico",

    apple:
      "/favicon.ico",

  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
