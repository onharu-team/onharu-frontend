import { format } from "date-fns";
import { Toast } from "@/components/feature/toast/Toast";

export const handleSubmit = (
  selectedDate: Date | null,
  selectedTime: string | null,
  counter: number
) => {
  //Toast("error", "성공인가요?");
  if (!selectedDate || !selectedTime) return;

  const date = format(selectedDate, "yyyy-MM-dd");
};
