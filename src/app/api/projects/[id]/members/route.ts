import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  req: Request,
  { params }: Props
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { memberIds, leaderId } = body;

    const project = await prisma.tblProject.update({
      where: { id },
      data: {
        leaderId,
        members: {
          set: memberIds.map((memberId: string) => ({
            id: memberId,
          })),
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Cập nhật thất bại" },
      { status: 500 }
    );
  }
}