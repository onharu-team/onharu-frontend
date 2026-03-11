import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormTrigger,
} from "react-hook-form";
import { SignupFormValues } from "@/app/signup/types";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";
import { verifyBusinessNumber } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { ApiResponse } from "@/lib/api/types/common";

type BusinessNumberFieldProps = {
  register: UseFormRegister<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  trigger: UseFormTrigger<SignupFormValues>;
  setError: UseFormSetError<SignupFormValues>;
  getValues: UseFormGetValues<SignupFormValues>;
  isBusinessVerified: boolean;
  setIsBusinessVerified: Dispatch<SetStateAction<boolean>>;
};

export default function BusinessNumberField({
  register,
  errors,
  trigger,
  setError,
  getValues,
  isBusinessVerified,
  setIsBusinessVerified,
}: BusinessNumberFieldProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: verifyBusinessNumber,
    onSuccess: (response: ApiResponse<boolean>) => {
      if (response.success && !response.data) {
        setError("businessNumber", {
          type: "manual",
          message: "올바른 사업자 번호를 입력해 주세요.",
        });
      } else {
        setIsBusinessVerified(true);
      }
    },
    onError: () => {
      setError("businessNumber", {
        type: "manual",
        message: "사업자 번호 확인 중 문제가 발생했습니다.",
      });
    },
  });

  const handleCheckBusinessNumber = async () => {
    if (isBusinessVerified) return;

    const valid = await trigger("businessNumber");
    if (!valid) return;

    const businessNumber = getValues("businessNumber");

    if (businessNumber) {
      mutate({ businessNumber });
    }
  };

  return (
    <div className="relative flex flex-row">
      <div className="w-78.75">
        <Input
          label="사업자등록번호"
          id="businessNumber"
          placeholder="-를 제외하고 연속된 숫자를 입력해 주세요."
          isRequired
          disabled={isBusinessVerified}
          register={register("businessNumber", {
            required: "사업자등록번호는 필수입니다.",
            pattern: {
              value: /^\d{10}$/,
              message: "숫자만 10자리 입력해 주세요.",
            },
          })}
          error={errors.businessNumber}
        />
      </div>

      <div className={clsx("absolute right-0 bottom-0", errors.businessNumber && "mb-8")}>
        <Button
          type="button"
          varient="default"
          width="md"
          height="md"
          fontSize="sm"
          onClick={handleCheckBusinessNumber}
          disabled={isPending || isBusinessVerified}
        >
          {isBusinessVerified ? "인증 완료" : isPending ? "확인 중..." : "사업자번호 확인"}
        </Button>
      </div>
    </div>
  );
}
