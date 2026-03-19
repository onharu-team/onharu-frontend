import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const res = await fetch(`http://onharu-api.votex.co.kr:15080/api/stores/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    return NextResponse.json({ message: "상세 조회 실패" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

// 가게 정보 수정
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await request.json();

  const result = await serverApiClient.put(`/api/owners/stores/${id}`, body);

  return handleApiResult(result);
}
