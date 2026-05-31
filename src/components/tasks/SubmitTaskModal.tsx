"use client";

import { useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    taskId: string;
};

export default function SubmitTaskModal({
    open,
    onClose,
    taskId,
}: Props) {

    const [note, setNote] =
        useState("");

    const [file, setFile] =
        useState<File | null>(
            null
        );

    const [loading, setLoading] =
        useState(false);

    if (!open) return null;

    const handleSubmit =
        async () => {

            if (loading) return;

            if (
                !note.trim() &&
                !file
            ) {

                alert(
                    "Thêm ghi chú hoặc file"
                );

                return;

            }

            try {

                setLoading(true);

                const formData =
                    new FormData();

                formData.append(
                    "note",
                    note.trim()
                );

                if (file) {

                    formData.append(
                        "file",
                        file
                    );

                }

                const res =
                    await fetch(

                        `/api/tasks/${taskId}/submit`,

                        {

                            method: "POST",

                            body: formData,

                        }

                    );

                const data =
                    await res.json();

                if (!res.ok) {

                    throw new Error(

                        data.error ||

                        "Submit failed"

                    );

                }

                setNote("");

                setFile(null);

                onClose();

                /*
                  refresh server component
                  để task DONE hiện ngay
                */

                window.location.reload();
            }

            catch (error) {

                console.error(
                    error
                );

                alert(

                    error instanceof Error

                        ? error.message

                        : "Submit failed"

                );

            }

            finally {

                setLoading(false);

            }

        };

    return (

        <div className="
      fixed inset-0 z-50

      bg-black/40

      flex
      items-center
      justify-center

      p-4
    ">

            <div className="
        bg-white

        rounded-2xl

        w-full
        max-w-lg

        shadow-xl
      ">

                {/* header */}

                <div className="
          px-6
          py-5
          border-b
        ">

                    <h2 className="
            font-semibold
            text-lg
          ">

                        Xác nhận hoàn thành công việc

                    </h2>

                    <p className="
            text-sm
            text-gray-500
            mt-1
          ">

                        Bạn có thể đính kèm file
                        kết quả hoặc ghi chú.

                    </p>

                </div>


                {/* body */}

                <div className="
          p-6
          space-y-5
        ">

                    <textarea

                        value={note}

                        onChange={(e) =>
                            setNote(
                                e.target.value
                            )
                        }

                        placeholder="
              Ghi chú kết quả...
            "

                        className="
              w-full

              border

              rounded-xl

              p-3

              min-h-32

              resize-none
            "

                    />


                    <div>

                        <input

                            type="file"

                            onChange={(e) =>

                                setFile(

                                    e.target
                                        .files?.[0]
                                    || null

                                )

                            }

                        />

                        {file && (

                            <p className="
                text-sm
                mt-2
                text-gray-500
              ">

                                {file.name}

                            </p>

                        )}

                    </div>

                </div>


                {/* footer */}

                <div className="
          border-t

          px-6
          py-4

          flex
          justify-end
          gap-3
        ">

                    <button

                        onClick={onClose}

                        className="
              px-4
              py-2

              rounded-xl

              border
            "

                    >

                        Hủy

                    </button>


                    <button

                        disabled={loading}

                        onClick={
                            handleSubmit
                        }

                        className="
              px-5
              py-2

              rounded-xl

              bg-green-600
              text-white
            "

                    >

                        {

                            loading
                                ? "Đang gửi..."
                                : "Hoàn thành"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}