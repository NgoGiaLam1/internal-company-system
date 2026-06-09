"use client";

import { useMemo, useState } from "react";
import FilterBar from "@/components/ui/filter/FilterBar";
import Pagination from "@/components/ui/Pagination";
import { Plus } from "lucide-react";
import HeaderPage from "../ui/HeaderPage";
import LeaveRequestModal from "./LeaveRequestModal";
import LeaveRequestForm from "./LeaveRequestForm";
import { useToast } from "../providers/toast-provider";
import { useRouter } from "next/navigation";
import LeaveRequestDetailModal from "./LeaveRequestDetailModal";

type Props = {
  leaveRequests: any[];
  currentUser: any;
};

export default function LeaveClient({
  leaveRequests,
  currentUser,
}: Props) {
  const [page, setPage] = useState(1);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [dateRange, setDateRange] =
    useState({
      from: "",
      to: "",
    });

  const pageSize = 5;

  // =========================
  // FILTER
  // =========================

  const filteredLeaves = useMemo(() => {
    const keyword =
      search.toLowerCase();

    return leaveRequests.filter(
      (leave) => {
        const matchSearch =
          leave.employee?.fullName
            ?.toLowerCase()
            .includes(keyword) ||
          leave.reason
            ?.toLowerCase()
            .includes(keyword);

        const matchStatus =
          statusFilter === "ALL"
            ? true
            : leave.status ===
            statusFilter;

        let matchDate = true;

        if (dateRange.from) {
          matchDate =
            matchDate &&
            new Date(
              leave.createdAt
            ) >=
            new Date(
              dateRange.from
            );
        }

        if (dateRange.to) {
          matchDate =
            matchDate &&
            new Date(
              leave.createdAt
            ) <=
            new Date(
              dateRange.to
            );
        }

        return (
          matchSearch &&
          matchStatus &&
          matchDate
        );
      }
    );
  }, [
    leaveRequests,
    search,
    statusFilter,
    dateRange,
  ]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredLeaves.length /
    pageSize
  );

  const paginatedLeaves =
    filteredLeaves.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

  const getStatusText = (status: string) => {
    switch (status) {
      case "APPROVED": return "Đã duyệt";
      case "PENDING": return "Chờ duyệt";
      case "REJECTED": return "Từ chối";
    }
  }

  const [open, setOpen] =
    useState(false);

  const [openDetail, setOpenDetail] =
    useState(false);

  const [selectedLeave,
    setSelectedLeave] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      startDate: "",
      endDate: "",
      reason: "",
    });

  const { showToast } = useToast();
  const router = useRouter();

  const openDetailModal = (
    leave: any
  ) => {
    setSelectedLeave(leave);

    setOpenDetail(true);
  };

  const handleCreate = async () => {
    try {
      if (!form.startDate) {
        showToast(
          "Vui lòng chọn ngày bắt đầu",
          "error"
        );
        return;
      }

      if (!form.endDate) {
        showToast(
          "Vui lòng chọn ngày kết thúc",
          "error"
        );
        return;
      }

      setLoading(true);

      const res = await fetch(
        "/api/leave",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        showToast(
          data.message,
          "error"
        );

        return;
      }

      showToast(
        "Gửi đơn nghỉ phép thành công",
        "success"
      );

      setOpen(false);

      setForm({
        startDate: "",
        endDate: "",
        reason: "",
      });

      router.refresh();

    } catch (error) {

      console.error(error);

      showToast(
        "Có lỗi xảy ra",
        "error"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleApprove =
    async (
      leaveRequest: any
    ) => {

      const res = await fetch(
        `/api/leave/${leaveRequest.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status:
              "APPROVED",
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        showToast(
          data.message,
          "error"
        );
        return;
      }

      showToast(
        data.message,
        "success"
      );

      setOpenDetail(false);

      router.refresh();
    };

  const handleReject =
    async (
      leaveRequest: any
    ) => {

      const res = await fetch(
        `/api/leave/${leaveRequest.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status:
              "REJECTED",
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        showToast(
          data.message,
          "error"
        );
        return;
      }

      showToast(
        data.message,
        "success"
      );

      setOpenDetail(false);

      router.refresh();
    };

  const handleDelete = async (
      leaveRequest: any
    ) => {
    if (
      !confirm(
        "Bạn có chắc muốn xóa đơn này?"
      )
    ) {
      return;
    }
    try {
      setLoading(true);

      const res = await fetch(
        `/api/leave/${leaveRequest.id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        showToast(
          data.message,
          "error"
        );
        return;
      }

      showToast(
        "Xóa thành công",
        "success"
      );

      setOpen(false);

      setOpenDetail(
        false
      );

      router.refresh();

    } catch (error) {

      console.error(error);

      showToast(
        "Có lỗi xảy ra",
        "error"
      );

    } finally {

      setLoading(false);

    }
  };


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
          currentUser.role === "EMPLOYEE"
            ? "Theo dõi và quản lý đơn nghỉ của bạn"
            : "Quản lý toàn bộ đơn nghỉ trong hệ thống"
        }

        action={
          <button
            className="
              inline-flex items-center gap-2
              bg-blue-600 hover:bg-blue-700
              text-white px-5 py-3
              rounded-xl transition
              font-medium shadow-sm
            "
            onClick={() => {
              setForm({
                startDate: "",
                endDate: "",
                reason: "",
              });

              setOpen(true);
            }}
          >
            <Plus size={18} />
            Tạo đơn
          </button>
        }
      />

      <div className="space-y-5">

        {/* FILTER */}
        <FilterBar
          search={{
            value: search,
            onChange: (v: string) => {
              setSearch(v);
              setPage(1);
            },
            placeholder:
              "Tìm nhân viên, lý do nghỉ...",
          }}

          selects={[
            {
              value: statusFilter,
              onChange: (
                v: string
              ) => {
                setStatusFilter(v);
                setPage(1);
              },

              options: [
                {
                  label: "Tất cả",
                  value: "ALL",
                },
                {
                  label: "Chờ duyệt",
                  value: "PENDING",
                },
                {
                  label: "Đã duyệt",
                  value: "APPROVED",
                },
                {
                  label: "Từ chối",
                  value: "REJECTED",
                },
              ],
            },
          ]}

          dateRange={{
            value: dateRange,

            onChange: (
              value
            ) => {
              setDateRange(value);
              setPage(1);
            },
          }}
        />

        {/* TABLE */}
        <div className="bg-white border rounded-xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-4">
                  Nhân viên
                </th>

                <th className="text-left p-4">
                  Thời gian nghỉ
                </th>

                <th className="text-left p-4">
                  Lý do
                </th>

                <th className="text-left p-4">
                  Trạng thái
                </th>

                <th className="text-left p-4">
                  Ngày tạo
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedLeaves.map(
                (leave: any) => (
                  <tr
                    key={leave.id}
                    onClick={() =>
                      openDetailModal(
                        leave
                      )
                    }
                    className="
                      border-t
                      cursor-pointer
                      hover:bg-gray-50
                    "
                  >
                    <td className="p-4 font-medium">
                      {
                        leave.employee
                          ?.fullName
                      }
                    </td>

                    <td className="p-4">
                      {new Date(
                        leave.startDate
                      ).toLocaleDateString(
                        "vi-VN"
                      )}{" "}
                      -{" "}
                      {new Date(
                        leave.endDate
                      ).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>

                    <td className="p-4">
                      {leave.reason ||
                        "Không có"}
                    </td>

                    <td className="p-4">
                      <span
                        className={`
                        px-3 py-1
                        rounded-full
                        text-xs font-medium
                        ${leave.status ===
                            "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : leave.status ===
                              "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                      `}
                      >
                        {getStatusText(leave.status)}
                      </span>
                    </td>

                    <td className="p-4">
                      {new Date(
                        leave.createdAt
                      ).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>
                  </tr>
                )
              )}

              {paginatedLeaves.length ===
                0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="
                    text-center
                    py-10
                    text-gray-500
                  "
                    >
                      Không có đơn nghỉ phép
                    </td>
                  </tr>
                )}
            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

      </div>
      <LeaveRequestDetailModal
        open={openDetail}
        onClose={() => {
          setOpenDetail(false);
          setSelectedLeave(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDelete}
        leaveRequest={selectedLeave}
        currentUser = {currentUser}
      />
      <LeaveRequestModal
        open={open}
        onClose={() => setOpen(false)}
      >
        <LeaveRequestForm
          form={form}
          setForm={setForm}
          loading={loading}
          onSubmit={handleCreate}
        />
      </LeaveRequestModal>
    </div>
  );
}