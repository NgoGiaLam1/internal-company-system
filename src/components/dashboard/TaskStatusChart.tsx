"use client";

import { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

type Props = {
    title: string;
    description: string;

    data: {
        name: string;
        value: number;
    }[];
};

const STATUS_COLORS: Record<string, string> = {
    // Project
    PLANNING: "#94a3b8",
    IN_PROGRESS: "#3b82f6",
    COMPLETED: "#22c55e",
    ON_HOLD: "#f59e0b",

    // Employee
    ACTIVE: "#22c55e",
    INACTIVE: "#f59e0b",
    RESIGNED: "#ef4444",

    // Task
    TODO: "#94a3b8",
    DONE: "#22c55e",
};

const STATUS_LABELS: Record<string, string> = {
    // Project
    PLANNING: "Lên kế hoạch",
    IN_PROGRESS: "Đang thực hiện",
    COMPLETED: "Hoàn thành",
    ON_HOLD: "Tạm dừng",

    // Employee
    ACTIVE: "Đang hoạt động",
    INACTIVE: "Tạm ngưng",
    RESIGNED: "Đã nghỉ việc",

    // Task
    TODO: "Chưa làm",
    DONE: "Hoàn thành",
};

const PROJECT_STATUS = [
    "PLANNING",
    "IN_PROGRESS",
    "COMPLETED",
    "ON_HOLD",
];

const EMPLOYEE_STATUS = [
    "ACTIVE",
    "INACTIVE",
    "RESIGNED",
];

export default function TaskStatusChart({
    title,
    description,
    data,
}: Props) {
    const [mounted, setMounted] =
        useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="bg-white rounded-2xl border shadow-sm p-5 h-80" />
        );
    }

    // Detect chart type
    const isProjectChart =
        data.some((item) =>
            PROJECT_STATUS.includes(item.name)
        );

    const fullStatuses =
        isProjectChart
            ? PROJECT_STATUS
            : EMPLOYEE_STATUS;

    // Fill missing status = 0
    const normalizedData =
        fullStatuses.map((status) => {
            const found = data.find(
                (item) =>
                    item.name === status
            );

            return {
                name: status,
                value: found?.value || 0,
            };
        });

    const total =
        normalizedData.reduce(
            (acc, item) =>
                acc + item.value,
            0
        );

    return (
        <div className="bg-white rounded-2xl border shadow-sm p-5">

            {/* Header */}
            <div className="mb-5 flex items-start justify-between">

                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {description}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-xs text-gray-400">
                        Tổng
                    </p>

                    <p className="text-2xl font-bold text-gray-800">
                        {total}
                    </p>
                </div>

            </div>

            {/* Content */}
            <div className="flex items-center justify-between gap-6">

                {/* Chart */}
                <div className="shrink-0">
                    <PieChart
                        width={180}
                        height={180}
                    >
                        <Pie
                            data={normalizedData}
                            innerRadius={50}
                            outerRadius={75}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {normalizedData.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <Cell
                                        key={index}
                                        fill={
                                            STATUS_COLORS[
                                            item.name
                                            ] ||
                                            "#94a3b8"
                                        }
                                    />
                                )
                            )}
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </div>

                {/* Compact Legend */}
                <div className="w-45 shrink-0 border rounded-lg p-3 bg-gray-50">

                    <div className="space-y-2">

                        {normalizedData.map(
                            (item) => (
                                <div
                                    key={item.name}
                                    className="
                    flex items-center justify-between
                    text-sm
                  "
                                >

                                    {/* Left */}
                                    <div className="flex items-center gap-2">

                                        <div
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    STATUS_COLORS[
                                                    item
                                                        .name
                                                    ] ||
                                                    "#94a3b8",
                                            }}
                                        />

                                        <span className="text-gray-700">
                                            {
                                                STATUS_LABELS[
                                                item
                                                    .name
                                                ] ||
                                                item.name
                                            }
                                        </span>

                                    </div>

                                    {/* Right */}
                                    <span className="font-medium text-gray-800">
                                        {
                                            item.value
                                        }
                                    </span>

                                </div>
                            )
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}