class ApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? "/api";
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(this.baseUrl + endpoint, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw { status: res.status, message: data.message ?? res.statusText };
    }

    return data as T;
  }

  get = <T>(endpoint: string) => this.request<T>(endpoint, { method: "GET" });

  post = <T, B = unknown>(endpoint: string, body?: B) =>
    this.request<T>(endpoint, { method: "POST", body: body ? JSON.stringify(body) : undefined });

  put = <T, B = unknown>(endpoint: string, body?: B) =>
    this.request<T>(endpoint, { method: "PUT", body: body ? JSON.stringify(body) : undefined });

  delete = <T>(endpoint: string) => this.request<T>(endpoint, { method: "DELETE" });
}

export const apiClient = new ApiClient();
