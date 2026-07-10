// Base API URL đọc từ file .env (ở dev mặc định là jsonplaceholder)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number>;
}

/**
 * Hàm wrapper tiện ích cho fetch API trong Next.js (chạy được cả ở Server và Client Component)
 * Tự động chèn Content-Type, gộp query params, và xử lý parse JSON & bắt lỗi HTTP.
 */
export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options;

  // 1. Tạo URL hoàn chỉnh cùng Query parameters (nếu có)
  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      searchParams.append(key, String(val));
    });
    url += `?${searchParams.toString()}`;
  }

  // 2. Thiết lập header mặc định
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  // 3. Thực hiện Fetch
  const response = await fetch(url, {
    headers: defaultHeaders,
    ...restOptions,
  });

  // 4. Kiểm tra mã phản hồi HTTP
  if (!response.ok) {
    let errorMessage = `Lỗi HTTP! Status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Bỏ qua nếu response không phải JSON
    }
    throw new Error(errorMessage);
  }

  // 5. Nếu phản hồi rỗng (no content), trả về object rỗng
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}
