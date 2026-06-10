"use client";

import { useState } from "react";

export default function SystemSettings() {

    const [darkMode,
        setDarkMode] =
        useState(false);

    const [emailNotify,
        setEmailNotify] =
        useState(true);

    return (
        <div
            className="
        bg-white p-6
        border rounded-xl
      "
        >
            <h2
                className="
          font-semibold mb-5
        "
            >
                Cài đặt hệ thống
            </h2>

            <div className="space-y-5">

                <div
                    className="
            flex justify-between
          "
                >
                    <span>Dark mode</span>

                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() =>
                            setDarkMode(
                                !darkMode
                            )
                        }
                    />
                </div>

                <div
                    className="
            flex justify-between
          "
                >
                    <span>
                        Thông báo email
                    </span>

                    <input
                        type="checkbox"
                        checked={emailNotify}
                        onChange={() =>
                            setEmailNotify(
                                !emailNotify
                            )
                        }
                    />
                </div>

            </div>
        </div>
    );
}