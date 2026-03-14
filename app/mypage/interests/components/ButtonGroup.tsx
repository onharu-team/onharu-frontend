"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface ButtonGroupProps {
  isShare: boolean;
  storeId: number;
}

export default function ButtonGroup({ isShare, storeId }: ButtonGroupProps) {
  return (
    <div
      className={`mt-5 flex justify-center gap-2.5 sm:mt-10 ${
        !isShare ? "sm:max-w-35 sm:justify-center" : "sm:max-w-72.5 sm:justify-start"
      }`}
    >
      <Link href={`/charitystore/${storeId}`} className="w-full">
        <Button varient="default" width="lg" height="sm" fontSize="sm">
          매장 보러가기
        </Button>
      </Link>
      {isShare && (
        <Button varient="dark" width="lg" height="sm" fontSize="sm">
          예약하기
        </Button>
      )}
    </div>
  );
}
