import { NextResponse } from "next/server";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

export async function POST(req: Request, context: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await context.params;

  const body = await req.json();

  const result = await serverApiClient.post(`/api/reviews/stores/${storeId}`, body);

  return handleApiResult(result);
}

export async function GET(request: Request, context: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await context.params;

  const res = await fetch(`${process.env.API_BASE_URL}/api/reviews/stores/${storeId}`, {
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
