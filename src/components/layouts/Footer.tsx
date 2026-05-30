"use client";

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t px-6 py-4 text-sm text-gray-600">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">

                {/* LEFT */}
                <div>
                    © 2026 Hệ thống quản lý nội bộ
                </div>

                {/* CENTER */}
                <div className="text-gray-400 text-xs">
                    Phiên bản v1.0.0
                </div>

                {/* RIGHT */}
                <div className="flex gap-4 text-gray-500">
                    <span className="hover:text-blue-600 cursor-pointer">
                        Chính sách
                    </span>
                    <span className="hover:text-blue-600 cursor-pointer">
                        Điều khoản
                    </span>
                    <span className="hover:text-blue-600 cursor-pointer">
                        Hỗ trợ
                    </span>
                </div>
            </div>
        </footer>
    );
}