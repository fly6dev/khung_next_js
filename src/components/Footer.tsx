export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {currentYear} NextJS Starter Boilerplate. Cây thư mục mẫu tối ưu hóa cho React Developers.
        </p>
        <p className="footer-text" style={{ fontSize: "0.8rem", opacity: 0.6 }}>
          Được thiết kế với Vanilla CSS &amp; TypeScript. Sẵn sàng đẩy lên Git để sử dụng lại.
        </p>
      </div>
    </footer>
  );
}
