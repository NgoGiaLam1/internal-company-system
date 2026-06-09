"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderPage from "@/components/ui/HeaderPage";
import EmployeeForm from "./EmployeeForm";
import { useToast }
    from "@/components/providers/toast-provider";
import { UserPlus } from "lucide-react";

type Props = {
    roles: any[];
    departments: any[];
};

export default function CreateEmployeePageContent({
    roles,
    departments,
}: Props) {

    const router = useRouter();

    const { showToast } =
        useToast();

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] =
        useState({
            fullName: "",
            email: "",
            password: "",
            phone: "",
            avatarUrl: "",
            position: "",
            roleId: roles[0]?.id || "",
            departmentId:
                departments[0]?.id || "",
            status: "ACTIVE",
        });

    const validate = () => {
        if (!form.fullName.trim()) {
            return "Vui lòng nhập họ tên";
        }

        if (!form.email.trim()) {
            return "Vui lòng nhập email";
        }

        if (!form.password.trim()) {
            return "Vui lòng nhập mật khẩu";
        }

        return null;
    };

    const handleSubmit = async () => {
        const error = validate();

        if (error) {
            showToast(error, "error");
            return;
        }
        try {

            setLoading(true);

            const res = await fetch(
                "/api/employees",
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
                "Tạo nhân viên thành công",
                "success"
            );

            router.push("/employees");

            router.refresh();

        } catch (error) {

            console.log(error);

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
                    <UserPlus
                        className="text-blue-600"
                        size={26}
                    />
                }
                title="Thêm nhân viên"
                description="
          Tạo tài khoản nhân viên mới
          cho hệ thống
        "
            />

            <div
                className="
          bg-white border rounded-2xl
          shadow-sm p-6
        "
            >

                <EmployeeForm
                    form={form}
                    setForm={setForm}
                    roles={roles}
                    departments={departments}
                />

                <div
                    className="
            flex justify-end gap-3
            mt-6 pt-6 border-t
          "
                >

                    <button
                        onClick={() =>
                            router.back()
                        }
                        className="
              px-4 py-2 rounded-xl
              border hover:bg-gray-50
            "
                    >
                        Hủy
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="
              bg-blue-600 hover:bg-blue-700
              text-white
              px-5 py-2 rounded-xl
              disabled:opacity-50
            "
                    >
                        {loading
                            ? "Đang tạo..."
                            : "Tạo nhân viên"}
                    </button>

                </div>

            </div>

        </div>
    );
}