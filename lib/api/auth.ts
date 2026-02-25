import { apiClient } from "./clientApiClient";
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  MeResponse,
  SignupChildRequest,
  SignupChildResponse,
  SignupOwnerRequest,
  SignupOwnerResponse,
} from "./types/auth";
import { ChildData, OwnerData } from "./types/auth";

export async function login(body: LoginReq): Promise<SuccessResponse<null>> {
  return apiClient.post<SuccessResponse<null>>("/users/login", body);
}

export const logout = (): Promise<SuccessResponse<null>> =>
  apiClient.post<SuccessResponse<null>>("/users/logout");

export const userMe = (): Promise<SuccessResponse<UserMeReq>> =>
  apiClient.get<SuccessResponse<UserMeReq>>("/users/me");

export const signupChild = (body: SignupReq & ChildData): Promise<SuccessResponse<SignupRes>> => {
  return apiClient.post<SuccessResponse<SignupRes>, SignupReq & ChildData>(
    "/users/signup/child",
    body
  );
};

export const signupOwner = (body: SignupOwnerRequest): Promise<SignupOwnerResponse> => {
  return apiClient.post<SignupOwnerResponse, SignupOwnerRequest>("/users/signup/owner", body);
};

export const getChildProfile = (): Promise<ChildData> => {
  return apiClient.get<ChildData>("/users/profile/child");
};

export const getOwnerProfile = (): Promise<OwnerData> => {
  return apiClient.get<OwnerData>("/users/profile/owner");
};
