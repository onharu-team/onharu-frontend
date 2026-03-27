export async function GetReviewDetail(id: string) {
  const res = await fetch(`/api/reviews/stores/${id}`);

  if (!res.ok) {
    throw new Error("가게 리뷰 조회 실패");
  }
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data.message || "가게 리뷰 조회 실패");
  }

  return data;
}
