import { serverApiClient } from "@/lib/api/serverApiClient";
import CardList from "./CardList";
import { OwnerReservation } from "@/lib/api/types/reservation";
import { OwnerReservationCardProps } from "../reservations/types";

type OwnerReservationsRes = {
  ongoingReservations: OwnerReservation[];
};

export default async function OwnerReservationCard() {
  const result = await serverApiClient.get<OwnerReservationsRes>(
    "/api/owners/reservations/summary"
  );

  const reservations: OwnerReservationCardProps[] =
    (result.success &&
      result.data?.ongoingReservations.map(r => ({
        ...r,
        role: "OWNER",
      }))) ||
    [];

  return (
    <div className="bg-secondary flex-1 rounded-[10px] p-5 lg:p-7">
      <CardList
        title="진행중인 예약"
        items={reservations}
        emptyTitle="현재 진행중인 예약이 없어요."
        emptySubtitle="나눔 등록 후 예약을 받아보세요!"
        emptyButtonText="나눔 하러 가기"
        emptyLink="/mypage/sharing/create"
      />
    </div>
  );
}
