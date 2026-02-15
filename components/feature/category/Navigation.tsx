import Image from "next/image";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryData } from "./data";
import clsx from "clsx";
interface NavigatinProps {
  onChange: (category: number) => void;
}

export const Navigation = ({ onChange }: NavigatinProps) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("categoryId") ?? "0";

  const categoryBaseClasses =
    "flex cursor-pointer bg-white items-center gap-1 md:gap-2 rounded-full border border-gray-300 px-4.5 py-1 shadow-md";

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
      {CategoryData.map(item => (
        <button
          key={item.id}
          onClick={() => {
            onChange(item.id);
          }}
          className={clsx(
            categoryBaseClasses,
            category === String(item.id) && "!bg-main !border-main text-white"
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
