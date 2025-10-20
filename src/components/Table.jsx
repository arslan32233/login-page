import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Table({
  data,
  onEdit,
  onDelete,
  isAdding,
  editItem,
  formData,
  onChange,
  onSave,
  onCancel,
  fields,
}) {
  if (isAdding || editItem) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          {isAdding ? "Add New" : "Edit"} Record
        </h3>
        <form className="space-y-4">
          {fields.map((field) => (
            <div key={field.key} className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.key}
                value={formData[field.key] || ""}
                onChange={onChange}
                placeholder={`Enter ${field.label}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-300">
      <table className="min-w-full border border-gray-300 border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm font-semibold">
            {fields.map((field) => (
              <th
                key={field.key}
                className="py-3 px-4 border border-gray-300 text-left"
              >
                {field.label}
              </th>
            ))}
            <th className="py-3 px-4 border border-gray-300 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                {fields.map((field) => (
                  <td
                    key={field.key}
                    className="py-3 px-4 border border-gray-300 text-gray-800"
                  >
                    {item[field.key]}
                  </td>
                ))}
                <td className="py-3 px-4 border border-gray-300 text-center">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-800 mr-3 transition"
                    title="Edit"
                  >
                    <PencilSquareIcon className="w-5 h-5 inline" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <TrashIcon className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={fields.length + 1}
                className="text-center py-6 text-gray-500"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
