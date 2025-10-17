import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function Table({ data = [], fields = [], onEdit, onDelete }) {
  if (!data || data.length === 0)
    return <p className="text-center text-gray-500 py-10">No data found</p>;

  const columns =
    fields.length > 0
      ? fields
      : Object.keys(data[0])
          .filter((key) => key !== "id" && typeof data[0][key] !== "object")
          .map((key) => ({ key, label: key }));

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="border px-4 py-2 text-left">ID</th>
            {columns.map((col) => (
              <th key={col.key} className="border px-4 py-2 text-left capitalize">
                {col.label}
              </th>
            ))}
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="border px-4 py-2">{item.id}</td>
              {columns.map((col) => (
                <td key={col.key} className="border px-4 py-2">
                  {item[col.key]}
                </td>
              ))}
              <td className="border px-4 py-2 text-center flex justify-center gap-3">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
