import { PageSection } from "../../components/PageSection";
import WithdrawFormPage from "./WithdrawForm";

export default function WithdrawPage() {
  return (
    <PageSection title="비밀번호 변경" className="p-4 sm:p-8">
      <WithdrawFormPage />
    </PageSection>
  );
}
