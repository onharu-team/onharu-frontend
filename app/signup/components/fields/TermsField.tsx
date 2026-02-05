import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SignupFormValues } from "@/app/signup/types";
import TermsItem from "./TermsItem";

type TermsFieldProps = {
  register: UseFormRegister<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
};

export default function TermsField({ register, errors }: TermsFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <TermsItem
        name="agreeTerms"
        label="이용약관에 동의합니다."
        detailTitle="이용약관"
        detailContent={
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              <strong>제 1조 (목적)</strong>
            </p>
            <p>
              본 약관은 서비스 이용과 관련하여 회사와 이용자의 권리, 의무를 규정함을 목적으로
              합니다.
            </p>

            <p>
              <strong>제 2조 (정의)</strong>
            </p>
            <ul className="list-disc pl-5">
              <li>“서비스”란 회사가 제공하는 웹 기반 서비스를 의미합니다.</li>
              <li>“이용자”란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.</li>
            </ul>
          </div>
        }
        register={register}
        error={errors.agreeTerms}
      />

      <TermsItem
        name="agreePrivacy"
        label="개인정보 수집 및 이용에 동의합니다."
        detailTitle="개인정보 수집 및 이용"
        detailContent={<>여기에 개인정보 수집 및 이용 내용...</>}
        register={register}
        error={errors.agreePrivacy}
      />
    </div>
  );
}
