type NotificationType =
  | "SYSTEM"
  | "GENERAL"
  | "TASK"
  | "PROJECT"
  | "LEAVE"
  | "COMMENT";

type SendNotificationParams = {
  title: string;
  content?: string;
  type?: NotificationType;
  senderId?: string;
  receiverIds: string[];
};

export async function sendNotification(params: SendNotificationParams) {
  const res = await fetch("/api/notifications", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      title: params.title,
      content: params.content,
      type: params.type ?? "GENERAL",
      senderId: params.senderId,
      receiverIds: params.receiverIds,
    }),
  });

  if (!res.ok) throw new Error("Send notification failed");

  return res.json();
}

export async function getNotifications(employeeId: string) {
  const res = await fetch(`/api/notifications?employeeId=${employeeId}`);

  if (!res.ok) throw new Error("Fetch notifications failed");

  return res.json();
}

export async function markNotificationRead(recipientId: string) {
  const res = await fetch(`/api/notifications/${recipientId}`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Mark read failed");

  return res.json();
}

export async function deleteNotification(recipientId: string) {
  const res = await fetch(`/api/notifications/${recipientId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Delete failed");

  return true;
}

export async function markAllRead(recipientIds: string[]) {
  return Promise.all(recipientIds.map(markNotificationRead));
}
