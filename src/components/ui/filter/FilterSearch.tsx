"use client";

import { Search } from "lucide-react";

type FilterSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function FilterSearch({
  value,
  onChange,
  placeholder = "Tìm kiếm...",
}: FilterSearchProps) {
  return (
    <div className="relative w-full xl:w-96">
      <Search
        size={18}
        className="
          absolute left-3 top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full border rounded-xl
          pl-10 pr-4 py-2.5
          outline-none
          focus:ring-2 focus:ring-blue-200
        "
      />
    </div>
  );
}