import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const url = `http://onharu-api.votex.co.kr:15080/api/reviews?${searchParams.toString()}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    return NextResponse.json({ message: "리뷰 조회 실패" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
