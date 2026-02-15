"use client";
import { RiArrowDownSLine, RiCheckLine } from "@remixicon/react";
import clsx from "clsx";

interface DropdownProps {
  options: { value: string; direction: string; label: string }[];
  open: boolean;
  selected: string;
  highlightedIndex: number;
  setSelected: (label: string) => void;
  setSortChange: (sort: string, direction: string) => void;
  setHighlightedIndex: (index: number) => void;
  handleOpen: () => void;
  handleClose: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  listboxRef: React.RefObject<HTMLDivElement | null>;
}

export const BgrDropdown = ({
  options,
  open,
  selected,
  highlightedIndex,
  setSelected,
  setSortChange,
  setHighlightedIndex,
  handleOpen,
  handleClose,
  handleKeyDown,
  containerRef,
  listboxRef,
}: DropdownProps) => {
  return (
    <div className="relative mt-7 ml-auto w-fit" ref={containerRef}>
      <button
        onKeyDown={e => e.key === "ArrowDown" && handleOpen()}
        onClick={() => (open ? handleClose() : handleOpen())}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="border-main text-main border-main focus-visible:outline-main-900 flex items-center gap-1.5 rounded-full border bg-white px-3 py-1"
      >
        <span className="text-sm font-bold">{selected}</span>
        <RiArrowDownSLine size={18} className={clsx("duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div
          ref={listboxRef}
          role="listbox"
          tabIndex={0}
          aria-activedescendant={options[highlightedIndex].value}
          onKeyDown={e => handleKeyDown(e)}
          className="absolute top-10 z-30 w-full rounded-md border border-gray-300 bg-white px-1 py-1 shadow-md focus:outline-none"
        >
          {options.map((data, index) => (
            <button
              key={data.value}
              id={data.value}
              role="option"
              aria-selected={selected === data.label}
              className={clsx(
                "flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left text-sm",
                selected === data.label && "bg-main-100 text-main",
                highlightedIndex === index && "bg-gray-100"
              )}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => {
                setSelected(data.label);
                setSortChange(data.value, data.direction);
                handleClose();
              }}
            >
              {data.label}
              {selected === data.label && <RiCheckLine size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
