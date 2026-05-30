"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LargeModal from "../ui/LargeModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  employees: any[];
};

export default function ManageMembersModal({
  isOpen,
  onClose,
  project,
  employees,
}: Props) {
  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState<string[]>(
    project.members.map((m: any) => m.id)
  );

  const [leaderId, setLeaderId] = useState<string>(
    project.leaderId || ""
  );

  const handleToggleMember = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (!leaderId) {
      alert("Dự án bắt buộc phải có trưởng nhóm");
      return;
    }

    // đảm bảo leader cũng là member
    const finalMembers = selectedIds.includes(leaderId)
      ? selectedIds
      : [...selectedIds, leaderId];

    const res = await fetch(`/api/projects/${project.id}/members`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberIds: [...new Set(finalMembers)],
        leaderId,
      }),
    });

    if (!res.ok) {
      alert("Cập nhật thất bại");
      return;
    }

    onClose();
    router.refresh();
    window.location.reload();
  };

  return (
    <LargeModal
      isOpen={isOpen}
      onClose={onClose}
      title="Quản lý thành viên dự án"
    >
      <MemberTableContent
        employees={employees}
        selectedIds={selectedIds}
        leaderId={leaderId}
        setLeaderId={setLeaderId}
        handleToggleMember={handleToggleMember}
        handleSave={handleSave}
        onClose={onClose}
        router={router}
      />
    </LargeModal>
  );
  function MemberTableContent({
    employees,
    selectedIds,
    leaderId,
    setLeaderId,
    handleToggleMember,
    handleSave,
    onClose,
    router,
  }: any) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const pageSize = 5;

    const filtered = employees.filter((employee: any) =>
      employee.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / pageSize);

    const paginated = filtered.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return (
      <div className="space-y-4">
        {/* Search */}
        <input
          placeholder="Tìm nhân viên..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full border rounded px-3 py-2"
        />

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Họ tên</th>
                <th className="p-3 text-left">Phòng ban</th>
                <th className="p-3 text-left">Chức vụ</th>
                <th className="p-3 text-center">Tham gia</th>
                <th className="p-3 text-center">Trưởng nhóm</th>
                <th className="p-3 text-center">Công cụ</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((employee: any) => (
                <tr
                  key={employee.id}
                  className="border-t"
                >
                  <td className="p-3">
                    {employee.fullName}
                  </td>

                  <td className="p-3">
                    {employee.department}
                  </td>

                  <td className="p-3">
                    {employee.position}
                  </td>

                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(employee.id)}
                      onChange={() =>
                        handleToggleMember(employee.id)
                      }
                    />
                  </td>

                  <td className="p-3 text-center">
                    <input
                      type="radio"
                      name="leader"
                      checked={leaderId === employee.id}
                      onChange={() => {
                        setLeaderId(employee.id);

                        if (!selectedIds.includes(employee.id)) {
                          handleToggleMember(employee.id);
                        }
                      }}
                    />
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() =>
                        router.push(`/employees/${employee.id}`)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          {Array.from(
            { length: totalPages },
            (_, i) => i + 1
          ).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded border ${page === p
                  ? "bg-blue-500 text-white"
                  : ""
                }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Hủy
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    );
  }
}