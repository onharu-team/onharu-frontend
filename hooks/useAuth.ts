"use client";

import { useQuery } from "@tanstack/react-query";
import { userMe, getChildProfile, getOwnerProfile } from "@/lib/api/auth";
import { useLogout } from "./useLogout";
import { useEffect } from "react";
import { Toast } from "@/components/feature/toast/Toast";
import { ChildData, OwnerData, UserRole } from "@/lib/api/types/auth";

export function useAuthProfile() {
  const { mutate: logout } = useLogout();

  const query = useQuery<ChildData | OwnerData | null>({
    queryKey: ["auth"],
    queryFn: async () => {
      const meRes = await userMe();

      if (meRes.success === false) {
        return null;
      }

      const userType: UserRole = meRes.data.userType;

      const profileRes = userType === "CHILD" ? await getChildProfile() : await getOwnerProfile();

      if (profileRes.success === false) {
        throw new Error("프로필 정보를 불러오는데 실패했습니다.");
      }

      return {
        userId: meRes.data.userId,
        ...profileRes.data,
      };
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60 * 24,
    retry: false,
  });

  useEffect(() => {
    if (query.isError) {
      Toast("info", "세션이 만료되었습니다.", "다시 로그인해주세요.");
      logout();
    }
  }, [query.isError, logout]);

  return query;
}
