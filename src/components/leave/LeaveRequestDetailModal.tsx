type Props = {
    open: boolean;
    onClose: () => void;
    leaveRequest: any;

    onApprove: (
        leaveRequest: any
    ) => void;

    onReject: (leaveRequest: any) => void;

    onDelete: (
        leaveRequest: any
    ) => void;

    loading?: boolean;
    currentUser: any;
};

export default function LeaveRequestDetailModal({
    open,
    onClose,
    leaveRequest,
    onApprove,
    onReject,
    onDelete,
    loading,
    currentUser
}: Props) {
    if (!open || !leaveRequest) {
        return null;
    }

    const statusMap = {
        PENDING: {
            label: "Chờ duyệt",
            className:
                "bg-yellow-100 text-yellow-700",
        },

        APPROVED: {
            label: "Đã duyệt",
            className:
                "bg-green-100 text-green-700",
        },

        REJECTED: {
            label: "Từ chối",
            className:
                "bg-red-100 text-red-700",
        },
    };

    const status =
        statusMap[
        leaveRequest.status as keyof typeof statusMap
        ];

    return (
        <div
            className="
        fixed inset-0 z-50
        bg-black/40
        flex items-center justify-center
        p-4
      "
        >
            <div
                className="
          bg-white rounded-2xl
          w-full max-w-3xl
          shadow-xl
        "
            >
                {/* HEADER */}

                <div
                    className="
            flex items-center justify-between
            border-b px-6 py-4
          "
                >
                    <div>

                        <h2
                            className="
                text-lg font-semibold
              "
                        >
                            Chi tiết đơn nghỉ phép
                        </h2>

                        <p
                            className="
                text-sm text-gray-500
              "
                        >
                            Xem thông tin đơn nghỉ phép
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="
              text-gray-500
              hover:text-gray-700
            "
                    >
                        ✕
                    </button>

                </div>

                {/* CONTENT */}

                <div className="p-6 space-y-6">

                    <div
                        className="
              grid md:grid-cols-2
              gap-5
            "
                    >

                        <Info
                            label="Người gửi"
                            value={
                                leaveRequest.employee
                                    ?.fullName
                            }
                        />

                        <div>

                            <p
                                className="
                  text-sm text-gray-500
                  mb-1
                "
                            >
                                Trạng thái
                            </p>

                            <span
                                className={`
                  px-3 py-1 rounded-full
                  text-xs font-medium
                  ${status.className}
                `}
                            >
                                {status.label}
                            </span>

                        </div>

                        <Info
                            label="Email"
                            value={
                                leaveRequest.employee
                                    ?.email
                            }
                        />
                        <Info
                            label="Ngày bắt đầu"
                            value={new Date(
                                leaveRequest.startDate
                            ).toLocaleDateString(
                                "vi-VN"
                            )}
                        />

                        <Info
                            label="Ngày kết thúc"
                            value={new Date(
                                leaveRequest.endDate
                            ).toLocaleDateString(
                                "vi-VN"
                            )}
                        />

                        <Info
                            label="Ngày gửi đơn"
                            value={new Date(
                                leaveRequest.createdAt
                            ).toLocaleDateString(
                                "vi-VN"
                            )}
                        />

                    </div>

                    {/* REASON */}

                    <div>

                        <p
                            className="
                text-sm text-gray-500
                mb-2
              "
                        >
                            Lý do nghỉ phép
                        </p>

                        <div
                            className="
                border rounded-xl
                p-4 bg-gray-50
                whitespace-pre-wrap
                min-h-[120px]
              "
                        >
                            {leaveRequest.reason ||
                                "Không có lý do"}
                        </div>

                    </div>

                </div>

                {/* FOOTER */}
                <div
                    className="
    border-t px-6 py-4
    flex justify-between
  "
                >
                    <div>

                        {leaveRequest.status ===
                            "PENDING" && leaveRequest.employeeId === currentUser.id && (
                                <button
                                    onClick={() =>
                                        onDelete(
                                            leaveRequest
                                        )
                                    }
                                    disabled={loading}
                                    className="
          px-4 py-2
          rounded-xl
          bg-red-600
          text-white
          hover:bg-red-700
          disabled:opacity-50
        "
                                >
                                    Xóa đơn
                                </button>
                            )}

                    </div>

                    <div className="flex gap-2">

                        {leaveRequest.status ===
                            "PENDING" && currentUser.role === "ADMIN" && (
                                <div className="flex gap-2">

                                    <button
                                        onClick={() =>
                                            onReject(
                                                leaveRequest
                                            )
                                        }
                                        className="
        px-4 py-2
        rounded-xl
        bg-red-600
        hover:bg-red-700
        text-white
        transition
      "
                                    >
                                        Từ chối
                                    </button>

                                    <button
                                        onClick={() =>
                                            onApprove(
                                                leaveRequest
                                            )
                                        }
                                        className="
        px-4 py-2
        rounded-xl
        bg-green-600
        hover:bg-green-700
        text-white
        transition
      "
                                    >
                                        Duyệt đơn
                                    </button>

                                </div>
                            )}
                        <button
                            onClick={onClose}
                            className="
        px-4 py-2
        border rounded-xl
        hover:bg-gray-50
      "
                        >
                            Đóng
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div>
            <p
                className="
          text-sm text-gray-500
          mb-1
        "
            >
                {label}
            </p>

            <p
                className="
          font-medium text-gray-900
        "
            >
                {value}
            </p>
        </div>
    );
}