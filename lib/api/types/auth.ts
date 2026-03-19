export type UserRole = "OWNER" | "CHILD";

export interface ImageInfo {
  fileKey: string;
  filePath: string;
  displayOrder: string;
}

export interface ChildData {
  userType: "CHILD";
  loginId: string;
  name: string;
  phone: string;
  nickname: string;
  images: ImageInfo[] | string[];
}

export interface OwnerData {
  userType: "OWNER";
  loginId: string;
  name: string;
  phone: string;
  businessNumber: string;
  stores: number[];
  distributionCount: string;
  levelName: string;
  nextLevelName: string;
  nextToConditionNumber: string;
}

// 이메일 인증 코드
export type SendEmailCodeReq = {
  email: string;
};

export type VerifyEmailCodeReq = {
  email: string;
  code: string;
};

// 로그인
export interface LoginReq {
  loginId: string;
  password: string;
}

// 로그인 확인
export interface UserMeReq {
  userId: number;
  loginId: string;
  userType: UserRole;
  statusType: string;
  providerType: string;
  name: string;
}

// 회원가입
export interface ChildReq {
  loginId: string;
  name: string;
  phone: string;
  nickname: string;
  images: ImageInfo[] | string[];
}

export interface OwnerReq {
  loginId: string;
  name: string;
  phone: string;
  levelName?: string;
  businessNumber: string;
}

export interface SignupReq {
  password: string;
  passwordConfirm: string;
}

export interface SignupRes {
  userId: number;
  loginId?: string;
}

// 비밀번호 검증
export interface ValidatePasswordReq {
  password: string;
}

// 비밀번호 변경
export interface ChangePasswordReq {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

// 프로필 수정
export interface UpdateChildProfileReq {
  name: string;
  phone: string;
  nickname: string;
}

export interface UpdateOwnerProfileReq {
  name: string;
  phone: string;
  businessNumber: string;
}
