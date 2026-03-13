import { apiClient } from "./clientApiClient";
import { ApiResponse } from "./types/common";
import { FavoritesResponse } from "./types/favorites";

// 찜 목록 조회
export const getFavorites = (params: {
  pageNum: number;
  perPage: number;
  sortField?: string;
  sortDirection?: "asc" | "desc";
}): Promise<ApiResponse<FavoritesResponse>> => {
  const query = new URLSearchParams({
    pageNum: String(params.pageNum),
    perPage: String(params.perPage) ?? "4",
    sortField: params.sortField || "id",
    sortDirection: params.sortDirection || "desc",
  }).toString();

  return apiClient.get<ApiResponse<FavoritesResponse>>(`/favorites?${query}`);
};

// 찜 토글 (등록/취소)
export const toggleFavorite = (
  storeId: number | string
): Promise<ApiResponse<{ isFavorite: boolean }>> => {
  return apiClient.post<ApiResponse<{ isFavorite: boolean }>>(`/favorites/stores/${storeId}`);
};
