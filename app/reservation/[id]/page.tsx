"use client";

import Image from "next/image";
import { Heading } from "../components/shared/Heading";
import { DevideBar } from "../components/shared/DevideBar";
import { ReservationCalendar } from "../components/ReservationCalendar";
import { ReservationSelectInfo } from "../../../components/feature/reservation/ReservationSelectInfo";
import { ReservationTime } from "../../../components/feature/reservation/ReservationTime";
import { PeopleCounter } from "../components/PeopleCounter";
import { usePeopleCounter } from "../hooks/usePeopleCounter";
import { Button } from "@/components/ui/Button";
import { handleSubmit } from "../utils/ReservationSubmit";
import { useParams } from "next/navigation";
import { useCalendarSelect } from "@/components/feature/calendar/useCalendarSelect";
import { useReservationTime } from "@/components/feature/reservation/useReservationTime";
import { ReservationUtils } from "@/components/feature/reservation/utils/reservationUtils";
import { useQuery } from "@tanstack/react-query";
import { GetStoreSchedules } from "@/lib/api/GetStoreSchedules";
import { TransformScheduleData } from "@/components/feature/reservation/utils/TransformScheduleDate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useMemo, useState } from "react";
import { handleReservationSubmit } from "@/components/feature/reservation/utils/ReservationSubmit";

export default function Reservation() {
  const params = useParams();
  const storeId = params.id as string;

  const { selectedDate, setSelectedDate } = useCalendarSelect();
  const { selectedTime, handleSelectTime } = useReservationTime({ selectedDate });
  const [maxPeople, setMaxPeople] = useState<number>(1);
  const [storeScheduleId, setStoreScheduleId] = useState<number | null>(null);
  const counterDisabled = !selectedDate || !selectedTime;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const { counter, handleSubtract, handleAdd, handleCounterInit } = usePeopleCounter({
    availableCounter: maxPeople,
  });

  useEffect(() => {
    if (counterDisabled === true) {
      handleCounterInit();
    }
  }, [counterDisabled, handleCounterInit]);

  const { data: scheduleData, isLoading: scheduleLoading } = useQuery({
    queryKey: ["store-schedules", storeId, year, month],
    queryFn: () => GetStoreSchedules(storeId, year, month),
    enabled: !!storeId,
    staleTime: 1000 * 60,
    retry: false,
  });

  const rawData = useMemo(
    () => (scheduleData ? TransformScheduleData(scheduleData) : []),
    [scheduleData]
  );

  const groupedDate = ReservationUtils(rawData);
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const matched = rawData.find(
      r => r.date === (selectedDate ? formatDate(selectedDate) : "") && r.time === selectedTime
    );
    setMaxPeople(matched?.maxPeople ?? 5);
    setStoreScheduleId(matched?.id ?? null);
    console.log(matched?.id);
  }, [selectedDate, selectedTime, rawData]);

  //console.log(maxPeople);

  return (
    <section className="mt-section-sm-top lg:mt-section-lg-top mb-section-sm-bottom lg:mb-section-lg-bottom">
      <div className="m-auto w-full max-w-[700px] px-[15px]">
        <p className="text-md font-bold md:text-xl lg:text-2xl">예약하기</p>
        <div className="bg-main-100 mt-7 flex items-center gap-3 rounded-md px-4 py-7 md:gap-7">
          <Image src="/image/page/reservation-img.png" alt="" width={50} height={50} />
          <p className="md:text-md text-sm font-semibold">
            사장님이 예약 확정 시 약속한 날짜에 이용 가능합니다. <br />
            매장에 도착해서 OOO(닉네임)으로 예약했어요.라고 말해주세요!
          </p>
        </div>
        <DevideBar />
        <div>
          <Heading title="날짜와 시간을 선택해 주세요." />
          {scheduleLoading && <Skeleton height={700} className="mt-9" />}
          {!scheduleLoading && (
            <>
              <div className="mt-9">
                <ReservationCalendar
                  data={groupedDate}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
              <div className="mt-6">
                <ReservationTime
                  data={groupedDate}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  handleSelectTime={handleSelectTime}
                />
              </div>
              <div className="mt-12.5">
                <ReservationSelectInfo selectedDate={selectedDate} selectedTime={selectedTime} />
              </div>
            </>
          )}
        </div>
        <DevideBar />
        <div>
          <Heading title="인원을 선택해 주세요." />
          <div className="mt-7">
            <PeopleCounter
              counter={counter}
              handleSubtract={handleSubtract}
              handleAdd={handleAdd}
              availableCounter={maxPeople}
              disabled={counterDisabled}
            />
          </div>
        </div>
        <div className="mt-10 md:mt-15">
          <Button
            varient="default"
            fontSize="md"
            width="lg"
            height="lg"
            onClick={() =>
              handleReservationSubmit(selectedDate, selectedTime, counter, storeId, storeScheduleId)
            }
          >
            예약하기
          </Button>
        </div>
      </div>
    </section>
  );
}
