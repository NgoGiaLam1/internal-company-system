"use client";

import { useState } from "react";
import SystemInfo from "./SystemInfo";
import SystemSettings from "./SystemSettings";
import AccountSettings from "./AccountSettings";
import SettingsTabs from "./SettingsTabs";

export default function SettingsContent() {

    const [activeTab,
        setActiveTab] =
        useState<"account" | "system">(
            "account"
        );

    return (
        <div className="space-y-6">

            <h1 className="text-2xl font-bold">
                Cài đặt
            </h1>

            <div className="flex gap-6">

                <SettingsTabs
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                <div className="flex-1 space-y-6">

                    {activeTab === "account" && (
                        <>
                            <AccountSettings />
                        </>
                    )}

                    {activeTab === "system" && (
                        <>
                            <SystemSettings />
                            <SystemInfo />
                        </>
                    )}

                </div>

            </div>

        </div>
    );
}