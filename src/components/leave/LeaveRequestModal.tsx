type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function LeaveRequestModal({
    open,
    onClose,
    children,
}: Props) {
    if (!open) return null;

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
                <div
                    className="
            flex items-center justify-between
            border-b px-6 py-4
          "
                >
                    <h2 className="text-lg font-semibold">
                        Tạo đơn nghỉ phép
                    </h2>

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

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}