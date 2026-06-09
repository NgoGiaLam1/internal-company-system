"use client";

import HeaderPage from "@/components/ui/HeaderPage";
import FilterBar from "@/components/ui/filter/FilterBar";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/DataTable";
import Pagination from "@/components/ui/Pagination";
import AssignMemberModal from "@/components/projects/AssignMemberModal";

import {
  FolderKanban,
  Plus,
} from "lucide-react";

export default function ProjectsPage() {
  const router = useRouter();

  const [page, setPage] =
    useState(1);

  const [projects, setProjects] =
    useState<any[]>([]);

  const [openAssign, setOpenAssign] =
    useState(false);

  const [
    selectedAssignProject,
  ] = useState<any>(null);

  // FILTER STATES
  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [dateRange, setDateRange] =
    useState({
      from: "",
      to: "",
    });

  const [quickFilter] =
    useState("ALL");

  const pageSize = 5;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          "/api/projects"
        );

        if (!res.ok) {
          console.log("API lỗi");
          return;
        }

        const data =
          await res.json();

        setProjects(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  // FILTER
  const filteredProjects =
    useMemo(() => {

      const keyword =
        search.toLowerCase();

      return projects.filter(
        (project) => {

          // SEARCH
          const matchSearch =
            !keyword ||

            project.name
              ?.toLowerCase()
              .includes(keyword) ||

            project.description
              ?.toLowerCase()
              .includes(keyword) ||

            project.status
              ?.toLowerCase()
              .includes(keyword) ||

            project.leader?.fullName
              ?.toLowerCase()
              .includes(keyword) ||

            project.members?.some(
              (member: any) =>
                member.fullName
                  ?.toLowerCase()
                  .includes(keyword)
            );

          // STATUS
          const matchStatus =
            statusFilter === "ALL"
              ? true
              : project.status ===
              statusFilter;

          // DATE RANGE
          const createdAt =
            new Date(
              project.createdAt
            );

          const fromDate =
            dateRange.from
              ? new Date(
                dateRange.from
              )
              : null;

          const toDate =
            dateRange.to
              ? new Date(
                dateRange.to
              )
              : null;

          const matchDate =
            (!fromDate ||
              createdAt >=
              fromDate) &&
            (!toDate ||
              createdAt <=
              toDate);

          // QUICK FILTER
          let matchQuick = true;

          if (
            quickFilter ===
            "NO_LEADER"
          ) {
            matchQuick =
              !project.leader;
          }

          if (
            quickFilter ===
            "NO_MEMBER"
          ) {
            matchQuick =
              project.members
                ?.length === 0;
          }

          if (
            quickFilter ===
            "COMPLETED"
          ) {
            matchQuick =
              project.status ===
              "COMPLETED";
          }

          return (
            matchSearch &&
            matchStatus &&
            matchDate &&
            matchQuick
          );
        }
      );
    }, [
      projects,
      search,
      statusFilter,
      dateRange,
      quickFilter,
    ]);

  const totalPages =
    Math.ceil(
      filteredProjects.length /
      pageSize
    );

  const data =
    filteredProjects.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

  const getStatusConfig = (
    status: string
  ) => {
    switch (status) {
      case "PLANNING":
        return {
          label: "Lên kế hoạch",
          className:
            "bg-gray-100 text-gray-600",
        };

      case "IN_PROGRESS":
        return {
          label: "Đang thực hiện",
          className:
            "bg-blue-100 text-blue-600",
        };

      case "COMPLETED":
        return {
          label: "Hoàn thành",
          className:
            "bg-green-100 text-green-600",
        };

      case "ON_HOLD":
        return {
          label: "Tạm dừng",
          className:
            "bg-amber-100 text-amber-600",
        };

      default:
        return {
          label: status,
          className:
            "bg-gray-100 text-gray-600",
        };
    }
  };

  const columns = [
    {
      header: "Dự án",
      accessor: "name",

      render: (row: any) => (
        <div>
          <p className="font-semibold text-gray-800">
            {row.name}
          </p>

          <p
            className="text-sm text-gray-500 mt-1 text-ellipsis overflow-hidden whitespace-nowrap max-w-[16vw]"
            title={row.description || "Không có mô tả"}
          >

            {row.description || "Không có mô tả"}

          </p>
        </div>
      ),
    },

    {
      header: "Trạng thái",
      accessor: "status",

      render: (row: any) => {
        const config =
          getStatusConfig(
            row.status
          );

        return (
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${config.className}`}
          >
            {config.label}
          </span>
        );
      },
    },

    {
      header: "Tiến độ",
      accessor: "progress",

      render: (row: any) => {
        const total =
          row.tasks?.length || 0;

        const done =
          row.tasks?.filter(
            (t: any) =>
              t.status ===
              "DONE"
          ).length || 0;

        const progress =
          total === 0
            ? 0
            : Math.round(
              (done / total) *
              100
            );

        const getColor = () => {
          if (progress === 100)
            return "bg-green-500";

          if (progress >= 50)
            return "bg-blue-500";

          if (progress > 0)
            return "bg-amber-500";

          return "bg-gray-300";
        };

        return (
          <div className="w-44">

            <div className="flex items-center justify-between mb-1 text-xs">

              <span className="text-gray-500">
                {done}/{total} task
              </span>

              <span className="font-medium text-gray-700">
                {progress}%
              </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">

              <div
                className={`${getColor()} h-2 rounded-full transition-all`}
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>
        );
      },
    },

    {
      header: "Trưởng dự án",
      accessor: "leader",

      render: (row: any) => (
        <div className="min-w-45">

          {row.leader ? (

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                {row.leader.fullName.charAt(0)}
              </div>

              <div className="min-w-0">

                <p className="font-medium text-gray-800 truncate">
                  {row.leader.fullName}
                </p>

                <p className="text-xs text-gray-500">
                  Project Leader
                </p>

              </div>

            </div>

          ) : (
            <span className="text-sm text-gray-400">
              Chưa có trưởng dự án
            </span>
          )}

        </div>
      ),
    },

    {
      header: "Thành viên",
      accessor: "members",

      render: (row: any) => (
        <div className="min-w-55">

          {row.members?.length > 0 ? (

            <div className="flex items-center">

              {row.members
                .slice(0, 3)
                .map((member: any, index: number) => (

                  <div
                    key={member.id}
                    title={member.fullName}
                    className="
    h-9
    w-9
    rounded-full
    overflow-hidden
    border-2
    border-white
    -ml-2
    first:ml-0
    bg-slate-200
    flex
    items-center
    justify-center
    font-medium
  "
                    style={{
                      zIndex: 10 - index,
                    }}
                  >
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.fullName}
                        className="
        h-full
        w-full
        object-cover
      "
                      />
                    ) : (
                      member.fullName
                        .charAt(0)
                        .toUpperCase()
                    )}
                  </div>

                ))}

              {row.members.length > 3 && (

                <div className="
    h-9
    w-9
    rounded-full
    bg-blue-100
    text-blue-700
    flex
    items-center
    justify-center
    text-xs
    font-medium
    border-2
    border-white
    -ml-2
    ">

                  +{row.members.length - 3}

                </div>

              )}

            </div>

          ) : (

            <span className="text-sm text-gray-400">

              Chưa có thành viên

            </span>

          )}

        </div>
      ),
    },

    {
      header: "Ngày tạo",
      accessor: "createdAt",

      render: (row: any) =>
        new Date(
          row.createdAt
        ).toLocaleDateString(
          "vi-VN"
        ),
    },
  ];

  return (
    <div className="space-y-6">

      <HeaderPage
        icon={
          <FolderKanban
            className="text-blue-600"
            size={26}
          />
        }

        title="Project Management"

        description="Quản lý toàn bộ dự án công ty"

        action={
          <button
            onClick={() =>
              router.push(
                "/projects/create"
              )
            }
            className="
              inline-flex items-center gap-2
              bg-blue-600 hover:bg-blue-700
              text-white px-5 py-3
              rounded-xl transition
              font-medium shadow-sm
            "
          >
            <Plus size={18} />
            Tạo dự án
          </button>
        }
      />

      <FilterBar
        search={{
          value: search,

          onChange: (v) => {
            setSearch(v);
            setPage(1);
          },

          placeholder:
            "Tìm theo tên dự án, mô tả, leader, thành viên...",
        }}

        selects={[
          {
            value: statusFilter,

            onChange: (v) => {
              setStatusFilter(v);
              setPage(1);
            },

            options: [
              {
                label:
                  "Tất cả trạng thái",
                value: "ALL",
              },

              {
                label:
                  "Lên kế hoạch",
                value: "PLANNING",
              },

              {
                label:
                  "Đang thực hiện",
                value: "IN_PROGRESS",
              },

              {
                label:
                  "Hoàn thành",
                value: "COMPLETED",
              },

              {
                label:
                  "Tạm dừng",
                value: "ON_HOLD",
              },
            ],
          },
        ]}

        dateRange={{
          value: dateRange,

          onChange: (v) => {
            setDateRange(v);
            setPage(1);
          },
        }}

      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={data}
        onRowClick={(row) =>
          router.push(
            `/projects/${row.id}`
          )
        }
      />

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {selectedAssignProject && (
        <AssignMemberModal
          isOpen={openAssign}
          onClose={() =>
            setOpenAssign(false)
          }
          project={
            selectedAssignProject
          }
        />
      )}

    </div>
  );
}