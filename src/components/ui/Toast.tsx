"use client";

type Props = {
  message: string;
  type?: "success" | "error";
};

export default function Toast({
  message,
  type = "success",
}: Props) {
  return (
    <div
      className={`
        fixed top-5 right-5 z-[9999]
        px-4 py-3 rounded-lg shadow-lg text-white
        animate-in slide-in-from-top-2
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {message}
    </div>
  );
}