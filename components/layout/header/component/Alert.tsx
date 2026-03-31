import { useRouter } from "next/navigation";
import { RiNotification3Line } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { useNotificationHistory } from "@/hooks/useNotificationsHistory";

export const Alert = ({
  buttonClass,
  iconSize,
  alertClass,
}: {
  buttonClass: string;
  iconSize: number;
  alertClass: string;
}) => {
  const router = useRouter();
  const { hasUnread } = useNotificationHistory();

  return (
    <>
      <button className={buttonClass} onClick={() => router.push("/mypage/notifications")}>
        <span>
          <RiNotification3Line size={iconSize} />
          {hasUnread && <span className={cn("bg-main absolute rounded-full", alertClass)} />}
        </span>
      </button>
    </>
  );
};
