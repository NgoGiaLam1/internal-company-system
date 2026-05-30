import { prisma } from "@/lib/prisma";
import HeaderPage from "@/components/ui/HeaderPage";

export default async function PermissionsPage() {
  const roles = await prisma.tblRole.findMany({
    include: {
      rolePermissions: {
        include: {
          permission: true,
        },
      },
    },

    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="space-y-6">

      <HeaderPage
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-600"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
          </svg>
        }
        title="Phân quyền hệ thống"
        description="Quản lý quyền hạn theo từng vai trò"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {roles.map((role) => (
          <div
            key={role.id}
            className="
              bg-white border rounded-2xl
              shadow-sm p-5
            "
          >
            <div className="mb-4">

              <h2 className="text-lg font-bold text-gray-800">
                {role.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {role.description || "Không có mô tả"}
              </p>

            </div>

            <div className="space-y-2">

              {role.rolePermissions.length > 0 ? (
                role.rolePermissions.map((rp) => (
                  <div
                    key={rp.id}
                    className="
                      px-3 py-2 rounded-xl
                      bg-blue-50
                      text-blue-700
                      text-sm font-medium
                    "
                  >
                    {rp.permission.name}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  Chưa có quyền nào
                </p>
              )}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}