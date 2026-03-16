"use client";

import { useState, useMemo } from "react";
import { PageSection } from "../../components/PageSection";
import { Button } from "@/components/ui/Button";
import useModal from "@/hooks/ui/useModal";
import { useCalendarSelect } from "@/components/feature/calendar/useCalendarSelect";
import { useMultiReservationTime } from "@/components/feature/reservation/useMultiReservationTime";
import { useStoreSchedules } from "@/hooks/UseStoreSchedules";
import { createStoreSchedules } from "@/lib/api/owners";
import { Toast } from "@/components/feature/toast/Toast";

import { AlwaysProvideToggle } from "./components/AlwaysProvideToggle";
import { PeopleCountInput } from "./components/PeopleCountInput";
import { AlwaysProvideArea } from "./components/AlwaysProvideArea";
import { SingleReservationArea } from "./components/SingleReservationArea";
import { SelectedReservationList } from "./components/SelectedReservationList";
import { SubmissionModal } from "./components/SubmissionModal";
import { generateAlwaysProvideSchedules, getEndTime } from "./util/schedules";
import { useAuthProfile } from "@/hooks/useAuth";
import { OwnerData } from "@/lib/api/types/auth";
import { useQueryClient } from "@tanstack/react-query";
import { CreateStoreScheduleItem } from "@/lib/api/types/reservation";
import { toggleMultiSelect } from "@/utils/array";

export default function SharingPage() {
  const [alwaysProvide, setAlwaysProvide] = useState(false);
  const [period, setPeriod] = useState<string | null>(null); // 항시 제공 기간
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // 선택 요일 (항시 제공)
  const [selectedAlwaysTimes, setSelectedAlwaysTimes] = useState<string[]>([]); // 선택 시간 (항시 제공)
  const [peopleCount, setPeopleCount] = useState(""); // 최대 인원수

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);

  const { selectedDate, setSelectedDate } = useCalendarSelect();
  const { open, handleOpenModal, handleCloseModal } = useModal();
  const {
    selectedTimes,
    handleSelectTimes,
    selectedTimesMap,
    handleRemoveTime,
    handleRemoveDate,
    handleClearAll,
  } = useMultiReservationTime({ selectedDate });

  const { data: user } = useAuthProfile() as { data: OwnerData };

  const storeId = String(user?.stores[0]);

  const { times: existingSchedules } = useStoreSchedules({
    storeId: storeId,
    params: { year: String(currentYear), month: String(currentMonth) },
  });

  // 유효성 검사
  const isFormValid = useMemo(() => {
    const hasPeople = Number(peopleCount) > 0;
    if (alwaysProvide) {
      return (
        hasPeople && period !== null && selectedDays.length > 0 && selectedAlwaysTimes.length > 0
      );
    }
    return hasPeople && Object.keys(selectedTimesMap).length > 0;
  }, [alwaysProvide, peopleCount, period, selectedDays, selectedAlwaysTimes, selectedTimesMap]);

  // 폼 초기화
  const resetForm = () => {
    setPeriod(null);
    setSelectedDays([]);
    setSelectedAlwaysTimes([]);
    setPeopleCount("");
    setSelectedDate(null);
    handleClearAll();
  };

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    let storeSchedules: CreateStoreScheduleItem[] = [];

    if (alwaysProvide) {
      // 항시 제공 스케줄 생성
      storeSchedules = generateAlwaysProvideSchedules(
        period || "0",
        selectedDays,
        selectedAlwaysTimes,
        Number(peopleCount)
      );
    } else {
      // 직접 선택 스케줄 생성
      storeSchedules = Object.entries(selectedTimesMap).flatMap(([date, times]) =>
        times.map(time => ({
          scheduleDate: date,
          startTime: time,
          endTime: getEndTime(time),
          maxPeople: Number(peopleCount),
        }))
      );
    }

    const body = { storeSchedules };

    try {
      await createStoreSchedules(storeId, body);

      queryClient.invalidateQueries({
        queryKey: ["storeSchedules", storeId, String(currentYear), String(currentMonth)],
      });

      resetForm();
      handleOpenModal();
    } catch (error) {
      console.error("나눔 등록 실패:", error);
      Toast("error", "나눔 등록에 실패했습니다.", "잠시후에 다시 시도해주세요.");
    }
  };

  return (
    <PageSection title="나눔 등록" className="px-4 pt-4 pb-7.5 sm:pt-9 sm:pb-15">
      <div className="mx-auto max-w-125">
        {/* <div className="mb-3 flex flex-col gap-2 sm:mb-6 sm:gap-5">
          <Input label="매장명" id="storeName" placeholder={user?.name} disabled />
        </div> */}

        <AlwaysProvideToggle
          alwaysProvide={alwaysProvide}
          onToggle={() => setAlwaysProvide(prev => !prev)}
        />

        {alwaysProvide ? (
          <AlwaysProvideArea
            period={period}
            selectedDays={selectedDays}
            selectedTimes={selectedAlwaysTimes}
            onPeriodChange={setPeriod}
            onDayToggle={day => toggleMultiSelect(day, selectedDays, setSelectedDays)}
            onTimeToggle={time =>
              toggleMultiSelect(time, selectedAlwaysTimes, setSelectedAlwaysTimes)
            }
          />
        ) : (
          <>
            <SingleReservationArea
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTimes}
              handleSelectTime={handleSelectTimes}
              existingSchedules={existingSchedules}
              onMonthChange={(year, month) => {
                setCurrentYear(year);
                setCurrentMonth(month);
              }}
            />
            <SelectedReservationList
              selectedTimesMap={selectedTimesMap}
              handleRemoveTime={handleRemoveTime}
              handleRemoveDate={handleRemoveDate}
              handleClearAll={handleClearAll}
            />
          </>
        )}

        <PeopleCountInput value={peopleCount} onChange={setPeopleCount} />

        {alwaysProvide && (
          <p className="mt-2 text-xs font-medium sm:mt-5 sm:text-sm">
            1년 이상 장기 나눔을 원하신다면 1:1 문의를 이용해 주세요 :{")"}
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
