'use client';
import { useState } from "react";
import SubmitTaskModal from "./SubmitTaskModal";
import { FileText } from "lucide-react";
import { getFileIcon } from "../ui/FileIcon";

export default function TaskInfo({ task }: { task: any }) {
    const [openSubmit, setOpenSubmit] = useState(false);

    return (
        <>
            <div className="bg-white rounded-xl shadow border p-6">

                <div className="
    flex
    items-center
    justify-between
    mb-6
  ">

                    <h2 className="text-lg font-semibold">

                        Thông tin công việc

                    </h2>


                    {task.status !== "DONE" && (

                        <button
                            onClick={() => setOpenSubmit(true)}

                            className="
          px-4
          py-2

          rounded-xl

          bg-green-600
          text-white

          text-sm
          font-medium

          hover:opacity-90
        "

                        >

                            Hoàn thành công việc

                        </button>

                    )}

                </div>



                <div className="space-y-4">

                    {/* PROJECT */}

                    <div className="
      flex
      items-start
      justify-between
      gap-4

      pb-4
      border-b
    ">

                        <span className="
        text-gray-500
        shrink-0
      ">

                            Dự án

                        </span>

                        <span className="
        font-medium
        text-right
      ">

                            {task.project.name}

                        </span>

                    </div>


                    {/* ASSIGNEE */}

                    <div className="
      flex
      items-start
      justify-between
      gap-4

      pb-4
      border-b
    ">

                        <span className="text-gray-500">

                            Người phụ trách

                        </span>

                        <span className="
        font-medium
        text-right
      ">

                            {task.assignee?.fullName ||
                                "Chưa giao"}

                        </span>

                    </div>


                    {/* DEADLINE */}

                    <div className="
      flex
      items-start
      justify-between
      gap-4

      pb-4
      border-b
    ">

                        <span className="text-gray-500">

                            Deadline

                        </span>

                        <span className="
        font-medium
        text-right
      ">

                            {task.dueDate
                                ? new Date(
                                    task.dueDate
                                ).toLocaleDateString(
                                    "vi-VN"
                                )
                                : "Chưa có"}

                        </span>

                    </div>


                    {/* STATUS */}

                    <div className="
      flex
      items-start
      justify-between
      gap-4

      pb-4
      border-b
    ">

                        <span className="text-gray-500">

                            Trạng thái

                        </span>

                        <span
                            className={`
          px-3
          py-1

          rounded-full

          text-xs
          font-medium

          ${task.status === "DONE"
                                    ? "bg-green-100 text-green-700"
                                    : task.status === "IN_PROGRESS"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-700"
                                }
        `}
                        >

                            {task.status === "TODO"
                                ? "Chưa bắt đầu"
                                : task.status === "IN_PROGRESS"
                                    ? "Đang thực hiện"
                                    : "Hoàn thành"}

                        </span>

                    </div>


                    {/* CREATED */}

                    <div className="
      flex
      items-start
      justify-between
      gap-4
    ">

                        <span className="text-gray-500">

                            Ngày tạo

                        </span>

                        <span className="
        font-medium
        text-right
      ">

                            {new Date(
                                task.createdAt
                            ).toLocaleDateString(
                                "vi-VN"
                            )}

                        </span>

                    </div>

                    {/* SUBMISSION */}

                    {task.status === "DONE" && (

                        <div className="
    pt-4
    border-t

    space-y-4
  ">

                            <div className="
      flex
      items-start
      justify-between
      gap-4
    ">

                                <span className="text-gray-500">

                                    Ngày nộp

                                </span>

                                <span className="
        font-medium
        text-right
      ">

                                    {

                                        task.submittedAt

                                            ? new Date(
                                                task.submittedAt
                                            ).toLocaleString(
                                                "vi-VN"
                                            )

                                            : "Không có"

                                    }

                                </span>

                            </div>



                            <div className="
      flex
      items-start
      justify-between
      gap-4
    ">

                                <span className="text-gray-500">

                                    Ghi chú

                                </span>

                                <span className="
        font-medium
        text-right

        whitespace-pre-wrap
        break-words

        max-w-[220px]
      ">

                                    {

                                        task.resultNote ||

                                        "Không có"

                                    }

                                </span>

                            </div>
                            <div className="
  flex
  items-start
  justify-between
  gap-4
">

                                <span className="text-gray-500">

                                    File kết quả

                                </span>

                                {

                                    task.resultUrl ? (

                                        <a

                                            href={task.resultUrl}

                                            target="_blank"

                                            className="
  max-w-[220px]

  px-3
  py-2

  border
  rounded-xl

  hover:bg-gray-50

  flex
  items-center
  gap-2

  min-w-0
 "

                                            title={
                                                task.resultFileName ||
                                                "Unknown file"
                                            }

                                        >

                                            <span className="
  shrink-0
 ">

                                                {

                                                    getFileIcon(
                                                        task.resultFileName
                                                    )

                                                }

                                            </span>

                                            <span className="
  truncate
  overflow-hidden
  whitespace-nowrap
  min-w-0
 ">

                                                {

                                                    task.resultFileName ||

                                                    "Unknown file"

                                                }

                                            </span>

                                        </a>

                                    ) : (

                                        <span>

                                            Không có

                                        </span>

                                    )

                                }

                            </div>
                        </div>

                    )}
                </div>

            </div>
            <SubmitTaskModal
                open={openSubmit}
                onClose={() => setOpenSubmit(false)}
                taskId={task.id}
            />
        </>
    );
}