import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { MonthlySummary } from "@/types/store/schedules/type";

interface ReservationProps {
  storeId?: string;
  data?: MonthlySummary[];
  isSharing: boolean;
}

export const ReservationBtn = ({ storeId, data, isSharing }: ReservationProps) => {
  const router = useRouter();

  if (!isSharing) {
    return (
      <Button varient="dark" fontSize="md" width="md" height="md">
        채팅하기
      </Button>
    );
  }
  return (
    <div className="flex gap-1.5">
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
      <Button varient="dark" fontSize="md" width="md" height="md">
        채팅하기
      </Button>
    </div>
  );
};
