import HeaderPage from "@/components/ui/HeaderPage";
import { prisma } from "@/lib/prisma";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import TaskStatusChart from "@/components/dashboard/TaskStatusChart";
import {
  CalendarDays,
  LayoutDashboard,
} from "lucide-react";

export default async function Home() {

  const activeEmployees =
    await prisma.tblEmployee.count({
      where: {
        status: "ACTIVE",
      },
    });

  const activeProjects =
    await prisma.tblProject.count({
      where: {
        status: "IN_PROGRESS",
      },
    });

  // Warning
  const overdueTasks =
    await prisma.tblTask.count({
      where: {
        dueDate: {
          lt: new Date(),
        },
        status: {
          not: "DONE",
        },
      },
    });
  const pendingLeaves =
    await prisma.tblLeaveRequest.count({
      where: {
        status: "PENDING",
      },
    });

  // Project chart
  const projectStatusData =
    await prisma.tblProject.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

  const projectChartData =
    projectStatusData.map((item) => ({
      name: item.status,
      value: item._count.status,
    }));

  // Employee chart
  const employeeStatusData =
    await prisma.tblEmployee.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

  const employeeChartData =
    employeeStatusData.map((item) => ({
      name: item.status,
      value: item._count.status,
    }));

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <HeaderPage
        icon={
          <LayoutDashboard className="text-blue-600" size={28} />
        }
        title="Dashboard điều hành"
        description="Theo dõi hoạt động công ty, tiến độ dự án và tình trạng vận hành hệ thống"
        action={
          <div className="border rounded-2xl p-4 bg-gray-50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center shrink-0">
                <CalendarDays size={18} className="text-gray-500" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Ngày hôm nay
                </p>
                <p>{new Date().toLocaleDateString("vi-VN")}</p>
              </div>
            </div>
          </div>
        }
      />
      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <TaskStatusChart
          title="Tổng quan trạng thái dự án"
          description="Theo dõi tình trạng triển khai dự án"
          data={projectChartData}
        />

        <TaskStatusChart
          title="Tổng quan nhân sự"
          description="Theo dõi tình trạng nhân sự công ty"
          data={employeeChartData}
        />

      </div>
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <DashboardStatCard
          title="Nhân sự hoạt động"
          value={activeEmployees}
          href="/employees"
          color="green"
          description="Danh sách nhân viên đang hoạt động"
        />

        <DashboardStatCard
          title="Dự án đang triển khai"
          value={activeProjects}
          href="/projects"
          color="amber"
          description="Các dự án đang thực hiện"
        />

        <DashboardStatCard
          title="Task quá hạn"
          value={overdueTasks}
          href="/tasks"
          color="red"
          description="Các công việc cần xử lý gấp"
        />

        <DashboardStatCard
          title="Đơn nghỉ chờ duyệt"
          value={pendingLeaves}
          href="/leave"
          color="indigo"
          description="Các yêu cầu nghỉ phép đang chờ xử lý"
        />

      </div>
    </div>
  );
}