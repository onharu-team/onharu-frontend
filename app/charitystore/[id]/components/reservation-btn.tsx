import { Button } from "@/components/ui/Button";

interface ReservationBtnProps {
  status: "short" | "long" | "empty";
}

export const ReservationBtn = ({ status }: ReservationBtnProps) => {
  if (status === "empty") {
    return (
      <Button varient="dark" fontSize="md" width="md" height="md">
        채팅하기
      </Button>
    );
  }
  return (
    <div className="flex gap-1.5">
      <Button varient="default" fontSize="md" width="md" height="md">
        예약하기
      </Button>
      <Button varient="dark" fontSize="md" width="md" height="md">
        채팅하기
      </Button>
    </div>
  );
};
