type TabItem = {
  key: string;
  label: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  active: string;
  onChange: (key: string) => void;
};

export default function Tabs({
  tabs,
  active,
  onChange,
}: TabsProps) {
  return (
    <div className="flex gap-2 border-b">

      {tabs.map((tab) => (

        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`
            px-4 py-2
            border-b-2
            transition
            font-medium

            ${
              active === tab.key
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500"
            }
          `}
        >

          {tab.label}

        </button>

      ))}

    </div>
  );
}