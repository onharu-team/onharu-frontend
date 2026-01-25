import { cn } from "@/lib/utils";
import { CardItemProps } from "../data/type";

export const MarqueeCard = ({ storename, contents, date }: CardItemProps) => {
  return (
    <div
      className={cn(
        "relative h-full w-full cursor-pointer overflow-hidden rounded-md border border-gray-300 bg-white p-3 lg:p-7"
      )}
    >
      <div className="text-text flex flex-row items-center gap-2">
        <div className="flex flex-col">
          <p className="md:text-md text-base">
            <span className="text-md font-bold md:text-xl">{storename}</span> 사장님께
          </p>
          <p className="mt-2 text-sm md:text-base lg:mt-4">{contents}</p>
          <p className="mt-4 text-right text-sm md:text-base lg:mt-7">{date}</p>
        </div>
      </div>
    </div>
  );
};
