"use client";

import { useState } from "react";
import { PageSection } from "../../components/PageSection";
import { Button } from "@/components/ui/Button";
import useModal from "@/hooks/ui/useModal";
import { useCalendarSelect } from "@/components/feature/calendar/useCalendarSelect";
import { useReservationTime } from "@/components/feature/reservation/useReservationTime";
import { SharingFormHeader } from "./components/SharingFormHeader";
import { AlwaysProvideToggle } from "./components/AlwaysProvideToggle";
import { PeopleCountInput } from "./components/PeopleCountInput";
import { AlwaysProvideArea } from "./components/AlwaysProvideArea";
import { SingleReservationArea } from "./components/SingleReservationArea";
import { SubmissionModal } from "./components/SubmissionModal";

export default function SharingPage() {
  const [content, setContent] = useState("");
  const [alwaysProvide, setAlwaysProvide] = useState(true);
  const [period, setPeriod] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [peopleCount, setPeopleCount] = useState("");

  const { selectedDate, setSelectedDate } = useCalendarSelect();
  const { selectedTime, handleSelectTime } = useReservationTime({ selectedDate });
  const { open, handleOpenModal, handleCloseModal } = useModal();

  const isFormValid =
    content.trim().length > 0 &&
    Number(peopleCount) > 0 &&
    (alwaysProvide
      ? period !== null && selectedDays.length > 0 && selectedTimes.length > 0
      : selectedDate !== null && selectedTime !== null);

  const toggleMultiSelect = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);

  const resetForm = () => {
    setContent("");
    setAlwaysProvide(true);
    setPeriod(null);
    setSelectedDays([]);
    setSelectedTimes([]);
    setPeopleCount("");
    setSelectedDate(null);
    handleSelectTime("");
  };

  const handleSubmit = () => {
    const payload = {
      content,
      alwaysProvide,
      period,
      days: alwaysProvide ? selectedDays : selectedDate,
      times: alwaysProvide ? selectedTimes : selectedTime ? [selectedTime] : [],
      peopleCount: Number(peopleCount),
    };

    console.log("나눔 등록 데이터", payload);
    handleOpenModal();
    resetForm();
  };

  return (
    <PageSection title="나눔 등록" className="px-4 pt-4 pb-7.5 sm:pt-9 sm:pb-15">
      <div className="mx-auto max-w-125">
        <SharingFormHeader content={content} onContentChange={setContent} storeName="미소치과" />

        <AlwaysProvideToggle
          alwaysProvide={alwaysProvide}
          onToggle={() => setAlwaysProvide(prev => !prev)}
        />

        {alwaysProvide ? (
          <AlwaysProvideArea
            period={period}
            selectedDays={selectedDays}
            selectedTimes={selectedTimes}
            onPeriodChange={setPeriod}
            onDayToggle={day => toggleMultiSelect(day, selectedDays, setSelectedDays)}
            onTimeToggle={time => toggleMultiSelect(time, selectedTimes, setSelectedTimes)}
          />
        ) : (
          <SingleReservationArea
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            handleSelectTime={handleSelectTime}
          />
        )}

        <PeopleCountInput value={peopleCount} onChange={setPeopleCount} />

        {alwaysProvide && (
          <p className="mt-2 text-xs font-medium sm:mt-5 sm:text-sm">
            1년 이상 장기 나눔을 원하신다면 1:1 문의를 이용해 주세요:{")"}
          </p>
        )}

        <div className="mt-7.5 sm:mt-12.5">
          <Button
            varient="default"
            width="lg"
            height="md"
            fontSize="md"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            등록하기
          </Button>
        </div>
      </div>

      <SubmissionModal open={open} onClose={handleCloseModal} />
    </PageSection>
  );
}
