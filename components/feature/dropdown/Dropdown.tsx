"use client";
import { useState } from "react";
import { RiArrowDownSLine, RiCheckLine } from "@remixicon/react";
import clsx from "clsx";
import ReactFocusLock from "react-focus-lock";

const SelectData = [
  {
    value: "recommand",
    label: "추천순",
  },
  {
    value: "wish",
    label: "인기순",
  },
  {
    value: "distance",
    label: "거리순",
  },
];
export const BgrDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("추천순");

  return (
    <div className="relative mt-7 ml-auto w-fit">
      <button
        onClick={() => setOpen(!open)}
        className="border-main text-main border-main flex items-center gap-1.5 rounded-full border bg-white px-3 py-1"
      >
        <span className="text-sm font-bold">{selected}</span>
        <RiArrowDownSLine size={18} className={clsx("duration-200", open && "rotate-180")} />
      </button>
      <div className={clsx("absolute top-8 -z-1 mt-1", open && "z-10")}>
        <div
          className={clsx(
            "flex flex-col gap-1 rounded-md border border-gray-300 bg-white px-1 py-2 opacity-0 duration-150",
            open && "opacity-100"
          )}
        >
          {SelectData.map(data => (
            <div key={data.value}>
              <button
                className={clsx(
                  "flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left text-sm hover:bg-gray-100",
                  selected === data.label && "bg-main-100 text-main"
                )}
                aria-hidden={!open}
                tabIndex={open ? 1 : -1}
                onClick={() => {
                  setOpen(false);
                  setSelected(data.label);
                }}
              >
                {data.label}
                {selected === data.label && <RiCheckLine size={14} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
