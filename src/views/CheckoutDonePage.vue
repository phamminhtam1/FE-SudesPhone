<script setup>
import { computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { useProfileStore } from '@/stores/customerprofile';
const cartStore = useCartStore()
const profileStore = useProfileStore()
const { cartItems, totalPrice } = storeToRefs(cartStore)
const { profile } = storeToRefs(profileStore)

onMounted(() => {
  cartStore.fetchCart()
  profileStore.fetchProfile()
})

const name = computed(() => profile.value?.first_name + " " + profile.value?.last_name)
const email = computed(() => profile.value?.email)
const phone = computed(() => profile.value?.phone)

const formatPrice = (number) => {
  return number.toLocaleString('vi-VN') + '₫'
}

</script>

<template>
  <div class="bg-[#E6E8EA] min-h-screen">
    <div class="max-w-7xl mx-auto ">
      <div class="flex justify-center items-center pt-5">
        <img src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/checkout_logo.png?1746173377751" alt="">
      </div>
      <div class="grid grid-cols-5 pt-5 gap-7">
        <div class="col-span-3">
          <div class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="72px">
              <g fill="none" stroke="#8EC343" stroke-width="2">
                <circle cx="36" cy="36" r="35" style="stroke-dasharray:240px, 240px; stroke-dashoffset: 480px;">
                </circle>
                <path d="M17.417,37.778l9.93,9.909l25.444-25.393"
                  style="stroke-dasharray:50px, 50px; stroke-dashoffset: 0px;"></path>
              </g>
            </svg>
            <div class="flex flex-col gap-3 w-4/7">
              <span class="text-[20px] font-medium">Cảm ơn bạn đã đặt hàng</span>
              <span class="text-[14px]">Một email xác nhận đã được gửi tới <strong>{{ email }}</strong>.
                Xin vui lòng kiểm tra email của bạn</span>
            </div>
          </div>
          <div class="mt-6 border border-zinc-300 rounded-lg px-10 py-5">
            <div class="flex justify-between gap-3">
              <div class="flex flex-col gap-3 min-w-1/2">
                <h2 class="text-[20px] font-medium">Thông tin mua hàng</h2>
                <p class="text-zinc-600">{{ name }}</p>
                <p class="text-zinc-600">{{ email }} </p>
                <p class="text-zinc-600">{{ phone }}</p>
              </div>
              <div class="flex flex-col gap-3 min-w-1/2">
                <h2 class="text-[20px] font-medium">Địa chỉ nhận hàng
                </h2>
                <p class="text-zinc-600">{{ name }}</p>
                <p class="text-zinc-600">Da Nang</p>
                <p class="text-zinc-600">Phường Bến Nghé, Quận 1, TP Hồ Chí Minh</p>
                <p class="text-zinc-600">{{ phone }}</p>
              </div>
            </div>
            <div class="flex justify-between mt-6 gap-3">
              <div class="flex flex-col gap-3 min-w-1/2">
                <h2 class="text-[20px] font-medium">Phương thức thanh toán</h2>
                <p class="text-zinc-600">Thanh toán khi giao hàng (COD)</p>
              </div>
              <div class="flex flex-col gap-3 min-w-1/2">
                <h2 class="text-[20px] font-medium">Phương thức vận chuyển</h2>
                <p class="text-zinc-600">Giao hàng tận nơi Phương thức vận chuyển </p>
              </div>
            </div>
          </div>
          <div class="flex justify-start mt-7 gap-5">
            <router-link :to="{ name: 'home' }">
              <button
                class="border border-blue-400 px-6 py-3.5 text-[20px] text-white bg-blue-500 rounded-lg hover:bg-[#2A6395] cursor-pointer hover:border-[#2A6395]">Tiếp
                tục mua
                hàng</button>
            </router-link>
            <button
              class="flex justify-center items-center text-[24px] text-[#2A9DCC] hover:text-[#2A6395] cursor-pointer">
              <svg fill="currentColor" viewBox="0 0 1024 1024" width="50px" height="50px"
                xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                <path
                  d="M691.2 410V256H333v154h-77v256h76.8v102h358.4V666H768V410h-76.8zM640 717H384V589h256v128zM384 410V307h256v103H384zm307.2 102c-14.1 0-25.6-11.5-25.6-25.6 0-14.1 11.5-25.6 25.6-25.6 14.1 0 25.6 11.5 25.6 25.6 0 14.1-11.5 25.6-25.6 25.6z">
                </path>
              </svg>
              <span class="-ml-1.5">In</span>
            </button>
          </div>
        </div>
        <div class="col-span-2 ">
          <div class="bg-white rounded-lg">
            <div class="mx-5 py-1.5">
              <span class="font-medium">Đơn hàng #{{ order_id }} (4)</span>
            </div>
            <div class="px-5 py-3 flex justify-between gap-3 items-center border-t border-zinc-300"
              v-for="item in cartItems" :key="item.id">
              <div class="flex gap-4 relative">
                <img class="w-[50px] h-[57px] border border-zinc-300 rounded-lg self-end" :src="item.image" alt="">
                <label
                  class=" absolute -top-1 left-9 border border-[#2A9DCC] text-white bg-[#2A9DCC] rounded-full px-1.5 text-[12px] font-medium">{{
                  item.quantity }}</label>
                <div>
                  <span class="text-[14px]">{{ item.name }} - Chính hãng VN</span>
                  <p class="text-[13px] text-zinc-400">{{ item.color }}
                  </p>
                </div>
              </div>
              <span class="text-[16px] text-zinc-500">{{ formatPrice(item.price * item.quantity) }}
              </span>
            </div>
            <div class="border-b-1 border-zinc-300"></div>
            <div class="mt-2 mx-5">
              <div class="flex justify-between">
                <span class="text-[16px] text-zinc-500">
                  Tạm tính
                </span>
                <span class="text-[16px] text-zinc-500">
                  {{ formatPrice(totalPrice) }}
                </span>
              </div>
              <div class="flex justify-between mt-2">
                <span class="text-[16px] text-zinc-500">
                  Phí vận chuyển
                </span>
                <span class="text-[14px] text-zinc-500">
                  40.000₫
                </span>
              </div>
            </div>
            <div class="border-b-1 border-zinc-300 mt-2"></div>
            <div class="mt-4 mx-5 pb-3">
              <div class="flex justify-between mt-2">
                <span class="text-[19px] text-zinc-500">
                  Tổng cộng
                </span>
                <span class="text-[20px] text-[#2A9DCE]">
                  {{ formatPrice(totalPrice - 40000) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
