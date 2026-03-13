import { apiClient } from "./clientApiClient";
import { ApiResponse } from "./types/common";
import { PresignedUrlRes } from "./types/upload";

export const getPresignedUrl = async (
  fileName: string,
  contentType: string
): Promise<ApiResponse<PresignedUrlRes>> => {
  const params = new URLSearchParams({ fileName, contentType });

  return apiClient.get<ApiResponse<PresignedUrlRes>>(`/upload?${params.toString()}`);
};
