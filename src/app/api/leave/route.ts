import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
  }
  
  try {
    const { startDate, endDate, reason } = await request.json();

    if (!startDate) {
      return NextResponse.json(
        {
          message: "Vui lòng chọn ngày bắt đầu",
        },
        { status: 400 },
      );
    }

    if (!endDate) {
      return NextResponse.json(
        {
          message: "Vui lòng chọn ngày kết thúc",
        },
        { status: 400 },
      );
    }

    const start = new Date(startDate);

    const end = new Date(endDate);

    if (start > end) {
      return NextResponse.json(
        {
          message: "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc",
        },
        { status: 400 },
      );
    }

    const overlap = await prisma.tblLeaveRequest.findFirst({
      where: {
        employeeId: user.id,

        status: {
          in: ["PENDING", "APPROVED"],
        },

        AND: [
          {
            startDate: {
              lte: end,
            },
          },
          {
            endDate: {
              gte: start,
            },
          },
        ],
      },
    });

    if (overlap) {
      return NextResponse.json(
        {
          message: "Đã tồn tại đơn nghỉ trong khoảng thời gian này",
        },
        { status: 409 },
      );
    }

    const employee = await prisma.tblEmployee.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!employee) {
      return NextResponse.json(
        {
          message: "Nhân viên không tồn tại",
        },
        { status: 404 },
      );
    }

    const leaveRequest = await prisma.tblLeaveRequest.create({
      data: {
        employeeId: user.id,

        startDate: start,

        endDate: end,

        reason: reason?.trim() || null,
      },
    });

    return NextResponse.json(
      {
        message: "Gửi đơn nghỉ phép thành công",

        leaveRequest,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Có lỗi xảy ra",
      },
      { status: 500 },
    );
  }
}
