import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const {
      name,
      description,
    } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json(
        {
          message:
            "Tên phòng ban không được để trống",
        },
        { status: 400 }
      );
    }

    const existingDepartment =
      await prisma.tblDepartment.findFirst({
        where: {
          name: name.trim(),
        },
      });

    if (existingDepartment) {
      return NextResponse.json(
        {
          message:
            "Phòng ban đã tồn tại",
        },
        { status: 409 }
      );
    }

    const department =
      await prisma.tblDepartment.create({
        data: {
          name: name.trim(),
          description:
            description?.trim() || null,
        },
      });

    return NextResponse.json(
      {
        message:
          "Tạo phòng ban thành công",
        department,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Có lỗi xảy ra",
      },
      { status: 500 }
    );
  }
}