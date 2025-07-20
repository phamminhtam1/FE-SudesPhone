<script setup>
import { getCurrentInstance } from 'vue'
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
const { emit } = getCurrentInstance()
const cartStore = useCartStore()
const { cartItems, totalPrice } = storeToRefs(cartStore)

onMounted(() => {
  emit('update-product-name', { productName: 'Giỏ hàng' })
  cartStore.fetchCart()
})

// Thay thế các hàm thao tác giỏ hàng bằng store
const increase = cartStore.increase
const decrease = cartStore.decrease
const removeItem = cartStore.removeItem

// Format tiền
const formatPrice = (number) => {
  return number.toLocaleString('vi-VN') + '₫'
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <h1 class="text-2xl font-semibold mb-4">Giỏ hàng của bạn</h1>
    <div class="border border-zinc-200 shadow-md rounded-lg">
      <!-- Header -->
      <div class="grid grid-cols-10 font-medium bg-gray-100 px-4 py-3.5 rounded-t-md text-sm uppercase">
        <div class="col-span-5">Thông tin sản phẩm</div>
        <div class="col-span-2">Đơn giá</div>
        <div class="text-center col-span-1">Số lượng</div>
        <div class="text-right col-span-2">Thành tiền</div>
      </div>

      <!-- Danh sách sản phẩm -->
      <div v-for="item in cartItems" :key="item.id"
        class="grid grid-cols-10 items-center border-t-zinc-200 border-t px-4 py-4">
        <!-- Thông tin sản phẩm -->
        <div class="flex items-center gap-4 col-span-5">
          <img :src="item.image" alt=""
            class="w-[80px] h-[100px] object-fixed transition-transform duration-200 hover:scale-105" />
          <div>
            <h2 class="text-base font-medium">{{ item.name }}</h2>
            <p class="text-sm text-gray-500">{{ item.color }}</p>
            <button @click="removeItem(item.id)"
              class="text-red-500 text-sm hover:underline cursor-pointer">Xóa</button>
          </div>
        </div>

        <!-- Đơn giá -->
        <div class="text-red-700 font-medium col-span-2">{{ formatPrice(item.price) }}</div>

        <!-- Số lượng -->
        <div class="flex justify-center col-span-1">
          <div class="inline-flex items-center border border-zinc-300 rounded overflow-hidden w-[80px] h-8">
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
    </div>

    <div class="grid grid-cols-12 mt-4">
      <div class="col-span-8">
        <router-link :to="{ name: 'home' }">
          <button
            class="text-zinc-800 hover:bg-zinc-300 border border-zinc-200 p-3 bg-zinc-200 rounded-lg uppercase text-[14px] font-medium cursor-pointer">
            ←Tiếp tục mua hàng
          </button>
        </router-link>
      </div>
      <div class="col-span-4">
        <div class="flex justify-between">
          <p class="uppercase">Tổng tiền:</p>
          <span class="text-red-700 text-lg font-semibold">{{ formatPrice(totalPrice) }}</span>
        </div>
        <router-link :to="{ name: 'checkout' }">
          <button
            class="text-lg uppercase font-normal text-white border border-black w-full bg-black py-1 rounded-lg mt-2 hover:bg-red-600 hover:border-red-600 cursor-pointer transition-transform duration-200 hover:scale-101">
            Thanh toán
          </button>
        </router-link>
      </div>
    </div>
    <!-- <div class="flex justify-between items-center mt-6">
      <router-link :to="{ name: 'home' }"
        class="text-zinc-800 hover:bg-zinc-300 border border-zinc-200 p-3 bg-zinc-200 rounded-lg uppercase text-[14px] font-medium">←
        Tiếp tục mua hàng</router-link>
      <div class="flex gap-20 text-lg font-semibold">
        <span>Tổng tiền:</span>
        <span class="text-red-700">{{ formatPrice(totalPrice) }}</span>
      </div>
    </div> -->

    <!-- Nút thanh toán -->
    <!-- <div class="mt-4 text-right">
      <button class="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition cursor-pointer">
        Thanh toán
      </button>
    </div> -->
  </div>
</template>
