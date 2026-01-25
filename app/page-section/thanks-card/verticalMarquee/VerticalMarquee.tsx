"use client";
import { Marquee } from "@/components/ui/marquee";
import { MarqueeCard } from "./MarqueeCard";
import { CardItems } from "../data/data";

const firstRow = CardItems.slice(0, CardItems.length / 2);
const secondRow = CardItems.slice(CardItems.length / 2);

export const VerticalMarquee = () => {
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
