import { apiClient } from "./clientApiClient";
import {
  ChangePasswordReq,
  ChildData,
  ChildReq,
  LoginReq,
  OwnerData,
  OwnerReq,
  SignupReq,
  SignupRes,
  UpdateChildProfileReq,
  UpdateOwnerProfileReq,
  UserMeReq,
  ValidatePasswordReq,
} from "./types/auth";
import { ApiResponse } from "./types/common";

export async function login(body: LoginReq): Promise<ApiResponse<null>> {
  return apiClient.post<ApiResponse<null>>("/users/login", body);
}

export const logout = (): Promise<ApiResponse<null>> =>
  apiClient.post<ApiResponse<null>>("/users/logout");

export const userMe = (): Promise<ApiResponse<UserMeReq>> =>
  apiClient.get<ApiResponse<UserMeReq>>("/users/me");

export const signupChild = (body: SignupReq & ChildReq): Promise<ApiResponse<SignupRes>> => {
  return apiClient.post<ApiResponse<SignupRes>, SignupReq & ChildReq>("/users/signup/child", body);
};

export const withdrawUser = (): Promise<ApiResponse<null>> => {
  return apiClient.delete<ApiResponse<null>>("/users");
};

export const signupOwner = (body: SignupReq & OwnerReq): Promise<ApiResponse<SignupRes>> => {
  return apiClient.post<ApiResponse<SignupRes>, SignupReq & OwnerReq>("/users/signup/owner", body);
};

export const getChildProfile = (): Promise<ApiResponse<ChildData>> => {
  return apiClient.get<ApiResponse<ChildData>>("/users/profile/child");
};

export const getOwnerProfile = (): Promise<ApiResponse<OwnerData>> => {
  return apiClient.get<ApiResponse<OwnerData>>("/users/profile/owner");
};

export const updateChildProfile = (
  body: UpdateChildProfileReq
): Promise<ApiResponse<Record<string, never>>> => {
  return apiClient.put<ApiResponse<Record<string, never>>>("/users/profile/child", body);
};

export const updateOwnerProfile = (
  body: UpdateOwnerProfileReq
): Promise<ApiResponse<Record<string, never>>> => {
  return apiClient.put<ApiResponse<Record<string, never>>>("/users/profile/owner", body);
};

export const validatePassword = (body: ValidatePasswordReq): Promise<ApiResponse<"true">> => {
  return apiClient.post<ApiResponse<"true">, ValidatePasswordReq>("/auth/validate-password", body);
};

export const changePassword = (
  body: ChangePasswordReq
): Promise<ApiResponse<Record<string, never>>> => {
  return apiClient.post<ApiResponse<Record<string, never>>, ChangePasswordReq>(
    "/auth/change-password",
    body
  );
};
