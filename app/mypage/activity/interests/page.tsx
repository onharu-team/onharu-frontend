import { PageSection } from "../../components/PageSection";
import InterestsCard from "./components/InterestsCard";
import { mockStores } from "./data/mockData";

export default function InterestsPage() {
  return (
    <PageSection title="관심 목록" className="bg-white">
      <InterestsCard items={mockStores} />
    </PageSection>
  );
}
