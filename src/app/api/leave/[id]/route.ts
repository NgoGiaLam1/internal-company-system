import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
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

    const { status } = await request.json();

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        {
          message: "Trạng thái không hợp lệ",
        },
        { status: 400 },
      );
    }

    const leaveRequest = await prisma.tblLeaveRequest.findUnique({
      where: {
        id,
      },
    });

    if (!leaveRequest) {
      return NextResponse.json(
        {
          message: "Không tìm thấy đơn nghỉ phép",
        },
        { status: 404 },
      );
    }

    if (leaveRequest.status !== "PENDING") {
      return NextResponse.json(
        {
          message: "Đơn đã được xử lý",
        },
        { status: 400 },
      );
    }

    const updated = await prisma.tblLeaveRequest.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });

    return NextResponse.json({
      message:
        status === "APPROVED"
          ? "Đã duyệt đơn nghỉ phép"
          : "Đã từ chối đơn nghỉ phép",

      leaveRequest: updated,
    });
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

export async function DELETE(
  request: Request,
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

    const leaveRequest = await prisma.tblLeaveRequest.findUnique({
      where: {
        id,
      },
    });

    if (!leaveRequest) {
      return NextResponse.json(
        {
          message: "Không tìm thấy đơn nghỉ phép",
        },
        { status: 404 },
      );
    }

    if (leaveRequest.status !== "PENDING") {
      return NextResponse.json(
        {
          message: "Chỉ được xóa đơn đang chờ duyệt",
        },
        { status: 400 },
      );
    }

    await prisma.tblLeaveRequest.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Xóa đơn nghỉ phép thành công",
    });
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
