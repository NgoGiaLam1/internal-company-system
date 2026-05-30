"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
};

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  title = "Bạn có chắc muốn xóa mục này?",
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6">

        <h2 className="text-lg font-bold mb-3 text-gray-800">
          Xác nhận xóa
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          {title}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Hủy
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Xóa
          </button>
        </div>

      </div>
    </div>
  );
}