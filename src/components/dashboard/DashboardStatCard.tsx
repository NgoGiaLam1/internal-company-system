import Link from "next/link";
import { ReactNode } from "react";

type Props = {
    title: string;
    value: number;
    icon?: ReactNode;

    href: string;

    color:
    | "blue"
    | "green"
    | "red"
    | "amber"
    | "indigo";

    description?: string;
};

const colorClasses = {
    blue: {
        value: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue",
    },

    green: {
        value: "text-green-600",
        bg: "bg-green-50",
        border: "border-green",
    },

    red: {
        value: "text-red-600",
        bg: "bg-red-50",
        border: "border-red",
    },

    amber: {
        value: "text-amber-500",
        bg: "bg-amber-50",
        border: "border-amber",
    },

    indigo: {
        value: "text-indigo-600",
        bg: "bg-indigo-50",
        border: "border-indigo",
    },
};

export default function DashboardStatCard({
    title,
    value,
    href,
    color,
    description,
}: Props) {
    const styles = colorClasses[color];

    return (
        <Link href={href}>
            <div
                className={`
                    rounded-2xl border p-5
                    transition-all duration-200
                    hover:shadow-md hover:-translate-y-1
                    cursor-pointer
                    ${styles.bg}
                    ${styles.border}
                `}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-gray-500">
                            {title}
                        </p>

                        <h2
                            className={`
                                text-3xl font-bold mt-2
                                ${styles.value}
                            `}
                        >
                            {value}
                        </h2>
                    </div>
                </div>

                {description && (
                    <p className="text-xs text-gray-500 mt-4">
                        {description}
                    </p>
                )}
            </div>
        </Link>
    );
}