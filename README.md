# Next.js Starter Boilerplate - Khung Dự Án Mẫu Cho React Developers

Chào mừng bạn đến với khung dự án **Next.js (App Router)**! Đây là khung boilerplate đã được tối ưu hóa cấu trúc thư mục, cấu hình sẵn CSS thuần (Vanilla CSS) với giao diện dark-mode hiện đại và các ví dụ minh họa trực quan để bạn dễ dàng bắt đầu dự án tiếp theo của mình.

---

## 1. Cấu Trúc Thư Mục & Giải Thích

Dưới đây là cây thư mục chính và công dụng của từng phần:

```text
khung/
├── public/                 # Các file tĩnh như hình ảnh, favicon, icons
│   ├── next.svg
│   └── vercel.svg
├── src/                    # Thư mục chứa toàn bộ mã nguồn
│   ├── app/                # App Router (Nơi Next.js quản lý URL & định tuyến)
│   │   ├── api/            # API Route: Endpoint backend tích hợp ngay trong app
│   │   │   └── hello/
│   │   │       └── route.ts  # Endpoint: GET /api/hello
│   │   ├── dashboard/      # Route: /dashboard (Ví dụ: Client Component)
│   │   │   └── page.tsx    # Chứa state, form tương tác, localstorage
│   │   ├── posts/          # Route: /posts (Ví dụ: Server Component)
│   │   │   ├── page.tsx    # Danh sách bài viết (Fetch API từ server)
│   │   │   └── [id]/       # Route động: /posts/1, /posts/2 (Dynamic Route)
│   │   │       └── page.tsx # Chi tiết bài viết
│   │   ├── globals.css     # CSS toàn cục (Thiết kế Dark Theme, Glassmorphism)
│   │   ├── layout.tsx      # Layout chung cho toàn bộ website (Header, Footer, v.v.)
│   │   └── page.tsx        # Trang chủ của ứng dụng (Địa chỉ: /)
│   ├── components/         # Các React component dùng chung (giống hệt React thuần)
│   │   ├── Navbar.tsx      # Thanh menu điều hướng (dùng Client-Side Active Link)
│   │   └── Footer.tsx      # Chân trang thông tin
│   ├── lib/                # Chứa các hàm tiện ích, cấu hình kết nối API/DB
│   └── types/              # Định nghĩa các kiểu TypeScript (Type declarations)
├── package.json            # Quản lý thư viện và script chạy dự án
├── tsconfig.json           # Cấu hình TypeScript với Import Alias `@/*`
└── next.config.ts          # Cấu hình riêng của Next.js
```

---

## 2. So Sánh Nhanh Next.js vs React

Nếu bạn chuyển từ React (Vite / CRA) sang Next.js:
- **Routing:** Ở React bạn cần `react-router-dom`, ở Next.js bạn chỉ cần tạo thư mục trong `src/app/` và đặt file `page.tsx` vào trong. Tên thư mục chính là URL của trang.
- **Import Alias:** Thay vì import bằng các đường dẫn tương đối dài dòng như `../../components/Navbar`, bạn có thể viết `@/components/Navbar` ở bất kì đâu trong dự án.
- **Server Components:** Mặc định các trang trong Next.js là Server Component (chạy trên server, không gửi JS dư thừa cho trình duyệt, tốt cho SEO).
- **Client Components:** Khi muốn sử dụng React Hooks (`useState`, `useEffect`, v.v.) hoặc bắt sự kiện của trình duyệt (`onClick`, `onChange`), hãy đặt dòng `"use client";` ở dòng đầu tiên của file đó.

---

## 3. Các Lệnh Để Chạy Dự Án

Vào thư mục dự án và sử dụng các lệnh sau trong terminal:

### Khởi chạy môi trường phát triển (Dev Mode)
```bash
npm run dev
```
Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

### Kiểm tra lỗi và Build sản phẩm (Build Production)
```bash
npm run build
```
Lệnh này sẽ biên dịch toàn bộ TypeScript và tạo mã nguồn HTML/JS tĩnh tối ưu hóa cao.

### Chạy dự án đã build (Start Production)
```bash
npm start
```

---

## 4. Hướng Dẫn Đẩy Lên Git (Để lưu trữ dùng dần)

Để lưu trữ khung này lên tài khoản GitHub/GitLab cá nhân của bạn, hãy thực hiện các bước sau:

1. **Khởi tạo Git** (nếu chưa khởi tạo):
   ```bash
   git init
   ```
   *(Boilerplate này đã được khởi tạo sẵn git khi tạo dự án).*

2. **Thêm toàn bộ file vào git commit:**
   ```bash
   git add .
   git commit -m "feat: init nextjs starter boilerplate with custom vanilla CSS layout"
   ```

3. **Tạo Repository mới trên GitHub/GitLab**, sau đó copy các lệnh sau để liên kết (Thay thế URL bằng repository của bạn):
   ```bash
   git branch -M main
   git remote add origin https://github.com/tai-khoan-cua-ban/ten-repo.git
   git push -u origin main
   ```

Khi nào muốn tạo một dự án mới, bạn chỉ cần chạy lệnh clone repo này về:
```bash
git clone https://github.com/tai-khoan-cua-ban/ten-repo.git ten-du-an-moi
cd ten-du-an-moi
npm install
npm run dev
```

Chúc bạn phát triển dự án vui vẻ!
