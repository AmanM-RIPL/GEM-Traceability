type Column<T> = {
  key: string;
  label: string;
  color?: string;
  render?: (row: T) => any;
};

type TableProps<T> = {
  heading?: string;
  description?: string;
  data: T[];
  columns: readonly Column<T>[];
};
// const getStatusColor = (status: string) => {
//   switch (status.toLowerCase()) {
//     case "delivered":
//     case "approved":
//       return "#046A38"; // green
//     case "pending":
//       return "#f59e0b"; // yellow
//     case "cancelled":
//     case "rejected":
//       return "#dc2626"; // red
//     case "in transit":
//     case "out for delivery":
//       return "#2563eb"; // blue
//     default:
//       return "#374151"; // gray
//   }
// };
function Table<T extends { id?: string | number }>({
  data,
  heading,
  description,
  columns,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      {heading && (
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {heading}
        </h2>
      )}

      {description && (
        <p className="text-gray-600 mb-4">
          {description}
        </p>
      )}

      <table className="w-full border border-gray-300 bg-white shadow-sm rounded-xl overflow-hidden">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="text-gray-900 border-b border-gray-300 px-4 py-2 text-left bg-gray-50"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={row.id ?? index} className="last:border-b-0">
              {columns.map((col) => {
                const content = col.render
                  ? col.render(row)
                  : String((row as any)[col.key] ?? "");

                return (
                  <td
                    key={String(col.key)}
                    className="border-b border-gray-300 px-4 py-2 text-gray-700"
                    style={
                      col.color
                        ? { color: col.color, fontWeight: 600 }
                        : undefined
                    }
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;