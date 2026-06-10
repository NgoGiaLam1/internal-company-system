import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const { id } = await context.params;

    await prisma.tblEmployee.delete({
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
      {
        message: "Xóa thất bại",
      },
      {
        status: 500,
      },
    );
  }
}
