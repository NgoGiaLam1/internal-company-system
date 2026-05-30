"use client";

import { useMemo, useState } from "react";
import FilterBar from "@/components/ui/filter/FilterBar";
import Pagination from "@/components/ui/Pagination";

type Props = {
  leaveRequests: any[];
  role: string;
};

export default function LeaveClient({
  leaveRequests,
  role,
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

  return (
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

        chips={{
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
                  className="border-t"
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
                        ${
                          leave.status ===
                          "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : leave.status ===
                                "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {leave.status}
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
  );
}