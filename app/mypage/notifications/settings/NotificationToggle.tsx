"use client";

import ToggleButton from "@/components/ui/ToggleButton";
import { useNotificationQuery } from "@/hooks/useNotification";

export default function NotificationToggle() {
  const { notification, updateToggle, isUpdating } = useNotificationQuery();

  const isEnabled = (notification && notification?.isSystemEnabled) ?? false;

  const handleToggle = (newValue: boolean) => {
    updateToggle(newValue);
  };

  return (
    <div className="sm:text-md bg-secondary mb-3 flex items-center justify-between rounded-[10px] p-3 text-base font-medium sm:mb-5 sm:p-5">
      알림 받기
      <ToggleButton checked={isEnabled} onChange={handleToggle} disabled={isUpdating} />
    </div>
  );
}
