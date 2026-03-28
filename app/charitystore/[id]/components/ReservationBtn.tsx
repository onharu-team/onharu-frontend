import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useEnterChat } from "@/hooks/useEnterChat";
import { useAuthProfile } from "@/hooks/useAuth";
import { Toast } from "@/components/feature/toast/Toast";

interface ReservationProps {
  storeName: string;
  storeId?: string;
  isSharing: boolean;
  reservation: DateSummaries[] | [];
}

export const ReservationBtn = ({ storeName, storeId, isSharing }: ReservationProps) => {
  const router = useRouter();
  const { enterChat } = useEnterChat();
  const { data: user } = useAuthProfile();

  if (!isSharing) {
    return (
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
          enterChat(Number(storeId), storeName);
        }}
      >
        채팅하기
      </Button>
    );
  }
  return (
    <div className="flex gap-1.5">
      {availableDates.length !== 0 && (
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
          enterChat(Number(storeId), storeName);
        }}
      >
        예약하기
      </Button>
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
          enterChat(Number(storeId), storeName);
        }}
      >
        채팅하기
      </Button>
    </div>
  );
};
