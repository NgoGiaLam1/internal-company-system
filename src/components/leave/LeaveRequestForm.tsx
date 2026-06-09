type Props = {
    form: {
        startDate: string;
        endDate: string;
        reason: string;
    };

    setForm: React.Dispatch<
        React.SetStateAction<any>
    >;

    loading: boolean;

    onSubmit: () => void;
};

export default function LeaveRequestForm({
    form,
    setForm,
    loading,
    onSubmit,
}: Props) {
    return (
        <div className="space-y-5">

            <div className="grid md:grid-cols-2 gap-4">

                <div>
                    <label
                        className="
              text-sm text-gray-600
            "
                    >
                        Ngày bắt đầu
                    </label>

                    <input
                        type="date"
                        value={form.startDate}
                        onChange={(e) =>
                            setForm((prev: any) => ({
                                ...prev,
                                startDate:
                                    e.target.value,
                            }))
                        }
                        className="
              w-full mt-1
              border rounded-lg
              px-3 py-2
            "
                    />
                </div>

                <div>
                    <label
                        className="
              text-sm text-gray-600
            "
                    >
                        Ngày kết thúc
                    </label>

                    <input
                        type="date"
                        value={form.endDate}
                        onChange={(e) =>
                            setForm((prev: any) => ({
                                ...prev,
                                endDate:
                                    e.target.value,
                            }))
                        }
                        className="
              w-full mt-1
              border rounded-lg
              px-3 py-2
            "
                    />
                </div>

            </div>

            <div>
                <label
                    className="
            text-sm text-gray-600
          "
                >
                    Lý do nghỉ
                </label>

                <textarea
                    rows={6}
                    value={form.reason}
                    onChange={(e) =>
                        setForm((prev: any) => ({
                            ...prev,
                            reason:
                                e.target.value,
                        }))
                    }
                    placeholder="
            Mô tả lý do nghỉ phép...
          "
                    className="
            w-full mt-1
            border rounded-lg
            px-3 py-2
            resize-none
          "
                />
            </div>

            <div
                className="
          flex justify-end gap-3
          pt-4 border-t
        "
            >
                <button
                    type="button"
                    className="
            px-4 py-2
            border rounded-lg
          "
                >
                    Hủy
                </button>

                <button
                    onClick={onSubmit}
                    disabled={loading}
                    className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5 py-2
            rounded-lg
            disabled:opacity-50
          "
                >
                    {loading
                        ? "Đang gửi..."
                        : "Gửi đơn"}
                </button>
            </div>

        </div>
    );
}