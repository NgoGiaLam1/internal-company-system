import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FolderKanban,
  Users,
} from "lucide-react";
import TaskSection from "@/components/projects/TaskSection";
import ProjectMembersSection from "@/components/projects/ProjectMembersSection";
import ProjectSettingsSection from "@/components/projects/ProjectSettingsSection";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const employees = await prisma.tblEmployee.findMany();

  const project = await prisma.tblProject.findUnique({
    where: { id },

    include: {
      leader: true,

      members: true,

      tasks: {
        include: {
          assignee: true,
        },
      },
    },
  });

  if (!project) return notFound();

  // =========================
  // TASK STATS
  // =========================

  const totalTasks = project.tasks.length;

  const completedTasks = project.tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  const overdueTasks = project.tasks.filter(
    (task) =>
      task.status !== "DONE" &&
      task.dueDate &&
      new Date(task.dueDate) < new Date()
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
        (completedTasks / totalTasks) * 100
      );

  // =========================
  // PROJECT STATUS
  // =========================

  const getStatusStyle = () => {
    switch (project.status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "ON_HOLD":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = () => {
    switch (project.status) {
      case "COMPLETED":
        return "Hoàn thành";

      case "IN_PROGRESS":
        return "Đang thực hiện";

      case "ON_HOLD":
        return "Tạm dừng";

      default:
        return "Lên kế hoạch";
    }
  };

  return (
    <div className="space-y-6">

      {/* ================= HERO ================= */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">

          {/* LEFT */}
          <div className="flex-1">

            <div className="flex items-center gap-3 flex-wrap">

              <h1 className="text-3xl font-bold text-gray-800">
                {project.name}
              </h1>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle()}`}
              >
                {getStatusText()}
              </span>

            </div>

            <p className="text-gray-500 mt-3 max-w-3xl leading-relaxed">
              {project.description ||
                "Không có mô tả cho dự án này"}
            </p>

          </div>

          {/* RIGHT INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:min-w-90">

            {/* Created Date */}
            <div className="border rounded-2xl p-4 bg-gray-50">

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center shrink-0">
                  <CalendarDays
                    size={18}
                    className="text-gray-500"
                  />
                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Ngày tạo
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {new Date(
                      project.createdAt
                    ).toLocaleDateString("vi-VN")}
                  </p>

                </div>

              </div>

            </div>

            {/* Leader */}
            <div className="border rounded-2xl p-4 bg-gray-50">

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center shrink-0">
                  <Users
                    size={18}
                    className="text-gray-500"
                  />
                </div>

                <div className="min-w-0">

                  <p className="text-sm text-gray-500">
                    Trưởng dự án
                  </p>

                  <p className="font-semibold text-gray-800 mt-1 wrap-break-word">
                    {project.leader?.fullName ||
                      "Chưa có trưởng dự án"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= PROGRESS ================= */}
        <div className="mt-8">

          <div className="flex items-center justify-between mb-2">

            <p className="text-sm font-medium text-gray-700">
              Tiến độ dự án
            </p>

            <p className="text-sm font-semibold text-gray-800">
              {progress}%
            </p>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* ================= QUICK STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total Tasks */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Tổng công việc
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {totalTasks}
              </h3>

            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
              <FolderKanban
                className="text-blue-600"
                size={20}
              />
            </div>

          </div>

        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Đã hoàn thành
              </p>

              <h3 className="text-2xl font-bold text-green-600 mt-1">
                {completedTasks}
              </h3>

            </div>

            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle2
                className="text-green-600"
                size={20}
              />
            </div>

          </div>

        </div>

        {/* Overdue */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Task quá hạn
              </p>

              <h3 className="text-2xl font-bold text-red-600 mt-1">
                {overdueTasks}
              </h3>

            </div>

            <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
              <Clock3
                className="text-red-600"
                size={20}
              />
            </div>

          </div>

        </div>

        {/* Members */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Thành viên
              </p>

              <h3 className="text-2xl font-bold text-indigo-600 mt-1">
                {project.members.length}
              </h3>

            </div>

            <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Users
                className="text-indigo-600"
                size={20}
              />
            </div>

          </div>

        </div>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* TASK SECTION */}
        <div className="xl:col-span-2">

          <TaskSection
            projectId={project.id}
            tasks={project.tasks}
            members={project.members}
          />

        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <ProjectSettingsSection
            project={project}
          />
          <ProjectMembersSection
            project={project}
            employees={employees}
          />

        </div>

      </div>

    </div>
  );
}