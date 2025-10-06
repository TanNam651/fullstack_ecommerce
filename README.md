
- Đánh giá sản phẩm# E-Commerce Website (ReactJS + Laravel)

## Tính năng chính

### User
- Đăng ký, đăng nhập, xác thực qua email (JWT/Sanctum).
- Xem danh sách sản phẩm, tìm kiếm sản phẩm, xem thông tin chi tiết của sản phẩm.
- Thêm sản phẩm vào giỏ hàng, cập nhật số lượng.
- Đặt hàng, hỗ trợ thanh toán qua vnpay và xem trạng thái đơn hàng.

### Admin
- Quản lý sản phẩm.
- Quản lý danh mục, thương hiệu.
- Quản lý đơn hàng, người dùng. 
- Quản lý lịch sử thanh toán
- Dashboard thống kê.


## Struct projects
project/
├── backend/ # Laravel 12 (API)
│ ├── app/ #Enums, Models, Mail, Controllers, Services
│ ├── config/ # Cấu hình Laravel
│ ├── routes/ # Định nghĩa API routes
│ ├── database/ # Migrations, Seeders, Factories
│ └── .env
│
├── frontend/ # ReactJS + Vite (Client)
│ ├── src/
│ │ ├── components/ # Các component UI tái sử dụng
│ │ ├── layouts/ # Layout cho trang web
│ │ ├── pages/ # Các trang chính
│ │ ├── hooks/ # Tạo các hook riêng để tái sử dụng
│ │ ├── services/ # Tương tác với backend
│ │ ├── reducers/ # Redux và global state
│ │ ├── helpers/ # Các function sử dụng cho nhiều page
│ │ ├── context/ # Setup global state
│ │ └── App.jsx
│ ├── public/
│ └── vite.config.js
│
└── README.md

## Hướng dẫn cài đặt và chạy

### Clone dự án
git clone https://github.com/TanNam651/fullstack_ecommerce.git

### Chạy backend-Laravel 12
cd ecommerce_api
composer install
cấu hình database trong .env và config/database.php
sau đó chạy các lệnh: 
- php artisan migrate
- php artisan serve

### Chạy ReactJS
cd ecommerce_frontend
chạy hai lệnh:
- npm install
- npm run dev