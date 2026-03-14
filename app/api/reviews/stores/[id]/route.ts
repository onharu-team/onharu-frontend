import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ← Promise 타입으로
) {
  const { id } = await params; // ← await 추가
  const { searchParams } = new URL(request.url);

  const url = `http://onharu-api.votex.co.kr:15080/api/reviews/stores/${id}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Cookie: request.headers.get("cookie") ?? "",
    },
  });

  if (!res.ok) {
    return NextResponse.json({ message: "리뷰 조회 실패" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
