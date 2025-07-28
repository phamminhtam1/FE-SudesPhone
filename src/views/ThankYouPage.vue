<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosCustomer from '@/plugins/axioscustomer'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const order = ref(null)
const paymentStatus = ref('')
const isLoading = ref(true)

onMounted(async () => {
  try {
    const orderId = route.query.orderId
    const resultCode = route.query.resultCode

    if (!orderId) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Không tìm thấy thông tin đơn hàng',
        confirmButtonText: 'Về trang chủ',
      }).then(() => {
        router.push({ name: 'home' })
      })
      return
    }

    // Gọi API để lấy thông tin đơn hàng
    const response = await axiosCustomer.get('/api/customer/checkout/thank-you', {
      params: { orderId, resultCode }
    })

    if (response.data.success) {
      order.value = response.data.data.order
      paymentStatus.value = response.data.data.payment_status

      if (paymentStatus.value === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Thanh toán thành công!',
          text: 'Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất.',
          confirmButtonText: 'Đóng',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Thanh toán thất bại',
          text: 'Đơn hàng của bạn đã được tạo nhưng thanh toán không thành công. Vui lòng thử lại.',
          confirmButtonText: 'Đóng',
        })
      }
    } else {
      throw new Error(response.data.message || 'Không thể lấy thông tin đơn hàng')
    }

  } catch (error) {
    console.error('Error fetching order:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: 'Không thể lấy thông tin đơn hàng',
      confirmButtonText: 'Về trang chủ',
    }).then(() => {
      router.push({ name: 'home' })
    })
  } finally {
    isLoading.value = false
  }
})

const formatPrice = (number) => {
  return number.toLocaleString('vi-VN') + '₫'
}

const getStatusText = (status) => {
  switch (status) {
    case 'success':
      return 'Thành công'
    case 'failed':
      return 'Thất bại'
    case 'pending':
      return 'Đang xử lý'
    default:
      return 'Không xác định'
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'success':
      return 'text-green-600'
    case 'failed':
      return 'text-red-600'
    case 'pending':
      return 'text-yellow-600'
    default:
      return 'text-gray-600'
  }
}

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCAzMEg3MFY3MEgzMFYzMFoiIGZpbGw9IiNEM0Q0RDYiLz4KPHBhdGggZD0iTTM1IDM1SDY1VjY1SDM1VjM1WiIgZmlsbD0iI0E5Q0JCRCIvLz4KPC9zdmc+'

  // Nếu là URL đầy đủ
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // Nếu là đường dẫn tương đối, thêm base URL
  if (imagePath.startsWith('/')) {
    return import.meta.env.VITE_API_URL + imagePath
  }

  // Nếu không có / ở đầu, thêm /
  return import.meta.env.VITE_API_URL + '/' + imagePath
}

const handleImageError = (event) => {
  // Fallback image khi ảnh lỗi - sử dụng base64 SVG đơn giản
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCAzMEg3MFY3MEgzMFYzMFoiIGZpbGw9IiNEM0Q0RDYiLz4KPHBhdGggZD0iTTM1IDM1SDY1VjY1SDM1VjM1WiIgZmlsbD0iI0E5Q0JCRCIvLz4KPC9zdmc+'
  event.target.onerror = null // Tránh loop vô hạn
}

const getProductSpec = (specs, key) => {
  if (!specs || !Array.isArray(specs)) return null
  const spec = specs.find(s => s.spec_key === key)
  return spec ? spec.spec_value : null
}

const getPaymentMethodText = (method) => {
  switch (method) {
    case 'cod':
      return 'Thanh toán khi nhận hàng (COD)'
    case 'momo':
      return 'Thanh toán qua MoMo'
    case 'bank':
      return 'Thanh toán qua VNPAY'
    default:
      return 'Không xác định'
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <div v-if="isLoading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Đang xử lý...</p>
    </div>

    <div v-else-if="order" class="bg-white rounded-lg shadow-lg p-6">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg v-if="paymentStatus === 'success'" class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          {{ paymentStatus === 'success' ? 'Cảm ơn bạn đã mua hàng!' : 'Thanh toán không thành công' }}
        </h1>
        <p class="text-gray-600">
          {{ paymentStatus === 'success' ? 'Đơn hàng của bạn đã được xác nhận và đang được xử lý.' : 'Đơn hàng đã được tạo nhưng thanh toán không thành công.' }}
        </p>
      </div>

      <!-- Order Details -->
      <div class="border-t border-gray-200 pt-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Thông tin đơn hàng</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-medium text-gray-900 mb-2">Mã đơn hàng</h3>
            <p class="text-gray-600">#{{ order.order_id }}</p>
          </div>

          <div>
            <h3 class="font-medium text-gray-900 mb-2">Trạng thái thanh toán</h3>
            <p :class="['font-medium', getStatusColor(paymentStatus)]">
              {{ getStatusText(paymentStatus) }}
            </p>
          </div>

          <div>
            <h3 class="font-medium text-gray-900 mb-2">Phương thức thanh toán</h3>
            <p class="text-gray-600">{{ getPaymentMethodText(order.payment?.method || order.method_payment) }}</p>
            <p v-if="order.payment?.transaction_id" class="text-xs text-gray-500">Mã GD: {{ order.payment.transaction_id }}</p>
          </div>

          <div>
            <h3 class="font-medium text-gray-900 mb-2">Người nhận</h3>
            <p class="text-gray-600">{{ order.name }}</p>
            <p class="text-gray-600">{{ order.phone }}</p>
          </div>

          <div>
            <h3 class="font-medium text-gray-900 mb-2">Địa chỉ giao hàng</h3>
            <p class="text-gray-600">{{ order.address_customer }}</p>
          </div>
        </div>

        <!-- Order Items -->
        <div class="mt-6">
          <h3 class="font-medium text-gray-900 mb-3">Sản phẩm đã đặt</h3>
          <div class="space-y-3">
            <div v-for="item in order.items" :key="item.order_item_id" class="flex items-center justify-between py-2 border-b border-gray-100">
              <div class="flex items-center space-x-3">
                <img
                  :src="getImageUrl(item.product.images[0]?.img_url)"
                  :alt="item.product.name"
                  class="w-12 h-12 object-cover rounded border border-gray-200"
                  @error="handleImageError"
                >
                <div>
                  <p class="font-medium text-gray-900">{{ item.product.name }}</p>
                  <p class="text-sm text-gray-600">Số lượng: {{ item.qty }}</p>
                  <p class="text-xs text-gray-500">{{ getProductSpec(item.product.specs, 'Màu sắc') || 'Chính hãng VN' }}</p>
                </div>
              </div>
              <p class="font-medium text-gray-900">{{ formatPrice(item.unit_price * item.qty) }}</p>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="mt-6 border-t border-gray-200 pt-6">
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Tạm tính:</span>
              <span class="font-medium">{{ formatPrice(order.sub_total) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Phí vận chuyển:</span>
              <span class="font-medium">{{ formatPrice(order.shipping_fee) }}</span>
            </div>
            <div v-if="order.discount > 0" class="flex justify-between">
              <span class="text-gray-600">Giảm giá:</span>
              <span class="font-medium text-green-600">-{{ formatPrice(order.discount) }}</span>
            </div>
            <div class="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
              <span>Tổng cộng:</span>
              <span class="text-blue-600">{{ formatPrice(order.total_amount) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          @click="router.push({ name: 'home' })"
          class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Tiếp tục mua sắm
        </button>

        <button
          @click="router.push({ name: 'profile' })"
          class="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Xem đơn hàng của tôi
        </button>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-600">Không tìm thấy thông tin đơn hàng</p>
      <button
        @click="router.push({ name: 'home' })"
        class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Về trang chủ
      </button>
    </div>
  </div>
</template>
