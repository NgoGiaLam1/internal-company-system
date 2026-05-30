type Column<T> = {
  header: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];

  onRowClick?: (row: T) => void;
};

export default function DataTable<T>({
  columns,
  data,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="bg-gray-100 text-gray-600">

          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-left p-4 font-semibold whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>

        </thead>

        {/* BODY */}
        <tbody>

          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={`
                border-t transition
                ${onRowClick
                  ? "cursor-pointer hover:bg-blue-50"
                  : ""}
              `}
            >

              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="p-4 align-top"
                >
                  {col.render
                    ? col.render(row)
                    : (
                        row[
                          col.accessor as keyof T
                        ] as React.ReactNode
                      )}
                </td>
              ))}

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}