import { useEffect, useState } from "react";

export const useReservationTime = ({ selectedDate }: { selectedDate: Date | null }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  const handleSelectTime = (value: string) => {
    setSelectedTime(value);
  };

  return { selectedTime, handleSelectTime };
};
