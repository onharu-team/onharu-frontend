import { childSchedule, childReviewList } from "../data/mockData";
import { ChildData } from "@/lib/api/types/auth";
import ChildReviewCard from "./ChildReviewCard";
import ChildVisitScheduleCard from "./ChildVisitScheduleCard";
import UserProfileCard from "./UserProfileCard";

export function ChildMyPage({ user }: { user: ChildData }) {
  return (
    <div className="flex flex-col gap-3 lg:gap-7.5">
      <div className="flex flex-col gap-3 md:flex-row lg:gap-7.5">
        <UserProfileCard user={user} />
        <ChildVisitScheduleCard schedule={childSchedule} />
      </div>

      <ChildReviewCard reviewTargets={childReviewList} />
    </div>
  );
}
