import { serverApiClient } from "@/lib/api/serverApiClient";
import { PageSection } from "../components/PageSection";
import StoreForm from "./components/StoreForm";
import type { StoreApiRes, StoreInitialData } from "./types";
import { cookies } from "next/headers";

function transformStoreToInitialData(store: StoreApiRes["store"]): StoreInitialData {
  const businessHours = store.businessHours ?? [];

  const selectedDays = businessHours.map(b => b.businessDay);

  const openTime = businessHours[0]?.openTime ?? "";
  const closeTime = businessHours[0]?.closeTime ?? "";

  return {
    storeName: store.name,
    category: store.categoryName,
    intro: store.intro,
    content: store.introduction,
    phone: store.phone,
    selectedDays,
    openTime,
    closeTime,
    tags: store.tagNames,
    files: store.images,
    address: store.address,
    lat: store.lat,
    lng: store.lng
  };
}

export default async function StorePage() {
  const cookieStore = await cookies();
  const storeId = cookieStore.get("storeId")?.value;

  const initialData: StoreInitialData | undefined = storeId
    ? await (async () => {
        const result = await serverApiClient.get<StoreApiRes>(`/api/stores/${storeId}`);

        if (result.success && result.data) {
          return transformStoreToInitialData(result.data.store);
        }

        return undefined;
      })()
    : undefined;

  return (
    <PageSection title="가게 등록/수정" className="px-4 pt-4 pb-7.5 sm:pt-9 sm:pb-15">
      <StoreForm initialData={initialData} storeId={storeId} />
    </PageSection>
  );
}
