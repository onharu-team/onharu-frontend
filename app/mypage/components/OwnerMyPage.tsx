import OwnerGuideCard from "./OwnerGuideCard";
import OwnerLevelCard from "./OwnerLevelCard";
import OwnerReservationCard from "./OwnerReservationCard";
import UserProfileCard from "./UserProfileCard";
import { cookies } from "next/headers";

export async function OwnerMyPage() {
  const cookieStore = await cookies();
  const storeId = cookieStore.get("storeId")?.value;

  return (
    <div className="flex flex-col gap-3 lg:gap-7.5">
      <div className="flex flex-col gap-3 md:flex-row lg:gap-7.5">
        <UserProfileCard />

        {!storeId ? (
          <OwnerGuideCard
            description="아직 등록된 가게가 없어요."
            subDescription="상점을 먼저 등록하고 나눔을 시작해보세요!"
            buttonText="가게 등록하러 가기"
            moveTo="/mypage/store/edit"
          />
        ) : (
          <OwnerLevelCard />
        )}
      </div>

      <OwnerReservationCard />
    </div>
  );
}
