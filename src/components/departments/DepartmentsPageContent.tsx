"use client";

import {
  Building2,
  Plus,
} from "lucide-react";

import { useMemo, useState } from "react";

import HeaderPage from "@/components/ui/HeaderPage";

import Pagination from "@/components/ui/Pagination";
import FilterBar from "../ui/filter/FilterBar";

type Props = {
  departments: any[];
};

export default function DepartmentsPageContent({
  departments,
}: Props) {

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const pageSize = 5;

  // FILTER

  const filteredDepartments =
    useMemo(() => {

      const keyword =
        search.toLowerCase();

      return departments.filter(
        (department) =>
          department.name
            ?.toLowerCase()
            .includes(keyword) ||

          department.description
            ?.toLowerCase()
            .includes(keyword)
      );

    }, [departments, search]);

  // PAGINATION

  const totalPages = Math.ceil(
    filteredDepartments.length /
      pageSize
  );

  const paginatedDepartments =
    filteredDepartments.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

  return (
    <div className="space-y-6">

      <HeaderPage
        icon={
          <Building2
            className="text-blue-600"
            size={26}
          />
        }

        title="Quản lý phòng ban"

        description="
          Quản lý phòng ban và nhân sự công ty
        "

        action={
          <button
            className="
              inline-flex items-center gap-2
              bg-blue-600 hover:bg-blue-700
              text-white px-5 py-3
              rounded-xl transition
              font-medium shadow-sm
            "
          >
            <Plus size={18} />
            Thêm phòng ban
          </button>
        }
      />

      {/* FILTER */}

      <FilterBar
        search={{
          value: search,

          onChange: (
            value: string
          ) => {
            setSearch(value);
            setPage(1);
          },

          placeholder:
            "Tìm phòng ban...",
        }}
      />

      {/* TABLE */}

      <div
        className="
          bg-white border rounded-xl
          overflow-hidden
        "
      >

        <table className="w-full text-sm">

          <thead
            className="
              bg-gray-50 text-gray-600
            "
          >

            <tr>

              <th className="text-left p-4">
                Phòng ban
              </th>

              <th className="text-left p-4">
                Mô tả
              </th>

              <th className="text-left p-4">
                Số nhân viên
              </th>

              <th className="text-left p-4">
                Ngày tạo
              </th>

            </tr>

          </thead>

          <tbody>

            {paginatedDepartments.map(
              (department) => (
                <tr
                  key={department.id}

                  className="
                    border-t
                    hover:bg-gray-50
                    transition
                  "
                >

                  <td className="p-4 font-medium">
                    {department.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {department.description ||
                      "Không có mô tả"}
                  </td>

                  <td className="p-4">
                    <span
                      className="
                        px-3 py-1
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        text-xs font-medium
                      "
                    >
                      {
                        department
                          .employees
                          ?.length
                      }{" "}
                      nhân viên
                    </span>
                  </td>

                  <td className="p-4 text-gray-500">
                    {new Date(
                      department.createdAt
                    ).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>

                </tr>
              )
            )}

            {paginatedDepartments.length ===
              0 && (
              <tr>

                <td
                  colSpan={4}

                  className="
                    text-center py-10
                    text-gray-500
                  "
                >
                  Không có phòng ban
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