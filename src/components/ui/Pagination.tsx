"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // =========================
  // Generate pages
  // =========================

  const generatePages = () => {
    const pages: (number | string)[] = [];

    // <= 5 pages
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    // Always show first
    pages.push(1);

    // Near start
    if (currentPage <= 3) {
      pages.push(2, 3, 4);
      pages.push("...");
    }

    // Near end
    else if (currentPage >= totalPages - 2) {
      pages.push("...");

      for (
        let i = totalPages - 3;
        i < totalPages;
        i++
      ) {
        pages.push(i);
      }
    }

    // Middle
    else {
      pages.push("...");
      pages.push(
        currentPage - 1,
        currentPage,
        currentPage + 1
      );
      pages.push("...");
    }

    // Always show last
    pages.push(totalPages);

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex justify-center mt-6">

      <div className="flex items-center gap-2">

        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="
          w-9 h-9
          flex items-center justify-center
          border rounded-lg
          bg-white
          hover:bg-gray-50
          disabled:opacity-40
          disabled:cursor-not-allowed
          transition
        "
        >
          <ChevronLeft size={18} />
        </button>

        {/* Pages */}
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <div
                key={index}
                className="
                w-9 h-9
                flex items-center justify-center
                text-sm text-gray-400
              "
              >
                ...
              </div>
            );
          }

          const isActive =
            currentPage === page;

          return (
            <button
              key={index}
              onClick={() =>
                onPageChange(page as number)
              }
              className={`
              w-9 h-9
              flex items-center justify-center
              rounded-lg border
              text-sm font-medium
              transition
              ${isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-gray-50 text-gray-700"
                }
            `}
            >
              {page}
            </button>
          );
        })}

        {/* Next */}
        <button
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="
          w-9 h-9
          flex items-center justify-center
          border rounded-lg
          bg-white
          hover:bg-gray-50
          disabled:opacity-40
          disabled:cursor-not-allowed
          transition
        "
        >
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
}