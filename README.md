Dưới đây là toàn bộ nội dung `README.md` viết lại thành **1 file hoàn chỉnh**, bạn có thể **sao chép và lưu lại** vào thư mục gốc dự án:

---

````markdown
# Interntest

Dự án website mẫu sử dụng **Node.js + Express + MongoDB**. Dùng để kiểm tra kiến thức lập trình web và xây dựng nền tảng ứng dụng kiểm tra trực tuyến.

## 📦 Yêu cầu hệ thống

- Node.js >= 14
- MongoDB (local hoặc MongoDB Atlas)
- Git (tùy chọn)

## 🚀 Cài đặt và chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/hoang1904/Interntest.git
cd Interntest
````

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Tạo file `.env`

Tạo một file tên `.env` trong thư mục gốc và thêm nội dung sau:

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/interntest
SECRET_KEY=your_secret_key
```

> 🔒 Gợi ý: Thay `your_secret_key` bằng một chuỗi bảo mật tùy ý để mã hóa session đăng nhập.

### 4. Chạy server

```bash
npm start
```

Mở trình duyệt và truy cập:

```
http://localhost:3000
```

## 🛠️ Cấu trúc thư mục

```
Interntest/
├── models/         # Mongoose models
├── public/         # Tệp tĩnh (CSS, JS, hình ảnh)
├── routes/         # Định tuyến Express
├── views/          # Giao diện (EJS)
├── .env            # Thông tin môi trường
├── server.js       # File chính khởi chạy ứng dụng
├── package.json
```

## ✅ Tính năng chính

* [x] Đăng ký / Đăng nhập người dùng
* [x] Làm bài kiểm tra trắc nghiệm
* [x] Quản lý câu hỏi
* [x] Tính điểm tự động sau khi nộp bài

## 🧪 Các lệnh hữu ích

```bash
npm run dev     # Chạy server với nodemon (nếu đã cài)
npm start       # Chạy server thông thường
```

## 💡 Gợi ý mở rộng

* Thêm tính năng phân quyền (admin / user)
* Thống kê kết quả bài thi
* Triển khai trên dịch vụ như Render, Vercel hoặc Railway

## 📬 Liên hệ

Nếu bạn gặp lỗi hoặc cần đóng góp, hãy mở issue tại:

👉 [https://github.com/hoang1904/Interntest](https://github.com/hoang1904/Interntest)

---

```

---

Bạn chỉ cần lưu đoạn trên vào tệp `README.md` là xong. Nếu cần mình có thể tạo và nén sẵn file `.zip` gồm cả `README.md`.
```
