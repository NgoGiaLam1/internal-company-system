"use client";

import { Pencil, Settings, ShieldCheck, Trash2 } from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import HeaderPage from "@/components/ui/HeaderPage";
import FilterBar from "../ui/filter/FilterBar";
import PermissionsModal from "./PermissionsModal";
import useRolePermissions from "./useRolePermissions";
import { ROLE_LABELS } from "./labels";

type Props = {
  roles: any[];
};

export default function RolesPageContent({
  roles,
}: Props) {

  const [search, setSearch] =
    useState("");

  // Modal state
  const [permissionModal, setPermissionModal] =
    useState(false);

  const [selectedRole, setSelectedRole] =
    useState<any>(null);

  const [
    selectedPermissions,

    setSelectedPermissions,

  ] = useState<string[]>([]);

  const {
    permissions,
  } = useRolePermissions(
    selectedRole?.id
  );

  // =========================
  // FILTER
  // =========================
  const filteredRoles =
    useMemo(() => {

      const keyword =
        search.toLowerCase();

      return roles.filter(
        (role) =>
          role.name
            ?.toLowerCase()
            .includes(keyword)
      );

    }, [roles, search]);

  const onSave = async () => {

    await fetch(

      `/api/roles/${selectedRole.id}/permissions`,

      {

        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          permissionIds:
            selectedPermissions,

        }),

      }

    );

    setPermissionModal(
      false
    )

  };

  return (
    <>
      <div className="space-y-6">

        <HeaderPage
          icon={
            <ShieldCheck
              className="text-blue-600"
              size={26}
            />
          }
          title="Phân quyền hệ thống"
          description="
          Quản lý vai trò và quyền truy cập
        "
        />

        <FilterBar
          search={{
            value: search,

            onChange: (
              value: string
            ) =>
              setSearch(value),

            placeholder:
              "Tìm role...",
          }}
        />

        {/* TABLE */}

        <div className="bg-white border rounded-xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600">

              <tr>

                <th className="text-left p-4">
                  Chức vụ
                </th>

                <th className="text-left p-4">
                  Mô tả
                </th>

                <th className="text-left p-4">
                  Số quyền
                </th>
                
                <th className="text-left p-4">
                  Số nhân viên
                </th>

                <th className="text-left p-4">
                  Hành động
                </th>

              </tr>

            </thead>

            <tbody>

              {
                filteredRoles.map(
                  (role: any) => (

                    <tr
                      key={role.id}
                      className="border-t"
                    >

                      <td className="p-4 font-medium">

                        {
                          ROLE_LABELS[
                          role.name
                          ] || role.name
                        }

                      </td>

                      <td className="p-4">

                        {
                          role.description ||
                          "Không có"
                        }

                      </td>

                      <td className="p-4">

                        <span
                          className="
                    px-3 py-1
                    rounded-full
                    text-xs
                    font-medium
                    bg-blue-100
                    text-blue-700
                  "
                        >

                          {
                            role._count.rolePermissions
                          } quyền

                        </span>

                      </td>

                      <td className="p-4">

                        <span
                          className="
                    px-3 py-1
                    rounded-full
                    text-xs
                    font-medium
                    bg-blue-100
                    text-blue-700
                  "
                        >

                          {
                            role._count.employees
                          } nhân viên

                        </span>

                      </td>

                      <td className="p-4">

                        <div className="flex items-center gap-2">

                          {/* Edit */}

                          <button
                            className="
        p-2
        rounded-lg
        border
        hover:bg-blue-50
        transition
      "
                          >

                            <Pencil size={16} />

                          </button>

                          {/* Permissions / Settings */}
                          <button
                            className="
    p-2
    rounded-lg
    border
    hover:bg-gray-100
    transition
  "

                            onClick={() => {

                              setSelectedRole(
                                role
                              );

                              setSelectedPermissions(
                                role.permissions || []
                              );

                              setPermissionModal(
                                true
                              );

                            }}
                          >

                            <Settings size={16} />

                          </button>

                          {/* Delete */}

                          <button
                            className="
        p-2
        rounded-lg
        border
        hover:bg-red-50
        text-red-600
        transition
      "
                          >

                            <Trash2 size={16} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )
              }

              {
                filteredRoles.length === 0 && (

                  <tr>

                    <td
                      colSpan={4}
                      className="
                text-center
                py-10
                text-gray-500
              "
                    >

                      Không có role

                    </td>

                  </tr>

                )
              }

            </tbody>

          </table>

        </div>

      </div>
      <PermissionsModal

        open={
          permissionModal
        }

        role={
          selectedRole
        }

        permissions={
          permissions
        }

        selectedPermissions={
          selectedPermissions
        }

        setSelectedPermissions={
          setSelectedPermissions
        }

        onClose={() =>
          setPermissionModal(
            false
          )
        }

        onSave={onSave}

      />
    </>
  );
}