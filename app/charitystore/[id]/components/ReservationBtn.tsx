import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { DateSummaries } from "@/types/store/schedules/type";
import { useEnterChat } from "@/hooks/useEnterChat";
import { useAuthProfile } from "@/hooks/useAuth";
import { Toast } from "@/components/feature/toast/Toast";

interface ReservationProps {
  storeName: string;
  storeId?: string;
  isSharing: boolean;
  reservation: DateSummaries[] | [];
  storeUserId: number;
}

export const ReservationBtn = ({
  storeName,
  storeId,
  isSharing,
  reservation,
  storeUserId,
}: ReservationProps) => {
  const router = useRouter();
  const { enterChat } = useEnterChat();
  const { data: user } = useAuthProfile();
  const availableDates = reservation.filter(day => day.availableSlots > 0);

  return (
    <div className="flex gap-1.5">
      {isSharing && (
        <Button
          varient="default"
          fontSize="md"
          width="md"
          height="md"
          onClick={() => {
            router.push(`/reservation/${storeId}`);
          }}
        >
          예약하기
        </Button>
      )}
      <Button
        varient="dark"
        fontSize="md"
        width="md"
        height="md"
        onClick={() => {
          if (user?.userType !== "CHILD") {
            Toast("info", "아동 회원만 채팅 가능합니다.");
            return;
          }
          enterChat(Number(storeUserId), storeName);
        }}
      >
        채팅하기
      </Button>
    </div>
  );
};
