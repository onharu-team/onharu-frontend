"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";
import { FormField } from "@/components/form-fields/FormField";
import { FIELD_CONFIG } from "@/components/form-fields/fieldConfig";
import { UserRole } from "@/lib/api/types/auth";

export interface EditForm {
  loginId: string;
  name: string;
  nickname?: string;
  phone: string;
  businessNumber?: string;
}

interface EditFormProps {
  defaultValues: EditForm;
  userType: UserRole;
  onSubmit: SubmitHandler<EditForm>;
  serverNicknameError?: string;
}

export default function AccountEditForm({
  defaultValues,
  userType,
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
    <>
      <div className="mb-7.5 flex flex-col gap-2 sm:mb-12.5 sm:gap-5">
        <Input label="이메일" id="email" placeholder={defaultValues.loginId} disabled />

        <FormField<EditForm>
          name="name"
          config={FIELD_CONFIG.name}
          register={register}
          errors={errors}
        />

        {userType === "CHILD" && (
          <FormField<EditForm>
            name="nickname"
            config={FIELD_CONFIG.nickname}
            register={register}
            errors={errors}
          />
        )}

        <FormField<EditForm>
          name="phone"
          config={FIELD_CONFIG.phone}
          register={register}
          errors={errors}
        />

        {userType === "OWNER" && (
          <Input
            label="사업자등록번호"
            id="businessNumber"
            placeholder={defaultValues.businessNumber || "사업자등록번호"}
            disabled
          />
        )}
      </div>

      <Button
        type="submit"
        varient="default"
        fontSize="md"
        width="lg"
        height="md"
        onClick={handleSubmit(onSubmit)}
      >
        수정하기
      </Button>
    </>
  );
}
