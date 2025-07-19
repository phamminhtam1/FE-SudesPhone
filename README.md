# FE_Vue - E-commerce Frontend with Vue.js

## 🛒 Giới thiệu

**FE_Vue** là dự án frontend cho website thương mại điện tử, xây dựng bằng **Vue.js 3**, sử dụng **Vite** để build, **Tailwind CSS** cho giao diện hiện đại, và tích hợp API backend. Dự án hướng tới trải nghiệm người dùng tối ưu trên cả desktop và mobile, đồng thời cung cấp hệ thống quản trị mạnh mẽ cho admin.

---

## 🚀 Tính năng nổi bật

### 🎯 Dành cho người dùng (Khách hàng)

- 🏠 **Trang chủ**:

  - Hiển thị danh sách sản phẩm mới, sản phẩm nổi bật, khuyến mãi
  - Banner động, danh mục top, carousel ảnh tùy chỉnh
  - Giao diện thân thiện, hiện đại, hỗ trợ responsive toàn diện

- 📦 **Trang chi tiết sản phẩm**:

  - Gallery ảnh (Vue3 Carousel)
  - Tùy chọn màu sắc, phiên bản
  - Tự động cập nhật tồn kho và giá theo lựa chọn
  - Hiển thị thông số kỹ thuật, mô tả chi tiết, đánh giá sản phẩm

- 🛍️ **Giỏ hàng & đặt hàng**:

  - Thêm, xóa, cập nhật số lượng sản phẩm trong giỏ
  - Tổng tiền tự động cập nhật
  - Hỗ trợ lưu giỏ hàng tạm thời bằng localStorage

- 🔍 **Tìm kiếm & lọc sản phẩm**:

  - Tìm theo tên sản phẩm
  - Lọc theo danh mục, mức giá, tồn kho, thương hiệu

- 📱 **Responsive hoàn toàn**:
  - Giao diện tối ưu hóa cho điện thoại, tablet, desktop

---

### 🛠️ Dành cho Quản trị viên (Admin Dashboard)

- 📊 **Dashboard tổng quan**:

  - Hiển thị thống kê nhanh: số sản phẩm, người dùng, phiếu nhập
  - Biểu đồ trực quan (tuỳ chỉnh)

- 👤 **Quản lý người dùng & phân quyền**:

  - CRUD user
  - Phân quyền theo role, kiểm tra quyền khi truy cập trang

- 🏷️ **Quản lý danh mục sản phẩm (Category Tree)**:

  - Xây dựng dạng cây danh mục
  - Thêm/sửa/xóa danh mục cấp cha - con

- 🧾 **Quản lý sản phẩm**:

  - CRUD sản phẩm
  - Hỗ trợ nhiều ảnh, chọn màu, mô tả sản phẩm chi tiết
  - Gán sản phẩm với danh mục, thương hiệu

- 🏬 **Quản lý kho (Stock Receipt)**:

  - Tạo phiếu nhập kho
  - Xem chi tiết phiếu: nhà cung cấp, sản phẩm, số lượng, ngày nhập

- 🔌 **Quản lý nhà cung cấp**:

  - CRUD nhà cung cấp
  - Gán sản phẩm với từng nhà cung cấp

- 🔐 **Bảo mật và phân quyền**:
  - Phân quyền route động
  - Ẩn/hiện menu và chức năng theo vai trò người dùng

---

## 🧩 Công nghệ sử dụng

- **Vue.js 3** (Composition API)
- **Vite**
- **Tailwind CSS**
- **Pinia** (State management)
- **Vue Router**
- **Axios**
- **Vue3 Carousel**

---

## 📁 Cấu trúc dự án

```
FE_Vue/
├── src/
│   ├── components/   # Các component giao diện
│   ├── views/        # Các trang (Admin, Home, Product, ...)
│   ├── router/       # Cấu hình router
│   ├── stores/       # State management (Pinia)
│   ├── services/     # Gọi API
│   └── plugins/      # Plugin Vue
├── public/           # Tài nguyên tĩnh
└── package.json
```

---

## ⚙️ Cài đặt & chạy dự án

```bash
# Cài đặt dependencies
npm install

# Chạy server phát triển
npm run dev

# Build cho production
npm run build
```

---

## 🔗 Tích hợp API

- `/api/branch`: Chi nhánh
- `/api/user`: Nhân sự
- `/api/role`: Phân quyền
- `/api/category`: Danh mục
- `/api/product`: Sản phẩm
- `/api/supplier`: Nhà cung cấp
- `/api/stock-receipt`: Phiếu nhập xuất
  Vân vân mây mây
  ........

---

# FE_Vue - Đồng bộ giỏ hàng với Pinia

## Mục tiêu

Đảm bảo số lượng sản phẩm trong giỏ hàng luôn được cập nhật realtime trên Header, bất kể thao tác ở trang nào (CartPage, ProductDetail, ...).

## Cách triển khai

### 1. Tạo Pinia store cho giỏ hàng

- File: `src/stores/cart.js`
- Store này quản lý:
  - Danh sách sản phẩm trong giỏ hàng (`cartItems`)
  - Tổng số lượng sản phẩm (`count`)
  - Tổng tiền (`totalPrice`)
  - Các action: lấy giỏ hàng từ API, tăng/giảm số lượng, xóa sản phẩm

### 2. Sử dụng store ở các component

#### a. Header.vue

- Import và sử dụng store để lấy `count`.
- Khi Header mount, gọi `fetchCart()` để lấy dữ liệu mới nhất.
- Hiển thị số lượng sản phẩm trên icon giỏ hàng bằng `{{ count }}`.

#### b. CartPage.vue

- Import và sử dụng store để lấy `cartItems`, `totalPrice`.
- Render danh sách sản phẩm, tăng/giảm/xóa đều gọi action từ store.
- Khi mount trang, gọi `fetchCart()` để đảm bảo dữ liệu mới nhất.

#### c. ProductDetail.vue

- Sau khi thêm sản phẩm vào giỏ hàng thành công, gọi `cartStore.fetchCart()` để cập nhật lại số lượng trên Header.

### 3. Lợi ích

- Mọi thao tác với giỏ hàng đều đồng bộ, không cần reload trang.
- Không còn logic trùng lặp, dễ bảo trì.
- Có thể mở rộng cho các trang khác chỉ bằng cách dùng chung store.

## Ví dụ sử dụng trong component

```js
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { cartItems, count, totalPrice } = storeToRefs(cartStore)

// Lấy giỏ hàng khi component mount
onMounted(() => {
  cartStore.fetchCart()
})

// Thêm sản phẩm xong thì gọi lại fetchCart để cập nhật
await cartStore.fetchCart()
```

## Lưu ý

- Đảm bảo đã cài Pinia và khai báo trong `main.js`.
- Nếu có thêm trang/thao tác mới liên quan giỏ hàng, chỉ cần gọi lại `fetchCart()` sau khi thao tác.
