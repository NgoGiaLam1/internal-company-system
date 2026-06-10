import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/auth.config";

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Chưa đăng nhập",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();

    const { fullName, phone, avatarUrl } = body;

    const data: any = {};

    if (fullName !== undefined) {
      data.fullName = fullName;
    }

    if (phone !== undefined) {
      data.phone = phone;
    }

    if (avatarUrl !== undefined) {
      data.avatarUrl = avatarUrl;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        {
          message: "Không có dữ liệu cập nhật",
        },
        {
          status: 400,
        },
      );
    }

    const updated = await prisma.tblEmployee.update({
      where: {
        id: session.user.id,
      },

      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Có lỗi xảy ra",
      },
      {
        status: 500,
      },
    );
  }
}
