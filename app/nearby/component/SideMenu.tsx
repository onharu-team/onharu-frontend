import { useState } from "react";
import { RiArrowLeftSLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export const SideMenu = ({
  isReady,
  children,
}: {
  isReady: boolean;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <article
      className={cn(
        "absolute top-20 left-0 z-51 h-[100vh] w-full max-w-[435px] bg-white duration-350",
        !open && "-translate-x-full"
      )}
    >
      <div className="relative h-full w-full">
        <div className="flex h-full flex-col">{children}</div>
        <button
          onClick={() => setOpen(!open)}
          aria-label="사이드바 메뉴를 열고 닫을 수 있습니다."
          className={cn(
            "absolute top-[50%] -right-[35px] z-52 -translate-y-[50%] cursor-pointer rounded-r-lg border border-gray-300 bg-white px-[2.5px] py-4 shadow-xl",
            !isReady && "-z-10 opacity-0"
          )}
        >
          <RiArrowLeftSLine size={30} className={cn(!open && "rotate-180")} />
        </button>
      </div>
    </article>
  );
};
