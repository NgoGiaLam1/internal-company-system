import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const modules = await prisma.tblModule.findMany({
      orderBy: {
        position: "asc",
      },

      select: {
        id: true,

        name: true,

        href: true,

        icon: true,
      },
    });

    return NextResponse.json(modules);
  } catch {
    return NextResponse.json(
      {
        message: "Lỗi tải sidebar",
      },

      {
        status: 500,
      },
    );
  }
}
