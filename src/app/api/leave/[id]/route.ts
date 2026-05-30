import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    const leave = await prisma.tblLeaveRequest.update({
      where: {
        id,
      },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json(leave);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Cập nhật thất bại" },
      { status: 500 }
    );
  }
}