// 로그인
export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: null;
}

// 로그아웃
export interface LogoutResponse {
  success: boolean;
  data: unknown;
}

// 로그인 확인
export interface User {
  userId: number;
  loginId: string;
  userType: string;
  statusType: string;
  providerType: string;
  name: string;
}

export interface MeResponse {
  success: boolean;
  data: User | null;
}

// 회원가입
export interface SignupChildRequest {
  loginId: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  nickname: string;
  certificate: string;
}

export interface SignupOwnerRequest {
  loginId: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  name: string;
  businessNumber: string;
}

export interface SignupChildResponse {
  success: boolean;
  data: {
    id: number;
    loginId: string;
  };
}

export interface SignupOwnerResponse {
  success: boolean;
  data: {
    userId: number;
  };
}
