"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Pencil,
  Trash2,
  Save,
} from "lucide-react";

export default function ProjectSettingsSection({
  project,
}: {
  project: any;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      name: project.name || "",
      description:
        project.description || "",
      status:
        project.status || "PLANNING",
    });

  const handleUpdate =
    async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/projects/${project.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        if (!res.ok) {
          alert(
            "Cập nhật thất bại"
          );
          return;
        }

        router.refresh();

        alert(
          "Cập nhật thành công"
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async () => {
      const confirmDelete =
        confirm(
          "Bạn chắc chắn muốn xóa dự án?"
        );

      if (!confirmDelete) return;

      try {
        const res = await fetch(
          `/api/projects/${project.id}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) {
          alert("Xóa thất bại");
          return;
        }

        router.push("/projects");
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">

        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <Pencil
            size={18}
            className="text-blue-600"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Cài đặt dự án
          </h2>

          <p className="text-sm text-gray-500">
            Chỉnh sửa thông tin chung
          </p>
        </div>

      </div>

      {/* Form */}
      <div className="space-y-4">

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Tên dự án
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Mô tả
          </label>

          <textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Trạng thái
          </label>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="PLANNING">
              Lên kế hoạch
            </option>

            <option value="IN_PROGRESS">
              Đang thực hiện
            </option>

            <option value="COMPLETED">
              Hoàn thành
            </option>

            <option value="ON_HOLD">
              Tạm dừng
            </option>
          </select>
        </div>

      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl px-4 py-3 flex items-center justify-center gap-2"
        >
          <Save size={16} />

          {loading
            ? "Đang lưu..."
            : "Lưu thay đổi"}
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-50 hover:bg-red-100 transition text-red-600 rounded-xl px-4 py-3 flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />

          Xóa dự án
        </button>

      </div>

    </div>
  );
}