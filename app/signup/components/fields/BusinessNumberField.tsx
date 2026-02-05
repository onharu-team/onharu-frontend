import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";
import { SignupFormValues } from "@/app/signup/types";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";

type BusinessNumberFieldProps = {
  register: UseFormRegister<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  trigger: UseFormTrigger<SignupFormValues>;
};

export default function BusinessNumberField({
  register,
  errors,
  trigger,
}: BusinessNumberFieldProps) {
  const handleCheckBusinessNumber = async () => {
    await trigger("businessNumber");
  };

  return (
    <div className="relative flex flex-row">
      <div className="w-78.75">
        <Input
          label="사업자등록번호"
          id="businessNumber"
          placeholder="-를 제외하고 연속된 숫자를 입력해 주세요."
          isRequired
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
        >
          사업자번호 확인
        </Button>
      </div>
    </div>
  );
}
