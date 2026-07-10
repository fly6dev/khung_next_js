export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
      {/* CSS Spinner */}
      <div className="w-12 h-12 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-400 text-sm font-medium animate-pulse">
        Đang tải dữ liệu, vui lòng đợi...
      </p>
    </div>
  );
}
