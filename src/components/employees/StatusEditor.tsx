"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const STATUS_LABELS = {
    ACTIVE: "Đang làm việc",
    INACTIVE: "Nghỉ việc"
};

export default function StatusEditor({
    employeeId,
    currentStatus
}: {
    employeeId: string;
    currentStatus: string;
}) {

    const router = useRouter();

    const [open, setOpen] =
        useState(false);

    const [value, setValue] =
        useState(currentStatus);

    const [loading, setLoading] =
        useState(false);

    const save = async () => {

        try {

            setLoading(true);

            await fetch(
                `/api/employees/${employeeId}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        status: value
                    })
                }
            );

            router.refresh();

            setOpen(false);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="relative">

            <p className="text-sm text-gray-400">
                Trạng thái
            </p>

            <button
                onClick={() =>
                    setOpen(
                        !open
                    )
                }
                className="flex items-center gap-2 font-medium"
            >

                {
                    STATUS_LABELS[
                    value as keyof typeof STATUS_LABELS
                    ]
                }

                <ChevronDown size={16} />

            </button>

            {open && (

                <div className="absolute top-full mt-2 z-20 bg-white border rounded-xl shadow p-3 w-56">

                    <div className="space-y-2">

                        {Object.entries(
                            STATUS_LABELS
                        ).map(
                            ([key, label]) => (

                                <button
                                    key={key}
                                    className={`w-full text-left p-2 rounded-lg ${value === key
                                            ? "bg-blue-50"
                                            : "hover:bg-gray-50"
                                        }`}
                                    onClick={() =>
                                        setValue(key)
                                    }
                                >

                                    {label}

                                </button>

                            )
                        )}

                    </div>

                    <button
                        disabled={loading}
                        onClick={save}
                        className="mt-3 w-full bg-blue-600 text-white rounded-lg p-2"
                    >

                        {
                            loading
                                ? "Đang lưu..."
                                : "Xác nhận"
                        }

                    </button>

                </div>

            )}

        </div>

    );

}