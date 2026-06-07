import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const { startDate, dueDate } = body;

    const task = await prisma.tblTask.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          message: "Task không tồn tại",
        },
        {
          status: 404,
        },
      );
    }

    if (startDate && dueDate && new Date(startDate) > new Date(dueDate)) {
      return NextResponse.json(
        {
          message: "Deadline không hợp lệ",
        },
        {
          status: 400,
        },
      );
    }

    const updated = await prisma.tblTask.update({
      where: {
        id,
      },

      data: {
        startDate: startDate ? new Date(startDate) : null,

        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Cập nhật deadline thất bại",
      },
      {
        status: 500,
      },
    );
  }
}
