import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const url = `http://onharu-api.votex.co.kr:15080/api/store-schedules/${id}/available-dates`;

  console.log("👉 요청 URL:", url);

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Cookie: request.headers.get("cookie") ?? "",
    },
  });

  console.log("👉 백엔드 응답 status:", res.status);

  if (!res.ok) {
    const errorBody = await res.text();
    console.log("👉 에러 응답 body:", errorBody);
    return NextResponse.json({ message: "예약 스케줄 조회 실패" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
