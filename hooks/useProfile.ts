import { useQuery } from "@tanstack/react-query";
import { getChildProfile, getOwnerProfile } from "@/lib/api/auth";
import { ChildData, OwnerData, UserRole } from "@/lib/api/types/auth";
import { ApiError, ApiResponse } from "@/lib/api/types/common";

export const useProfile = (userType: UserRole) => {
  return useQuery<ApiResponse<ChildData | OwnerData>, ApiError>({
    queryKey: ["profile", userType],
    queryFn: async () => {
      if (userType === "CHILD") {
        return getChildProfile();
      }
      return getOwnerProfile();
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60 * 24,
    enabled: !!userType,
  });
};
