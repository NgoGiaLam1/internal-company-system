"use client";

type DateRange = {
  from: string;
  to: string;
};

type FilterDateRangeProps = {
  value: DateRange;
  onChange: (
    value: DateRange
  ) => void;
};

export default function FilterDateRange({
  value,
  onChange,
}: FilterDateRangeProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">

      <input
        type="date"
        value={value.from}
        onChange={(e) =>
          onChange({
            ...value,
            from: e.target.value,
          })
        }
        className="
          px-3 py-2.5
          border rounded-xl
          text-sm
          outline-none
          focus:ring-2 focus:ring-blue-200
        "
      />

      <span className="text-gray-400">
        →
      </span>

      <input
        type="date"
        value={value.to}
        onChange={(e) =>
          onChange({
            ...value,
            to: e.target.value,
          })
        }
        className="
          px-3 py-2.5
          border rounded-xl
          text-sm
          outline-none
          focus:ring-2 focus:ring-blue-200
        "
      />

    </div>
  );
}