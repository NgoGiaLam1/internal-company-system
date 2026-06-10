"use client";

import { useSession }
    from "next-auth/react";

import { useEffect, useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import AccountAvatar from "./AccountAvatar";

export default function AccountSettings() {
    const [openPasswordModal,
        setOpenPasswordModal] =
        useState(false);

    const [passwordForm,
        setPasswordForm] =
        useState({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

    const [loading,
        setLoading] =
        useState(false);

    const handleChangePassword =
        async () => {

            try {

                setLoading(true);

                const res = await fetch(
                    "/api/profile/change-password",
                    {
                        method: "PATCH",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify(
                            passwordForm
                        ),
                    }
                );

                const data =
                    await res.json();

                if (!res.ok) {
                    alert(data.message);
                    return;
                }

                alert(data.message);

                setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });

                setOpenPasswordModal(
                    false
                );

            } catch (error) {

                console.error(error);

                alert(
                    "Có lỗi xảy ra"
                );

            } finally {

                setLoading(false);

            }
        };

    const { data: session, update } =
        useSession();

    const [form, setForm] =
        useState({
            fullName: "",
            phone: "",
        });

    useEffect(() => {
        if (!session?.user) {
            return;
        }

        setForm({
            fullName:
                session.user.name || "",

            phone:
                session.user.phone || "",
        });

    }, [session]);

    const handleUpdateProfile =
        async () => {

            try {

                setLoading(true);

                const res = await fetch(
                    `/api/profile`,
                    {
                        method: "PATCH",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            fullName:
                                form.fullName,

                            phone:
                                form.phone,
                        }),
                    }
                );

                if (!res.ok) {
                    throw new Error();
                }

                // cập nhật session
                await update({
                    name: form.fullName,
                    phone: form.phone,
                });

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        };

    const handleChangeAvatar =
        async (file: File) => {
            try {
                const formData =
                    new FormData();

                formData.append(
                    "file",
                    file
                );

                const res = await fetch(
                    "/api/profile/avatar",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data =
                    await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message
                    );
                }

                await update({
                    image:
                        data.avatarUrl,
                });

            } catch (error) {
                console.error(error);
            }
        };

    return (
        <div
            className="
        bg-white
        border
        rounded-xl
        p-6
      "
        >
            <h2
                className="
          text-lg
          font-semibold
          mb-6
        "
            >
                Thông tin tài khoản
            </h2>

            {/* Avatar */}
            <AccountAvatar
                name={session?.user?.name}
                email={session?.user?.email}
                avatar={session?.user?.image}
                onChangeAvatar={handleChangeAvatar}
            />

            {/* Form */}

            <div
                className="
          grid
          md:grid-cols-2
          gap-5
        "
            >
                <div>

                    <label
                        className="
              text-sm
              text-gray-600
              mb-1
              block
            "
                    >
                        Họ tên
                    </label>

                    <input
                        value={form.fullName}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                fullName: e.target.value,
                            }))
                        }
                        className="
                            w-full border
                            rounded-lg px-3 py-2
                        "
                    />

                </div>

                <div>

                    <label
                        className="
              text-sm
              text-gray-600
              mb-1
              block
            "
                    >
                        Email
                    </label>

                    <input
                        disabled
                        value={
                            session?.user?.email || ""
                        }
                        className="
              w-full
              border
              rounded-lg
              px-3 py-2
              bg-gray-50
            "
                    />

                </div>

                <div>

                    <label
                        className="
              text-sm
              text-gray-600
              mb-1
              block
            "
                    >
                        Số điện thoại
                    </label>

                    <input
                        value={form.phone}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                phone: e.target.value,
                            }))
                        }
                        className="
                            w-full border
                            rounded-lg px-3 py-2
                        "
                    />
                </div>

            </div>

            {/* Actions */}

            <div
                className="
          flex
          justify-between
          items-center
          mt-8
          pt-6
          border-t
        "
            >
                <button
                    onClick={() =>
                        setOpenPasswordModal(true)
                    }
                    className="
    px-4 py-2
    border rounded-xl
    hover:bg-gray-50
  "
                >
                    Đổi mật khẩu
                </button>

                <button
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-5 py-2
    rounded-lg
  "
                >
                    {
                        loading
                            ? "Đang lưu..."
                            : "Lưu thay đổi"
                    }
                </button>
            </div>
            <ChangePasswordModal
                open={openPasswordModal}
                onClose={() =>
                    setOpenPasswordModal(false)
                }
                form={passwordForm}
                setForm={setPasswordForm}
                loading={loading}
                onSubmit={handleChangePassword}
            />
        </div>
    );
}