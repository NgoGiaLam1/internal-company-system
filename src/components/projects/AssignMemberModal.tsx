"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  project: any;
};

export default function AssignMemberModal({
  isOpen,
  onClose,
  project,
}: Props) {
  const router = useRouter();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chi tiết thành viên"
    >
      <div className="space-y-4">

        {/* Trưởng dự án */}
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2">
            Trưởng dự án
          </p>

          {project.leader ? (
            <div className="border rounded-lg p-3 bg-blue-50">
              <p className="font-medium text-blue-700">
                {project.leader.fullName}
              </p>
              <p className="text-sm text-gray-500">
                {project.leader.position}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Chưa có trưởng dự án
            </p>
          )}
        </div>

        {/* Thành viên */}
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2">
            Thành viên tham gia
          </p>

          {project.members?.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {project.members.map((member: any) => (
                <div
                  key={member.id}
                  className="border rounded-lg p-3"
                >
                  <p className="font-medium">
                    {member.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {member.position}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Chưa có thành viên nào
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Đóng
          </button>

          <button
            onClick={() => {
              onClose();
              router.push(`/projects/${project.id}`);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Chỉnh sửa
          </button>
        </div>

      </div>
    </Modal>
  );
}