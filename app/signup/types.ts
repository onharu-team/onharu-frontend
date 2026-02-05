export type SignupFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  name?: string;
  nickname?: string;
  phone: string;
  authCode: string;
  document: FileList;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  storeName?: string;
  businessNumber?: string;
};
