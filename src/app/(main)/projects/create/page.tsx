"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/providers/toast-provider";



export default function CreateProjectPage() {
  const router = useRouter();

  const { showToast } = useToast();

  const [loading, setLoading] =
    useState(false);

  const [employees, setEmployees] =
    useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "PLANNING",
    leaderId: "",
  });

  useEffect(() => {
    const fetchEmployees =
      async () => {
        try {
          const res = await fetch(
            "/api/employees"
          );

          const data =
            await res.json();

          setEmployees(data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchEmployees();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "/api/projects",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              form
            ),
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
          "Tạo dự án thành công"
        );

        setTimeout(() => {
          router.push(
            "/projects"
          );

          router.refresh();
        }, 1000);
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

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <button
            onClick={() =>
              router.back()
            }
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-3"
          >
            <ArrowLeft size={16} />

            Quay lại
          </button>

          <h1 className="text-3xl font-bold text-gray-800">
            Tạo dự án
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Khởi tạo dự án mới
            cho công ty
          </p>

        </div>

      </div>

      {/* Form */}
      <div className="bg-white border rounded-2xl shadow-sm p-6 max-w-3xl">

        <div className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên dự án
            </label>

            <input
              name="name"
              placeholder="Nhập tên dự án..."
              value={form.name}
              onChange={
                handleChange
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>

            <textarea
              name="description"
              placeholder="Mô tả dự án..."
              value={
                form.description
              }
              onChange={
                handleChange
              }
              rows={5}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>

              <select
                name="status"
                value={
                  form.status
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
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

            {/* Leader */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trưởng dự án
              </label>

              <select
                name="leaderId"
                value={
                  form.leaderId
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">
                  Chọn trưởng dự án
                </option>

                {employees.map(
                  (employee) => (
                    <option
                      key={
                        employee.id
                      }
                      value={
                        employee.id
                      }
                    >
                      {
                        employee.fullName
                      }
                    </option>
                  )
                )}
              </select>
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">

            <button
              onClick={() =>
                router.back()
              }
              className="px-5 py-2.5 border rounded-xl hover:bg-gray-50 transition"
            >
              Hủy
            </button>

            <button
              onClick={
                handleSubmit
              }
              disabled={loading}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading
                ? "Đang tạo..."
                : "Tạo dự án"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}