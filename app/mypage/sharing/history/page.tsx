import { PageSection } from "../../components/PageSection";
import HistoryContent from "./components/HistoryContent";
import { historyItems } from "./data/mockData";

export default function HistoryPage() {
  const items = historyItems;

  return (
    <PageSection title="나눔 내역" className="bg-white">
      <HistoryContent items={items} />
    </PageSection>
  );
}
