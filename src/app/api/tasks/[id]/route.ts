import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    const task = await prisma.tblTask.update({
      where: { id },
      data: {
        ...(body.status && { status: body.status }),
        ...(body.priority && { priority: body.priority }),
        ...(body.resultNote !== undefined && {
          resultNote: body.resultNote,
        }),
        ...(body.resultUrl !== undefined && {
          resultUrl: body.resultUrl,
        }),
        ...(body.submittedAt && {
          submittedAt: new Date(body.submittedAt),
        }),
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Cập nhật task thất bại" },
      { status: 500 }
    );
  }
}