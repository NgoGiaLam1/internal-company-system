"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function LargeModal({
  isOpen,
  onClose,
  title,
  children,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-6xl h-[80vh] z-10 flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}