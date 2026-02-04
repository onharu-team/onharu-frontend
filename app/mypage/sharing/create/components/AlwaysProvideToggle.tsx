import { RiCheckLine } from "@remixicon/react";
import clsx from "clsx";

export function AlwaysProvideToggle({
  alwaysProvide,
  onToggle,
}: {
  alwaysProvide: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <div className="flex items-center">
        <span className="sm:text-md mr-4 text-base font-medium whitespace-nowrap">
          항시 제공 여부
        </span>
        <div className="bg-border h-px flex-1" />
        <div
          onClick={onToggle}
          className={clsx(
            "flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-full",
            alwaysProvide ? "bg-main" : "bg-border"
          )}
        >
          <RiCheckLine color="white" size={24} />
        </div>
      </div>
      <p className="mt-1.25 mb-3.75 text-xs font-medium sm:mb-7.5 sm:text-sm">
        항시 제공 선택 시 1개월 이상 꾸준히 나눔을 실천할 수 있습니다 :{")"}
      </p>
    </>
  );
}
