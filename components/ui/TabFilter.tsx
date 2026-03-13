"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

interface TabItem {
  label: string;
  value: string;
}

interface TabFilterProps {
  tabs: TabItem[];
  status: string;
  setStatus: (value: string) => void;
}

export default function TabFilter({ tabs, status, setStatus }: TabFilterProps) {
  return (
    <div className="relative overflow-x-auto">
      <hr className="bg-border absolute bottom-0 left-0 h-0.5 w-full" />

      <ul className="flex">
        {tabs.map(tab => {
          const isActive = tab.value === status;

          return (
            <li key={tab.value} className="flex-1">
              <button
                onClick={() => setStatus(tab.value)}
                className={clsx(
                  "sm:text-md relative w-full cursor-pointer px-4 py-3 text-center text-sm font-medium whitespace-nowrap",
                  isActive ? "text-main" : "hover:text-main"
                )}
              >
                {tab.label}

                {isActive && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-main absolute bottom-0 left-0 h-0.75 w-full"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
