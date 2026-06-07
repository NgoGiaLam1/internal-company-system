"use client";

import { useRouter } from "next/navigation";

function getPriorityColor(priority: string) {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-700";

    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";

    case "LOW":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "DONE":
      return "bg-green-100 text-green-700";

    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-700";

    case "TODO":
      return "bg-gray-100 text-gray-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}
const getStatusText = (status: string) => {
  switch (status) {
    case "DONE":
      return "Hoàn thành";

    case "IN_PROGRESS":
      return "Đang thực hiện";

    case "TODO":
      return "Chưa bắt đầu";

    default:
      return "Lên kế hoạch";
  }
};

const getPriorityText = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return "Cao";
    case "MEDIUM":
      return "Trung bình";
    case "LOW":
      return "Thấp";
    default:
      return "Không xác định";
  }
};

export default function TaskTable({
  tasks,
  role,
}: {
  tasks: any[];
  role: string;
}) {
  const router = useRouter();

  const handleStatusChange = async (
    taskId: string,
    status: string
  ) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          status,
        }),
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">

            <tr>
              <th className="text-left p-3">
                Dự án
              </th>

              <th className="text-left p-3">
                Công việc
              </th>

              <th className="text-left p-3">
                Phụ trách
              </th>

              <th className="text-left p-3">
                Ưu tiên
              </th>

              <th className="text-left p-3">
                Trạng thái
              </th>

              <th className="text-left p-3">
                Deadline
              </th>
            </tr>

          </thead>

          <tbody>

            {tasks.map((task) => (
              <tr
                key={task.id}
                onClick={() =>
                  router.push(
                    `/tasks/${task.id}`
                  )
                }
                className="
                  border-t
                  hover:bg-blue-50
                  cursor-pointer
                  transition
                "
              >

                {/* Project */}
                <td className="p-3">
                  {task.project.name}
                </td>

                {/* Title */}
                <td className="p-3 font-medium">
                  {task.title}
                </td>

                {/* Assignee */}
                <td className="p-3">

                  {task.assignee ? (
                    task.assignee.fullName
                  ) : (
                    <span
                      className="
                        px-2 py-1
                        text-xs rounded-full
                        bg-red-100 text-red-700
                      "
                    >
                      Chưa giao
                    </span>
                  )}

                </td>

                {/* Priority */}
                <td className="p-3">

                  <span
                    className={`
                        px-2 py-1
                        rounded-full
                        text-xs font-medium
                        ${getPriorityColor(
                      task.priority
                    )}
                      `}
                  >
                    {getPriorityText(task.priority)}
                  </span>

                </td>

                {/* Status */}
                <td className="p-3">

                  <span
                    className={`
                      px-2 py-1
                      rounded-full
                      text-xs font-medium
                      ${getStatusColor(
                      task.status
                    )}
                    `}
                  >
                    {getStatusText(task.status)}
                  </span>

                </td>
                {/* Deadline */}
                <td className="p-3">

                  {task.dueDate ? (
                    (() => {
                      const due =
                        new Date(
                          task.dueDate
                        );

                      const now =
                        new Date();

                      const diff =
                        (due.getTime() -
                          now.getTime()) /
                        (1000 *
                          60 *
                          60 *
                          24);

                      // Overdue
                      if (diff < 0) {
                        return (
                          <span
                            className="
                              px-2 py-1
                              rounded-full
                              text-xs
                              bg-red-100
                              text-red-700
                            "
                          >
                            Trễ hạn
                          </span>
                        );
                      }

                      // Near due
                      if (diff <= 2) {
                        return (
                          <span
                            className="
                              px-2 py-1
                              rounded-full
                              text-xs
                              bg-yellow-100
                              text-yellow-700
                            "
                          >
                            Gần tới hạn
                          </span>
                        );
                      }

                      return due.toLocaleDateString(
                        "vi-VN"
                      );
                    })()
                  ) : (
                    "Chưa có"
                  )}

                </td>

              </tr>
            ))}

            {/* Empty */}
            {tasks.length === 0 && (
              <tr>

                <td
                  colSpan={6}
                  className="
                    text-center
                    py-10
                    text-gray-500
                  "
                >
                  Không có công việc nào
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}