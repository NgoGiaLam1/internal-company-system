"use client";

import { useState } from "react";

import {
  Crown,
  Users,
  User2,
} from "lucide-react";

import ManageMembersModal from "./ManageMembersModal";

export default function ProjectMembersSection({
  project,
  employees,
}: {
  project: any;
  employees: any[];
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border p-6">

        {/* Header */}
        <div className="mb-6">

          <div>

            <h2 className="text-xl font-semibold text-gray-800">
              Thành viên dự án
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Quản lý nhân sự tham gia dự án
            </p>

          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5">

            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl text-sm text-gray-700 w-fit">

              <Users size={16} />

              {project.members.length} thành viên

            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-xl text-sm whitespace-nowrap"
            >
              Quản lý thành viên
            </button>

          </div>

        </div>

        {/* Leader */}
        <div className="mb-8">

          <p className="text-sm font-semibold text-gray-500 mb-3">
            Trưởng dự án
          </p>

          {project.leader ? (
            <div className="border border-yellow-200 bg-yellow-50 rounded-2xl p-4 flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center">

                <Crown
                  size={20}
                  className="text-yellow-700"
                />

              </div>

              <div>

                <p className="font-semibold text-gray-800">
                  {
                    project.leader
                      .fullName
                  }
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Project Leader
                </p>

              </div>

            </div>
          ) : (
            <div className="border border-dashed rounded-2xl py-8 text-center text-sm text-gray-400">
              Chưa có trưởng dự án
            </div>
          )}

        </div>

        {/* Members */}
        <div>

          <div className="flex items-center justify-between mb-4">

            <p className="text-sm font-semibold text-gray-500">
              Thành viên tham gia
            </p>

            <span className="text-xs text-gray-400">
              Team Workspace
            </span>

          </div>

          {project.members.length >
            0 ? (
            <div className="grid grid-cols-2 gap-4">

              {project.members.map(
                (member: any) => (
                  <div
                    key={member.id}
                    className="border rounded-2xl p-4 hover:shadow-md transition min-w-0 overflow-hidden"
                  >

                    <div className="flex flex-col items-center text-center">

                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">

                        <User2
                          size={22}
                          className="text-blue-700"
                        />

                      </div>

                      {/* Name */}
                      <p
                        className="font-medium text-gray-800 text-sm leading-snug line-clamp-2"
                        title={member.fullName}
                      >
                        {member.fullName}
                      </p>

                      {/* Position */}
                      <p
                        className="text-xs text-gray-500 mt-1 truncate w-full"
                        title={member.position}
                      >
                        {member.position || "Nhân viên"}
                      </p>

                      {/* Department */}
                      <span
                        className="mt-4 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 max-w-full truncate"
                        title={member.department}
                      >
                        {member.department || "No Department"}
                      </span>

                    </div>

                  </div>
                )
              )}

            </div>
          ) : (
            <div className="border border-dashed rounded-2xl py-10 text-center text-sm text-gray-400">
              Chưa có thành viên tham gia
            </div>
          )}

        </div>

      </div>

      <ManageMembersModal
        isOpen={open}
        onClose={() =>
          setOpen(false)
        }
        project={project}
        employees={employees}
      />
    </>
  );
}