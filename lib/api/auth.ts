import { apiClient } from "./clientApiClient";
import {
  ChangePasswordReq,
  ChildData,
  ChildReq,
  LoginReq,
  OwnerData,
  OwnerReq,
  SendEmailCodeReq,
  SignupReq,
  SignupRes,
  UpdateChildProfileReq,
  UpdateOwnerProfileReq,
  UserMeReq,
  ValidatePasswordReq,
  VerifyEmailCodeReq,
} from "./types/auth";
import { ApiResponse } from "./types/common";

// 이메일 인증 코드 발송
export const sendEmailCode = (body: SendEmailCodeReq): Promise<Record<string, never>> => {
  return apiClient.post<Record<string, never>>("/auth/email/send-code", body);
};

// 이메일 인증 코드 검증
export const verifyEmailCode = (body: VerifyEmailCodeReq): Promise<Record<string, never>> => {
  return apiClient.post<Record<string, never>>("/auth/email/verify-code", body);
};

// 사업자 등록 번호 확인
export const verifyBusinessNumber = (body: {
  businessNumber: string;
}): Promise<ApiResponse<boolean>> => {
  return apiClient.post<ApiResponse<boolean>>("/auth/business-number", body);
};

// 비밀 번호 확인
export const validatePassword = (body: ValidatePasswordReq): Promise<ApiResponse<"true">> => {
  return apiClient.post<ApiResponse<"true">, ValidatePasswordReq>("/auth/validate-password", body);
};

// 비밀 번호 수정
export const changePassword = (
  body: ChangePasswordReq
): Promise<ApiResponse<Record<string, never>>> => {
  return apiClient.post<ApiResponse<Record<string, never>>, ChangePasswordReq>(
    "/auth/change-password",
    body
  );
};

// 로그인
export async function login(body: LoginReq): Promise<ApiResponse<null>> {
  return apiClient.post<ApiResponse<null>>("/users/login", body);
}

// 로그아웃
export const logout = (): Promise<ApiResponse<null>> =>
  apiClient.post<ApiResponse<null>>("/users/logout");

// 로그인 확인
export const userMe = (): Promise<ApiResponse<UserMeReq>> =>
  apiClient.get<ApiResponse<UserMeReq>>("/users/me");

// 아동 회원가입
export const signupChild = (body: SignupReq & ChildReq): Promise<ApiResponse<SignupRes>> => {
  return apiClient.post<ApiResponse<SignupRes>, SignupReq & ChildReq>("/users/signup/child", body);
};

// 가게 회원가입
export const signupOwner = (body: SignupReq & OwnerReq): Promise<ApiResponse<SignupRes>> => {
  return apiClient.post<ApiResponse<SignupRes>, SignupReq & OwnerReq>("/users/signup/owner", body);
};

// 회원 탈퇴
export const withdrawUser = (): Promise<ApiResponse<null>> => {
  return apiClient.delete<ApiResponse<null>>("/users");
};

// 아동 프로필 조회
export const getChildProfile = (): Promise<ApiResponse<ChildData>> => {
  return apiClient.get<ApiResponse<ChildData>>("/users/profile/child");
};

// 아동 프로필 수정
export const updateChildProfile = (
  body: UpdateChildProfileReq
): Promise<ApiResponse<Record<string, never>>> => {
  return apiClient.put<ApiResponse<Record<string, never>>>("/users/profile/child", body);
};

// 가게 프로필 조회
export const getOwnerProfile = (): Promise<ApiResponse<OwnerData>> => {
  return apiClient.get<ApiResponse<OwnerData>>("/users/profile/owner");
};

// 가게 프로필 수정
export const updateOwnerProfile = (
  body: UpdateOwnerProfileReq
): Promise<ApiResponse<Record<string, never>>> => {
  return apiClient.put<ApiResponse<Record<string, never>>>("/users/profile/owner", body);
};
