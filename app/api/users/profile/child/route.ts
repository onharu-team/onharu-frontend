import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { ChildData } from "@/lib/api/types/auth";
import { cookies } from "next/headers";

const COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7,
  sameSite: "lax" as const,
};

export async function GET() {
  const cookieStore = await cookies();

  const result = await serverApiClient.get<ChildData>("/api/users/profile/child");

  if (result.success && result.data) {
    const { userType } = result.data;

    if (userType) {
      cookieStore.set("userType", userType, COOKIE_OPTIONS);
    }
  }

  return handleApiResult(result);
}

export async function PUT(request: Request) {
  const body = await request.json();

  const result = await serverApiClient.put("/api/users/profile/child", body);

  return handleApiResult(result);
}
