import { UserRole } from "@/lib/api/types/auth";
import { PageSection } from "../components/PageSection";
import ReviewsContent from "./components/ReviewsContent";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { cookies } from "next/headers";
import { ReviewsData } from "./types";

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = await cookies();
  const role = cookieStore.get("userType")?.value as UserRole | undefined;
  const storeId = cookieStore.get("storeId")?.value;

  const resolvedSearchParams = await searchParams;

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(resolvedSearchParams)) {
    if (typeof value === "string") {
      params.append(key, value);
    }

    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    }
  }

  if (!params.has("pageNum")) params.set("pageNum", "1");
  if (!params.has("perPage")) params.set("perPage", "4");

  const queryString = params.toString();

  const endpoint =
    role === "OWNER" && storeId
      ? `/api/reviews/stores/${storeId}?${queryString}`
      : `/api/reviews/my?${queryString}`;

  const result = await serverApiClient.get<ReviewsData>(endpoint);

  const reviewsData = result.success ? result.data : null;

  return (
    <PageSection title="감사 리뷰" className="bg-white">
      <ReviewsContent items={reviewsData} role={role || ("user" as UserRole)} />
    </PageSection>
  );
}
