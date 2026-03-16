import { apiClient } from "./clientApiClient";
import { ApiResponse } from "./types/common";
import {
  CreateStoreReq,
  GetStoreSchedulesReq,
  StoreSchedulesRes,
  UpdateStoreReq,
} from "./types/stores";

// 가게 등록
export const createStore = (body: CreateStoreReq): Promise<ApiResponse<{ id: number }>> => {
  return apiClient.post<ApiResponse<{ id: number }>>("/stores", body);
};

// 가게 정보 수정
export const updateStore = (storeId: string, body: UpdateStoreReq): Promise<ApiResponse<null>> => {
  return apiClient.put(`/stores/${storeId}`, body);
};

// 가게 스케줄 조회
export const getStoreSchedules = (
  storeId: string,
  params: GetStoreSchedulesReq
): Promise<ApiResponse<StoreSchedulesRes>> => {
  const query = new URLSearchParams({
    year: params.year,
    month: params.month,
    ...(params.day && { day: params.day }),
  }).toString();

  return apiClient.get<ApiResponse<StoreSchedulesRes>>(`/stores/${storeId}/schedules?${query}`);
};
