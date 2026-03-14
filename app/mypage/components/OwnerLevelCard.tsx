"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import BadgeLevel from "./BadgeLevel";
import { useAuthProfile } from "@/hooks/useAuth";
import { OwnerData } from "@/lib/api/types/auth";
import OwnerGuideCard from "./OwnerGuideCard";

export default function OwnerLevelCard() {
  const router = useRouter();
  const { data: user } = useAuthProfile() as { data: OwnerData };

  return (
    <>
      {user.distributionCount ? (
        <div className="bg-secondary flex-1 rounded-[10px] p-5 md:min-w-87.5 lg:p-7">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex flex-col items-center text-center">
              <BadgeLevel level={user.levelName} />
            </div>

            <div className="flex flex-col gap-6 font-medium sm:mt-8 sm:gap-16">
              <div>
                <p className="sm:text-md text-sm break-keep">
                  지금까지 <span className="font-bold">{user.distributionCount}회</span> 나눔했어요.
                </p>
                {user.nextLevelName && user.nextToConditionNumber !== undefined && (
                  <p className="break-keep">
                    <span className="text-main">{user.nextToConditionNumber}회</span> 더 나눔하면{" "}
                    {user.nextLevelName} 등급이에요!
                  </p>
                )}
              </div>

              <Button
                onClick={() => router.push("/mypage/sharing/create")}
                varient="default"
                width="md"
                height="md"
                fontSize="sm"
              >
                나눔 하러 가기
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <OwnerGuideCard
          description="아직 나눔 내역이 없어요."
          subDescription="나눔으로 아이들을 도와주세요!"
          buttonText="나눔하러 가기"
          moveTo="/mypage/sharing/create"
        />
      )}
    </>
  );
}
