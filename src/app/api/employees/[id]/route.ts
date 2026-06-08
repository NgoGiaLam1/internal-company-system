import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {

    // IMPORTANT
    const { id } = await context.params;

    const body = await req.json();

    const {
      fullName,
      email,
      password,
      department,
      position,
      roleId,
      status,
    } = body;

    const updateData: any = {
      fullName,
      email,
      department,
      position,
      roleId,
      status
    };

    // Nếu có password mới
    if (password) {

      updateData.password =
        await bcrypt.hash(password, 10);

    }

    const employee =
      await prisma.tblEmployee.update({
        where: {
          id,
        },

        data: updateData,
      });

    return NextResponse.json(employee);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message: "Cập nhật thất bại",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
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
      }
    );
  }
}