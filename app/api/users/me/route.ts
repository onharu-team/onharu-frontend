import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { ApiResponse } from "@/lib/api/types/common";
import { UserMeReq } from "@/lib/api/types/auth";

export async function GET() {
  const cookieStore = await cookies();

  const hasSession = cookieStore.has("JSESSIONID");

  if (!hasSession) {
    return NextResponse.json({
      success: false,
      data: null,
    });
  }

  const result = await serverApiClient.get<ApiResponse<UserMeReq>>("/api/users/me");

  if (!result.success) {
    return NextResponse.json({
      success: false,
      data: null,
    });
  }

  if (result.data && "status" in result.data && result.data.status === -500) {
    throw NextResponse.json({
      success: false,
      data: null,
    });
  }

  return NextResponse.json({
    success: true,
    data: result.data,
  });
}
