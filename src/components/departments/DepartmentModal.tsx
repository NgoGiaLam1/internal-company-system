type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function DepartmentModal({
  open,
  onClose,
  title,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40
        flex items-center justify-center
      "
    >
      <div
        className="
          bg-white rounded-2xl
          w-full max-w-lg
          p-6
        "
      >
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}