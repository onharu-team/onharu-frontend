export async function GetStores(filters: any) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value === null || value === "" || value === undefined) return;
    // categoryId가 전체일 때 return
    if (key === "categoryId" && Number(value) === 0) return;
    params.append(key, String(value));
  });

  const res = await fetch(`/api/stores?${params.toString()}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("가게 목록 조회 실패");
  }

  const data = await res.json();
  if (data.success === false) {
    throw new Error(data.message || "가게 목록 조회 실패");
  }

  return data;
}
