"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  CalendarDays,
  CircleAlert,
  Plus,
  User2,
} from "lucide-react";

import TaskModal from "@/components/projects/TaskModal";

export default function TaskSection({
  projectId,
  tasks,
  members,
}: {
  projectId: string;
  tasks: any[];
  members: any[];
}) {
  const [openModal, setOpenModal] =
    useState(false);

  const router = useRouter();

  const handleStatusChange =
    async (
      taskId: string,
      newStatus: string
    ) => {
      try {
        await fetch(
          `/api/tasks/${taskId}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status: newStatus,
            }),
          }
        );

        router.refresh();
      } catch (error) {
        console.log(error);
      }
    };

  const getPriorityStyle = (
    priority: string
  ) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-700 border-red-200";

      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      default:
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getPriorityText = (
    priority: string
  ) => {
    switch (priority) {
      case "HIGH":
        return "Cao";

      case "MEDIUM":
        return "Trung bình";

      default:
        return "Thấp";
    }
  };

  const getStatusStyle = (
    status: string
  ) => {
    switch (status) {
      case "DONE":
        return "bg-green-100 text-green-700";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // const getStatusText = (
  //   status: string
  // ) => {
  //   switch (status) {
  //     case "DONE":
  //       return "Hoàn thành";

  //     case "IN_PROGRESS":
  //       return "Đang thực hiện";

  //     default:
  //       return "Chưa bắt đầu";
  //   }
  // };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 max-h-124 overflow-y-auto ">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>

          <h2 className="text-xl font-semibold text-gray-800">
            Công việc dự án
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Theo dõi và quản lý
            tiến độ công việc
          </p>

        </div>

        <button
          onClick={() =>
            setOpenModal(true)
          }
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus size={18} />

          Tạo công việc
        </button>

      </div>

      {/* Empty */}
      {tasks.length === 0 ? (
        <div className="border border-dashed rounded-2xl py-14 text-center">

          <p className="text-gray-400 text-sm">
            Chưa có công việc nào
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {tasks.map((task) => {
            const isOverdue =
              task.status !== "DONE" &&
              task.dueDate &&
              new Date(
                task.dueDate
              ) < new Date();

            return (
              <div
                key={task.id}
                onClick={() =>
                  router.push(`/tasks/${task.id}`)
                }
                className="border rounded-xl p-4 cursor-pointer hover:border-blue-300 hover:bg-blue-50/40 transition"
              >

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                  {/* LEFT */}
                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2 mb-3">

                      <h3 className="font-semibold text-gray-800 text-lg">
                        {task.title}
                      </h3>

                      {isOverdue && (
                        <span className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">

                          <CircleAlert
                            size={12}
                          />

                          Quá hạn

                        </span>
                      )}

                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed">
                      {task.description ||
                        "Không có mô tả"}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-5 mt-5 text-sm text-gray-600">

                      <div className="flex items-center gap-2">

                        <User2
                          size={16}
                        />

                        <span>
                          {task.assignee
                            ?.fullName ||
                            "Chưa giao"}
                        </span>

                      </div>

                      <div className="flex items-center gap-2">

                        <CalendarDays
                          size={16}
                        />

                        <span>
                          {task.dueDate
                            ? new Date(
                              task.dueDate
                            ).toLocaleDateString(
                              "vi-VN"
                            )
                            : "Chưa có deadline"}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-start md:items-end gap-3 min-w-45">

                    {/* Priority */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityStyle(
                        task.priority
                      )}`}
                    >
                      Ưu tiên{" "}
                      {getPriorityText(
                        task.priority
                      )}
                    </span>

                    {/* Status */}
                    <select
                      onClick={(e) => e.stopPropagation()}
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(
                          task.id,
                          e.target.value
                        )
                      }
                      className={`px-3 py-2 rounded-xl text-sm border outline-none ${getStatusStyle(
                        task.status
                      )}`}
                    >
                      <option value="TODO">
                        Chưa bắt đầu
                      </option>

                      <option value="IN_PROGRESS">
                        Đang thực hiện
                      </option>

                      <option value="DONE">
                        Hoàn thành
                      </option>

                    </select>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* Modal */}
      <TaskModal
        isOpen={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        projectId={projectId}
        members={members}
      />

    </div>
  );
}