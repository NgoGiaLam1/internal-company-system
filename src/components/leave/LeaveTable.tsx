"use client";

import { useRouter } from "next/navigation";

type Props = {
  leaveRequests: any[];
  role: string;
};

export default function LeaveTable({
  leaveRequests,
  role,
}: Props) {
  const router = useRouter();

  const handleUpdate = async (
    id: string,
    status: string
  ) => {
    try {
      await fetch(`/api/leave/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded shadow border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">Nhân viên</th>
            <th className="p-3 text-left">Từ ngày</th>
            <th className="p-3 text-left">Đến ngày</th>
            <th className="p-3 text-left">Lý do</th>
            <th className="p-3 text-left">Trạng thái</th>
            {role !== "EMPLOYEE" && (
              <th className="p-3 text-left">Thao tác</th>
            )}
          </tr>
        </thead>

        <tbody>
          {leaveRequests.map((leave) => (
            <tr key={leave.id} className="border-t">
              <td className="p-3">{leave.employee.fullName}</td>
              <td className="p-3">
                {new Date(leave.startDate).toLocaleDateString("vi-VN")}
              </td>
              <td className="p-3">
                {new Date(leave.endDate).toLocaleDateString("vi-VN")}
              </td>
              <td className="p-3">
                {leave.reason || "Không có"}
              </td>
              <td className="p-3">{leave.status}</td>

              {role !== "EMPLOYEE" && (
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() =>
                      handleUpdate(leave.id, "APPROVED")
                    }
                    className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                  >
                    Duyệt
                  </button>

                  <button
                    onClick={() =>
                      handleUpdate(leave.id, "REJECTED")
                    }
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                  >
                    Từ chối
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}