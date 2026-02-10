"use client";
import Image from "next/image";
import { DesktopView } from "./DesktopView";
import { MobileView } from "./MobileView";
import { cn } from "@/lib/utils";
export const Banner = () => {
  return (
    <div
      className={cn(
        "desktopSmall:h-200 tablet:h-160 mobile:h-140 relative h-85 w-full overflow-hidden"
      )}
    >
      <Image
        src={"/image/banner/background.png"}
        alt=""
        fill
        style={{ objectFit: "cover" }}
        loading="eager"
      />
      <div className="tablet:block hidden">
        <DesktopView />
      </div>
      <div className="tablet:hidden block">
        <MobileView />
      </div>
    </div>
  );
};
