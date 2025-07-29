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
    <h1 class="text-2xl font-medium text-zinc-600 mb-4">Giỏ hàng của bạn</h1>
    <div v-if="cartItems.length > 0">
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
    </div>
    <div v-else>
      <div class="flex justify-center items-center ">
        <div class="text-center flex flex-col justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 201.387 201.387" style="enable-background:new 0 0 201.387 201.387;" xml:space="preserve"> <g> <g> <path d="M129.413,24.885C127.389,10.699,115.041,0,100.692,0C91.464,0,82.7,4.453,77.251,11.916    c-1.113,1.522-0.78,3.657,0.742,4.77c1.517,1.109,3.657,0.78,4.768-0.744c4.171-5.707,10.873-9.115,17.93-9.115    c10.974,0,20.415,8.178,21.963,19.021c0.244,1.703,1.705,2.932,3.376,2.932c0.159,0,0.323-0.012,0.486-0.034    C128.382,28.479,129.679,26.75,129.413,24.885z"></path> </g> </g> <g> <g> <path d="M178.712,63.096l-10.24-17.067c-0.616-1.029-1.727-1.657-2.927-1.657h-9.813c-1.884,0-3.413,1.529-3.413,3.413    s1.529,3.413,3.413,3.413h7.881l6.144,10.24H31.626l6.144-10.24h3.615c1.884,0,3.413-1.529,3.413-3.413s-1.529-3.413-3.413-3.413    h-5.547c-1.2,0-2.311,0.628-2.927,1.657l-10.24,17.067c-0.633,1.056-0.648,2.369-0.043,3.439s1.739,1.732,2.97,1.732h150.187    c1.231,0,2.364-0.662,2.97-1.732S179.345,64.15,178.712,63.096z"></path> </g> </g> <g> <g> <path d="M161.698,31.623c-0.478-0.771-1.241-1.318-2.123-1.524l-46.531-10.883c-0.881-0.207-1.809-0.053-2.579,0.423    c-0.768,0.478-1.316,1.241-1.522,2.123l-3.509,15c-0.43,1.835,0.71,3.671,2.546,4.099c1.835,0.43,3.673-0.71,4.101-2.546    l2.732-11.675l39.883,9.329l-6.267,26.795c-0.43,1.835,0.71,3.671,2.546,4.099c0.263,0.061,0.524,0.09,0.782,0.09    c1.55,0,2.953-1.062,3.318-2.635l7.045-30.118C162.328,33.319,162.176,32.391,161.698,31.623z"></path> </g> </g> <g> <g> <path d="M102.497,39.692l-3.11-26.305c-0.106-0.899-0.565-1.72-1.277-2.28c-0.712-0.56-1.611-0.816-2.514-0.71l-57.09,6.748    c-1.871,0.222-3.209,1.918-2.988,3.791l5.185,43.873c0.206,1.737,1.679,3.014,3.386,3.014c0.133,0,0.27-0.009,0.406-0.024    c1.87-0.222,3.208-1.918,2.988-3.791l-4.785-40.486l50.311-5.946l2.708,22.915c0.222,1.872,1.91,3.202,3.791,2.99    C101.379,43.261,102.717,41.564,102.497,39.692z"></path> </g> </g> <g> <g> <path d="M129.492,63.556l-6.775-28.174c-0.212-0.879-0.765-1.64-1.536-2.113c-0.771-0.469-1.696-0.616-2.581-0.406L63.613,46.087    c-1.833,0.44-2.961,2.284-2.521,4.117l3.386,14.082c0.44,1.835,2.284,2.964,4.116,2.521c1.833-0.44,2.961-2.284,2.521-4.117    l-2.589-10.764l48.35-11.626l5.977,24.854c0.375,1.565,1.775,2.615,3.316,2.615c0.265,0,0.533-0.031,0.802-0.096    C128.804,67.232,129.932,65.389,129.492,63.556z"></path> </g> </g> <g> <g> <path d="M179.197,64.679c-0.094-1.814-1.592-3.238-3.41-3.238H25.6c-1.818,0-3.316,1.423-3.41,3.238l-6.827,133.12    c-0.048,0.934,0.29,1.848,0.934,2.526c0.645,0.677,1.539,1.062,2.475,1.062h163.84c0.935,0,1.83-0.384,2.478-1.062    c0.643-0.678,0.981-1.591,0.934-2.526L179.197,64.679z M22.364,194.56l6.477-126.293h143.701l6.477,126.293H22.364z"></path> </g> </g> <g> <g> <path d="M126.292,75.093c-5.647,0-10.24,4.593-10.24,10.24c0,5.647,4.593,10.24,10.24,10.24c5.647,0,10.24-4.593,10.24-10.24    C136.532,79.686,131.939,75.093,126.292,75.093z M126.292,88.747c-1.883,0-3.413-1.531-3.413-3.413s1.531-3.413,3.413-3.413    c1.882,0,3.413,1.531,3.413,3.413S128.174,88.747,126.292,88.747z"></path> </g> </g> <g> <g> <path d="M75.092,75.093c-5.647,0-10.24,4.593-10.24,10.24c0,5.647,4.593,10.24,10.24,10.24c5.647,0,10.24-4.593,10.24-10.24    C85.332,79.686,80.739,75.093,75.092,75.093z M75.092,88.747c-1.882,0-3.413-1.531-3.413-3.413s1.531-3.413,3.413-3.413    s3.413,1.531,3.413,3.413S76.974,88.747,75.092,88.747z"></path> </g> </g> <g> <g> <path d="M126.292,85.333h-0.263c-1.884,0-3.413,1.529-3.413,3.413c0,0.466,0.092,0.911,0.263,1.316v17.457    c0,12.233-9.953,22.187-22.187,22.187s-22.187-9.953-22.187-22.187V88.747c0-1.884-1.529-3.413-3.413-3.413    s-3.413,1.529-3.413,3.413v18.773c0,15.998,13.015,29.013,29.013,29.013s29.013-13.015,29.013-29.013V88.747    C129.705,86.863,128.176,85.333,126.292,85.333z"></path> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
          <p class="text-gray-500 mb-7">Không có sản phẩm nào trong giỏ hàng của bạn</p>
          <router-link :to="{ name: 'home' }">
            <button
              class="bg-black text-white px-6 py-2 rounded hover:bg-red-600 transition cursor-pointer">
              Tiếp tục mua hàng
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
