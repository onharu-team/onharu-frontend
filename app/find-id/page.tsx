import FormLayout from "@/components/layout/FormLayout";
import FindIdForm from "./FindIdForm";

export default function FindIdPage() {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="my-auto w-full">
        <FormLayout title="아이디 찾기">
          <FindIdForm />
        </FormLayout>
      </div>
    </div>
  );
}
