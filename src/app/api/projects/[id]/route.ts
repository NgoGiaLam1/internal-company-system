import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    await prisma.tblProject.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Xóa thành công",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Xóa thất bại" },
      { status: 500 }
    );
  }
}
export async function PATCH(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const project = await prisma.tblProject.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Cập nhật thất bại" },
      { status: 500 }
    );
  }
}