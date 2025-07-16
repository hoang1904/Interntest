# Interntest

Dự án website mẫu sử dụng Node.js + Express + MongoDB. Dùng để kiểm tra kiến thức lập trình web và xây dựng nền tảng ứng dụng đơn giản.

## 📦 Yêu cầu hệ thống

- Node.js >= 14
- MongoDB (cài đặt local hoặc sử dụng MongoDB Atlas)
- Git (tuỳ chọn)

## 🚀 Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/hoang1904/Interntest.git
cd Interntest
```
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


