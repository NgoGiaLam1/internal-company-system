"use client";

import FilterSearch from "./FilterSearch";
import FilterSelect from "./FilterSelect";
import FilterDateRange from "./FilterDateRange";
import FilterChips from "./FilterChips";

type Option = {
  label: string;
  value: string;
};

type FilterBarProps = {
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };

  selects?: {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
  }[];

  dateRange?: {
    value: {
      from: string;
      to: string;
    };
    onChange: (
      value: {
        from: string;
        to: string;
      }
    ) => void;
  };

  chips?: {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
  };
};

export default function FilterBar({
  search,
  selects,
  dateRange,
  chips,
}: FilterBarProps) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">

      <div
        className="
          flex flex-col xl:flex-row
          gap-4
          xl:items-center
          xl:justify-between
        "
      >

        {/* LEFT */}
        <div className="w-full xl:w-auto">
          {search && (
            <FilterSearch
              value={search.value}
              onChange={search.onChange}
              placeholder={
                search.placeholder
              }
            />
          )}
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap gap-3">

          {selects?.map(
            (select, index) => (
              <FilterSelect
                key={index}
                value={select.value}
                onChange={
                  select.onChange
                }
                options={
                  select.options
                }
              />
            )
          )}

          {dateRange && (
            <FilterDateRange
              value={dateRange.value}
              onChange={
                dateRange.onChange
              }
            />
          )}

          {chips && (
            <FilterChips
              value={chips.value}
              onChange={
                chips.onChange
              }
              options={chips.options}
            />
          )}

        </div>

      </div>
    </div>
  );
}