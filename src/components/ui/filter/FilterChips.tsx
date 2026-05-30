"use client";

type Option = {
  label: string;
  value: string;
};

type FilterChipsProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
};

export default function FilterChips({
  value,
  onChange,
  options,
}: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">

      {options.map((option) => {
        const active =
          value === option.value;

        return (
          <button
            key={option.value}
            onClick={() =>
              onChange(option.value)
            }
            className={`
              px-4 py-2 rounded-xl
              text-sm font-medium
              transition
              ${
                active
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {option.label}
          </button>
        );
      })}

    </div>
  );
}