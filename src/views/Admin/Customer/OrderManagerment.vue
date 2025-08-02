<script setup>
import { ref } from 'vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue';
import LeftMenu from '@/components/layout/backend/LeftMenu.vue';
import { useAllOrderStore } from '@/stores/allorder';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';
import axiosAdmin from '@/plugins/axion';
const allOrderStore = useAllOrderStore()
const { orders, total_profit, total_order, total_order_waiting, total_order_completed } = storeToRefs(allOrderStore)

const selectRef = ref(null)
const isDropdownOpen = ref(false)
const selectedStatus = ref('')



const statusOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'shipped', label: 'Đã gửi hàng' },
  { value: 'delivered', label: 'Đã giao hàng' },
  { value: 'cancelled', label: 'Đã hủy' }
]

const handleButtonClick = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectOption = (value) => {
  selectedStatus.value = value
  isDropdownOpen.value = false
  // Update the hidden select value
  if (selectRef.value) {
    selectRef.value.value = value
  }
}

const formatPrice = (number) => {
  return Number(number).toLocaleString('vi-VN') + '₫'
}

const formatDate = (dateString) => {
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
  paid: 'Đã xử lý',
  shipped: 'Đã giao vận',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
}
const paymentStatusVN = {
  pending: 'Chờ thanh toán',
  success: 'Đã thanh toán',
  failed: 'Đã hủy thanh toán',
  refunded: 'Đã hoàn tiền',
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
    case 'pending': return 'bg-yellow-500 text-white';
    case 'success': return 'bg-green-600 text-white';
    case 'failed': return 'bg-red-600 text-white';
    case 'refunded': return 'bg-orange-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
}

// Hàm mở popup chi tiết đơn hàng
const openOrderDetail = (order) => {
  const orderDetailHtml = `
    <div class="text-left">
      <!-- Order Info -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gray-50 p-3 rounded-lg">
          <h3 class="font-semibold text-gray-800 mb-2 text-sm">Thông tin đơn hàng</h3>
          <div class="space-y-1 text-xs">
            <div class="flex justify-between">
              <span class="text-gray-600">Mã đơn:</span>
              <span class="font-medium">ORD-00${order.order_id}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Ngày đặt:</span>
              <span>${formatDate(order.created_at)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Trạng thái:</span>
              <span class="px-2 rounded-xl text-xs ${orderStatusClass(order.order_status)}">
                ${orderStatusVN[order.order_status]}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Thanh toán:</span>
              <span class="px-2 rounded-xl text-xs ${paymentStatusClass(order.payment?.pay_status)}">
                ${paymentStatusVN[order.payment?.pay_status]}
              </span>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <h3 class="font-semibold text-gray-800 mb-2 text-sm">Thông tin khách hàng</h3>
          <div class="space-y-1 text-xs">
            <div class="flex justify-between">
              <span class="text-gray-600">Họ tên:</span>
              <span class="font-medium">${order.customer.first_name + " " + order.customer.last_name}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Email:</span>
              <span>${order.customer.email}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Số điện thoại:</span>
              <span>${order.customer.phone}</span>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <h3 class="font-semibold text-gray-800 mb-2 text-sm">Địa chỉ giao hàng</h3>
          <div class="space-y-1 text-xs">
            <div class="flex justify-between">
              <span class="text-gray-600">Người nhận:</span>
              <span class="font-medium">${order.name}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Số điện thoại:</span>
              <span>${order.phone}</span>
            </div>
            <div class="text-gray-600">
              <span class="block">Địa chỉ:</span>
              <span class="text-xs">${order.address_customer}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div class="bg-gray-50 p-3 rounded-lg mb-4">
        <h3 class="font-semibold text-gray-800 mb-3 text-sm">Danh sách sản phẩm</h3>
        <div class="space-y-3 max-h-40 overflow-y-auto">
          ${order.items.map(item => `
            <div class="flex items-center space-x-3 bg-white p-3 rounded-lg">
              <img src="${item.product.images?.[0]?.img_url || '/src/assets/logo.svg'}"
                   alt="${item.product.name}"
                   class="w-12 h-12 object-cover rounded-lg">
              <div class="flex-1">
                <h4 class="font-medium text-gray-800 text-sm">${item.product.name}</h4>
                <p class="text-xs text-gray-600">
                  ${item.product.specs?.find(spec => spec.spec_key === 'Màu sắc')?.spec_value || 'Không rõ màu'}
                </p>
                <p class="text-xs text-gray-500">Số lượng: ${item.qty}</p>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-800 text-sm">${formatPrice(item.unit_price)}</p>
                <p class="text-xs text-gray-600">Tổng: ${formatPrice(item.unit_price * item.qty)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Order Summary -->
      <div class="bg-gray-50 p-3 rounded-lg">
        <h3 class="font-semibold text-gray-800 mb-3 text-sm">Tổng kết đơn hàng</h3>
        <div class="space-y-1 text-xs">
          <div class="flex justify-between">
            <span class="text-gray-600">Tạm tính:</span>
            <span>${formatPrice(order.sub_total)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Phí vận chuyển:</span>
            <span>${formatPrice(order.shipping_fee)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Giảm giá:</span>
            <span>${formatPrice(order.discount)}</span>
          </div>
          <div class="border-t border-gray-300 pt-2 mt-2">
            <div class="flex justify-between">
              <span class="font-semibold text-gray-800">Tổng cộng:</span>
              <span class="font-semibold text-red-600">${formatPrice(order.total_amount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  Swal.fire({
    title: `Chi tiết đơn hàng #ORD-00${order.order_id}`,
    html: orderDetailHtml,
    width: '800px',
    showCloseButton: true,
    showConfirmButton: false,
    background: '#fff',
    backdrop: 'rgba(0,0,0,0.4)',
    allowOutsideClick: true,
    allowEscapeKey: true
  })
}

// Hàm mở popup thay đổi trạng thái đơn hàng
const openUpdateStatusPopup = (order) => {
  const statusOptions = [
    { value: 'pending', label: 'Chờ xác nhận' },
    { value: 'paid', label: 'Đã xác nhận' },
    { value: 'shipped', label: 'Đang giao hàng' },
    { value: 'completed', label: 'Giao hàng thành công' },
    { value: 'cancelled', label: 'Đã hủy' }
  ]

  const updateStatusHtml = `
    <div class="text-left">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái hiện tại</label>
        <span class="inline-block px-3 py-1 rounded-full text-sm font-medium ${orderStatusClass(order.order_status)}">
          ${orderStatusVN[order.order_status]}
        </span>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái mới</label>
        <select id="newStatusSelect" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Chọn trạng thái mới</option>
          ${statusOptions.map(option => `
            <option value="${option.value}" ${option.value === order.order_status ? 'selected' : ''}>
              ${option.label}
            </option>
          `).join('')}
        </select>
      </div>

      <div class="text-sm text-gray-600">
        <p><strong>Lưu ý:</strong></p>
        <ul class="list-disc list-inside mt-1 space-y-1">
          <li>Chỉ có thể thay đổi trạng thái theo thứ tự quy định</li>
          <li>Không thể quay lại trạng thái trước đó</li>
          <li>Hệ thống sẽ gửi thông báo cho khách hàng</li>
        </ul>
      </div>
    </div>
  `

  Swal.fire({
    title: 'Cập nhật trạng thái đơn hàng',
    html: updateStatusHtml,
    width: '500px',
    showCloseButton: true,
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Cập nhật',
    cancelButtonText: 'Hủy',
    background: '#fff',
    backdrop: 'rgba(0,0,0,0.4)',
    allowOutsideClick: true,
    allowEscapeKey: true,
    preConfirm: () => {
      const newStatus = document.getElementById('newStatusSelect').value
      if (!newStatus) {
        Swal.showValidationMessage('Vui lòng chọn trạng thái mới')
        return false
      }
      if (newStatus === order.order_status) {
        Swal.showValidationMessage('Trạng thái mới phải khác trạng thái hiện tại')
        return false
      }
      return newStatus
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const newStatus = result.value
      updateOrderStatus(order.order_id, newStatus)
    }
  })
}

// Hàm cập nhật trạng thái đơn hàng (sẽ gọi API sau)
const updateOrderStatus = async (orderId, newStatus) => {
  try {
      await axiosAdmin.put(`/api/order/change-status/${orderId}`, {
      order_status: newStatus
    })

    // Tạm thời hiển thị thông báo thành công
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: `Đã cập nhật trạng thái đơn hàng thành ${orderStatusVN[newStatus]}`,
      confirmButtonText: 'Đóng',
    })

    // Refresh lại danh sách đơn hàng
    await allOrderStore.fetchAllOrder()
    await allOrderStore.fetchOrderProfit()

  } catch (error) {
    const errorMessage = error?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng';

    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: errorMessage,
      confirmButtonText: 'Đóng',
    });
  }
}

onMounted(() => {
  allOrderStore.fetchAllOrder()
  allOrderStore.fetchOrderProfit()
})
</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#F3F3F3] flex justify-start pt-5">
    <div class="w-full mx-5">
      <div class=" grid grid-cols-4 gap-5">
        <div class=" flex flex-col col-span-1 w-full border border-zinc-300 rounded-lg p-5 bg-white">
          <div class="flex justify-between items-center">
            <span class="text-[14px] font-medium">Tổng đơn hàng</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package h-4 w-4 text-muted-foreground" data-lov-id="src/pages/AdminOrders.tsx:198:14" data-lov-name="Package" data-component-path="src/pages/AdminOrders.tsx" data-component-line="198" data-component-file="AdminOrders.tsx" data-component-name="Package" data-component-content="%7B%22className%22%3A%22h-4%20w-4%20text-muted-foreground%22%7D"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path><path d="m7.5 4.27 9 5.15"></path></svg>
          </div>
          <span class="text-[22px] font-bold">{{ total_order }}</span>
          <span class="text-[14px] text-zinc-500">Tất cả đơn hàng</span>
        </div>
        <div class=" flex flex-col col-span-1 w-full border border-zinc-300 rounded-lg p-5 bg-white">
          <div class="flex justify-between items-center">
            <span class="text-[14px] font-medium">Doanh thu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign h-4 w-4 text-muted-foreground" data-lov-id="src/pages/AdminOrders.tsx:209:14" data-lov-name="DollarSign" data-component-path="src/pages/AdminOrders.tsx" data-component-line="209" data-component-file="AdminOrders.tsx" data-component-name="DollarSign" data-component-content="%7B%22className%22%3A%22h-4%20w-4%20text-muted-foreground%22%7D"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>          </div>
          <span class="text-[22px] font-bold">{{formatPrice(total_profit)}}</span>
          <span class="text-[14px] text-zinc-500">Tổng doanh thu</span>
        </div>
        <div class=" flex flex-col col-span-1 w-full border border-zinc-300 rounded-lg p-5 bg-white">
          <div class="flex justify-between items-center">
            <span class="text-[14px] font-medium">Chờ xử lý</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar h-4 w-4 text-muted-foreground" data-lov-id="src/pages/AdminOrders.tsx:220:14" data-lov-name="Calendar" data-component-path="src/pages/AdminOrders.tsx" data-component-line="220" data-component-file="AdminOrders.tsx" data-component-name="Calendar" data-component-content="%7B%22className%22%3A%22h-4%20w-4%20text-muted-foreground%22%7D"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>          </div>
          <span class="text-[22px] font-bold text-orange-400">{{total_order_waiting}}</span>
          <span class="text-[14px] text-zinc-500">Đơn chờ xác nhận</span>
        </div>
        <div class=" flex flex-col col-span-1 w-full border border-zinc-300 rounded-lg p-5 bg-white">
          <div class="flex justify-between items-center">
            <span class="text-[14px] font-medium">Hoàn thành</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up h-4 w-4 text-muted-foreground" data-lov-id="src/pages/AdminOrders.tsx:231:14" data-lov-name="TrendingUp" data-component-path="src/pages/AdminOrders.tsx" data-component-line="231" data-component-file="AdminOrders.tsx" data-component-name="TrendingUp" data-component-content="%7B%22className%22%3A%22h-4%20w-4%20text-muted-foreground%22%7D"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>          </div>
          <span class="text-[22px] font-bold text-green-500">{{ total_order_completed }}</span>
          <span class="text-[14px] text-zinc-500">Đơn đã giao</span>
        </div>
      </div>
      <div class="p-5 border border-zinc-300 rounded-lg bg-white mt-5">
        <span class="text-[20px] font-medium">Danh sách đơn hàng</span>
        <p class="text-[14px] text-zinc-500">Quản lý và theo dõi trạng thái các đơn hàng</p>
        <div class="flex justify-between items-center gap-2 mt-2">
          <div class="flex items-center w-5/6  rounded-lg border border-zinc-300 py-1.5 focus-within:ring-blue-200 focus-within:border-blue-300 focus-within:ring-2 transition duration-200">
            <svg viewBox="0 0 32 32" class="ml-3 pointer-events-none " width="18" height="18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#797777"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>search</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-256.000000, -1139.000000)" fill="#828282"> <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
            <input type="text" name="" id="" placeholder="Tìm kiếm theo mã đơn, tên khách hàng, email..." class="w-full pl-3 pr-5 text-[14px] focus:outline-none">
          </div>
          <div class="relative w-1/6">
            <button @click="handleButtonClick" class="flex justify-between items-center border border-zinc-300 rounded-lg focus-within:ring-blue-200 focus-within:border-blue-300 focus-within:ring-2 transition duration-200 px-3 py-1.5 w-full group cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-filter h-4 w-4 mr-2 pointer-events-none" data-lov-id="src/pages/AdminOrders.tsx:259:18" data-lov-name="Filter" data-component-path="src/pages/AdminOrders.tsx" data-component-line="259" data-component-file="AdminOrders.tsx" data-component-name="Filter" data-component-content="%7B%22className%22%3A%22h-4%20w-4%20mr-2%22%7D"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              <span class="text-[14px]">{{ selectedStatus ? statusOptions.find(opt => opt.value === selectedStatus)?.label : 'Tất cả trạng thái' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down h-4 w-4 opacity-50 pointer-events-none" data-lov-id="src/components/ui/select.tsx:27:6" data-lov-name="ChevronDown" data-component-path="src/components/ui/select.tsx" data-component-line="27" data-component-file="select.tsx" data-component-name="ChevronDown" data-component-content="%7B%22className%22%3A%22h-4%20w-4%20opacity-50%22%7D" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
            </button>

            <!-- Custom Dropdown -->
            <div v-if="isDropdownOpen" class="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-300 rounded-lg shadow-lg z-50">
              <div
                v-for="option in statusOptions"
                :key="option.value"
                @click="selectOption(option.value)"
                class="px-3 py-2 text-[14px] hover:bg-gray-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
              >
                {{ option.label }}
              </div>
            </div>

            <!-- Hidden select for form submission -->
            <select ref="selectRef" name="status" class="hidden ">
              <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
         <div class="mt-5">
           <table class="w-full border border-zinc-300 rounded-lg overflow-hidden">
             <thead class="bg-[#384153]">
               <tr>
                 <th class="px-4 py-3 text-left font-medium text-white text-[14px]">Mã đơn hàng</th>
                 <th class="px-4 py-3 text-left font-medium text-white text-[14px]">Khách hàng</th>
                 <th class="px-4 py-3 text-left font-medium text-white text-[14px]">Sản phẩm</th>
                 <th class="px-4 py-3 text-left font-medium text-white text-[14px]">Tổng tiền</th>
                 <th class="px-4 py-3 text-left font-medium text-white text-[14px]">Hình thức</th>
                 <th class="px-3 py-3 text-left font-medium text-white text-[14px]">TT đơn hàng</th>
                 <th class="px-3 py-3 text-left font-medium text-white text-[14px]">TT thanh toán</th>
                 <th class="px-4 py-3 text-left font-medium text-white text-[14px]">Ngày đặt</th>
                 <th class="px-4 py-3 text-left font-medium text-white text-[14px] flex justify-center items-center">Thao tác</th>
               </tr>
             </thead>
             <tbody>
               <tr class="border-t border-zinc-200 hover:bg-gray-50 transition-colors" v-for="order in orders" :key="order.order_id">
                 <td class="px-4 py-3">
                   <span class="font-medium text-zinc-700 text-[14px]">ORD-00{{ order.order_id }}</span>
                 </td>
                 <td class="px-4 py-3">
                   <div class="flex flex-col">
                     <span class="font-medium text-zinc-700 text-[14px]">{{ order.customer.first_name + " " + order.customer.last_name }}</span>
                     <span class="text-zinc-500 text-[12px]">{{order.customer.email}}</span>
                   </div>
                 </td>
                 <td class="px-4 py-3">
                   <div class="flex flex-col">
                     <span class="text-[14px]">{{ order.items.length }} Sản phẩm</span>
                     <span v-if="order.items.length > 1" class="text-zinc-500 text-[12px]">{{order.items[0].product.name}} +{{ order.items.length - 1 }} khác </span>
                     <span v-else class="text-zinc-500 text-[12px]">{{order.items[0].product.name}}</span>
                   </div>
                 </td>
                 <td class="px-4 py-3">
                   <span class="font-medium text-[14px]">{{ formatPrice(order.total_amount) }}</span>
                 </td>
                 <td class="px-4 py-3">
                   <div class="flex items-center justify-center">
                    <span class=" font-medium text-[14px] uppercase">{{ order.payment?.method }}</span>
                   </div>
                 </td>
                 <td class="px-3 py-3">
                   <span :class="orderStatusClass(order.order_status) + ' px-2 py-1 rounded-xl text-xs font-medium'">
                     {{orderStatusVN[order.order_status]}}
                   </span>
                 </td>
                 <td class="px-3 py-3">
                   <span :class="paymentStatusClass(order.payment?.pay_status) + ' px-2 py-1 rounded-xl text-xs font-medium'">
                     {{paymentStatusVN[order.payment?.pay_status]}}
                   </span>
                 </td>
                 <td class="px-4 py-3">
                   <span class="text-[14px]">{{ formatDate(order.created_at) }}</span>
                 </td>
                 <td class="px-2 py-3">
                   <div class="flex items-center justify-center space-x-2">
                    <button @click="openOrderDetail(order)" class="hover:bg-[#3C83F6] hover:text-white p-3 rounded-lg cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye h-4 w-4" data-lov-id="src/pages/AdminOrders.tsx:324:28" data-lov-name="Eye" data-component-path="src/pages/AdminOrders.tsx" data-component-line="324" data-component-file="AdminOrders.tsx" data-component-name="Eye" data-component-content="%7B%22className%22%3A%22h-4%20w-4%22%7D"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                    <button @click="openUpdateStatusPopup(order)" class="hover:bg-[#3C83F6] hover:text-white p-3 rounded-lg cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen h-4 w-4" data-lov-id="src/pages/AdminOrders.tsx:334:28" data-lov-name="Edit" data-component-path="src/pages/AdminOrders.tsx" data-component-line="334" data-component-file="AdminOrders.tsx" data-component-name="Edit" data-component-content="%7B%22className%22%3A%22h-4%20w-4%22%7D"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg>
                    </button>
                   </div>
                 </td>
               </tr>
             </tbody>
           </table>
         </div>

      </div>
    </div>
    </div>
</template>

<style scoped>
/* Close dropdown when clicking outside */
</style>
