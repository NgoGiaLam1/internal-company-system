type Props = {
    form: {
        name: string;
        description: string;
    };

    setForm: React.Dispatch<
        React.SetStateAction<any>
    >;

    onSubmit: () => void;
    onDelete?: () => void;
    loading: boolean;

    isEdit?: boolean;
};

export default function DepartmentForm({
    form,
    setForm,
    onDelete,
    onSubmit,
    loading,
    isEdit,
}: Props) {
    return (
        <div className="space-y-4">
            <div>
                <label>Tên phòng ban</label>

                <input
                    value={form.name}
                    onChange={(e) =>
                        setForm((prev: any) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                    className="
            w-full border rounded-lg
            px-3 py-2
          "
                />
            </div>

            <div>
                <label>Mô tả</label>

                <textarea
                    value={form.description}
                    onChange={(e) =>
                        setForm((prev: any) => ({
                            ...prev,
                            description:
                                e.target.value,
                        }))
                    }
                    className="
            w-full border rounded-lg
            px-3 py-2
          "
                />
            </div>

            <div className="flex justify-between gap-2">
                <div>
                    {isEdit && (
                        <button
                            type="button"
                            onClick={onDelete}
                            disabled={loading}
                            className="
          px-4 py-2 rounded-lg
          bg-red-600 text-white
          hover:bg-red-700
          disabled:opacity-50
        "
                        >
                            Xóa
                        </button>
                    )}
                </div>

                <button
                    onClick={onSubmit}
                    disabled={loading}
                    className="
      bg-blue-600 text-white
      px-4 py-2 rounded-lg
      hover:bg-blue-700
      disabled:opacity-50
    "
                >
                    {loading
                        ? "Đang lưu..."
                        : isEdit
                            ? "Cập nhật"
                            : "Tạo mới"}
                </button>
            </div>
        </div>
    );
}