"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Khởi tạo QueryClient trong useState để tránh chia sẻ dữ liệu giữa các request trên server
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Dữ liệu được coi là mới trong 1 phút
            refetchOnWindowFocus: false, // Không tự động refetch khi tab active trở lại
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
