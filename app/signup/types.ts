export type SignupFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  name?: string;
  nickname?: string;
  phone: string;
  authCode: string;
  document: File[];
  agreeTerms: boolean;
  agreePrivacy: boolean;
  storeName?: string;
  businessNumber?: string;
};
