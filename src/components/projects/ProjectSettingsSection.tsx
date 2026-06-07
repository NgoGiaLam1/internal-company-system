"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Trash2,
  Save,
} from "lucide-react";

export default function ProjectSettingsSection({
  project,
}: {
  project: any;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      name: project.name || "",
      description:
        project.description || "",
      status:
        project.status || "PLANNING",
    });

  const handleUpdate =
    async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/projects/${project.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        if (!res.ok) {
          alert(
            "Cập nhật thất bại"
          );
          return;
        }

        router.refresh();

        alert(
          "Cập nhật thành công"
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async () => {
      const confirmDelete =
        confirm(
          "Bạn chắc chắn muốn xóa dự án?"
        );

      if (!confirmDelete) return;

      try {
        const res = await fetch(
          `/api/projects/${project.id}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) {
          alert("Xóa thất bại");
          return;
        }

        router.push("/projects");
      } catch (error) {
        console.log(error);
      }
    };

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
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b mb-4">

        <h1 className="text-2xl font-bold truncate">

          {project.name}

        </h1>

        <div className="flex items-center gap-3">
          <div >
            <div className="min-w-0 mb-1">

              <div className="flex flex-wrap items-center gap-3">

                <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle()}`}>

                  {getStatusText()}

                </span>


              </div>

            </div>
            <div className="flex flex-wrap gap-5 text-sm shrink-0">

              <div>

                <p className="text-gray-400">

                  Leader

                </p>

                <p className="font-medium">

                  {
                    project.leader
                      ?.fullName ||
                    "Chưa có"
                  }

                </p>

              </div>

              <div>

                <p className="text-gray-400">

                  Ngày tạo

                </p>

                <p className="font-medium">

                  {
                    new Date(
                      project.createdAt
                    ).toLocaleDateString(
                      "vi-VN"
                    )
                  }

                </p>

              </div>

            </div>
          </div>
          <div className="">

            <div className="flex items-center justify-between text-sm mb-2">

              <span className="text-gray-500">

                Tiến độ dự án

              </span>

              <span className="font-medium">

                {progress}%

              </span>

            </div>

            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

              <div
                className="h-2 rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${progress}%`
                }}
              />

            </div>

            <div className="flex flex-wrap gap-5 mt-3 text-sm">

              <div>

                <span className="text-gray-400">

                  Tổng task

                </span>

                <p className="font-medium">

                  {totalTasks}

                </p>

              </div>

              <div>

                <span className="text-gray-400">

                  Hoàn thành

                </span>

                <p className="font-medium text-green-600">

                  {completedTasks}

                </p>

              </div>

              <div>

                <span className="text-gray-400">

                  Quá hạn

                </span>

                <p className="font-medium text-red-600">

                  {overdueTasks}

                </p>

              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Form */}
      <div className="space-y-4 h-60 overflow-y-auto pr-2">

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Tên dự án
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Mô tả
          </label>

          <textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Trạng thái
          </label>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="PLANNING">
              Lên kế hoạch
            </option>

            <option value="IN_PROGRESS">
              Đang thực hiện
            </option>

            <option value="COMPLETED">
              Hoàn thành
            </option>

            <option value="ON_HOLD">
              Tạm dừng
            </option>
          </select>
        </div>

      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl px-4 py-3 flex items-center justify-center gap-2"
        >
          <Save size={16} />

          {loading
            ? "Đang lưu..."
            : "Lưu thay đổi"}
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-50 hover:bg-red-100 transition text-red-600 rounded-xl px-4 py-3 flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />

          Xóa dự án
        </button>

      </div>

    </div>
  );
}