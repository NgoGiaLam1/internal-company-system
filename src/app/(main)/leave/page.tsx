import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import LeaveClient from "@/components/leave/LeaveClient";

export default async function LeavePage() {
  const user = await getCurrentUser();

  if (!user) return null;

  let where: any = {};

  if ((user as any).role === "EMPLOYEE") {
    where = {
      employeeId: user.id,
    };
  }

  const leaveRequests =
    await prisma.tblLeaveRequest.findMany({
      where,
      include: {
        employee: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
      <LeaveClient
        leaveRequests={leaveRequests}
        currentUser={user}
      />
  );
}