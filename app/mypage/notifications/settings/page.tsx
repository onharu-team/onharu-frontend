import { PageSection } from "../../components/PageSection";
import NotificationToggle from "./NotificationToggle";

export default function SettingsPage() {
  return (
    <PageSection title="알림 설정" className="bg-white">
      <div className="mb-2 text-sm font-medium sm:mb-4 sm:text-base">
        나눔 소식과 예약 관련 메시지를 바로 확인할 수 있어요!
      </div>

      <NotificationToggle />
    </PageSection>
  );
}
