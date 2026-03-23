import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const url = `${process.env.API_BASE_URL}/api/stores?${searchParams.toString()}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await res.json();
  return NextResponse.json(data);
}

// 가게 등록
export async function POST(request: Request) {
  const body = await request.json();

  const result = await serverApiClient.post("/api/owners/stores", body);

  return handleApiResult(result);
}
