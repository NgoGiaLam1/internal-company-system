import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const leave = await prisma.tblLeaveRequest.create({
      data: {
        employeeId: user.id,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        reason: body.reason,
      },
    });

    return NextResponse.json(leave);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Tạo đơn thất bại" },
      { status: 500 }
    );
  }
}