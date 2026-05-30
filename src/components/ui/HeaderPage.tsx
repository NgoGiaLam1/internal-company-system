"use client";

import { ReactNode } from "react";

type HeaderPageProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function HeaderPage({
  icon,
  title,
  description,
  action,
}: HeaderPageProps) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">
      <div
        className="
          flex flex-col xl:flex-row
          xl:items-center xl:justify-between
          gap-5
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-4 flex-wrap">
          <div
            className="
              w-14 h-14 rounded-2xl
              bg-blue-100
              flex items-center justify-center
            "
          >
            {icon}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {title}
            </h1>

            {description && (
              <p className="text-sm text-gray-500 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        {action && <div className="w-fit">{action}</div>}
      </div>
    </div>
  );
}