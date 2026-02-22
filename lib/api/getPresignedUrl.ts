import { apiClient } from "./clientApiClient";

interface PresignedUrlResponse {
  success: boolean;
  data: {
    presignedUrl: string;
    downloadUrl: string;
  };
}

export const getPresignedUrl = async (
  fileName: string,
  contentType: string
): Promise<PresignedUrlResponse> => {
  const params = new URLSearchParams({ fileName, contentType });

  return apiClient.get<PresignedUrlResponse>(`/upload?${params.toString()}`);
};
