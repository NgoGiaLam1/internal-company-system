"use client";

import { useState } from "react";
import { Users, ClipboardList } from "lucide-react";
import Tabs from "./Tabs";

type Props = {
    project: any;
};

export default function ProjectTabs({
    project,
}: Props) {

    const [activeTab, setActiveTab] =
        useState("tasks");

    const tabs = [
        {
            key: "tasks",
            label: (
                <div className="flex items-center gap-2">
                    <ClipboardList size={18} />
                    Công việc
                </div>
            ),
        },

        {
            key: "members",
            label: (
                <div className="flex items-center gap-2">
                    <Users size={18} />
                    Thành viên ({project.members.length})
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-4">

            <Tabs
                tabs={tabs}
                active={activeTab}
                onChange={setActiveTab}
            />

            <div className="border rounded-xl p-4">

                {activeTab === "tasks" && (
                    <div>
                        Tasks here
                    </div>
                )}

                {activeTab === "members" && (
                    <div>

                        {project.members.map(
                            (member: any) => (

                                <div key={member.id}>
                                    {member.name}
                                </div>

                            ))}

                    </div>
                )}

            </div>

        </div>
    );
}