import "server-only";
import { cookies } from "next/headers";
import { ApiResult, ApiError } from "./types/common";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type CacheOptions = {
  cache?: RequestCache;
  next?: { revalidate?: number };
};

export class ServerApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    const url = baseUrl ?? process.env.API_BASE_URL;

    if (!url) {
      throw new Error("API_BASE_URL is not defined");
    }

    this.baseUrl = url;
  }

  private async getCookieHeader(): Promise<string> {
    const cookieStore = await cookies();

    return cookieStore
      .getAll()
      .map(c => `${c.name}=${c.value}`)
      .join("; ");
  }

  private async safeParseJson(res: Response): Promise<unknown> {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  private async request<T>(
    endpoint: string,
    method: HttpMethod = "GET",
    body?: unknown,
    options?: CacheOptions
  ): Promise<ApiResult<T>> {
    const cookieHeader = await this.getCookieHeader();

    const finalOptions: CacheOptions = {
      cache: "no-store",
      ...options,
    };

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),

      cache: finalOptions.cache,
      next: finalOptions.next,
    });

    const data = await this.safeParseJson(res);

    if (!res.ok) {
      const errorData = data as ApiError | null;

      const message = errorData?.message || errorData?.error || res.statusText || "Unknown error";

      return {
        ok: false,
        error: {
          message,
          status: res.status,
        },
        headers: res.headers,
      };
    }

    return {
      ok: true,
      data: data as T,
      headers: res.headers,
    };
  }

  get = <T>(endpoint: string, options?: CacheOptions) =>
    this.request<T>(endpoint, "GET", undefined, options);

  post = <T>(endpoint: string, body?: unknown, options?: CacheOptions) =>
    this.request<T>(endpoint, "POST", body, options);

  put = <T>(endpoint: string, body: unknown, options?: CacheOptions) =>
    this.request<T>(endpoint, "PUT", body, options);

  delete = <T>(endpoint: string, options?: CacheOptions) =>
    this.request<T>(endpoint, "DELETE", undefined, options);
}

export const serverApiClient = new ServerApiClient();
