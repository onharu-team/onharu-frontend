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

export const login = (body: LoginRequest) =>
  apiClient.post<LoginResponse, LoginRequest>("/users/login", body);

export const logout = () => apiClient.post<LogoutResponse>("/users/logout");

export const userMe = (): Promise<MeResponse> => {
  return apiClient.get<MeResponse>("/users/me");
};

export const signupChild = (body: SignupChildRequest): Promise<SignupChildResponse> => {
  return apiClient.post<SignupChildResponse, SignupChildRequest>("/users/signup/child", body);
};

export const signupOwner = (body: SignupOwnerRequest): Promise<SignupOwnerResponse> => {
  return apiClient.post<SignupOwnerResponse, SignupOwnerRequest>("/users/signup/owner", body);
};
