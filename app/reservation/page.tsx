"use client";

import Image from "next/image";
import { Heading } from "./components/shared/Heading";
import { DevideBar } from "./components/shared/DevideBar";
import { ReservationCalendar } from "./components/ReservationCalendar";
import { ReservationSelectInfo } from "../../components/feature/reservation/ReservationSelectInfo";
import { ReservationTime } from "../../components/feature/reservation/ReservationTime";
import { PeopleCounter } from "./components/PeopleCounter";
import { usePeopleCounter } from "./hooks/usePeopleCounter";
import { useCalendarSelect } from "@/components/feature/calendar/useCalendarSelect";
import { Button } from "@/components/ui/Button";
import { ReservationUtils } from "@/components/feature/reservation/utils/reservationUtils";
import { useReservationTime } from "@/components/feature/reservation/useReservationTime";
import { handleSubmit } from "./utils/ReservationSubmit";
//dummy data
import { DummyDate } from "./data/data";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import useModal from "@/hooks/useModal";
/**
 * 모든 하위 컴포넌트의 기능은 커스텀 훅으로 작동하고 있습니다.
 * 조립하는 최상위 컴포넌트 page.tsx에서는 use-* 커스텀 훅으로 예약 관련 기능을 불러와 데이터를 전달합니다.
 */
export default function Reservation() {
  const { selectedDate, setSelectedDate } = useCalendarSelect();
  const { selectedTime, handleSelectTime } = useReservationTime({ selectedDate });
  const { counter, handleSubtract, handleAdd } = usePeopleCounter({ availableCounter: 5 });
  const groupedDate = ReservationUtils(DummyDate);
  const { open, handleOpenModal, handleCloseModal } = useModal();
  /**
 * 날짜별로 시간을 그룹핑
 * @param groupedDate
 * 아래와 같은 형태의 데이터로 가공합니다.
 * 날짜별로 예약가능 시간을 배열로 그룹화 시켜줍니다.
 * {
    "2025-12-12": ["11:00", "12:00"],
    "2025-12-13": ["15:00","17:00"],
    "2025-12-15": ["14:00"],
  }
    캘린더, 예약 시간 선택 컴포넌트에서는 위처럼 그룹화 된 데이터를 전달받습니다.
 */

  return (
    <section className="mt-section-sm-top lg:mt-section-lg-top mb-section-sm-bottom lg:mb-section-lg-bottom">
      <div className="m-auto w-full max-w-[700px] px-[15px]">
        <p className="text-md font-bold md:text-xl lg:text-2xl">예약하기</p>
        <div className="bg-main-100 mt-7 flex items-center gap-3 rounded-md px-4 py-7 md:gap-7">
          <Image src="/image/page/reservation-img.png" alt="" width={50} height={50} />
          <p className="md:text-md text-sm font-semibold">
            사장님이 예약 확정 시 약속한 날짜에 이용 가능합니다. <br />
            매장에 도착해서 “OOO(닉네임)으로 예약했어요.”라고 말해주세요!
          </p>
        </div>
        <DevideBar />
        <button onClick={handleOpenModal}>modal on</button>
        {open && (
          <Modal onClick={handleCloseModal}>
            <p>gss</p>
          </Modal>
        )}
        <div>
          <Heading title="날짜와 시간을 선택해 주세요." />
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
        </div>
        <DevideBar />
        <div>
          <Heading title="인원을 선택해 주세요." />
          <div className="mt-7">
            <PeopleCounter
              counter={counter}
              handleSubtract={handleSubtract}
              handleAdd={handleAdd}
              availableCounter={5}
            />
          </div>
        </div>
        <div className="mt-10 md:mt-15">
          <Button
            varient="default"
            fontSize="md"
            width="lg"
            height="lg"
            onClick={() => handleSubmit(selectedDate, selectedTime, counter)}
          >
            예약하기
          </Button>
        </div>
      </div>
    </section>
  );
}
