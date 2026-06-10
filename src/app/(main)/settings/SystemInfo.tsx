export default function SystemInfo() {

    return (
        <div
            className="
        bg-white p-6
        border rounded-xl
      "
        >
            <h2
                className="
          font-semibold mb-4
        "
            >
                Thông tin hệ thống
            </h2>

            <div
                className="
          text-sm text-gray-600
          space-y-2
        "
            >
                <p>Version: 1.0.0</p>
                <p>Environment: Development</p>
                <p>Server: Localhost</p>
            </div>
        </div>
    );
}