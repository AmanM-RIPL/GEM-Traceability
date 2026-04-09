"use client";
import {  useLayoutEffect, useRef, useState } from "react";

export function ToggleButton() {
  const [active,setActive] = useState(0);

  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const el = refs.current[active];
    const slider = sliderRef.current;
    if (!el || !slider) return;
    slider.style.width = `${el.offsetWidth}px`;
    slider.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [active]);

  return (
    <div
      className="inline-flex items-center bg-gray-200 p-1 relative cursor-pointer"
      style={{ borderRadius: "0 8px 8px 0" }}
    >
      <span
        className="absolute top-1 h-[calc(100%-8px)] transition-all duration-300 bg-gray-100"
        ref={sliderRef}
      />
{["Pending", "Approved"].map((label, i) => (
        <span
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          onClick={() => setActive(i)}
          className={`relative z-10 px-5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-300 cursor-pointer ${
            active === i ? "text-[#046A38]" : "text-gray-400"
          }`}
          style={{ borderRadius: "0 6px 6px 0" }}
        >
          {label}
        </span>
      ))}
      {/* {["Pending", "Approved"].map((label, i) => (
        <span
          key={i}
          ref={refs[i]}
          onClick={() => setActive(i)}
          className={`relative z-10 px-5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${active === i ? "text-[#046A38]" : "text-gray-400"
            }`}
          style={{ borderRadius: "0 6px 6px 0" }}
        >
          {label}
        </span>
      ))} */}
    </div>
  );
}