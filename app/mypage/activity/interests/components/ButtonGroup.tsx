"use client";

import { Button } from "@/components/ui/Button";

interface ButtonGroupProps {
  isPreparing: boolean;
}

export default function ButtonGroup({ isPreparing }: ButtonGroupProps) {
  return (
    <div
      className={`mt-5 flex justify-center gap-2.5 sm:mt-10 ${
        isPreparing ? "sm:max-w-35 sm:justify-center" : "sm:max-w-72.5 sm:justify-start"
      }`}
    >
      <Button varient="default" width="lg" height="sm" fontSize="sm">
        매장 보러가기
      </Button>
      {!isPreparing && (
        <Button varient="dark" width="lg" height="sm" fontSize="sm">
          예약하기
        </Button>
      )}
    </div>
  );
}
