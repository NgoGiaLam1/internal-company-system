import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RoleEditor from "@/components/employees/RoleEditor";
import { ROLE_LABELS } from "@/components/roles/labels";
import DeleteEmployeeButton from "@/components/employees/DeleteEmployeeButton";
import StatusEditor from "@/components/employees/StatusEditor";

type Props = {
    params: Promise<{
        id: string
    }>
};

export default async function EmployeeDetailPage({
    params
}: Props) {

    const { id } =
        await params;

    const [employee, roles] = await Promise.all([

        prisma.tblEmployee.findUnique({

            where: { id },

            select: {

                id: true,
                fullName: true,
                email: true,
                phone: true,
                avatarUrl: true,
                position: true,
                status: true,
                createdAt: true,
                roleId: true,

                department: {
                    select: {
                        name: true
                    }
                },

                role: {
                    select: {
                        name: true
                    }
                },

                _count: {
                    select: {
                        tasks: true,
                        projects: true,
                        leadingProjects: true
                    }
                }

            }

        }),

        prisma.tblRole.findMany({
            orderBy: {
                name: "asc"
            }
        })

    ]);

    if (!employee)
        return notFound();

    return (

        <div className="
max-w-6xl
mx-auto
space-y-6
">

            <div className="
bg-white
rounded-3xl
border
p-7
shadow-sm
">

                <div className="
flex
flex-col
lg:flex-row
justify-between
gap-8
">

                    {/* LEFT */}

                    <div className="
flex
gap-5
min-w-0
">

                        <div
                            title={employee.fullName}
                            className="
w-28
h-28
rounded-full
overflow-hidden
shrink-0
border-4
border-slate-100
"
                        >

                            {

                                employee.avatarUrl

                                    ?

                                    <img
                                        src={employee.avatarUrl}
                                        className="
w-full
h-full
object-cover
"
                                    />

                                    :

                                    <div className="
w-full
h-full
bg-slate-200
flex
items-center
justify-center
font-bold
text-5xl
">

                                        {
                                            employee.fullName
                                                .charAt(0)
                                                .toUpperCase()
                                        }

                                    </div>

                            }

                        </div>

                        <div className="
min-w-0
flex
flex-col
justify-center
">

                            <h1 className="
text-3xl
font-bold
truncate
">

                                {employee.fullName}

                            </h1>

                            <p className="
text-gray-500
mt-1
">

                                {employee.position}

                            </p>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="
flex
flex-col
justify-between
gap-5
lg:items-end
">

                        <div className="
grid
grid-cols-3
gap-3
w-full
lg:w-auto
">

                            <MiniStat
                                title="Task"
                                value={
                                    employee._count.tasks
                                }
                            />

                            <MiniStat
                                title="Project"
                                value={
                                    employee._count.projects
                                }
                            />

                            <MiniStat
                                title="Lead"
                                value={
                                    employee._count.leadingProjects
                                }
                            />

                        </div>

                        <DeleteEmployeeButton
                            employeeId={employee.id}
                        />

                    </div>

                </div>

            </div>

            {/* INFO */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">

                <InfoCard
                    label="Email"
                    value={employee.email}
                />

                <InfoCard
                    label="Điện thoại"
                    value={employee.phone || "Không có"}
                />

                <InfoCard
                    label="Phòng ban"
                    value={employee.department?.name || "Không có"}
                />

                <div className="border rounded-2xl p-4 bg-slate-50">
                    <StatusEditor
                        employeeId={employee.id}
                        currentStatus={employee.status}
                    />
                </div>

                <div className="border rounded-2xl p-4 bg-slate-50">
                    <RoleEditor
                        employeeId={employee.id}
                        currentRoleId={employee.roleId}
                        currentRoleName={
                            ROLE_LABELS[
                            employee.role.name
                            ] || employee.role.name
                        }
                        roles={roles}
                    />
                </div>

                <InfoCard
                    label="Ngày tham gia"
                    value={
                        new Date(
                            employee.createdAt
                        ).toLocaleDateString(
                            "vi-VN"
                        )
                    }
                />

            </div>
        </div>

    )

}

function InfoCard({
    label,
    value
}: {
    label: string;
    value: any;
}) {

    return (

        <div className="border rounded-2xl p-4 bg-slate-50">

            <p className="text-sm text-gray-500 mb-1">

                {label}

            </p>

            <p className="font-semibold text-gray-800 break-words">

                {value}

            </p>

        </div>

    );

}
function MiniStat({
    title,
    value
}: {
    title: string;
    value: number;
}) {

    return (

        <div className="
rounded-2xl
bg-slate-50
px-5
py-4
text-center
min-w-24
">

            <p className="
text-xs
text-gray-500
">

                {title}

            </p>

            <p className="
font-bold
text-2xl
mt-1
">

                {value}

            </p>

        </div>

    );

}