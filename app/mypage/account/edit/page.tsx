import { PageSection } from "../../components/PageSection";
import PasswordConfirmPage from "./components/PasswordConfirm";

export default function EditAccountPage() {
  return (
    <PageSection title="회원정보 수정">
      <PasswordConfirmPage />
    </PageSection>
  );
}
