import AppLayout from "@/components/layouts/AppLayout";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Quản lý công ty nội bộ",
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

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user =
    await getCurrentUser();

  if (
    user?.id
  )

    return (

      <AppLayout>

        {children}

      </AppLayout>

    );

}