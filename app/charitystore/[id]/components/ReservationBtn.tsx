import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { StoreSchedules } from "@/types/store/detail/StoreSchedules";

export const ReservationBtn = ({ data }: { data: StoreSchedules[] | null }) => {
  const router = useRouter();
  if (!data) {
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
          router.push(`/reservation/"${data[0].storeId}`);
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
