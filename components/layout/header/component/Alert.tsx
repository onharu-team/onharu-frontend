import { useRouter } from "next/navigation";
import { RiNotification3Line } from "@remixicon/react";
import { cn } from "@/lib/utils";

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
  return (
    <>
      <button className={buttonClass} onClick={() => router.push("/mypage/notifications")}>
        <span className="relative">
          <RiNotification3Line size={iconSize} />
          {/* 아래 span은 새로운 알림이 있을 경우 조건부 노출되도록 수정해야합니다. */}
          <span className={cn("bg-main absolute rounded-full", alertClass)} />
        </span>
      </button>
    </>
  );
};
