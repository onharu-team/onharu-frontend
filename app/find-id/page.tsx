import FormLayout from "@/components/layout/FormLayout";
import FindIdForm from "./FindIdForm";

export default function FindIdPage() {
  return (
    <div className="wrapper flex min-h-screen items-center justify-center">
      <div className="w-full max-w-115">
        <FormLayout title="아이디 찾기">
          <FindIdForm />
        </FormLayout>
      </div>
    </div>
  );
}
