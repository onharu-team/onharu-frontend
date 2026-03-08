import { apiClient } from "./clientApiClient";
import { ApiResponse } from "./types/common";
import { WriteReviewReq, WriteReviewRes } from "./types/reviews";

export const writeReview = (
  storeId: number,
  data: WriteReviewReq
): Promise<ApiResponse<WriteReviewRes>> => {
  return apiClient.post(`/reviews/stores/${storeId}`, data);
};

export const deleteReview = (reviewId: number): Promise<ApiResponse<void>> => {
  return apiClient.delete<ApiResponse<void>>(`/reviews/${reviewId}`);
};
