import FormLayout from "@/components/layout/FormLayout";
import FindPasswordForm from "./FindPasswordForm";

export default function FindPasswordPage() {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="my-auto w-full">
        <FormLayout title="비밀번호 찾기">
          <FindPasswordForm />
        </FormLayout>
      </div>
    </div>
  );
}
