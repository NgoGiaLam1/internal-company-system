"use client";

import { useMemo, useState } from "react";

type Employee = {
    id: string;
    fullName: string;
};

type Props = {
    employees: Employee[];
    memberIds: string[];
    leaderId: string;
    onChange: (memberIds: string[], leaderId: string) => void;
};

export default function MemberPicker({
    employees,
    memberIds,
    leaderId,
    onChange
}: Props) {

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [tempMembers, setTempMembers] = useState<string[]>([]);
    const [tempLeader, setTempLeader] = useState("");

    const filtered = useMemo(
        () => employees.filter(
            employee =>
                employee.fullName
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        ),
        [employees, search]
    );

    const openModal = () => {

        setTempMembers(
            memberIds
        );

        setTempLeader(
            leaderId
        );

        setOpen(true);

    };

    const closeModal = () => {

        setOpen(false);
        setSearch("");

    };

    const removeMember = (id: string) => {

        const next =
            memberIds.filter(
                x => x !== id
            );

        onChange(
            next,
            leaderId === id
                ? ""
                : leaderId
        );

    };

    return (
        <div className="pt-5 mt-5 border-t">

            <div className="flex items-center justify-between mb-4">

                <div>

                    <h3 className="font-semibold">
                        Thành viên dự án
                    </h3>

                    <p className="text-sm text-gray-500">
                        {memberIds.length} thành viên
                    </p>

                </div>

            </div>

            <div className="flex items-center flex-wrap gap-3">

                {memberIds.length === 0 && (

                    <div className="text-sm text-gray-400">

                        Chưa có thành viên

                    </div>

                )}

                {memberIds.map(id => {

                    const member =
                        employees.find(
                            e => e.id === id
                        );

                    if (!member)
                        return null;

                    const isLeader =
                        leaderId === id;

                    return (

                        <div
                            key={id}
                            className="
   relative
   group
   "
                        >

                            <div className="
   h-12
   w-12
   rounded-full
   bg-slate-200
   flex
   items-center
   justify-center
   font-semibold
   cursor-pointer
   "
                                title={
                                    member.fullName
                                }
                            >

                                {
                                    member.fullName
                                        .charAt(0)
                                        .toUpperCase()
                                }

                            </div>

                            {isLeader && (

                                <div className="
    absolute
    -top-1
    -right-1
    text-sm
    z-10
    ">

                                    👑

                                </div>

                            )}

                            <button

                                type="button"

                                onClick={() =>
                                    removeMember(id)
                                }

                                className="
    absolute
    -top-2
    -left-2

    h-5
    w-5

    rounded-full

    bg-red-500
    text-white

    hidden
    group-hover:flex

    items-center
    justify-center

    text-xs
    "

                            >

                                ✕

                            </button>

                        </div>

                    );

                })}

                <button

                    type="button"

                    onClick={openModal}

                    className="
  h-12
  w-12
  rounded-full
  border-2
  border-dashed
  flex
  items-center
  justify-center
  text-xl
  "

                >

                    +

                </button>

            </div>

            {open && (

                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">

                    <div className="bg-white rounded-2xl w-full max-w-2xl p-6">

                        <div className="mb-5">

                            <h2 className="font-semibold text-xl">

                                Chọn thành viên

                            </h2>

                            <p className="text-sm text-gray-500">

                                Chọn nhiều thành viên và xác định leader

                            </p>

                        </div>

                        <input
                            value={search}
                            placeholder="Tìm nhân viên..."
                            className="w-full border rounded-xl p-3 mb-5"
                            onChange={e =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                        <div className="
   grid
   md:grid-cols-2
   gap-3
   max-h-105
   overflow-auto
   pr-1
   ">

                            {filtered.map(employee => {

                                const checked =
                                    tempMembers.includes(
                                        employee.id
                                    );

                                const isLeader =
                                    tempLeader ===
                                    employee.id;

                                return (

                                    <div
                                        key={employee.id}
                                        className={`
      border rounded-xl p-4 transition
      ${checked
                                                ? "border-blue-500 bg-blue-50"
                                                : ""
                                            }
      `}
                                    >

                                        <div className="flex items-start gap-3">

                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                className="mt-3"
                                                onChange={() => {

                                                    if (checked) {

                                                        const next =
                                                            tempMembers.filter(
                                                                x => x !== employee.id
                                                            );

                                                        setTempMembers(
                                                            next
                                                        );

                                                        if (
                                                            tempLeader ===
                                                            employee.id
                                                        ) {

                                                            setTempLeader("");

                                                        }

                                                        return;

                                                    }

                                                    setTempMembers([
                                                        ...tempMembers,
                                                        employee.id
                                                    ]);

                                                }}
                                            />

                                            <div className="
       h-12 w-12 rounded-full
       bg-slate-200
       flex items-center justify-center
       font-semibold
       ">

                                                {
                                                    employee.fullName
                                                        .charAt(0)
                                                        .toUpperCase()
                                                }

                                            </div>

                                            <div className="flex-1">

                                                <p className="font-medium">

                                                    {employee.fullName}

                                                </p>

                                                <button
                                                    disabled={!checked}
                                                    className={`
         mt-2 text-sm px-3 py-1 rounded-lg
         ${isLeader
                                                            ? "bg-blue-600 text-white"
                                                            : "border"
                                                        }
         `}
                                                    onClick={() =>
                                                        setTempLeader(
                                                            employee.id
                                                        )
                                                    }
                                                >

                                                    {
                                                        isLeader
                                                            ? "Đang là leader"
                                                            : "Đặt làm leader"
                                                    }

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                        <div className="flex gap-3 mt-6">

                            <button
                                className="flex-1 border rounded-xl p-3"
                                onClick={closeModal}
                            >

                                Hủy

                            </button>

                            <button
                                className="flex-1 rounded-xl p-3 bg-blue-600 text-white"
                                onClick={() => {

                                    onChange(
                                        tempMembers,
                                        tempLeader
                                    );

                                    closeModal();

                                }}
                            >

                                Xác nhận

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );

}