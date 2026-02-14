import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CategoryData } from "./data";
import clsx from "clsx";
import { CategoryName } from "./data";
import { useSearch } from "../search/useSearch";

interface NavigatinProps {
  value: CategoryName;
  onChange: (category: CategoryName) => void;
  InitializePage: () => void;
}

export const Navigation = ({ value, onChange, InitializePage }: NavigatinProps) => {
  const searchParams = useSearchParams();
  const categoryBaseClasses =
    "flex cursor-pointer bg-white items-center gap-1 md:gap-2 rounded-full border border-gray-300 px-4.5 py-1 shadow-md";

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
      {CategoryData.map(item => (
        <button
          key={item.id}
          onClick={() => {
            onChange(item.name);
            InitializePage();
          }}
          className={clsx(
            categoryBaseClasses,
            value === item.name && "!bg-main !border-main text-white"
          )}
        >
          <div className="relative h-4 w-4 md:h-6 md:w-6">
            <Image src={item.icon} alt={`${item.name} 이동`} fill style={{ objectFit: "cover" }} />
          </div>
          <span className="md:text-md text-xs font-bold text-inherit">{item.name}</span>
        </button>
      ))}
    </div>
  );
};
