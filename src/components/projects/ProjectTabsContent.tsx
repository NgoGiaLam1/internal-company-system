"use client";

import { useState } from "react";

import Tabs from "./Tabs";

import TaskSection from "./TaskSection";
import ProjectSettingsSection from "./ProjectSettingsSection";
import ProjectMembersSection from "./ProjectMembersSection";

type Props = {
    project: any;
    employees: any[];
};

export default function ProjectTabsContent({
    project,
    employees,
}: Props) {

    const [activeTab, setActiveTab] =
        useState("tasks");

    return (

        <div className="space-y-6">

            <Tabs
                active={activeTab}
                onChange={setActiveTab}
                tabs={[
                    {
                        key: "tasks",
                        label: "Công việc",
                    },

                    {
                        key: "members",
                        label: `Thành viên (${project.members.length})`,
                    },
                ]}
            />


            {/* TASK TAB */}

            {activeTab === "tasks" && (

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    <div className="xl:col-span-2">

                        <TaskSection
                            projectId={project.id}
                            tasks={project.tasks}
                            members={project.members}
                        />

                    </div>

                    <div>

                        <ProjectSettingsSection
                            project={project}
                        />

                    </div>

                </div>

            )}


            {/* MEMBER TAB */}

            {activeTab === "members" && (

                <div className="space-y-6">

                    <ProjectMembersSection
                        project={project}
                        employees={employees}
                    />

                </div>

            )}

        </div>

    );
}