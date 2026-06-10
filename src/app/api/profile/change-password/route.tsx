import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/auth.config";

export async function PATCH(
    request: Request
) {
    try {

        const session =
            await getServerSession(
                authOptions
            );

        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    message:
                        "Chưa đăng nhập",
                },
                {
                    status: 401,
                }
            );
        }

        const body =
            await request.json();

        const {
            currentPassword,
            newPassword,
            confirmPassword,
        } = body;

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            return NextResponse.json(
                {
                    message:
                        "Vui lòng nhập đầy đủ thông tin",
                },
                {
                    status: 400,
                }
            );
        }

        if (
            newPassword !==
            confirmPassword
        ) {
            return NextResponse.json(
                {
                    message:
                        "Xác nhận mật khẩu không khớp",
                },
                {
                    status: 400,
                }
            );
        }

        if (
            newPassword ===
            currentPassword
        ) {
            return NextResponse.json(
                {
                    message:
                        "Mật khẩu không thay đổi",
                },
                {
                    status: 400,
                }
            );
        }

        const employee =
            await prisma.tblEmployee.findUnique({
                where: {
                    id: session.user.id,
                },
            });

        if (!employee) {
            return NextResponse.json(
                {
                    message:
                        "Không tìm thấy tài khoản",
                },
                {
                    status: 404,
                }
            );
        }

        const isValid =
            await bcrypt.compare(
                currentPassword,
                employee.password
            );

        if (!isValid) {
            return NextResponse.json(
                {
                    message:
                        "Mật khẩu hiện tại không đúng",
                },
                {
                    status: 400,
                }
            );
        }

        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        await prisma.tblEmployee.update({
            where: {
                id: employee.id,
            },

            data: {
                password:
                    hashedPassword,
            },
        });

        return NextResponse.json({
            message:
                "Đổi mật khẩu thành công",
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message:
                    "Có lỗi xảy ra",
            },
            {
                status: 500,
            }
        );
    }
}