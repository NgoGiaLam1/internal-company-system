import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import TaskCommentsSection from "@/components/tasks/TaskCommentsSection";
import TaskInfo from "@/components/tasks/TaskInfo";

type Props = {
  params: Promise<{ id: string }>;
};

function getPriorityColor(priority: string) {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-700 border-red-200";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "LOW":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "DONE":
      return "bg-green-100 text-green-700 border-green-200";
    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "TODO":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function formatStatus(status: string) {
  switch (status) {
    case "TODO":
      return "Chưa bắt đầu";
    case "IN_PROGRESS":
      return "Đang thực hiện";
    case "DONE":
      return "Hoàn thành";
    default:
      return status;
  }
}

function formatPriority(priority: string) {
  switch (priority) {
    case "HIGH":
      return "Cao";
    case "MEDIUM":
      return "Trung bình";
    case "LOW":
      return "Thấp";
    default:
      return priority;
  }
}

export default async function TaskDetailPage({ params }: Props) {
  const { id } = await params;
  const currentUser = await getCurrentUser();

  const task = await prisma.tblTask.findUnique({
    where: { id },
    include: {
      assignee: true,
      project: true,
      comments: {

        include: {

          employee: {

            select: {

              id: true,

              fullName: true,

              avatarUrl: true,

            }

          }

        },

        orderBy: {

          createdAt: "desc"

        }

      }
    },
  });

  if (!task) return notFound();

  return (
    <div className="space-y-6">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 flex items-center gap-2">
        <Link
          href="/tasks"
          className="hover:text-blue-600"
        >
          Công việc
        </Link>

        <span>/</span>

        <span className="text-gray-800 font-medium">
          {task.title}
        </span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl shadow border p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {task.title}
            </h1>

            <p className="text-gray-500 mt-2">
              {task.description || "Không có mô tả cho công việc này"}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(
                task.priority
              )}`}
            >
              Ưu tiên: {formatPriority(task.priority)}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                task.status
              )}`}
            >
              {formatStatus(task.status)}
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskInfo task={task} />
        {/* comment and file */}
        <TaskCommentsSection
          comments={task.comments ?? []}
          currentUser={currentUser}
          taskId={task.id}
        />
      </div>
    </div>
  );
}