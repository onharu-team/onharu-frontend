"use client";
import { useState, useEffect, useRef } from "react";

type DropdownOption = {
  value: string;
  direction: string;
  label: string;
};
export function useDropdown<T extends readonly DropdownOption[]>({ options }: { options: T }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[1].label);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const listboxRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => {
    setOpen(true);
    const index = options.findIndex(data => data.label === selected);
    setHighlightedIndex(index >= 0 ? index : 0);
    setTimeout(() => listboxRef.current?.focus(), 0);
  };

  const handleClose = () => setOpen(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % options.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + options.length) % options.length);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      setSelected(options[highlightedIndex].label);
      setOpen(false);
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    open,
    selected,
    highlightedIndex,
    setSelected,
    setHighlightedIndex,
    handleOpen,
    handleClose,
    handleKeyDown,
    containerRef,
    listboxRef,
  };
}
