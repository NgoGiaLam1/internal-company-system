"use client";

import { useMemo, useState } from "react";
import FilterBar from "@/components/ui/filter/FilterBar";
import Pagination from "@/components/ui/Pagination";
import TaskTable from "./TaskTable";

export default function TasksClientPage({
  tasks,
  role,
}: {
  tasks: any[];
  role: string;
}) {
  const [page, setPage] = useState(1);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [
    priorityFilter,
    setPriorityFilter,
  ] = useState("ALL");

  const [dateRange, setDateRange] =
    useState({
      from: "",
      to: "",
    });

  const pageSize = 5;

  // FILTER
  const filteredTasks = useMemo(() => {
    const keyword =
      search.toLowerCase();

    return tasks.filter((task) => {
      // SEARCH
      const matchSearch =
        task.title
          ?.toLowerCase()
          .includes(keyword) ||
        task.project?.name
          ?.toLowerCase()
          .includes(keyword) ||
        task.assignee?.fullName
          ?.toLowerCase()
          .includes(keyword);

      // STATUS
      const matchStatus =
        statusFilter === "ALL"
          ? true
          : task.status ===
          statusFilter;

      // PRIORITY
      const matchPriority =
        priorityFilter === "ALL"
          ? true
          : task.priority ===
          priorityFilter;

      // DATE RANGE
      let matchDate = true;

      if (
        dateRange.from &&
        task.dueDate
      ) {
        matchDate =
          new Date(task.dueDate) >=
          new Date(dateRange.from);
      }

      if (
        dateRange.to &&
        task.dueDate
      ) {
        matchDate =
          matchDate &&
          new Date(task.dueDate) <=
          new Date(dateRange.to);
      }

      return (
        matchSearch &&
        matchStatus &&
        matchPriority &&
        matchDate
      );
    });
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
    dateRange,
  ]);

  // PAGINATION
  const totalPages = Math.ceil(
    filteredTasks.length / pageSize
  );

  const paginatedTasks =
    filteredTasks.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

  return (
    <div className="space-y-6">

      {/* FILTER */}
      <FilterBar
        search={{
          value: search,
          onChange: (v: string) => {
            setSearch(v);
            setPage(1);
          },
          placeholder:
            "Tìm kiếm công việc...",
        }}
        selects={[
          {
            value: statusFilter,
            onChange: (v: string) => {
              setStatusFilter(v);
              setPage(1);
            },
            options: [
              {
                label: "Tất cả trạng thái",
                value: "ALL",
              },
              {
                label: "Chưa bắt đầu",
                value: "TODO",
              },
              {
                label: "Đang thực hiện",
                value: "IN_PROGRESS",
              },
              {
                label: "Hoàn thành",
                value: "DONE",
              },
            ],
          },

          {
            value: priorityFilter,
            onChange: (v: string) => {
              setPriorityFilter(v);
              setPage(1);
            },
            options: [
              {
                label: "Tất cả ưu tiên",
                value: "ALL",
              },
              {
                label: "Thấp",
                value: "LOW",
              },
              {
                label: "Trung bình",
                value: "MEDIUM",
              },
              {
                label: "Cao",
                value: "HIGH",
              },
            ],
          },
        ]}
        dateRange={{
          value: dateRange,
          onChange: (value) => {
            setDateRange(value);
            setPage(1);
          },
        }}
      />

      {/* TABLE */}
      <TaskTable
        tasks={paginatedTasks}
        role={role}
      />

      {/* PAGINATION */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}