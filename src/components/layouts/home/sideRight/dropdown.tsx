import React, { useState } from "react";

const options = [
  { label: "Chats", value: "chats" },
  { label: "Groups", value: "groups" },
  { label: "Related group call list", value: "calls", badge: 3 },
];

export default function DropdownRadio() {
  const [selected, setSelected] = useState("chats");
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="border px-3 py-1 rounded-md bg-white flex items-center gap-2"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {options.find((o) => o.value === selected)?.label}
        <svg width={16} height={16} className="ml-1">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                name="dropdown-radio"
                value={opt.value}
                checked={selected === opt.value}
                onChange={() => {
                  setSelected(opt.value);
                  setOpen(false);
                }}
                className="mr-2"
              />
              <span className="flex items-center gap-2">
                {opt.label}
                {opt.badge && (
                  <span className="ml-2 bg-error text-white rounded-full px-2 py-0.5 text-xs">
                    {opt.badge}
                  </span>
                )}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
