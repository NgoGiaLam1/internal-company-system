import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const employees = await prisma.tblEmployee.findMany({
      include: {
        role: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(employees);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Lấy nhân viên thất bại" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      password,
      phone,
      avatarUrl,
      position,
      roleId,
      departmentId,
      status,
    } = body;

    const existingEmployee =
      await prisma.tblEmployee.findUnique({
        where: {
          email,
        },
      });

    if (existingEmployee) {
      return NextResponse.json(
        { message: "Email đã tồn tại" },
        { status: 400 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const employee =
      await prisma.tblEmployee.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
          phone,
          avatarUrl,
          position,
          roleId,
          departmentId,
          status,
        },
      });

    return NextResponse.json(employee);

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Có lỗi xảy ra" },
      { status: 500 }
    );
  }
}