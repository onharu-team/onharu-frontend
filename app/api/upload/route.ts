import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const fileName = searchParams.get("fileName");
    const contentType = searchParams.get("contentType");

    if (!fileName || !contentType) {
      return NextResponse.json({ message: "fileName, contentType 필수" }, { status: 400 });
    }

    const result = await serverApiClient.get(
      `/api/upload?fileName=${fileName}&contentType=${contentType}`
    );

    return handleApiResult(result);
  } catch {
    return NextResponse.json({ message: "서버 에러 발생" }, { status: 500 });
  }
}
