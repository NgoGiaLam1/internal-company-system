"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROLE_LABELS } from "../roles/labels";

export default function RoleEditor({

    employeeId,

    currentRoleId,

    currentRoleName,

    roles

}: {

    employeeId: string;

    currentRoleId: string;

    currentRoleName: string;

    roles: any[];

}) {

    const router =
        useRouter();

    const [open, setOpen] =
        useState(false);

    const [selected, setSelected] =
        useState(currentRoleId);

    const [loading, setLoading] =
        useState(false);

    const updateRole =
        async () => {

            try {

                setLoading(true);

                const res =
                    await fetch(
                        `/api/employees/${employeeId}`,
                        {

                            method: "PATCH",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                roleId: selected

                            })

                        }
                    );

                if (!res.ok)
                    return;

                setOpen(false);

                router.refresh();

            } finally {

                setLoading(false);

            }

        };

    return (

        <div className="relative">

            <p className="text-sm text-gray-400">

                Role

            </p>

            <button

                onClick={() =>
                    setOpen(
                        !open
                    )
                }

                className="
    font-medium
    hover:text-blue-600
    transition
    cursor-pointer
    "

            >

                {currentRoleName}

            </button>

            {open && (

                <div className="
     absolute
     -top-40
     left-30
     z-20
     w-64
     bg-white
     border
     rounded-xl
     shadow-lg
     p-3
    ">

                    <div className="
      flex
      flex-col
      gap-2
      max-h-60
      overflow-auto
     ">

                        {roles.map(role => (

                            <button

                                key={role.id}

                                onClick={() =>
                                    setSelected(
                                        role.id
                                    )
                                }

                                className={`
         text-left
         p-3
         rounded-xl
         border
         transition

         ${selected === role.id

                                        ?

                                        "bg-blue-50 border-blue-500"

                                        :

                                        "hover:bg-gray-50"
                                    }

        `}

                            >

                                {ROLE_LABELS[role.name] || role.name}

                            </button>

                        ))}

                    </div>

                    <div className="
      flex
      gap-2
      mt-3
     ">

                        <button

                            className="
       flex-1
       border
       rounded-xl
       py-2
       "

                            onClick={() =>
                                setOpen(false)
                            }

                        >

                            Hủy

                        </button>

                        <button

                            disabled={loading}

                            onClick={updateRole}

                            className="
       flex-1
       bg-blue-600
       text-white
       rounded-xl
       py-2
       "

                        >

                            {

                                loading

                                    ?

                                    "..."

                                    :

                                    "Xác nhận"

                            }

                        </button>

                    </div>

                </div>

            )}

        </div>

    );

}