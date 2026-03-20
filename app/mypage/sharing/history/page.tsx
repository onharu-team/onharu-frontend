"use client";

import { useState } from "react";
import { PageSection } from "../../components/PageSection";
import Calendar from "@/components/feature/calendar/Calendar";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import { formatDateLabel } from "@/utils/formatDateLabel";
import { useHistoryLogic } from "./hooks/useHistoryLogic";
import { ScheduleItem } from "./components/ScheduleItem";

export default function HistoryPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const { state, actions } = useHistoryLogic();

  const {
    selectedDate,
    reservedDates,
    selectedDaySchedules,
    modalOpen,
    deleteMutation,
    pendingDeleteId,
    pendingDeleteIdList,
  } = state;
  const {
    setSelectedDate,
    setCurrentYear,
    setCurrentMonth,
    handleRequestDelete,
    handleConfirmDelete,
    handleCloseModal,
  } = actions;

  const formattedDate = selectedDate ? formatDateLabel(selectedDate) : "";
  const hasDeletable = selectedDaySchedules.some(s => s.isAvailable);
  const schedulesToDelete =
    pendingDeleteId !== null
      ? selectedDaySchedules.filter(s => s.id === pendingDeleteId)
      : selectedDaySchedules.filter(s => pendingDeleteIdList.includes(s.id));

  return (
    <PageSection title="나눔 내역" className="px-4 pt-4 pb-7.5 sm:pt-9 sm:pb-15">
      <div className="mx-auto max-w-125">
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          reservedDates={reservedDates}
          onMonthChange={(year, month) => {
            setCurrentYear(year);
            setCurrentMonth(month);
          }}
        />

        {selectedDate && (
          <div className="mt-6 flex flex-col gap-2">
            {selectedDaySchedules.length === 0 ? (
              <div className="border-border rounded-md border bg-white p-3 text-center font-semibold md:p-5">
                해당 날짜에 등록된 나눔이 없습니다.
              </div>
            ) : (
              <div className="rounded-md border border-gray-300 bg-white p-3 text-center md:p-5">
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex cursor-pointer items-center justify-between"
                >
                  <div className="flex items-center gap-1 text-base font-semibold sm:gap-2">
                    {formattedDate} 나눔
                    <span className="text-main">{selectedDaySchedules.length}개</span>
                    {selectedDaySchedules.length > 1 && hasDeletable && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleRequestDelete();
                        }}
                        disabled={deleteMutation.isPending}
                        className="bg-main-active hover:bg-main rounded-full p-1 text-xs text-white sm:p-2"
                      >
                        전체 삭제
                      </button>
                    )}
                  </div>
                  {isDropdownOpen ? (
                    <RiArrowDownSLine className="h-6 w-6" />
                  ) : (
                    <RiArrowUpSLine className="h-6 w-6" />
                  )}
                </div>

                {isDropdownOpen && (
                  <div className="mt-4 space-y-4">
                    {selectedDaySchedules.map(s => (
                      <ScheduleItem
                        key={s.id}
                        schedule={s}
                        onDelete={handleRequestDelete}
                        isPending={deleteMutation.isPending}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {modalOpen && (
        <Modal onClick={handleCloseModal}>
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <p className="font-gmarketsans text-center font-medium break-keep sm:text-xl">
              {pendingDeleteId !== null
                ? "선택한 나눔을 삭제하시겠어요?"
                : "선택한 날짜의 나눔을 모두 삭제하시겠어요?"}
            </p>
            <div className="sm:text-md w-full text-center text-sm font-semibold">
              {formattedDate}
            </div>
            <div className="sm:text-md mb-5 w-full space-y-1 text-center text-sm font-semibold text-gray-700 sm:mb-10">
              {schedulesToDelete.map(s => (
                <p key={s.id}>
                  {s.time} ~ {s.endTime} · 최대 {s.maxPeople}명
                </p>
              ))}
            </div>
            <div className="grid w-full grid-cols-2 gap-2 sm:gap-5">
              <Button
                varient="light"
                width="lg"
                height="md"
                fontSize="sm"
                onClick={handleCloseModal}
                disabled={deleteMutation.isPending}
              >
                취소
              </Button>
              <Button
                varient="default"
                width="lg"
                height="md"
                fontSize="sm"
                onClick={handleConfirmDelete}
                disabled={deleteMutation.isPending}
              >
                삭제
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </PageSection>
  );
}
