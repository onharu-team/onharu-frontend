import FormLayout from "@/components/layout/FormLayout";
import OwnerSignupForm from "./OwnerSignupForm";

export default function OwnerSignupPage() {
  return (
    <div className="mt-section-sm-top wrapper md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom flex items-center justify-center">
      <div className="w-full max-w-115">
        <FormLayout title="매장 회원가입">
          <OwnerSignupForm />
        </FormLayout>
      </div>
    </div>
  );
}
