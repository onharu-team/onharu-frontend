import { serverApiClient } from "@/lib/api/serverApiClient";
import ChildReviewCard from "./ChildReviewCard";
import ChildVisitScheduleCard from "./ChildVisitScheduleCard";
import UserProfileCard from "./UserProfileCard";
import { ChildReservation } from "@/lib/api/types/reservation";
import { ChildReservationCardProps } from "../reservations/types";

type ChildReservationsRes = {
  upcomingReservations: ChildReservation[];
  reviewTargetReservations: ChildReservation[];
};

export async function ChildMyPage() {
  const result = await serverApiClient.get<ChildReservationsRes>(
    "/api/childrens/reservations/summary"
  );

  const schedule = (result.success && result.data?.upcomingReservations) || [];

  const reviewTargets: ChildReservationCardProps[] =
    (result.success &&
      result.data?.reviewTargetReservations.map(r => ({
        ...r,
        role: "CHILD",
      }))) ||
    [];

  return (
    <div className="flex flex-col gap-3 lg:gap-7.5">
      <div className="flex flex-col gap-3 md:flex-row lg:gap-7.5">
        <UserProfileCard />
        <ChildVisitScheduleCard schedule={schedule[0]} />
      </div>

      <ChildReviewCard reviewTargets={reviewTargets} />
    </div>
  );
}
