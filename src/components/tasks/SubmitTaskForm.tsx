"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../providers/toast-provider";


export default function SubmitTaskForm({
  taskId,
}: {
  taskId: string;
}) {
  const router = useRouter();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [resultNote, setResultNote] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/tasks/${taskId}/submit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resultNote,
          resultUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Nộp thất bại", "error");
        return;
      }

      showToast("Nộp kết quả thành công");

      setTimeout(() => {
        router.refresh();
        window.location.reload();
      }, 800);
    } catch (error) {
      console.log(error);
      showToast("Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={resultNote}
        onChange={(e) => setResultNote(e.target.value)}
        placeholder="Ghi chú kết quả công việc..."
        className="w-full border rounded-lg p-3 text-sm"
        rows={4}
      />

      <input
        value={resultUrl}
        onChange={(e) => setResultUrl(e.target.value)}
        placeholder="Link báo cáo / Github / Drive..."
        className="w-full border rounded-lg p-3 text-sm"
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
        >
          {loading ? "Đang nộp..." : "Nộp kết quả"}
        </button>
      </div>
    </div>
  );
}