export const FIELD_PATTERNS = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
  phone: /^01[016789]\d{7,8}$/,
};

export const FIELD_CONFIG = {
  name: {
    label: "이름",
    placeholder: "이름을 입력해 주세요.",
    rules: {
      required: "이름은 필수입니다.",
    },
  },
  nickname: {
    label: "닉네임",
    placeholder: "닉네임을 입력해 주세요.",
    rules: {
      required: "닉네임은 필수입니다.",
      minLength: { value: 2, message: "닉네임은 2자 이상 입력해 주세요." },
    },
  },
  password: {
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력해 주세요.",
    rules: {
      required: "비밀번호는 필수입니다.",
      pattern: {
        value: FIELD_PATTERNS.password,
        message: "대,소문자, 숫자, 특수문자 포함 8자 이상 입력해주세요.",
      },
    },
  },
  passwordConfirm: (passwordValue: string) => ({
    label: "비밀번호 재입력",
    type: "password",
    placeholder: "비밀번호를 다시 한 번 입력해 주세요.",
    rules: {
      required: "비밀번호 확인은 필수입니다.",
      validate: (v: string | boolean | FileList | undefined) =>
        v === passwordValue || "비밀번호가 일치하지 않습니다.",
    },
  }),
  currentPassword: {
    label: "현재 비밀번호",
    type: "password",
    placeholder: "현재 비밀번호를 입력해 주세요.",
    rules: {
      required: "현재 비밀번호는 필수입니다.",
    },
  },
  newPassword: {
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력해 주세요.",
    rules: {
      required: "비밀번호는 필수입니다.",
      pattern: {
        value: FIELD_PATTERNS.password,
        message: "대,소문자, 숫자, 특수문자 포함 8자 이상 입력해주세요.",
      },
    },
  },
  newPasswordConfirm: (passwordValue: string) => ({
    label: "비밀번호 재입력",
    type: "password",
    placeholder: "비밀번호를 다시 한 번 입력해 주세요.",
    rules: {
      required: "비밀번호 확인은 필수입니다.",
      validate: (v: string | boolean | FileList | undefined) =>
        v === passwordValue || "비밀번호가 일치하지 않습니다.",
    },
  }),
  phone: {
    label: "연락처",
    type: "tel",
    placeholder: "연락처를 입력해 주세요.",
    rules: {
      required: "연락처는 필수입니다.",
      pattern: {
        value: FIELD_PATTERNS.phone,
        message: "올바른 전화번호 형식이 아닙니다.",
      },
    },
  },
  storeName: {
    label: "매장명",
    placeholder: "매장명을 입력해 주세요.",
    rules: {
      required: "매장명은 필수입니다.",
    },
  },
};
