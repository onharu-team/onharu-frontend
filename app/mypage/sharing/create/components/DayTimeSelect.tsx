import { Section } from "./Section";
import { SelectButton } from "./SelectButton";
import { DAYS, TIMES } from "../constants/schedule";

export function DayTimeSelect({
  selectedDays,
  selectedTimes,
  onDayToggle,
  onTimeToggle,
}: {
  selectedDays: string[];
  selectedTimes: string[];
  onDayToggle: (day: string) => void;
  onTimeToggle: (time: string) => void;
}) {
  return (
    <>
      <Section title="나눔을 원하는 요일이 있나요? (여러개 선택 가능)">
        {DAYS.map(day => (
          <SelectButton
            key={day}
            label={day}
            selected={selectedDays.includes(day)}
            onClick={() => onDayToggle(day)}
          />
        ))}
      </Section>

      <Section title="나눔을 원하는 시간이 있나요? (여러개 선택 가능)">
        {TIMES.map(time => (
          <SelectButton
            key={time}
            label={time}
            selected={selectedTimes.includes(time)}
            onClick={() => onTimeToggle(time)}
          />
        ))}
      </Section>
    </>
  );
}
