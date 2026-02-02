"use client";

import { Button } from "@/components/ui/Button";
import { SharingHistoryItem } from "../types";
import clsx from "clsx";

export default function HistoryCard({
  id,
  status,
  availableDates,
  availableTimes,
  maxParticipantsPerSlot,
  currentParticipants,
  remainingParticipants,
}: SharingHistoryItem) {
  return (
    <div className="bg-secondary mb-2 flex flex-col gap-4 rounded-[10px] p-2 sm:mb-4 sm:p-5">
      {/* 상태, 나눔 취소 버튼 */}
      <div className="flex items-center justify-between">
        <div className={clsx("sm:text-md font-bold", status === "ONGOING" && "text-main")}>
          {status === "ONGOING" ? "진행중인 나눔" : "지난 나눔"}
        </div>

        {status === "ONGOING" && (
          <Button varient="default" width="sm" height="sm" fontSize="sm">
            나눔취소
          </Button>
        )}
      </div>

      {/* 나눔 내용 */}
      <div className="mb-2 flex items-start gap-3 sm:gap-6">
        <div className="shrink-0 text-sm font-bold sm:text-base">나눔 내용</div>
        <div className="flex-1 text-sm wrap-break-word">
          <p>{availableDates.join(" · ")}</p>
          <p>{availableTimes.join(" · ")}</p>
          <p>{maxParticipantsPerSlot}인까지 가능</p>
        </div>
      </div>

      {/* 신청 인원 */}
      <div className="flex gap-3 sm:gap-6">
        <div className="text-sm font-bold sm:text-base">신청 인원</div>
        <div className="text-sm">
          <span className="text-main">{currentParticipants}</span> / {remainingParticipants}
        </div>
      </div>
    </div>
  );
}
