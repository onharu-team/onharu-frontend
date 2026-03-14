"use client";

import { RiArrowRightSLine } from "@remixicon/react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ChildReservation } from "@/lib/api/types/reservation";
import formatDateTime from "../utils/format";

export default function ChildVisitScheduleCard({ schedule }: { schedule?: ChildReservation }) {
  const router = useRouter();

  const { date, time } = formatDateTime(
    new Date(`${schedule?.scheduleDate}T${schedule?.startTime}`)
  );

  if (!schedule) {
    return (
      <div className="bg-secondary flex flex-1 flex-col justify-between gap-4 rounded-[10px] p-5 md:min-w-87.5 lg:p-7">
        <div className="text-sm font-bold sm:text-lg">
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
      className="bg-secondary flex flex-1 cursor-pointer flex-col justify-between rounded-[10px] p-5 md:min-w-87.5 lg:p-7"
    >
      <div className="flex items-center justify-between text-base font-bold sm:text-lg">
        방문 예정
        <RiArrowRightSLine className="text-text-secondary h-5 w-5 sm:h-7.5 sm:w-7.5" />
      </div>

      <div className="flex flex-col gap-2.5 text-xs break-keep sm:text-base">
        <p>{schedule.storeName}</p>
        <p className="text-text-secondary">{schedule.storeAddress}</p>
        <p>
          {date} · {time} · {schedule.people}인 예약
        </p>
      </div>
    </div>
  );
}
