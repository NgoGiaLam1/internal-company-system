type Props = {
  activeTab:
    | "account"
    | "system";

  onChange: (
    value:
      | "account"
      | "system"
  ) => void;
};

const tabs = [
  {
    key: "account",
    label: "Tài khoản",
  },
  {
    key: "system",
    label: "Hệ thống",
  },
] as const;

export default function SettingsTabs({
  activeTab,
  onChange,
}: Props) {
  return (
    <div
      className="
      border-r-2
        p-3
        w-48
        h-[70vh]
      "
    >
      <div className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() =>
              onChange(tab.key)
            }
            className={`
              w-full
              text-left
              px-4 py-3
              rounded-lg
              transition
              ${
                activeTab === tab.key
                  ? `
                    bg-blue-200
                    text-blue-600
                    font-medium
                  `
                  : `
                    text-gray-700
                    hover:bg-gray-100
                  `
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}