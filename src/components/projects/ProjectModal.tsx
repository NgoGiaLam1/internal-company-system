"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/projects/providers/toast-provider";

export default function ProjectModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "PLANNING",
    leaderId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/employees");
        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message, "error");
        return;
      }

      showToast("Tạo dự án thành công");

      setTimeout(() => {
        onClose();
        router.refresh();
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.log(error);
      showToast("Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tạo dự án"
    >
      <div className="space-y-4">

        <input
          name="name"
          placeholder="Tên dự án"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Mô tả"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <select
          name="status"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="PLANNING">Lên kế hoạch</option>
          <option value="IN_PROGRESS">Đang thực hiện</option>
          <option value="COMPLETED">Hoàn thành</option>
          <option value="ON_HOLD">Tạm dừng</option>
        </select>
        <select
          name="leaderId"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="">Chọn trưởng dự án</option>

          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.fullName}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Đang tạo..." : "Tạo"}
          </button>
        </div>

      </div>
    </Modal>
  );
}