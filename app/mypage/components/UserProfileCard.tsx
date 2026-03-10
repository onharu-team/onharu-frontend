"use client";

import { Button } from "@/components/ui/Button";
import { useAuthProfile } from "@/hooks/useAuth";
import { RiEditBoxLine } from "@remixicon/react";
import { useRouter } from "next/navigation";

export default function UserProfileCard() {
  const router = useRouter();

  const { data: user } = useAuthProfile();
  if (!user) return null;

  const displayName = user.userType === "CHILD" ? user.nickname : user.name;

  return (
    <div className="bg-secondary flex flex-col justify-between rounded-[10px] p-5 md:min-w-75 lg:p-7">
      <div className="text-md mb-8 font-bold sm:text-xl">
        <div className="flex items-center justify-between">
          <p>반갑습니다 :{")"}</p>
          <span className="bg-main-200 rounded-full px-5 py-2 text-sm">
            {user.userType === "OWNER" ? "나눔" : "아동"}회원
          </span>
        </div>
        <p>
          <span className="text-main">{displayName}</span>님
        </p>
      </div>

      <div className="w-41.25">
        <Button
          onClick={() => router.push("/mypage/account/edit")}
          varient="default"
          width="lg"
          height="md"
          fontSize="sm"
        >
          <RiEditBoxLine size={24} className="mr-2.5 text-white" />
          회원정보 수정
        </Button>
      </div>
    </div>
  );
}
