import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import HeaderPage from "@/components/ui/HeaderPage";
import TasksClientPage from "@/components/tasks/TasksClientPage";

export default async function TasksPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  let where: any = {};

  if (currentUser.role === "EMPLOYEE") {
    where = {
      assigneeId: currentUser.id,
    };
  }

  if (currentUser.role === "MANAGER") {
    const projects = await prisma.tblProject.findMany({
      where: {
        leaderId: currentUser.id,
      },
      select: {
        id: true,
      },
    });

    where = {
      OR: [
        {
          projectId: {
            in: projects.map((p) => p.id),
          },
        },
        {
          assigneeId: currentUser.id,
        },
      ],
    };
  }

  const tasks = await prisma.tblTask.findMany({
    where,
    include: {
      assignee: true,
      project: true,
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
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        }
        title="Quản lý công việc"
        description={
          currentUser.role === "ADMIN"
            ? "Theo dõi toàn bộ công việc trong hệ thống"
            : currentUser.role === "MANAGER"
              ? "Theo dõi công việc thuộc dự án bạn quản lý"
              : "Danh sách công việc được giao cho bạn"
        }
      />

      <TasksClientPage
        tasks={tasks}
        role={currentUser.role}
      />

    </div>
  );
}