export default function PermissionsModalSkeleton() {
    return (
        <div
            className="
        fixed inset-0
        bg-black/40
        z-50
        flex items-center justify-center
        p-4
      "
        >
            <div
                className="
          bg-white rounded-xl
          w-full max-w-4xl
          overflow-hidden
        "
            >

                {/* Header */}

                <div className="p-6">

                    <div
                        className="
              h-6 w-40
              bg-gray-200
              rounded
              animate-pulse
            "
                    />

                    <div
                        className="
              h-4 w-28 mt-2
              bg-gray-100
              rounded
              animate-pulse
            "
                    />

                </div>

                {/* Table */}

                <div
                    className="
            max-h-[500px]
            overflow-auto
          "
                >

                    <table className="w-full">

                        <thead>
                            <tr
                                className="
                  bg-gray-50
                "
                            >
                                <th className="p-4 text-left">
                                    Trang
                                </th>

                                <th className="p-4 text-left">
                                    Danh sách quyền
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {Array.from({
                                length: 5,
                            }).map((_, index) => (
                                <tr
                                    key={index}
                                    className="border-t"
                                >

                                    <td className="p-4">
                                        <div
                                            className="
                        h-5 w-32
                        bg-gray-200
                        rounded
                        animate-pulse
                      "
                                        />
                                    </td>

                                    <td className="p-4">

                                        <div
                                            className="
                        flex flex-wrap gap-4
                      "
                                        >

                                            {Array.from({
                                                length: 4,
                                            }).map(
                                                (
                                                    _,
                                                    permissionIndex
                                                ) => (
                                                    <div
                                                        key={
                                                            permissionIndex
                                                        }
                                                        className="
                              h-5 w-28
                              bg-gray-100
                              rounded
                              animate-pulse
                            "
                                                    />
                                                )
                                            )}

                                        </div>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Footer */}

                <div
                    className="
            flex justify-end gap-2
            p-6 border-t
          "
                >

                    <div
                        className="
              h-10 w-20
              bg-gray-100
              rounded-lg
              animate-pulse
            "
                    />

                    <div
                        className="
              h-10 w-24
              bg-gray-200
              rounded-lg
              animate-pulse
            "
                    />

                </div>

            </div>
        </div>
    );
}