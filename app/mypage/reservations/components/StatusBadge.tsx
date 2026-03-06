import { UserRole } from "@/lib/api/types/auth";
import { ReservationStatus } from "@/lib/api/types/reservation";

const STATUS_UI: Record<ReservationStatus, { label: string; badge: string }> = {
  ALL: { label: "", badge: "" },
  CONFIRMED: { label: "예약 확정", badge: "text-main border-main" },
  WAITING: { label: "예약 대기중", badge: "text-sub-sub-600 border-sub-sub-600" },
  COMPLETED: { label: "이용 완료", badge: "text-main border-main" },
  CANCELED: { label: "예약 취소", badge: "text-danger border-danger" },
};

interface Props {
  status: ReservationStatus;
  role: UserRole;
}

export default function StatusBadge({ status, role }: Props) {
  let label = STATUS_UI[status]?.label ?? "";
  const badge = STATUS_UI[status]?.badge ?? "";

  if (role === "OWNER" && status === "COMPLETED") {
    label = "나눔 완료";
  }

  return (
    <div className={`${badge} rounded-full border bg-white px-2 py-0.5 text-sm font-medium`}>
      {label}
    </div>
  );
}
