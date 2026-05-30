import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import HeaderPage from "@/components/ui/HeaderPage";
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
    <div className="space-y-6">
      <HeaderPage
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-600"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
          </svg>
        }
        title="Quản lý nghỉ phép"
        description={
          (user as any).role === "EMPLOYEE"
            ? "Theo dõi và quản lý đơn nghỉ của bạn"
            : "Quản lý toàn bộ đơn nghỉ trong hệ thống"
        }
      />

      <LeaveClient
        leaveRequests={leaveRequests}
        role={(user as any).role}
      />
    </div>
  );
}