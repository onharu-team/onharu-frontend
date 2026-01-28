import { format } from "date-fns";

export const handleSubmit = (
  selectedDate: Date | null,
  selectedTime: string | null,
  counter: number
) => {
  if (!selectedDate || !selectedTime) return;

  const date = format(selectedDate, "yyyy-MM-dd");

  console.log("날짜: " + date + ", 타임: " + selectedTime + "인원: " + counter);
};
