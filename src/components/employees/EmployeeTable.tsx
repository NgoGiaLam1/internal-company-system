"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import EditEmployeeModal
    from "./EditEmployeeModal";
type EmployeeTableProps = {
    employees: any[];
    roles: any[];
};

export default function EmployeeTable({
    employees,
    roles,
}: EmployeeTableProps) {
    const [selectedEmployee, setSelectedEmployee] =
        useState<any>(null);
    const router = useRouter();

    const getStatusText = (status: string) => {
        switch (status) {
            case "ACTIVE": return "Đang làm việc";
            case "INACTIVE": return "Nghỉ việc";
            default: return status;
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow border overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-left text-sm text-gray-600">
                            <th className="px-6 py-4">
                                Nhân viên
                            </th>
                            <th className="px-6 py-4">
                                Số điện thoại
                            </th>
                            <th className="px-6 py-4">
                                Phòng ban
                            </th>
                            <th className="px-6 py-4">
                                Chức vụ
                            </th>
                            <th className="px-6 py-4">
                                Trạng thái
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr
                                key={employee.id}

                                onClick={() =>
                                    router.push(
                                        `/employees/${employee.id}`
                                    )
                                }

                                className="
                                    border-b
                                    text-sm
                                    hover:bg-gray-50
                                    cursor-pointer
                                    transition
                                    "
                                                                >
                                {/* User */}
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {employee.fullName}
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            {employee.email}
                                        </p>
                                    </div>
                                </td>
                                {/* Phone */}
                                <td className="px-6 py-4 text-gray-600">
                                    {employee.phone}
                                </td>
                                {/* Department */}
                                <td className="px-6 py-4 text-gray-600">
                                    {employee.department.name}
                                </td>
                                {/* Position */}
                                <td className="px-6 py-4 text-gray-600">
                                    {employee.position}
                                </td>
                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`
                                        px-2 py-1 rounded-full text-xs
                                        ${employee.status === "ACTIVE"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                            }
                                        `}
                                    >
                                        {getStatusText(employee.status)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Edit */}
            {
                selectedEmployee && (
                    <EditEmployeeModal
                        open={!!selectedEmployee}
                        onClose={() =>
                            setSelectedEmployee(null)
                        }
                        employee={selectedEmployee}
                        roles={roles}
                    />
                )
            }
        </>
    );
}
