<script setup>
import { getCurrentInstance } from 'vue'
import { ref, computed } from 'vue'
import { onMounted } from 'vue'

const { emit } = getCurrentInstance()
onMounted(() => {
  emit('update-product-name', { productName: 'Giỏ hàng' })
})

// Danh sách sản phẩm mẫu
const cartItems = ref([
  {
    id: 1,
    name: 'iPad Air 5 512GB 5G - Chính hãng VN',
    color: 'Tím',
    price: 28990000,
    quantity: 1,
    image: 'https://bizweb.dktcdn.net/thumb/compact/100/480/632/products/220309064807-ipad-air-select-wif-2b2b105e-ce80-4b74-9ca3-4a2cfc4502b1.jpg'
  }
])

// Tăng số lượng
const increase = (item) => {
  item.quantity++
}

// Giảm số lượng
const decrease = (item) => {
  if (item.quantity > 1) item.quantity--
}

// Xóa sản phẩm
const removeItem = (itemId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId)
}

// Tính tổng tiền
const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

// Format tiền
const formatPrice = (number) => {
  return number.toLocaleString('vi-VN') + '₫'
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <h1 class="text-2xl font-semibold mb-4">Giỏ hàng của bạn</h1>

    <!-- Header -->
    <div class="grid grid-cols-10 font-medium bg-gray-100 px-4 py-3.5 rounded-t-md text-sm uppercase">
      <div class="col-span-4">Thông tin sản phẩm</div>
      <div class="col-span-2">Đơn giá</div>
      <div class="text-center col-span-2">Số lượng</div>
      <div class="text-right col-span-2">Thành tiền</div>
    </div>

    <!-- Danh sách sản phẩm -->
    <div v-for="item in cartItems" :key="item.id" class="grid grid-cols-10 items-center border-b px-4 py-4">
      <!-- Thông tin sản phẩm -->
      <div class="flex items-center gap-4 col-span-4">
        <img :src="item.image" alt="" class="w-[100px] h-[100px] object-cover rounded-md" />
        <div>
          <h2 class="text-base font-medium">{{ item.name }}</h2>
          <p class="text-sm text-gray-500">{{ item.color }}</p>
          <button @click="removeItem(item.id)" class="text-red-500 text-sm hover:underline cursor-pointer">Xóa</button>
        </div>
      </div>

      <!-- Đơn giá -->
      <div class="text-red-700 font-medium col-span-2">{{ formatPrice(item.price) }}</div>

      <!-- Số lượng -->
      <div class="flex justify-center col-span-2">
        <div class="inline-flex items-center border border-zinc-300 rounded overflow-hidden w-[104px] h-10">
          <button @click="decrease(item)"
            class="w-1/3 h-full text-center bg-gray-100 border-r border-zinc-300 hover:bg-black hover:text-white">−</button>
          <div class="w-1/3 text-center select-none">{{ item.quantity }}</div>
          <button @click="increase(item)"
            class="w-1/3 h-full text-center bg-gray-100 border-l border-zinc-300 hover:bg-black hover:text-white">+</button>
        </div>
      </div>

      <!-- Thành tiền -->
      <div class="text-right text-red-700 font-medium col-span-2">
        {{ formatPrice(item.price * item.quantity) }}
      </div>
    </div>

    <!-- Footer -->
    <div class="flex justify-between items-center mt-6">
      <router-link :to="{ name: 'home' }" class="text-blue-600 hover:text-blue-800">← Tiếp tục mua hàng</router-link>
      <div class="text-right text-lg font-semibold">
        Tổng tiền: <span class="text-red-700">{{ formatPrice(totalPrice) }}</span>
      </div>
    </div>

    <!-- Nút thanh toán -->
    <div class="mt-4 text-right">
      <button class="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition cursor-pointer">
        Thanh toán
      </button>
    </div>
  </div>
</template>
