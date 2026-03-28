import { cn } from "@/lib/utils";

export const HashTag = ({ tags }: { tags: string[] }) => {
  return (
    <div
      className={cn(
        "w-[calc(100% - 20px)] mt-2 flex h-[22px] flex-wrap items-center gap-1 overflow-hidden md:h-[29px]",
        tags.length === 0 && "h-0 md:h-0"
      )}
    >
      {tags.map(tag => (
        <span
          key={tag}
          className="bg-main fle items-center justify-center rounded-full px-3 py-0.5 text-xs text-white md:py-1 md:text-sm"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};
