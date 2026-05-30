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
        resultNote: body.resultNote,
        resultUrl: body.resultUrl,
        submittedAt: new Date(),
        status: "DONE",
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Nộp kết quả thất bại" },
      { status: 500 }
    );
  }
}