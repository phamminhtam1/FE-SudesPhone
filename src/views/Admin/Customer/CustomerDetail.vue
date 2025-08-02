<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue'
import axiosAdmin from '@/plugins/axion'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useOrderDetailStore } from '@/stores/orderdetailAdmin'
import { storeToRefs } from 'pinia';
const orderDetailStore = useOrderDetailStore()
const { profile,products } = storeToRefs(orderDetailStore)


const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
})

const customer = ref({ order: [] })
const orders = ref([])
const currentOrderId = ref(null)

const OrderDetail = (orderId) => {
  if (currentOrderId.value === orderId) {
    currentOrderId.value = null
  } else {
    currentOrderId.value = orderId
    orderDetailStore.fetchOrderDetail(orderId) // Chỉ gọi khi có orderId
  }
}

async function getCustomerDetail(cust_id) {
  const res = await axiosAdmin.get(`/api/customer/${cust_id}`)
  customer.value = res.data.customer
  orders.value = res.data.customer.order
  console.log(orders)
}

const formatDateTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  // Nếu date không hợp lệ, trả về chuỗi gốc
  if (isNaN(date.getTime())) return dateString
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
const orderStatusVN = {
  pending: 'Chờ xử lý',
  paid: 'Đã thanh toán',
  shipped: 'Đã giao hàng',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
}
const paymentStatusVN = {
  pending: 'Chờ thanh toán',
  success: 'Đã thanh toán',
  failed: 'Thất bại',
  refund: 'Đã hoàn tiền',
}
// Hàm trả về class màu cho order_status
const orderStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-300 text-yellow-900'
    case 'paid':
      return 'bg-blue-300 text-blue-900'
    case 'shipped':
      return 'bg-purple-300 text-purple-900'
    case 'completed':
      return 'bg-green-300 text-green-900'
    case 'cancelled':
      return 'bg-red-300 text-red-900'
    default:
      return 'bg-gray-300 text-gray-900'
  }
}
// Hàm trả về class màu cho payment_status
const paymentStatusClass = (status) => {
  switch (status) {
    case 'pendding':
      return 'bg-red-200 text-red-800'
    case 'success':
      return 'bg-green-200 text-green-800'
    case 'failed':
      return 'bg-gray-200 text-gray-800'
    default:
      return 'bg-gray-300 text-gray-900'
  }
}
const formatPrice = (number) => {
  return Number(number).toLocaleString('vi-VN') + '₫'
}

onMounted(() => {
  getCustomerDetail(props.id)
  // Đã xoá dòng gọi fetchOrderDetail ở đây để tránh gọi với null
})
</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#F3F3F3] flex justify-start pt-5">
    <div class="w-full mx-5">
      <div class="grid grid-cols-4 gap-5">
        <div class="col-span-1 border border-zinc-300 rounded-lg p-5 w-full bg-white">
          <div class="flex justify-between items-center mb-2">
            <span class="text-zinc-500 font-medium">Tổng số đơn hàng </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="blue"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-shopping-cart h-4 w-4 text-admin-info"
              data-lov-id="src/components/CustomerStats.tsx:50:12"
              data-lov-name="stat.icon"
              data-component-path="src/components/CustomerStats.tsx"
              data-component-line="50"
              data-component-file="CustomerStats.tsx"
              data-component-name="stat.icon"
              data-component-content="%7B%7D"
            >
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path
                d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
              ></path>
            </svg>
          </div>
          <span class="text-[22px] font-medium">{{ customer.order.length }}</span>
        </div>
        <div class="col-span-1 border border-zinc-300 rounded-lg p-5 w-full bg-white">
          <div class="flex justify-between items-center mb-2">
            <span class="text-zinc-500 font-medium">Tổng chi tiêu </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-dollar-sign h-4 w-4 text-admin-success"
              data-lov-id="src/components/CustomerStats.tsx:50:12"
              data-lov-name="stat.icon"
              data-component-path="src/components/CustomerStats.tsx"
              data-component-line="50"
              data-component-file="CustomerStats.tsx"
              data-component-name="stat.icon"
              data-component-content="%7B%7D"
            >
              <line x1="12" x2="12" y1="2" y2="22"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <span class="text-[22px] font-medium">8.450.000 ₫ </span>
        </div>
        <div class="col-span-1 border border-zinc-300 rounded-lg p-5 w-full bg-white">
          <div class="flex justify-between items-center mb-2">
            <span class="text-zinc-500 font-medium">Đơn hàng gần nhất </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-calendar h-4 w-4 text-admin-warning"
              data-lov-id="src/components/CustomerStats.tsx:50:12"
              data-lov-name="stat.icon"
              data-component-path="src/components/CustomerStats.tsx"
              data-component-line="50"
              data-component-file="CustomerStats.tsx"
              data-component-name="stat.icon"
              data-component-content="%7B%7D"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
          </div>
          <span class="text-[22px] font-medium">22/1/2025 </span>
        </div>
        <div class="col-span-1 border border-zinc-300 rounded-lg p-5 w-full bg-white">
          <div class="flex justify-between items-center mb-2">
            <span class="text-zinc-500 font-medium">Giá trị đơn TB </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-trending-up h-4 w-4 text-primary"
              data-lov-id="src/components/CustomerStats.tsx:50:12"
              data-lov-name="stat.icon"
              data-component-path="src/components/CustomerStats.tsx"
              data-component-line="50"
              data-component-file="CustomerStats.tsx"
              data-component-name="stat.icon"
              data-component-content="%7B%7D"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
          </div>
          <span class="text-[22px] font-medium">2.112.500 ₫ </span>
        </div>
      </div>
      <div class="border border-zinc-300 rounded-lg p-5 bg-white mt-5">
        <div class="flex justify-start items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-user h-5 w-5"
            data-lov-id="src/components/CustomerInfo.tsx:20:10"
            data-lov-name="User"
            data-component-path="src/components/CustomerInfo.tsx"
            data-component-line="20"
            data-component-file="CustomerInfo.tsx"
            data-component-name="User"
            data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span class="text-[22px] font-medium">Thông tin khách hàng</span>
        </div>
        <div class="grid grid-cols-5 mt-5">
          <div class="col-span-1 flex justify-start gap-3 items-center">
            <span
              class="w-[80px] h-[80px] rounded-full bg-black flex justify-center items-center text-white text-[22px] font-medium"
            >
              MT
            </span>
            <div class="flex flex-col gap-2">
              <span class="text-[22px] font-medium">{{
                customer.first_name + ' ' + customer.last_name
              }}</span>
              <div class="flex">
                <span class="bg-green-500 text-xs font-medium text-white px-3 py-1 rounded-xl"
                  >Hoạt động
                </span>
                <label class="relative inline-flex items-center ml-1 cursor-pointer">
                  <input
                    type="checkbox"
                    :checked="customer.status === 1"
                    @change="updateStatusSupplier(customer.cust_id, customer.status === 1 ? 0 : 1)"
                    class="sr-only peer"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#384153]"
                  ></div>
                </label>
              </div>
            </div>
          </div>
          <div class="col-span-2">
            <div class="flex justify-center">
              <div class="flex items-center gap-2 text-zinc-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="gray"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-mail h-4 w-4 text-muted-foreground"
                  data-lov-id="src/components/CustomerInfo.tsx:56:16"
                  data-lov-name="Mail"
                  data-component-path="src/components/CustomerInfo.tsx"
                  data-component-line="56"
                  data-component-file="CustomerInfo.tsx"
                  data-component-name="Mail"
                  data-component-content="%7B%22className%22%3A%22h-4%20w-4%20text-muted-foreground%22%7D"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                Email:
                <span class="text-black">{{ customer.email }} </span>
              </div>
            </div>
            <div class="flex justify-center mt-2 ml-6">
              <div class="flex items-center gap-2 text-zinc-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-phone h-4 w-4 text-muted-foreground"
                  data-lov-id="src/components/CustomerInfo.tsx:61:16"
                  data-lov-name="Phone"
                  data-component-path="src/components/CustomerInfo.tsx"
                  data-component-line="61"
                  data-component-file="CustomerInfo.tsx"
                  data-component-name="Phone"
                  data-component-content="%7B%22className%22%3A%22h-4%20w-4%20text-muted-foreground%22%7D"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  ></path>
                </svg>
                Số điện thoại:
                <span class="text-black">{{ customer.phone }} </span>
              </div>
            </div>
          </div>
          <div class="col-span-2">
            <div class="flex justify-center">
              <div class="flex items-center gap-2 text-zinc-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-calendar h-4 w-4 text-muted-foreground"
                  data-lov-id="src/components/CustomerInfo.tsx:68:16"
                  data-lov-name="Calendar"
                  data-component-path="src/components/CustomerInfo.tsx"
                  data-component-line="68"
                  data-component-file="CustomerInfo.tsx"
                  data-component-name="Calendar"
                  data-component-content="%7B%22className%22%3A%22h-4%20w-4%20text-muted-foreground%22%7D"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                Ngày tạo:
                <span class="text-black">{{ formatDateTime(customer.created_at) }} </span>
              </div>
            </div>
            <div class="flex justify-center mt-2">
              <div class="flex items-center gap-2 text-zinc-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-calendar h-4 w-4 text-muted-foreground"
                  data-lov-id="src/components/CustomerInfo.tsx:68:16"
                  data-lov-name="Calendar"
                  data-component-path="src/components/CustomerInfo.tsx"
                  data-component-line="68"
                  data-component-file="CustomerInfo.tsx"
                  data-component-name="Calendar"
                  data-component-content="%7B%22className%22%3A%22h-4%20w-4%20text-muted-foreground%22%7D"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                Cập nhật:
                <span class="text-black">{{ formatDateTime(customer.updated_at) }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border border-zinc-300 rounded-lg p-5 bg-white mt-5">
        <div class="flex justify-start items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-shopping-cart h-5 w-5"
            data-lov-id="src/components/OrderList.tsx:21:10"
            data-lov-name="ShoppingCart"
            data-component-path="src/components/OrderList.tsx"
            data-component-line="21"
            data-component-file="OrderList.tsx"
            data-component-name="ShoppingCart"
            data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D"
          >
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path
              d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
            ></path>
          </svg>
          <span class="text-[22px] font-medium"
            >Danh sách đơn hàng ({{ customer.order.length }})
          </span>
        </div>
        <div class="grid grid-cols-9 mt-5 bg-blue-50 rounded-lg p-3">
          <div class="col-span-1 font-medium">Mã đơn</div>
          <div class="col-span-1 font-medium">Chi nhánh</div>
          <div class="col-span-1 font-medium">Hình thức</div>
          <div class="col-span-1 font-medium">Trạng thái</div>
          <div class="col-span-1 font-medium">Thanh toán</div>
          <div class="col-span-1 font-medium">Tổng tiền</div>
          <div class="col-span-1 font-medium">Ngày đặt</div>
          <div class="col-span-1 font-medium">Địa chỉ</div>
          <div class="col-span-1 font-medium flex justify-center">Hành động</div>
        </div>
        <div
          class="grid grid-cols-9 mt-5 border border-blue-100 rounded-lg p-3 items-center hover:bg-blue-50 transition-all duration-100"
          v-for="order in orders"
          :key="order.order_id"
        >
          <div class="col-span-1 font-medium">#DH0{{ order.order_id }}</div>
          <div class="col-span-1 font-medium">CN1</div>
          <div class="col-span-1 font-medium">
            {{ order.payment?.method }}
          </div>
          <div class="col-span-1 font-medium text-sm">
            <span :class="orderStatusClass(order.order_status) + ' px-2 rounded-xl'">
              {{ orderStatusVN[order.order_status] }}
            </span>
          </div>
          <div class="col-span-1 font-medium text-sm">
            <span :class="paymentStatusClass(order.payment?.pay_status) + ' px-2 rounded-xl'">
              {{ paymentStatusVN[order.payment?.pay_status] }}
            </span>
          </div>
          <div class="col-span-1 font-medium text-green-600">
            {{ formatPrice(order.total_amount) }}
          </div>
          <div class="col-span-1 font-medium text-zinc-500 px-2">
            {{ formatDateTime(order.created_at) }}
          </div>
          <div class="col-span-1 ellipsis pr-4" :title="order.address_customer">
            {{ order.address_customer }}
          </div>
          <div class="col-span-1 font-medium flex justify-center">
            <button
              @click.prevent="OrderDetail(order.order_id)"
              class="flex items-center gap-2 border border-zinc-300 rounded-lg px-3 py-1 cursor-pointer hover:bg-zinc-100 transition-all duration-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye h-3 w-3"
                data-lov-id="src/components/OrderList.tsx:73:20"
                data-lov-name="Eye"
                data-component-path="src/components/OrderList.tsx"
                data-component-line="73"
                data-component-file="OrderList.tsx"
                data-component-name="Eye"
                data-component-content="%7B%22className%22%3A%22h-3%20w-3%22%7D"
              >
                <path
                  d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
                ></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>Xem</span>
            </button>
          </div>
          <div v-if="currentOrderId === order.order_id"
            class="col-span-9 p-5 mt-2 border border-zinc-300 bg-gray-50 rounded-lg shadow-xl">
            <div class="flex justify-start items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-package h-4 w-4"
                data-lov-id="src/components/OrderDetails.tsx:17:10"
                data-lov-name="Package"
                data-component-path="src/components/OrderDetails.tsx"
                data-component-line="17"
                data-component-file="OrderDetails.tsx"
                data-component-name="Package"
                data-component-content="%7B%22className%22%3A%22h-4%20w-4%22%7D">
                <path
                  d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"
                ></path>
                <path d="M12 22V12"></path>
                <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path>
                <path d="m7.5 4.27 9 5.15"></path>
              </svg>
              <span class="text-[17px] font-medium">Chi tiết đơn hàng #DH0{{ order.order_id }}</span>
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  user-select: all;
}
</style>
