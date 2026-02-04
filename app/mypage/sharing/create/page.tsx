"use client";

import { useState } from "react";
import { PageSection } from "../../components/PageSection";
import { Button } from "@/components/ui/Button";
import { SharingFormHeader } from "./components/SharingFormHeader";
import { AlwaysProvideToggle } from "./components/AlwaysProvideToggle";
import { PeriodSelect } from "./components/PeriodSelect";
import { DayTimeSelect } from "./components/DayTimeSelect";
import { PeopleCountInput } from "./components/PeopleCountInput";
import { Modal } from "@/components/ui/Modal";
import useModal from "@/hooks/useModal";

export default function SharingPage() {
  const [content, setContent] = useState("");
  const [alwaysProvide, setAlwaysProvide] = useState(true);
  const [period, setPeriod] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [peopleCount, setPeopleCount] = useState("");

  const isFormValid =
    content.trim().length > 0 &&
    (alwaysProvide || period !== null) &&
    selectedDays.length > 0 &&
    selectedTimes.length > 0 &&
    Number(peopleCount) > 0;

  const toggleMultiSelect = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const { open, handleOpenModal, handleCloseModal } = useModal();

  const handleSubmit = () => {
    const payload = {
      content,
      alwaysProvide,
      period,
      days: selectedDays,
      times: selectedTimes,
      peopleCount: Number(peopleCount),
    };

    console.log("나눔 등록 데이터", payload);

    handleOpenModal();

    setContent("");
    setAlwaysProvide(true);
    setPeriod(null);
    setSelectedDays([]);
    setSelectedTimes([]);
    setPeopleCount("");
  };

  return (
    <PageSection title="나눔 등록" className="p-4 sm:p-8">
      <div className="mx-auto max-w-125">
        <SharingFormHeader content={content} onContentChange={setContent} storeName="미소치과" />

        <AlwaysProvideToggle
          alwaysProvide={alwaysProvide}
          onToggle={() => setAlwaysProvide(v => !v)}
        />

        {alwaysProvide ? (
          <>
            <PeriodSelect period={period} onPeriodChange={setPeriod} />

            <DayTimeSelect
              selectedDays={selectedDays}
              selectedTimes={selectedTimes}
              onDayToggle={day => toggleMultiSelect(day, selectedDays, setSelectedDays)}
              onTimeToggle={time => toggleMultiSelect(time, selectedTimes, setSelectedTimes)}
            />
          </>
        ) : (
          <>
            <div>달력</div>
          </>
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

      {open && (
        <Modal onClick={handleOpenModal}>
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <p className="mb-5 text-center font-medium break-keep sm:mb-10 sm:text-lg">
              나눔 등록이 완료되었습니다.
            </p>
            <Button
              varient="default"
              width="lg"
              height="md"
              fontSize="sm"
              onClick={handleCloseModal}
            >
              확인
            </Button>
          </div>
        </Modal>
      )}
    </PageSection>
  );
}
