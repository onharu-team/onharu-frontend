import { formatDateLabel } from "@/utils/formatDateLabel";
import { RiNotification3Line } from "@remixicon/react";

interface NotificationItemProps {
  title: string;
  message?: string | null;
  createdAt: string;
}

export default function NotificationItem({ title, message, createdAt }: NotificationItemProps) {
  const date = formatDateLabel(createdAt);
  return (
    <div className="bg-secondary mb-3 flex items-center gap-5 rounded-[10px] p-2 sm:mb-5 sm:p-5">
      <div className="bg-main-300 flex h-8 w-8 min-w-8 items-center justify-center rounded-full sm:h-12.5 sm:w-12.5 sm:min-w-12.5">
        <RiNotification3Line className="text-main w-5 sm:w-6.25" />
      </div>

      <div className="w-full max-w-[90%] text-sm font-medium break-keep sm:text-base">
        <div className="flex justify-between">
          <p className="text-main">{title}</p>
          <p className="text-text-secondary text-xs font-light sm:text-sm">{date}</p>
        </div>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
