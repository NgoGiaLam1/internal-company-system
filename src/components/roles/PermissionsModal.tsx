"use client";

import { useEffect } from "react";
import { PERMISSION_LABELS, ROLE_LABELS } from "./labels";
import PermissionsModalSkeleton from "./PermissionsModalSkeleton";

type Props = {

    open: boolean;

    role: any;

    permissions: {
        module: string;

        permissions: {

            id: string;

            name: string;

            checked: boolean;

        }[];

    }[];

    selectedPermissions:
    string[];

    setSelectedPermissions:
    React.Dispatch<
        React.SetStateAction<
            string[]
        >
    >;

    onClose: () => void;

    onSave: () => void;

};

export default function PermissionsModal({

    open,

    role,

    permissions,

    selectedPermissions,

    setSelectedPermissions,

    onClose,

    onSave,

}: Props) {
    useEffect(() => {

        setSelectedPermissions(

            permissions
                .flatMap(
                    module => module.permissions
                )
                .filter(
                    permission =>
                        permission.checked
                )
                .map(
                    permission =>
                        permission.id
                )

        );

    }, [permissions]);

    if (!open)
        return null;

    if(!permissions.length){
        return <PermissionsModalSkeleton />
    }

    return (
        <div
            className="
        fixed inset-0
        bg-black/40
        z-50

        flex
        items-center
        justify-center

        p-4
      "
        >

            <div
                className="
          bg-white
          rounded-xl

          w-full
          max-w-4xl

          overflow-hidden
        "
            >

                <div className="p-6">

                    <h2
                        className="
              text-lg
              font-semibold
            "
                    >

                        Quản lý quyền

                    </h2>

                    <p
                        className="
              text-sm
              text-gray-500
            "
                    >

                        {
                            ROLE_LABELS[
                            role.name
                            ] || role.name
                        }

                    </p>

                </div>

                <div
                    className="
            max-h-[500px]
            overflow-auto
          "
                >

                    <table
                        className="
              w-full
              text-sm
            "
                    >

                        <thead
                            className="
                bg-gray-50
                text-gray-600
              "
                        >

                            <tr>

                                <th
                                    className="
                    text-left
                    p-4
                    w-60
                  "
                                >

                                    Trang

                                </th>

                                <th
                                    className="
                    text-left
                    p-4
                  "
                                >

                                    Danh sách quyền

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                permissions.map(
                                    (
                                        item
                                    ) => (

                                        <tr
                                            key={
                                                item.module
                                            }

                                            className="
                        border-t
                      "
                                        >

                                            <td
                                                className="
                          p-4
                          font-medium
                        "
                                            >

                                                {
                                                    item.module
                                                }

                                            </td>

                                            <td
                                                className="
                          p-4
                        "
                                            >

                                                <div
                                                    className="
                            flex
                            flex-wrap
                            gap-4
                          "
                                                >

                                                    {

                                                        item.permissions.map(
                                                            (
                                                                permission
                                                            ) => (

                                                                <label

                                                                    key={
                                                                        permission.id
                                                                    }

                                                                    className="
flex
items-center
gap-2
"

                                                                >

                                                                    <input

                                                                        type="checkbox"

                                                                        checked={
                                                                            selectedPermissions.includes(
                                                                                permission.id
                                                                            )
                                                                        }

                                                                        onChange={() => {

                                                                            setSelectedPermissions(
                                                                                prev =>

                                                                                    prev.includes(
                                                                                        permission.id
                                                                                    )

                                                                                        ? prev.filter(
                                                                                            x =>
                                                                                                x !== permission.id
                                                                                        )

                                                                                        : [

                                                                                            ...prev,

                                                                                            permission.id,

                                                                                        ]

                                                                            );

                                                                        }}

                                                                    />

                                                                    {
                                                                        PERMISSION_LABELS[
                                                                        permission.name
                                                                        ]
                                                                    }

                                                                </label>

                                                            ))

                                                    }

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

                            }

                        </tbody>

                    </table>

                </div>

                <div
                    className="
            flex
            justify-end
            gap-2

            p-6

            border-t
          "
                >

                    <button
                        onClick={onClose}

                        className="
              border
              rounded-lg

              px-4 py-2
            "
                    >

                        Hủy

                    </button>

                    <button

                        onClick={onSave}

                        className="
              bg-blue-600
              text-white

              rounded-lg

              px-4 py-2
            "
                    >

                        Lưu

                    </button>

                </div>

            </div>

        </div>
    );

}