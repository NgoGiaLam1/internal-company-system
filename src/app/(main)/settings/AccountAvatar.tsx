"use client";

import { Camera } from "lucide-react";
import { useRef } from "react";

type Props = {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;

  onChangeAvatar?: (
    file: File
  ) => void;
};

export default function AccountAvatar({
  name,
  email,
  avatar,
  onChangeAvatar,
}: Props) {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    onChangeAvatar?.(file);
  };

  return (
    <div
      className="
        flex items-center
        gap-5 mb-8
      "
    >
      <div className="relative">

        <div
          className="
            h-24 w-24
            rounded-full
            overflow-hidden
            bg-slate-200
            border
          "
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name || "avatar"}
              className="
                h-full w-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                h-full w-full
                flex items-center
                justify-center
                text-2xl
                font-semibold
              "
            >
              {name
                ?.charAt(0)
                ?.toUpperCase()}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleChooseFile}
          className="
            absolute
            bottom-0 right-0
            h-8 w-8
            rounded-full
            bg-blue-600
            text-white
            flex items-center
            justify-center
            hover:bg-blue-700
          "
        >
          <Camera size={16} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />

      </div>

      <div>
        <h3
          className="
            text-lg
            font-medium
          "
        >
          {name}
        </h3>

        <p className="text-gray-500">
          {email}
        </p>
      </div>
    </div>
  );
}