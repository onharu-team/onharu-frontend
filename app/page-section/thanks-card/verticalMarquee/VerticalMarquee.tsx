"use client";
import { Reviews } from "@/types/reviews/type";
import { Marquee } from "@/components/ui/marquee";
import { MarqueeCard } from "./MarqueeCard";
import { MarqueeSkeleton } from "./MarqueeSkeleton";

export const VerticalMarquee = ({
  data,
  isLoading,
  error,
}: {
  data: Reviews[];
  isLoading: boolean;
  error: Error | null;
}) => {
  if (isLoading) {
    return (
      <div className="relative flex h-82 w-full flex-row items-center justify-center overflow-hidden lg:h-[713px]">
        <Marquee pauseOnHover vertical className="flex-1 [--duration:20s]">
          {Array.from({ length: 10 }, (_, i) => (
            <MarqueeSkeleton key={i} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="flex-1 [--duration:20s]">
          {Array.from({ length: 10 }, (_, i) => (
            <MarqueeSkeleton key={i} />
          ))}
        </Marquee>
      </div>
    );
  }

  if (error) {
    return <p className="font-gmarketsans text-3xl font-bold">데이터를 불러올 수 없습니다.</p>;
  }

  const firstRow = data.slice(0, data.length / 2);
  const secondRow = data.slice(data.length / 2);
  return (
    <div className="relative flex h-82 w-full flex-row items-center justify-center overflow-hidden lg:h-[713px]">
      <Marquee pauseOnHover vertical className="flex-1 [--duration:20s]">
        {firstRow.map(item => (
          <MarqueeCard key={item.id} {...item} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="flex-1 [--duration:20s]">
        {secondRow.map(item => (
          <MarqueeCard key={item.id} {...item} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
    </div>
  );
};
