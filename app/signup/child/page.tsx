import FormLayout from "@/components/layout/FormLayout";
import ChildSignupForm from "./ChildSignupForm";

export default function ChildSignupPage() {
  return (
    <div className="mt-section-sm-top wrapper md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom flex items-center justify-center">
      <div className="w-full max-w-115">
        <FormLayout title="아동 회원가입">
          <ChildSignupForm />
        </FormLayout>
      </div>
    </div>
  );
}
