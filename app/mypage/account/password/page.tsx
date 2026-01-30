import { PageSection } from "../../components/PageSection";
import PasswordFormPage from "./PasswordForm";

export default function PasswordChangePage() {
  return (
    <PageSection title="비밀번호 변경" className="p-4 sm:p-8">
      <PasswordFormPage />
    </PageSection>
  );
}
