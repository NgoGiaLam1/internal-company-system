"use client";

import { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/providers/toast-provider";


type Props = {
  open: boolean;
  onClose: () => void;

  employee: any;

  roles: any[];
};

export default function EditEmployeeModal({
  open,
  onClose,
  employee,
  roles,
}: Props) {

  const { showToast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: employee.fullName || "",
    email: employee.email || "",
    password: "",
    department: employee.department || "",
    position: employee.position || "",
    roleId: employee.roleId || "",
  });

  if (!open) return null;
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/employees/${employee.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message, "error");
        return;
      }
      showToast("Cập nhật thành công");
      onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
      showToast("Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);

    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40
        flex items-center justify-center
      "
    >
      <div className="bg-white rounded-xl w-full max-w-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            Chỉnh sửa nhân viên
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>
        <EmployeeForm
          form={form}
          setForm={setForm}
          roles={roles}
          isEdit
        />
        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg
              border
            "
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              bg-blue-600 text-white
              px-4 py-2 rounded-lg
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {loading
              ? "Đang cập nhật..."
              : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}
