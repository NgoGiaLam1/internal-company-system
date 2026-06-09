"use client";

import {
    Users,
    Plus,
} from "lucide-react";
import { useMemo, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import Pagination from "@/components/ui/Pagination";
import FilterBar from "@/components/ui/filter/FilterBar";
import { useRouter } from "next/navigation";

type Props = {
    employees: any[];
    roles: any[];
};

export default function EmployeesPageContent({
    employees,
    roles,
}: Props) {

    const router = useRouter();

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("ALL");

    const [quickFilter, setQuickFilter] =
        useState("ALL");

    const [page, setPage] =
        useState(1);

    const pageSize = 8;

    // =========================
    // FILTER
    // =========================

    const filteredEmployees = useMemo(() => {

        return employees.filter((employee) => {

            const keyword =
                search.toLowerCase();

            // SEARCH
            const matchSearch =
                employee.fullName
                    ?.toLowerCase()
                    .includes(keyword) ||

                employee.email
                    ?.toLowerCase()
                    .includes(keyword) ||

                employee.role?.name
                    ?.toLowerCase()
                    .includes(keyword) ||

                employee.position
                    ?.toLowerCase()
                    .includes(keyword) ||

                employee.department.name
                    ?.toLowerCase()
                    .includes(keyword);

            // STATUS
            const matchStatus =
                statusFilter === "ALL"
                    ? true
                    : employee.status === statusFilter;

            

            // QUICK FILTER
            const matchQuick =
                quickFilter === "ALL"
                    ? true
                    : employee.status ===
                    quickFilter;

            return (
                matchSearch &&
                matchStatus &&
                matchQuick
            );
        });

    }, [
        employees,
        search,
        statusFilter,
        quickFilter,
    ]);

    // =========================
    // PAGINATION
    // =========================

    const totalPages = Math.ceil(
        filteredEmployees.length /
        pageSize
    );

    const paginatedEmployees =
        filteredEmployees.slice(
            (page - 1) * pageSize,
            page * pageSize
        );

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="bg-white border rounded-2xl shadow-sm p-6">

                <div
                    className="
                        flex flex-col xl:flex-row
                        xl:items-center
                        xl:justify-between
                        gap-5
                    "
                >

                    {/* LEFT */}
                    <div>

                        <div className="flex items-center gap-4 flex-wrap">

                            <div
                                className="
                                    w-14 h-14 rounded-2xl
                                    bg-blue-100
                                    flex items-center justify-center
                                "
                            >
                                <Users
                                    className="text-blue-600"
                                    size={26}
                                />
                            </div>

                            <div>

                                <h1 className="text-3xl font-bold text-gray-800">
                                    Quản lý nhân viên
                                </h1>

                                <p className="text-sm text-gray-500 mt-1">
                                    Theo dõi nhân sự, trạng thái
                                    hoạt động và quản lý hệ thống
                                    nhân viên công ty
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}
                    <button
                        onClick={() =>
  router.push("/employees/create")
}
                        className="
                            inline-flex items-center gap-2
                            bg-blue-600 hover:bg-blue-700
                            text-white px-5 py-3
                            rounded-xl transition
                            shadow-sm w-fit
                        "
                    >
                        <Plus size={18} />
                        Thêm nhân viên
                    </button>

                </div>

            </div>

            {/* FILTER */}
            <FilterBar
                search={{
                    value: search,
                    onChange: (value) => {
                        setSearch(value);
                        setPage(1);
                    },
                    placeholder:
                        "Tìm tên, email, phòng ban, chức vụ...",
                }}

                selects={[
                    {
                        value: statusFilter,

                        onChange: (value) => {
                            setStatusFilter(value);
                            setPage(1);
                        },

                        options: [
                            {
                                label:
                                    "Tất cả trạng thái",
                                value: "ALL",
                            },

                            {
                                label:
                                    "Đang hoạt động",
                                value: "ACTIVE",
                            },

                            {
                                label:
                                    "Nghỉ phép",
                                value: "INACTIVE",
                            },

                            {
                                label:
                                    "Nghỉ chế độ",
                                value: "RESIGNED",
                            },
                        ],
                    },
                ]}
            />

            {/* TABLE */}
            <EmployeeTable
                employees={
                    paginatedEmployees
                }
                roles={roles}
            />

            {/* PAGINATION */}
            <div className="px-5 pb-5">

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />

            </div>
        </div>
    );
}