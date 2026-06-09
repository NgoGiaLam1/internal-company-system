"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  LogOut,
  ChevronDown,
} from "lucide-react";

import {
  signOut,
  useSession,
} from "next-auth/react";

const TYPE_LABELS = {
  GENERAL: "Chung",
  LEAVE: "Nghỉ phép",
  TASK: "Công việc",
  PROJECT: "Dự án",
  SYSTEM: "Hệ thống",
};

export default function Header() {
  const { data: session } = useSession();

  const [open, setOpen] =
    useState(false);

  const [openNotifications,
    setOpenNotifications] =
    useState(false);

  const [notifications,
    setNotifications] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  const notificationRef =
    useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  // Close dropdown outside click
  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      const target =
        event.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          target
        )
      ) {
        setOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          target
        )
      ) {
        setOpenNotifications(
          false
        );
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  const fetchNotifications =
    async () => {

      if (!session?.user?.id) {
        return;
      }

      try {

        setLoading(true);

        const res = await fetch(
          `/api/notifications?employeeId=${session.user.id}`
        );

        const data =
          await res.json();

        setNotifications(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  const markAsRead = async (
    notificationRecipientId: string
  ) => {

    try {

      await fetch(
        `/api/notifications/${notificationRecipientId}`,
        {
          method: "PATCH",
        }
      );

      setNotifications(
        (prev) =>
          prev.map((item) =>
            item.id ===
              notificationRecipientId
              ? {
                ...item,
                isRead: true,
                readAt:
                  new Date(),
              }
              : item
          )
      );

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    if (
      session?.user?.id
    ) {
      fetchNotifications();
    }

  }, [session?.user?.id]);

  const handleDeleteNotification =
    async (
      notificationRecipientId: string
    ) => {

      try {

        await fetch(
          `/api/notifications/${notificationRecipientId}`,
          {
            method: "DELETE",
          }
        );

        setNotifications(
          (prev) =>
            prev.filter(
              (item) =>
                item.id !==
                notificationRecipientId
            )
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (
    <header
      className="
        w-full h-16 bg-white
        flex items-center justify-between
        px-6 shadow-sm border-b
      "
    >

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-blue-600">
          HỆ THỐNG QUẢN LÝ
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        <div className="hidden md:block text-left">
          <p className="text-lg font-medium text-gray-700">
            Xin chào, {session?.user?.name} !
          </p>
        </div>

        {/* Notification */}
        <div
          ref={notificationRef}
          onClick={() => {

            setOpenNotifications(
              (prev) => !prev
            );

            if (!openNotifications) {
              fetchNotifications();
            }

          }}
          className="relative cursor-pointer">
          <Bell
            className="
              text-gray-600
              hover:text-blue-600 transition
            "
          />

          {notifications.filter(
            (n) => !n.isRead
          ).length > 0 && (
              <span
                className="
          absolute -top-1 -right-1
          bg-red-500 text-white text-xs
          w-4 h-4
          flex items-center
          justify-center
          rounded-full
        "
              >
                {
                  notifications.filter(
                    (n) => !n.isRead
                  ).length
                }
              </span>
            )}

          {openNotifications && (
            <div
              className="
      absolute right-0 top-12
      w-[420px]
      bg-white border
      rounded-2xl
      shadow-xl
      overflow-hidden
      z-50
    "
            >

              <div
                className="
        px-4 py-3
        border-b
        font-semibold
      "
              >
                Thông báo
              </div>

              <div
                className="
        max-h-[500px]
        overflow-y-auto
      "
              >

                {loading ? (

                  <div className="p-6 text-center">
                    Đang tải...
                  </div>

                ) : notifications.length === 0 ? (

                  <div
                    className="
            p-6 text-center
            text-gray-500
          "
                  >
                    Không có thông báo
                  </div>

                ) : (

                  notifications.map(
                    (item) => {

                      const notification =
                        item.notification;

                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (!item.isRead) {
                              markAsRead(item.id);
                            }
                          }}
                          className={`
    group
    p-4 border-b
    hover:bg-gray-50
    cursor-pointer
    transition
    ${!item.isRead
                              ? "bg-blue-50"
                              : ""
                            }
  `}
                        >

                          <div
                            className="
                    flex items-center
                    justify-between
                    gap-3
                  "
                          >

                            <div className="flex-1">

                              <div
                                className="
                        flex items-center
                        gap-2 mb-1
                      "
                              >

                                {!item.isRead && (
                                  <span
                                    className="
                            w-2 h-2
                            rounded-full
                            bg-blue-600
                          "
                                  />
                                )}

                                <h4
                                  className="
                          font-medium
                        "
                                >
                                  {
                                    notification.title
                                  }
                                </h4>

                              </div>

                              {notification.content && (
                                <p
                                  className="
                          text-sm
                          text-gray-600
                        "
                                >
                                  {
                                    notification.content
                                  }
                                </p>
                              )}

                              <div
                                className="
                        mt-2
                        text-xs
                        text-gray-400
                      "
                              >
                                {
                                  notification.sender
                                    ?.fullName
                                }{" "}
                                •{" "}
                                {new Date(
                                  item.createdAt
                                ).toLocaleString(
                                  "vi-VN"
                                )}
                              </div>

                            </div>

                            <span
                              className="
                      px-2 py-1
                      text-[10px]
                      rounded-full
                      bg-slate-100
                    "
                            >
                              {
                                TYPE_LABELS[
                                notification.type as keyof typeof TYPE_LABELS
                                ]
                              }
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();

                                handleDeleteNotification(
                                  item.id
                                );
                              }}
                              className="
      opacity-0
      group-hover:opacity-100
      transition
      text-gray-400
      hover:text-red-600
      p-1
      rounded
    "
                            >
                              ✕
                            </button>
                          </div>

                        </div>
                      );
                    }
                  )

                )}

              </div>

            </div>
          )}

        </div>

        {/* User Dropdown */}
        <div
          className="relative"
          ref={dropdownRef}
        >

          {/* Trigger */}
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="
              flex items-center gap-3
              hover:bg-gray-100
              rounded-xl px-2 py-1.5
              transition
            "
          >

            <div
              title={session?.user?.name}
              className="
    h-9
    w-9
    rounded-full
    overflow-hidden
    border-2
    border-white
    -ml-2
    first:ml-0
    bg-slate-200
    flex
    items-center
    justify-center
    font-medium
  "
            >
              {session?.user?.image ? (
                <img
                  src={session?.user?.image}
                  alt={session?.user?.name}
                  className="
        h-full
        w-full
        object-cover
      "
                />
              ) : (
                session?.user?.name
                  .charAt(0)
                  .toUpperCase()
              )}
            </div>


            <ChevronDown
              size={16}
              className={`
                text-gray-500 transition
                ${open ? "rotate-180" : ""}
              `}
            />

          </button>

          {/* Dropdown */}
          {open && (
            <div
              className="
                absolute right-0 top-14
                w-64 bg-white border
                rounded-2xl shadow-lg
                overflow-hidden z-50
              "
            >

              {/* User Info */}
              <div className="p-4 border-b">

                <div className="flex items-center gap-3">

                  <div
                    title={session?.user?.name}
                    className="
    h-9
    w-9
    rounded-full
    overflow-hidden
    border-2
    border-white
    -ml-2
    first:ml-0
    bg-slate-200
    flex
    items-center
    justify-center
    font-medium
  "
                  >
                    {session?.user?.image ? (
                      <img
                        src={session?.user?.image}
                        alt={session?.user?.name}
                        className="
        h-full
        w-full
        object-cover
      "
                      />
                    ) : (
                      session?.user?.name
                        .charAt(0)
                        .toUpperCase()
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {session?.user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {session?.user?.email}
                    </p>
                  </div>

                </div>

              </div>

              {/* Menu */}
              <div className="p-2">

                <button
                  onClick={handleLogout}
                  className="
                    w-full flex items-center gap-3
                    px-3 py-2.5 rounded-xl
                    text-sm text-red-600
                    hover:bg-red-50 transition
                  "
                >
                  <LogOut size={16} />

                  Đăng xuất
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}