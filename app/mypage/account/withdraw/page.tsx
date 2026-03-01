import { PageSection } from "../../components/PageSection";
import WithdrawFormPage from "./WithdrawForm";

export default function WithdrawPage() {
  return (
    <PageSection title="회원탈퇴" className="px-4 pt-4 pb-7.5 sm:pt-9 sm:pb-15">
      <WithdrawFormPage />
    </PageSection>
  );
}
