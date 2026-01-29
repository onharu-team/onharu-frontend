"use client";

import { ChildSchedule } from "../types";
import { RiArrowRightSLine } from "@remixicon/react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function ChildVisitScheduleCard({ schedule }: { schedule?: ChildSchedule }) {
  const router = useRouter();

  if (!schedule) {
    return (
      <div className="bg-secondary flex flex-1 flex-col justify-between rounded-[10px] p-7">
        <div className="text-lg font-bold">
          <p>방문 예정인 곳이 없어요!</p>
          <p>찾으러 가볼까요?</p>
        </div>

        <div className="w-41.25">
          <Button
            onClick={() => router.push("/charitystore")}
            varient="default"
            width="md"
            height="md"
            fontSize="sm"
          >
            나눔가게 찾기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => router.push(`/charitystore/${schedule.storeId}`)}
      className="bg-secondary flex flex-1 cursor-pointer flex-col justify-between rounded-[10px] p-7"
    >
      <div className="flex items-center justify-between text-lg font-bold">
        방문 예정
        <RiArrowRightSLine size={30} className="text-text-secondary" />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>{schedule.storeName}</p>
        <p className="text-text-secondary">{schedule.address}</p>
        <p>
          {schedule.date} · {schedule.time} · {schedule.people}인 예약
        </p>
      </div>
    </div>
  );
}
