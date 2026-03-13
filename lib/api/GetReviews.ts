export async function GetReviews(filters: any, signal?: AbortSignal) {
  const params = new URLSearchParams();

  const res = await fetch(`/api/reviews?${params.toString()}`, {
    credentials: "include",
    signal,
  });

  if (!res.ok) {
    throw new Error("리뷰 목록 조회 실패");
  }

  const data = await res.json();
  if (data.success === false) {
    throw new Error(data.message || "리뷰 목록 조회 실패");
  }

  return data;
}
