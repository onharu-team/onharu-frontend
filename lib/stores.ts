import { apiClient } from "./api/clientApiClient";
import { ApiResponse } from "./api/types/common";
import { CreateStoreReq, UpdateStoreReq } from "./api/types/stores";

// 가게 등록
export const createStore = (body: CreateStoreReq): Promise<ApiResponse<{ id: number }>> => {
  return apiClient.post<ApiResponse<{ id: number }>>("/stores", body);
};

// 가게 정보 수정
export const updateStore = (storeId: string, body: UpdateStoreReq): Promise<ApiResponse<null>> => {
  return apiClient.put(`/stores/${storeId}`, body);
};
