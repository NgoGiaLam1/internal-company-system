import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.tblProject.findMany({
      include: {
        members: true,
        tasks: true,
        leader: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.log("GET PROJECT ERROR:", error);

    return NextResponse.json(
      { message: "Lỗi tải dự án" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const project = await prisma.tblProject.create({
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
        leaderId: body.leaderId || null,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("CREATE PROJECT ERROR:", error);

    return NextResponse.json(
      { message: "Tạo dự án thất bại" },
      { status: 500 }
    );
  }
}