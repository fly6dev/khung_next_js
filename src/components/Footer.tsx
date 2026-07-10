export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4 mt-auto text-center">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
        <p className="text-slate-400 text-sm">
          &copy; {currentYear} NextJS Starter Boilerplate. Cây thư mục mẫu tối ưu hóa cho React + Tailwind CSS.
        </p>
        <p className="text-slate-500 text-xs">
          Được thiết kế hoàn toàn bằng Tailwind CSS &amp; TypeScript. Sẵn sàng đẩy lên Git để sử dụng lại.
        </p>
      </div>
    </footer>
  );
}
