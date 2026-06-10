import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { writeFile } from "fs/promises";
import { join } from "path";

import { NextResponse } from "next/server";
import { authOptions } from "@/auth.config";

export async function POST(request: Request) {
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

    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          message: "Không tìm thấy file",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const extension = file.name.split(".").pop();

    const fileName = `${session.user.id}-${Date.now()}.${extension}`;

    const uploadPath = join(process.cwd(), "public", "uploads", fileName);

    await writeFile(uploadPath, buffer);

    const avatarUrl = `/uploads/${fileName}`;

    await prisma.tblEmployee.update({
      where: {
        id: session.user.id,
      },

      data: {
        avatarUrl,
      },
    });

    return NextResponse.json({
      avatarUrl,
      message: "Cập nhật ảnh đại diện thành công",
    });
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
