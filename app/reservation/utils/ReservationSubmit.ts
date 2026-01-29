import { format } from "date-fns";
import { Toast } from "@/components/feature/toast/Toast";

export const handleSubmit = (
  selectedDate: Date | null,
  selectedTime: string | null,
  counter: number
) => {
  //Toast("warning", "성공인가요??", "그럴리가요");
  if (!selectedDate || !selectedTime) return;

  const date = format(selectedDate, "yyyy-MM-dd");

  console.log("날짜: " + date + ", 타임: " + selectedTime + "인원: " + counter);
};
