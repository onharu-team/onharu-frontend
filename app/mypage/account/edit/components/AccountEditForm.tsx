"use client";

import { FieldError, useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";

export type UserRole = "owner" | "child";

export interface EditForm {
  name: string;
  nickname?: string;
  phone: string;
  businessNumber?: string;
}

interface EditFormProps {
  defaultValues: EditForm;
  userRole: UserRole;
  onSubmit: SubmitHandler<EditForm>;
  serverNicknameError?: string;
}

export default function AccountEditForm({
  defaultValues,
  userRole,
  onSubmit,
  serverNicknameError,
}: EditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<EditForm>({ defaultValues });

  useEffect(() => {
    if (serverNicknameError) {
      setError("nickname", { type: "server", message: serverNicknameError });
    }
  }, [serverNicknameError, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-7.5 flex flex-col gap-2 sm:mb-12.5 sm:gap-5">
        <Input label="이메일" id="email" placeholder="test@test.com" disabled />

        <Input
          label="이름"
          id="name"
          placeholder="이름을 입력해 주세요."
          register={register("name", { required: "이름은 필수입니다." })}
          error={errors.name as FieldError | undefined}
          isRequired
        />

        {userRole === "child" && (
          <Input
            label="닉네임"
            id="nickname"
            placeholder="닉네임을 입력해 주세요."
            register={register("nickname", {
              required: "닉네임은 필수입니다.",
              minLength: { value: 2, message: "닉네임은 2자 이상 입력해 주세요." },
            })}
            error={errors.nickname as FieldError | undefined}
            isRequired
          />
        )}

        <Input
          label="연락처"
          id="phone"
          placeholder="휴대폰 번호를 입력해 주세요."
          register={register("phone", {
            required: "연락처는 필수입니다.",
            pattern: {
              value: /^01[0-9]{8,9}$/,
              message: "올바른 휴대폰 번호를 입력해주세요.",
            },
          })}
          error={errors.phone as FieldError | undefined}
          isRequired
        />

        {userRole === "owner" && (
          <Input
            label="사업자등록번호"
            id="businessNumber"
            placeholder={defaultValues.businessNumber || "사업자등록번호"}
            disabled
          />
        )}
      </div>

      <Button type="submit" varient="default" fontSize="md" width="lg" height="md">
        수정하기
      </Button>
    </form>
  );
}
