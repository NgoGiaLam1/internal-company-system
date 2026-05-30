"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/providers/toast-provider";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LeaveModal({
  isOpen,
  onClose,
}: Props) {
  const router = useRouter();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/leave", {
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

      showToast("Tạo đơn nghỉ thành công");

      setTimeout(() => {
        onClose();
        router.refresh();
        window.location.reload();
      }, 1000);
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
      title="Tạo đơn nghỉ phép"
    >
      <div className="space-y-4">
        <input
          type="date"
          name="startDate"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="date"
          name="endDate"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="reason"
          placeholder="Lý do nghỉ"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2">
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
            {loading ? "Đang gửi..." : "Gửi"}
          </button>
        </div>
      </div>
    </Modal>
  );
}