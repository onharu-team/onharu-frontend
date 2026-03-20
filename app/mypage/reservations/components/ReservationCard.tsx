import { Button } from "@/components/ui/Button";
import StatusBadge from "./StatusBadge";
import ReservationActionButtons from "./ReservationActionButtons";
import { ChildReservation, OwnerReservation } from "@/lib/api/types/reservation";
import formatDateTime from "@/utils/formatDateTime";

type ReservationCardProps = (ChildReservationCardProps | OwnerReservationCardProps) & {
  className?: string;
};

export default function ReservationCard(props: ReservationCardProps) {
  const {
    id,
    role,
    status,
    storeName,
    scheduleDate,
    startTime,
    people,
    cancelReason,
    storeId,
    reviewed,
    className = "bg-secondary",
  } = props;

  const { date, time } = formatDateTime(new Date(`${scheduleDate}T${startTime}`));

  return (
    <li
      className={`${className} mb-2 flex flex-col gap-3 rounded-[10px] p-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:p-6`}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <StatusBadge status={status} role={role} />

          <h3 className="text-sm font-bold sm:text-base">
            {role === "CHILD" ? storeName : props.childNickname}
          </h3>

          <Button varient="dark" width="xs" height="xs" fontSize="sm">
            채팅하기
          </Button>
        </div>

        <p className="text-xs font-medium sm:text-sm">
          {date} · {time} · {people}인 예약
        </p>

        {role === "CHILD" && (
          <p className="text-text-secondary text-xs font-medium sm:text-sm">{props.storeAddress}</p>
        )}

        {cancelReason && (
          <p className="text-xs font-medium sm:text-sm">취소 사유 : {cancelReason}</p>
        )}
      </div>

      <div className="flex w-full min-w-25 gap-1 sm:w-auto sm:flex-col sm:justify-end">
        <ReservationActionButtons
          role={role}
          status={status}
          reservationId={id}
          reservationDate={scheduleDate}
          storeName={storeName}
          storeId={storeId}
          reviewed={reviewed}
        />
      </div>
    </li>
  );
}
