<script setup>
import { useOrderStore } from '@/stores/order'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const orderStore = useOrderStore()
const { order_list } = storeToRefs(orderStore)

const orderStatusVN = {
  pending: 'Chờ xử lý',
  paid: 'Đã xử lý',
  shipped: 'Đã giao hàng',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
}
const paymentStatusVN = {
  pending: 'Chờ thanh toán',
  success: 'Đã thanh toán',
  failed: 'Đã hủy thanh toán',
  refunded: 'Đã hoàn tiền',
}

function getOrderStatusClass(status) {
  switch (status) {
    case 'pending': return 'bg-yellow-500 text-white';
    case 'paid': return 'bg-green-600 text-white';
    case 'shipped': return 'bg-blue-600 text-white';
    case 'completed': return 'bg-green-800 text-white';
    case 'cancelled': return 'bg-red-600 text-white';
    default: return 'bg-gray-500 text-white';
  }
}
function getPaymentStatusClass(status) {
  switch (status) {
    case 'pending': return 'bg-yellow-500 text-white';
    case 'success': return 'bg-green-600 text-white';
    case 'failed': return 'bg-red-600 text-white';
    case 'refunded': return 'bg-orange-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
}

const formatPrice = (number) => {
  return Number(number).toLocaleString('vi-VN') + '₫'
}

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

onMounted(() => {
  orderStore.fetchOrderList()
})
</script>

<template>
  <div class="flex flex-col gap-5 max-h-[450px] overflow-y-auto">
    <div class="border border-zinc-200 shadow-lg rounded-lg px-7 py-4" v-for="order in order_list"
      :key="order.order_id">
      <div class="flex justify-between items-center mb-3">
        <div>
          <p class="font-medium text-[18px]">Đơn hàng #DH0{{ order.order_id }}</p>
          <p class="text-sm text-gray-500">Đặt ngày: {{ formatDateTime(order.created_at) }}</p>
        </div>
        <div class="flex flex-col justify-center items-end gap-1">
          <span class="px-3 py-0.5 rounded-full text-xs font-medium" :class="getOrderStatusClass(order.order_status)">
            {{ orderStatusVN[order.order_status] || order.order_status }}
          </span>
          <span class="px-3 py-0.5 rounded-full text-xs font-medium"
            :class="getPaymentStatusClass(order.payment?.pay_status)">
            {{ paymentStatusVN[order.payment?.pay_status] || order.payment?.pay_status }}
          </span>
        </div>
      </div>
      <div class="flex flex-col">
        <span class="font-medium text-[16px]">{{ order.name }}</span>
        <span class="text-sm text-gray-500">{{ order.phone }}</span>
      </div>
      <div class="flex flex-col mt-4">
        <span class="text-sm text-gray-500">Địa chỉ giao hàng:</span>
        <span class="text-sm">{{ order.address_customer }}</span>
      </div>
      <div class="border border-zinc-200 mt-3"></div>
      <div class="flex justify-between mt-4">
        <span class="text-sm text-gray-500">Tạm tính:</span>
        <span class="text-sm text-gray-800">{{ formatPrice(order.sub_total) }}</span>
      </div>
      <div class="flex justify-between mt-2">
        <span class="text-sm text-gray-500">Phí vận chuyển:</span>
        <span class="text-sm text-gray-800">{{ formatPrice(order.shipping_fee) }}</span>
      </div>
      <div class="border border-zinc-200 mt-3"></div>
      <div class="flex justify-between mt-2">
        <span class="text-[17px]">Tổng cộng:</span>
        <span class="text-[17px] font-medium text-red-600">{{ formatPrice(order.total_amount) }}</span>
      </div>
      <div class="flex justify-end mt-4">
        <router-link :to="`/order/${order.order_id}`"
          class="px-4 py-1 bg-red-700 text-white rounded-lg hover:bg-black transition">
          Xem chi tiết
        </router-link>
      </div>
    </div>
  </div>
</template>

<style></style>
