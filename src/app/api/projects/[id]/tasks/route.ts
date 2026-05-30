import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params;

    const tasks = await prisma.tblTask.findMany({
      where: {
        projectId: id,
      },
      include: {
        assignee: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    const task = await prisma.tblTask.create({
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        priority: body.priority,
        projectId: id,
        assigneeId: body.assigneeId || null,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Tạo task thất bại" },
      { status: 500 }
    );
  }
}