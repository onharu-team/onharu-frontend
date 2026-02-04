import { PageSection } from "../components/PageSection";
import StoreForm from "./components/StoreForm";
import type { StoreInitialData } from "./types";

export default function StorePage() {
  // mockData
  const initialData: StoreInitialData = {
    storeName: "미소치과",
    category: "의료",
    content: "저희 미소치과는 친절하고 안전한 치료를 제공합니다.",
    phone: "01012345678",
    selectedDays: ["월요일", "화요일", "목요일"],
    openTime: "09:00",
    closeTime: "18:00",
    tags: "치과, 예약",
    files: [
      { name: "store1.jpg", url: "/mock/store1.jpg" },
      { name: "store2.jpg", url: "/mock/store2.jpg" },
    ],
  };

  return (
    <PageSection title="가게 등록/수정" className="p-4 sm:p-8">
      <StoreForm initialData={initialData} />
    </PageSection>
  );
}
