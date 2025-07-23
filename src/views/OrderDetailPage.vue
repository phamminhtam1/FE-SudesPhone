<script setup>
import { onMounted } from 'vue';
import { useOrderDetailStore } from '@/stores/orderdetail'
import { storeToRefs } from 'pinia';
const orderDetailStore = useOrderDetailStore()
const { profile, products } = storeToRefs(orderDetailStore)

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})
const order_id = props.id

const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  // Nếu date không hợp lệ, trả về chuỗi gốc
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}
const orderStatusVN = {
  pending: 'Chờ xử lý',
  paid: 'Đã thanh toán',
  shipped: 'Đã giao hàng',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
}
const paymentStatusVN = {
  unpaid: 'Chưa thanh toán',
  paid: 'Đã thanh toán',
  refunded: 'Đã hoàn tiền',
}
const formatPrice = (number) => {
  return Number(number).toLocaleString('vi-VN') + '₫'
}

onMounted(async () => {
  await orderDetailStore.fetchOrderDetail(order_id)
})

</script>

<template>

  <div class="max-w-4xl mx-auto border border-zinc-300 py-3 px-5 mt-5 mb-5 rounded-lg shadow-xl">
    <div class="flex justify-center mb-5">
      <img class="pt-5" src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/checkout_logo.png?1746173377751"
        alt="">
    </div>
    <button>
      <router-link :to="{ name: 'profile-customer' }"
        class="px-5 py-1 rounded-lg text-white bg-black text-[15px] mb-5 border border-black flex items-center gap-3 hover:bg-red-600  hover:border-red-600 cursor-pointer">
        <svg fill="currentColor" height="20px" width="20px" version="1.1" id="Layer_1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 472.615 472.615"
          xml:space="preserve" stroke="currentColor">
          <path
            d="M167.158,117.315l-0.001-77.375L0,193.619l167.157,153.679v-68.555c200.338,0.004,299.435,153.932,299.435,153.932 c3.951-19.967,6.023-40.609,6.023-61.736C472.615,196.295,341.8,117.315,167.158,117.315z">
          </path>
        </svg>
        <span class="font-medium">Trở về</span>
      </router-link>
    </button>
    <div class="flex justify-between items-center">
      <span class="text-[17px] font-medium">Chi tiết đơn hàng #DH0{{ profile.order_id }}
      </span>
      <span class="text-[14px] text-zinc-500">Ngày tạo: {{ formatDateTime(profile.created_at) }}</span>
    </div>
    <div class="flex justify-start gap-5 mt-5">
      <span class="text-[14px] text-zinc-500 flex gap-1">Trạng thái thanh toán: <p
          class="text-[15px] text-red-500 font-medium">{{ paymentStatusVN[profile.payment_status] }}</p></span>
      <span class="text-[14px] text-zinc-500 flex gap-1">Trạng thái vận chuyển: <p
          class="text-[15px] text-red-500 font-medium">{{ orderStatusVN[profile.order_status] }}</p></span>
    </div>
    <div class="grid grid-cols-3 gap-3 px-3 mt-5">
      <div class=" col-span-1 min-w-1/3 flex flex-col gap-2 pr-4">
        <span class="uppercase font-medium">ĐỊA CHỈ GIAO HÀNG</span>
        <span class=" font-medium">{{ profile.name }}</span>
        <span class="text-[14px] text-zinc-500">Địa chỉ: {{ profile.address_customer }}</span>
        <span class="text-[14px] text-zinc-500">Số điện thoại: {{ profile.phone }}</span>
      </div>
      <div class=" col-span-1 min-w-1/3 flex flex-col gap-2">
        <span class="uppercase font-medium">THANH TOÁN</span>
        <span class="text-[14px] text-zinc-500">Thanh toán khi giao hàng (COD)</span>
      </div>
      <div class=" col-span-1 min-w-1/3 flex flex-col gap-2">
        <span class="uppercase font-medium">GHI CHÚ</span>
        <span class="text-[14px] text-zinc-500">Không có ghi chú</span>
      </div>
    </div>
    <div
      class="mt-5 grid-cols-11 flex hover:bg-[#F9FAFB] p-3 text-zinc-500 text-[14px] font-medium gap-3 border-b border-zinc-300 mx-4">
      <div class="col-span-1 w-1/6"></div>
      <div class="col-span-3 w-5/6">
        Sản phẩm
      </div>
      <div class="col-span-1 w-2/6 flex justify-center">
        Đơn giá
      </div>
      <div class="col-span-1 w-1/6 flex justify-center">
        Số lượng
      </div>
      <div class="col-span-1 w-2/6 flex justify-end">
        Tổng
      </div>
    </div>
    <div v-for="product in products" :key="product.id"
      class="pt-5 pb-5 grid-cols-11 flex items-center hover:bg-[#F9FAFB] p-3 text-[14px] gap-3 border-b border-zinc-300 mx-4">
      <div class="col-span-1 w-1/6">
        <img class="w-12 h-12" :src="product.image" alt="">
      </div>
      <div class="col-span-3 w-5/6 font-medium">
        {{ product.name }} - Chính hãng VN
        <p class="text-zinc-600 font-normal">
          {{ product.color }}
        </p>
      </div>
      <div class="col-span-1 w-2/6 flex justify-center">
        {{ formatPrice(product.price) }}
      </div>
      <div class="col-span-1 w-1/6 flex justify-center">
        {{ product.quantity }}
      </div>
      <div class="col-span-1 w-2/6 flex justify-end">
        {{ formatPrice(product.total) }}
      </div>
    </div>
    <div class="flex justify-end">
      <div class="flex justify-between w-4/9 text-[15px] border-b border-b-zinc-300 pt-5 pb-2 gap-3">
        <span class="text-zinc-600">Phí vận chuyển</span>
        <span>{{ formatPrice(profile.shipping_fee) }} (Giao hàng tận nơi)</span>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="flex justify-between w-4/9 text-[20px] pt-5 pb-2 gap-3">
        <span class=" font-medium">Tổng tiền</span>
        <span class=" font-medium text-red-600">{{ formatPrice(profile.total_amount) }}</span>
      </div>
    </div>
  </div>
</template>

<style></style>
