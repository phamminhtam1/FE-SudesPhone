# FE_Vue - Frontend Vue.js E-commerce Project

## Tổng quan dự án

Đây là một dự án frontend e-commerce được xây dựng bằng Vue.js 3 với Vite, sử dụng Tailwind CSS cho styling và tích hợp với backend API.

## Cấu trúc dự án

```
FE_Vue/
├── src/
│   ├── components/
│   │   ├── icons/           # Icon components
│   │   └── layout/
│   │       ├── backend/     # Admin layout components
│   │       └── frontend/    # Frontend layout components
│   ├── views/
│   │   ├── Admin/          # Admin pages
│   │   └── HomeView.vue    # Home page
│   ├── router/             # Vue Router configuration
│   ├── stores/             # Pinia stores
│   ├── services/           # API services
│   └── plugins/            # Vue plugins
├── public/                 # Static assets
└── package.json
```

## Tính năng chính

### 1. Frontend (Customer-facing)

- **Homepage**: Hiển thị sản phẩm nổi bật, banner, danh mục
- **Product Detail**: Chi tiết sản phẩm với gallery ảnh và thông số kỹ thuật
- **Responsive Design**: Tương thích với mobile và desktop

### 2. Admin Panel

- **Dashboard**: Thống kê tổng quan
- **Product Management**: CRUD sản phẩm
- **Category Management**: Quản lý danh mục
- **User Management**: Quản lý người dùng
- **Stock Management**: Quản lý kho hàng
- **Supplier Management**: Quản lý nhà cung cấp

## Cải thiện gần đây - Product Detail Page

### Vấn đề được giải quyết

Trước đây, phần hiển thị màu sắc trong trang chi tiết sản phẩm (`ProductDetail.vue`) có những hạn chế:

- Màu sắc được hardcode cố định
- Không có tương tác khi chọn màu
- Không hiển thị màu thực tế từ dữ liệu API

### Giải pháp đã triển khai

#### 1. **Dynamic Color Display**

```javascript
// Lấy màu sắc từ specs của sản phẩm
const getColorFromSpecs = (productSpecs) => {
  const colorSpec = productSpecs.find((spec) => spec.spec_key === 'Màu sắc')
  return colorSpec ? colorSpec.spec_value : 'Không rõ'
}
```

#### 2. **Available Colors Collection**

```javascript
// Thu thập tất cả màu sắc có sẵn từ sản phẩm liên quan
const getAllAvailableColors = () => {
  const colors = new Set()
  relatedProducts.value.forEach((product) => {
    const color = getColorFromSpecs(product.specs)
    if (color && color !== 'Không rõ') {
      colors.add(color)
    }
  })
  return Array.from(colors)
}
```

#### 3. **Color Selection Logic**

```javascript
// Chọn màu và cập nhật thông tin sản phẩm
const selectColor = (color) => {
  selectedColor.value = color
  const productWithColor = getProductByColor(color)
  if (productWithColor) {
    // Cập nhật thông tin sản phẩm theo màu đã chọn
    name.value = productWithColor.name
    price.value = productWithColor.price
    discount_price.value = productWithColor.discount_price
    stock_qty.value = productWithColor.stock_qty
    specs.value = productWithColor.specs

    // Cập nhật ảnh sản phẩm
    const productImages = productWithColor.images?.map((img) => img.img_url) || []
    phoneImages.value = [
      ...productImages,
      ...phoneImages.value.filter((img) => !productImages.includes(img)),
    ]
    selectedIndex.value = 0
  }
}
```

#### 4. **Color Mapping System**

```javascript
// Mapping từ tên màu tiếng Việt sang CSS classes
const getColorClass = (colorName) => {
  const colorMap = {
    Tím: 'bg-purple-600',
    Đen: 'bg-black',
    Bạc: 'bg-gray-300',
    Vàng: 'bg-yellow-400',
    Xanh: 'bg-blue-500',
    Đỏ: 'bg-red-500',
    Trắng: 'bg-white border border-gray-300',
    'Xanh lá': 'bg-green-500',
    Cam: 'bg-orange-500',
    Hồng: 'bg-pink-500',
  }
  return colorMap[colorName] || 'bg-gray-400'
}
```

#### 5. **Enhanced UI Components**

```vue
<!-- Hiển thị màu đã chọn -->
<span class="ml-2 font-medium">{{ selectedColor || 'Không rõ' }}</span>

<!-- Nút màu động với hiệu ứng -->
<span
  v-for="color in availableColors"
  :key="color"
  :class="[
    getColorClass(color),
    'h-7 w-7 rounded-4xl cursor-pointer transition-all duration-200',
    selectedColor === color ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:scale-110',
  ]"
  @click="selectColor(color)"
  :title="color"
>
</span>
```

### Tính năng mới

1. **Dynamic Color Buttons**: Tự động tạo nút màu dựa trên dữ liệu API
2. **Interactive Color Selection**: Click để chọn màu và cập nhật thông tin sản phẩm
3. **Visual Feedback**: Hiệu ứng hover và active state
4. **Product Information Update**: Tự động cập nhật giá, tên, số lượng tồn kho khi chọn màu
5. **Image Gallery Update**: Cập nhật gallery ảnh theo sản phẩm màu đã chọn

## Công nghệ sử dụng

- **Vue.js 3**: Composition API
- **Vite**: Build tool
- **Tailwind CSS**: Styling framework
- **Vue Router**: Client-side routing
- **Pinia**: State management
- **Axios**: HTTP client
- **Vue3 Carousel**: Image carousel component

## Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

## API Integration

Dự án tích hợp với backend API thông qua các endpoints:

- `/api/product/{id}` - Chi tiết sản phẩm
- `/api/product?cat_id={id}` - Danh sách sản phẩm theo danh mục
- `/api/category` - Danh mục sản phẩm
- `/api/user` - Quản lý người dùng
- `/api/stock` - Quản lý kho hàng

## Cấu hình

File cấu hình chính:

- `vite.config.js` - Cấu hình Vite
- `jsconfig.json` - Cấu hình JavaScript
- `eslint.config.js` - Cấu hình ESLint

## Contributing

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

Dự án này được phát triển cho mục đích học tập và thương mại.
