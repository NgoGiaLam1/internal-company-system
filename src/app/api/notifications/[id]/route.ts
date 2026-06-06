import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const updated = await prisma.tblNotificationRecipient.update({
    where: {
      id,
    },

    data: {
      isRead: true,
      readAt: new Date(),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await prisma.tblNotificationRecipient.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "Deleted",
  });
}
