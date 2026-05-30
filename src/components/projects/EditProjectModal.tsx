"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  project: any;
};

export default function EditProjectModal({
  isOpen,
  onClose,
  project,
}: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "PLANNING",
  });

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name || "",
        description: project.description || "",
        status: project.status || "PLANNING",
      });
    }
  }, [project]);

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `/api/projects/${project.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        alert("Cập nhật thất bại");
        return;
      }

      onClose();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cập nhật dự án"
    >
      <div className="space-y-4">

        <input
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="w-full border p-2 rounded"
          placeholder="Tên dự án"
        />

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="w-full border p-2 rounded"
          placeholder="Mô tả"
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
          className="w-full border p-2 rounded"
        >
          <option value="PLANNING">Lên kế hoạch</option>
          <option value="IN_PROGRESS">Đang thực hiện</option>
          <option value="COMPLETED">Hoàn thành</option>
          <option value="ON_HOLD">Tạm dừng</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Lưu
          </button>
        </div>

      </div>
    </Modal>
  );
}