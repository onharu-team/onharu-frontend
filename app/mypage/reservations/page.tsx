import { PageSection } from "../components/PageSection";
import ReservationContent from "./components/ReservationContent";
import { childItems, ownerItems } from "./data/mockData";

const role = "owner";

export default function ReservationPage() {
  const itemsForRole = ownerItems.filter(item => item.role === role);

  return (
    <PageSection title="예약 내역" className="bg-white">
      <ReservationContent items={itemsForRole} role={role} />
    </PageSection>
  );
}
