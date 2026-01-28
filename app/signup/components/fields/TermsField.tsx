import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SignupFormValues } from "@/app/signup/data/signup";
import Checkbox from "@/components/ui/Checkbox";

type TermsFieldProps = {
  register: UseFormRegister<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
};

export default function TermsField({ register, errors }: TermsFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* 이용약관 */}
      <div>
        <Checkbox
          label="이용약관에 동의합니다."
          {...register("agreeTerms", { required: "이용 약관에 동의해야 합니다." })}
        />
        {errors.agreeTerms && <p className="text-danger text-sm">{errors.agreeTerms.message}</p>}
      </div>

      {/* 개인정보 */}
      <div>
        <Checkbox
          label="개인정보 수집 및 이용에 동의합니다."
          {...register("agreePrivacy", {
            required: "개인정보 수집 및 이용에 동의해야 합니다.",
          })}
        />
        {errors.agreePrivacy && (
          <p className="text-danger text-sm">{errors.agreePrivacy.message}</p>
        )}
      </div>
    </div>
  );
}
