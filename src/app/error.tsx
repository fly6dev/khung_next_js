"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log lỗi ra console hoặc gửi lên các dịch vụ như Sentry/LogRocket
    console.error("System Boundary Error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <span className="text-xs font-bold px-3 py-1 rounded bg-rose-950/50 text-rose-400 border border-rose-900/30 mb-4 uppercase tracking-wider">
        Lỗi Hệ Thống
      </span>
      <h2 className="text-2xl font-bold text-white mb-2">Đã xảy ra sự cố không mong muốn</h2>
      <p className="text-slate-400 text-sm max-w-md mb-6 leading-relaxed">
        {error.message || "Không thể tải trang này vào lúc này. Vui lòng reload hoặc thử lại sau ít phút."}
      </p>
      
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/10 cursor-pointer"
        >
          Thử lại
        </button>
        <a
          href="/"
          className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
        >
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
}
