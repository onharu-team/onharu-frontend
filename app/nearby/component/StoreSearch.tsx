import { ChangeEvent, KeyboardEvent } from "react";
import { RiSearch2Line } from "@remixicon/react";

interface StoreSearchSearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
}

export const StoreSearch = ({ value, onChange, onSearch }: StoreSearchSearchProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div className="my-7.5 px-7">
      <div className="flex h-12.5 w-full items-center rounded-sm border border-gray-300 bg-white px-4 focus-within:outline-2">
        <input
          type="text"
          value={value || ""}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className="flex-1 focus:outline-none"
        />
        <button onClick={() => onSearch(value)} type="button">
          <RiSearch2Line size={24} />
        </button>
      </div>
    </div>
  );
};
