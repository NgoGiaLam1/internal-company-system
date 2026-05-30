import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await params;

    const body = await req.json();

    const content = body.content?.trim();
    console.log("Received task comment:", id, content);
    if (!content) {
      return NextResponse.json(
        {
          error: "Comment is required",
        },
        {
          status: 400,
        },
      );
    }

    const task = await prisma.tblTask.findUnique({
      where: {
        id: id,
      },

      select: {
        id: true,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          error: "Task not found",
        },
        {
          status: 404,
        },
      );
    }

    const comment = await prisma.tblTaskComment.create({
      data: {
        taskId: id,

        employeeId: currentUser.id,

        content,
      },

      include: {
        employee: {
          select: {
            id: true,

            fullName: true,

            avatarUrl: true,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("[TASK_COMMENT_POST_ERROR]", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",

        details: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      },
    );
  }
}
