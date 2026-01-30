import { PageSection } from "../../components/PageSection";
import PasswordConfirmPage from "./components/PasswordConfirm";

export default function EditAccountPage() {
  return (
    <PageSection title="회원정보 수정" className="p-4 sm:p-8">
      <PasswordConfirmPage />
    </PageSection>
  );
}
