import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
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

    const { name, description } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json(
        {
          message: "Tên phòng ban không được để trống",
        },
        { status: 400 },
      );
    }

    const department = await prisma.tblDepartment.findUnique({
      where: { id },
    });

    if (!department) {
      return NextResponse.json(
        {
          message: "Không tìm thấy phòng ban",
        },
        { status: 404 },
      );
    }

    const duplicated = await prisma.tblDepartment.findFirst({
      where: {
        name: name.trim(),

        NOT: {
          id,
        },
      },
    });

    if (duplicated) {
      return NextResponse.json(
        {
          message: "Tên phòng ban đã tồn tại",
        },
        { status: 409 },
      );
    }

    const updatedDepartment = await prisma.tblDepartment.update({
      where: { id },

      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
    });

    return NextResponse.json({
      message: "Cập nhật phòng ban thành công",

      department: updatedDepartment,
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
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await context.params;

    await prisma.tblDepartment.delete({
      where: { id },
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
