"use client";

import { useState } from "react";

import {
    Eye,
    EyeOff,
    X,
    Lock,
} from "lucide-react";

type Props = {
    open: boolean;
    onClose: () => void;

    form: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    };

    setForm: React.Dispatch<
        React.SetStateAction<any>
    >;

    loading: boolean;

    onSubmit: () => void;
};

export default function ChangePasswordModal({
    open,
    onClose,
    form,
    setForm,
    loading,
    onSubmit,
}: Props) {

    const [showCurrent, setShowCurrent] =
        useState(false);

    const [showNew, setShowNew] =
        useState(false);

    const [showConfirm, setShowConfirm] =
        useState(false);

    if (!open) {
        return null;
    }

    return (
        <div
            className="
        fixed inset-0 z-50
        bg-black/40
        backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
        >
            <div
                className="
          w-full max-w-md
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
            >
                {/* Header */}

                <div className="px-6 pt-6 pb-4">

                    <div className="flex justify-between items-start">

                        <div className="flex gap-3">

                            <div
                                className="
                  h-10 w-10
                  rounded-xl
                  bg-blue-100
                  text-blue-600
                  flex items-center justify-center
                "
                            >
                                <Lock size={18} />
                            </div>

                            <div>
                                <h2
                                    className="
                    text-lg
                    font-semibold
                  "
                                >
                                    Đổi mật khẩu
                                </h2>

                                <p
                                    className="
                    text-sm
                    text-gray-500
                  "
                                >
                                    Cập nhật mật khẩu tài khoản
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={onClose}
                            className="
                p-2
                rounded-lg
                hover:bg-slate-100
              "
                        >
                            <X size={18} />
                        </button>

                    </div>

                </div>

                {/* Content */}

                <div className="px-6 pb-6 space-y-4">

                    <PasswordInput
                        value={form.currentPassword}
                        placeholder="Mật khẩu hiện tại"
                        show={showCurrent}
                        setShow={setShowCurrent}
                        onChange={(e: any) =>
                            setForm((prev: any) => ({
                                ...prev,
                                currentPassword:
                                    e.target.value,
                            }))
                        }
                    />

                    <PasswordInput
                        value={form.newPassword}
                        placeholder="Mật khẩu mới"
                        show={showNew}
                        setShow={setShowNew}
                        onChange={(e: any) =>
                            setForm((prev: any) => ({
                                ...prev,
                                newPassword:
                                    e.target.value,
                            }))
                        }
                    />

                    <PasswordInput
                        value={form.confirmPassword}
                        placeholder="Xác nhận mật khẩu"
                        show={showConfirm}
                        setShow={setShowConfirm}
                        onChange={(e: any) =>
                            setForm((prev: any) => ({
                                ...prev,
                                confirmPassword:
                                    e.target.value,
                            }))
                        }
                    />

                </div>

                {/* Footer */}

                <div
                    className="
            px-6 pb-6
            flex justify-end gap-3
          "
                >
                    <button
                        onClick={onClose}
                        className="
              px-4 py-2.5
              rounded-xl
              bg-slate-100
              hover:bg-slate-200
            "
                    >
                        Hủy
                    </button>

                    <button
                        onClick={onSubmit}
                        disabled={loading}
                        className="
              px-5 py-2.5
              rounded-xl
              bg-blue-600
              text-white
              hover:bg-blue-700
              disabled:opacity-50
            "
                    >
                        {loading
                            ? "Đang xử lý..."
                            : "Đổi mật khẩu"}
                    </button>
                </div>

            </div>
        </div>
    );
}

type PasswordInputProps = {
    value: string;
    placeholder: string;
    show: boolean;
    setShow: (value: boolean) => void;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
};

function PasswordInput({
    value,
    placeholder,
    show,
    setShow,
    onChange,
}: PasswordInputProps) {
    return (
        <div className="relative">
            <input
                type={show ? "text" : "password"}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="
          w-full
          rounded-xl
          bg-slate-100
          px-4 py-3
          pr-12
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
            />

            <button
                type="button"
                onClick={() =>
                    setShow(!show)
                }
                className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
        "
            >
                {show ? (
                    <EyeOff size={18} />
                ) : (
                    <Eye size={18} />
                )}
            </button>
        </div>
    );
}