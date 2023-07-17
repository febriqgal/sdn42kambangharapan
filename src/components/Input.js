import React from "react";

export default function InputC({ props }) {
  return (
    <label
      htmlFor="UserEmail"
      className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <span className="text-xs font-medium text-gray-700"> Email </span>

      <input
        type="email"
        id="UserEmail"
        placeholder="anthony@rhcp.com"
        className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
      />
    </label>
  );
}
