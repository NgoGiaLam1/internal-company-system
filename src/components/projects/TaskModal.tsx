"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import { useToast } from "../providers/toast-provider";
import { sendNotification } from "@/lib/notification";
import { useSession } from "next-auth/react";

export default function TaskModal({
  isOpen,
  onClose,
  projectId,
  members,
}: {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  members: any[];
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    assigneeId: "",
    dueDate: "",
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


  const handleSubmit = async () => {

    try {

      setLoading(true);

      const res =
        await fetch(
          `/api/projects/${projectId}/tasks`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              form
            )
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

      /*
        TEST NOTIFICATION
      */

      if (form.assigneeId) {

        try {

          await sendNotification({

            title: "Task mới",

            content:
              `Bạn được giao: ${form.title}`,

            type: "TASK",
            senderId: session?.user?.id,
            receiverIds: [
              form.assigneeId
            ]

          });

        }

        catch (err) {

          console.log(
            "notification fail",
            err
          );

        }

      }

      showToast(
        "Tạo công việc thành công"
      );

      setTimeout(() => {

        onClose();

        router.refresh();

        //window.location.reload();

      }, 1000);

    }

    catch (error) {

      console.log(error);

      showToast(
        "Có lỗi xảy ra",
        "error"
      );

    }

    finally {

      setLoading(false);

    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tạo công việc"
    >
      <div className="space-y-4">
        <input
          name="title"
          placeholder="Tên công việc"
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
          <option value="TODO">Chưa làm</option>
          <option value="IN_PROGRESS">Đang làm</option>
          <option value="DONE">Hoàn thành</option>
        </select>

        <select
          name="priority"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="LOW">Thấp</option>
          <option value="MEDIUM">Trung bình</option>
          <option value="HIGH">Cao</option>
        </select>

        <select
          name="assigneeId"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="">Chọn người phụ trách</option>

          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.fullName}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="dueDate"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

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