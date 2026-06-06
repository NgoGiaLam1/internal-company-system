import { prisma } from "@/lib/prisma";
import webpush from "@/lib/webpush";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const employeeId = searchParams.get("employeeId");

  if (!employeeId) {
    return NextResponse.json([], { status: 200 });
  }

  const data = await prisma.tblNotificationRecipient.findMany({
    where: {
      employeeId,
    },

    include: {
      notification: {
        include: {
          sender: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 20,
  });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const { title, content, type, senderId, receiverIds } = await req.json();

    if (!title || !receiverIds?.length) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const notification = await prisma.tblNotification.create({
      data: {
        title,
        content,
        type,
        senderId,

        recipients: {
          create: receiverIds.map((employeeId: string) => ({
            employeeId,
          })),
        },
      },

      include: {
        recipients: true,
      },
    });
    
    const subscriptions = await prisma.tblPushSubscription.findMany({
      where: {
        employeeId: {
          in: receiverIds,
        },
      },
    });

    await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,

              keys: {
                p256dh: sub.p256dh,
                auth: sub.auth,
              },
            },

            JSON.stringify({
              title,

              body: content ?? "Bạn có thông báo mới",
            }),
          );
        } catch (err) {
          console.log("push fail", err);
        }
      }),
    );
    return NextResponse.json(notification, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
