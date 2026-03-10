import OwnerGuideCard from "./OwnerGuideCard";
import OwnerLevelCard from "./OwnerLevelCard";
import OwnerReservationCard from "./OwnerReservationCard";
import UserProfileCard from "./UserProfileCard";
import { ownerActive } from "../data/mockData";

export function OwnerMyPage() {
  const { hasStore, shareCount, reservations } = ownerActive;

  return (
    <div className="flex flex-col gap-3 lg:gap-7.5">
      <div className="flex flex-col gap-3 md:flex-row lg:gap-7.5">
        <UserProfileCard />

        {!hasStore ? (
          <OwnerGuideCard
            description="아직 등록된 가게가 없어요."
            subDescription="상점을 먼저 등록하고 나눔을 시작해보세요!"
            buttonText="가게 등록하러 가기"
            moveTo="/mypage/store/edit"
          />
        ) : shareCount > 0 ? (
          <OwnerLevelCard shareCount={shareCount} />
        ) : (
          <OwnerGuideCard
            description="아직 나눔 내역이 없어요."
            subDescription="나눔으로 아이들을 도와주세요!"
            buttonText="나눔하러 가기"
            moveTo="/mypage/sharing/create"
          />
        )}
      </div>

      <OwnerReservationCard reservations={reservations} />
    </div>
  );
}
