import { useMutation } from "@tanstack/react-query";
import { updateChildProfile, updateOwnerProfile } from "@/lib/api/auth";
import { UpdateChildProfileReq, UpdateOwnerProfileReq, UserRole } from "@/lib/api/types/auth";
import { ApiError, ApiResponse } from "@/lib/api/types/common";

export const useEditProfile = (userType: UserRole) => {
  return useMutation<
    ApiResponse<Record<string, never>>,
    ApiError,
    UpdateChildProfileReq | UpdateOwnerProfileReq
  >({
    mutationFn: data => {
      if (userType === "CHILD") {
        return updateChildProfile(data as UpdateChildProfileReq);
      }
      return updateOwnerProfile(data as UpdateOwnerProfileReq);
    },
  });
};
