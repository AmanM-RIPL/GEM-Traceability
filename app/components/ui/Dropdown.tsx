"use client";
import { useEffect, useRef, useState } from "react";
import {  FaChevronDown } from "react-icons/fa";
type Props = {
  label?: string;
  options: string[];
  onSelect?: (value: string) => void; 
};
export function Dropdown({ label, options,onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o )}
        className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-white text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        {selected ?? label}
        <FaChevronDown
          className={`text-xs text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-sm z-50">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false);onSelect?.(opt); }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                selected === opt ? "text-[#046A38] font-medium" : "text-gray-600"
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
