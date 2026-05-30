"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmDeleteModal from "./ConfirmDeleteModal";


import EditEmployeeModal
    from "./EditEmployeeModal";
import { useToast } from "@/components/providers/toast-provider";
type EmployeeTableProps = {
    employees: any[];
    roles: any[];
};

export default function EmployeeTable({
    employees,
    roles,
}: EmployeeTableProps) {

    const { showToast } = useToast();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [selectedEmployee, setSelectedEmployee] =
        useState<any>(null);
    const router = useRouter();
    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            const res = await fetch(`/api/employees/${deleteId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) {
                showToast(data.message, "error");
                return;
            }
            setDeleteId(null);
            showToast("Xóa nhân viên thành công", "success");
            router.refresh();
        } catch (error) {
            console.log(error);
            showToast("Có lỗi xảy ra", "error");
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
                                Phòng ban
                            </th>
                            <th className="px-6 py-4">
                                Chức vụ
                            </th>
                            <th className="px-6 py-4">
                                Role
                            </th>
                            <th className="px-6 py-4">
                                Trạng thái
                            </th>
                            <th className="px-6 py-4">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr
                                key={employee.id}
                                className="border-b text-sm hover:bg-gray-50"
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
                                {/* Department */}
                                <td className="px-6 py-4 text-gray-600">
                                    {employee.department}
                                </td>
                                {/* Position */}
                                <td className="px-6 py-4 text-gray-600">
                                    {employee.position}
                                </td>
                                {/* Role */}
                                <td className="px-6 py-4">
                                    <span
                                        className="
                                    px-2 py-1 rounded-full
                                    text-xs font-medium
                                    bg-blue-100 text-blue-600
                                    "
                                    >
                                        {employee.role.name}
                                    </span>
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
                                        {employee.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {/* Edit */}
                                        <button
                                            onClick={() =>
                                                setSelectedEmployee(employee)
                                            }
                                            className="
                                            text-blue-600
                                            hover:underline
                                            text-sm">
                                            Chỉnh sửa
                                        </button>
                                        {/* Delete */}
                                        <button
                                            onClick={() => setDeleteId(employee.id)}
                                            className="
                                            text-red-600
                                            hover:underline
                                            text-sm">
                                            Xóa
                                        </button>
                                    </div>
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
            <ConfirmDeleteModal
                open={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Bạn có chắc muốn xóa nhân viên này?"
            />
        </>
    );
}
