"use client";

import {
  ShieldCheck,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import HeaderPage from "@/components/ui/HeaderPage";
import FilterBar from "../ui/filter/FilterBar";


type Props = {
  roles: any[];
};

export default function RolesPageContent({
  roles,
}: Props) {

  const [search, setSearch] =
    useState("");

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

  return (
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

      {/* FILTER */}

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

      {/* GRID */}

      <div
        className="
          grid grid-cols-1
          lg:grid-cols-2
          gap-5
        "
      >

        {filteredRoles.map(
          (role) => (
            <div
              key={role.id}

              className="
                bg-white border
                rounded-2xl p-5
                shadow-sm
              "
            >

              <div
                className="
                  flex items-center
                  justify-between
                  mb-4
                "
              >

                <div>

                  <h3
                    className="
                      text-lg font-semibold
                      text-gray-800
                    "
                  >
                    {role.name}
                  </h3>

                  <p
                    className="
                      text-sm text-gray-500
                    "
                  >
                    {
                      role.employees
                        ?.length
                    }{" "}
                    nhân viên
                  </p>

                </div>

                <div
                  className="
                    w-12 h-12
                    rounded-xl
                    bg-blue-100
                    flex items-center
                    justify-center
                  "
                >

                  <ShieldCheck
                    className="text-blue-600"
                    size={22}
                  />

                </div>

              </div>

              {/* Permissions */}

              <div className="flex flex-wrap gap-2">

                {role.rolePermissions.map(
                  (rp: any) => (
                    <span
                      key={rp.id}

                      className="
                        px-3 py-1
                        rounded-full
                        bg-gray-100
                        text-gray-700
                        text-xs
                      "
                    >
                      {
                        rp.permission
                          .name
                      }
                    </span>
                  )
                )}

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}