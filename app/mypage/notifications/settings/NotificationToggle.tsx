"use client";

import { useState } from "react";
import ToggleButton from "@/components/ui/ToggleButton";

export default function NotificationToggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="sm:text-md bg-secondary mb-3 flex items-center justify-between rounded-[10px] p-3 text-base font-medium sm:mb-5 sm:p-5">
      알림 받기
      <ToggleButton checked={isOn} onChange={setIsOn} />
    </div>
  );
}
