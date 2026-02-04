import FormLayout from "@/components/layout/FormLayout";
import FindPasswordForm from "./FindPasswordForm";

export default function FindPasswordPage() {
  return (
    <div className="wrapper flex min-h-screen items-center justify-center">
      <div className="w-full max-w-115">
        <FormLayout title="비밀번호 찾기">
          <FindPasswordForm />
        </FormLayout>
      </div>
    </div>
  );
}
