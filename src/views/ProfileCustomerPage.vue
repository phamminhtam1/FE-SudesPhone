<script setup>
import { getCurrentInstance } from 'vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useAuth } from '@/composables/useAuth'

const { emit } = getCurrentInstance()
onMounted(() => {
  emit('update-product-name', { productName: 'Thông tin tài khoản' })
})

const selectedButton = ref('account')
const selectButton = (buttonType) => {
  selectedButton.value = buttonType
}

const { logout: authLogout } = useAuth()
const name = ref('')
const email = ref('')
const date = ref('')

onMounted(async () => {
  const id = localStorage.getItem('customer_id')
  const token = localStorage.getItem('customer_token')
  if (!id || !token) {
    router.push({ name: 'login-customer' })
    return
  }
  try {
    const res = await axios.get(`/api/customer/${id}`)
    name.value = (res.data.customer.first_name + " " + res.data.customer.last_name)
    email.value = res.data.customer.email
    date.value = res.data.customer.created_at
  } catch (err) {
    console.error(err)
  }
})

async function logout() {
  try {
    authLogout()
    router.push({ name: 'login-customer' })
  }
  catch (err) {
    console.error(err)
  }
}

</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex gap-5 w-full mt-10 mb-10">
      <!-- Sidebar -->
      <div class="p-5 w-1/4 border border-zinc-100 rounded-lg shadow-lg">
        <div>
          <h1 class="text-2xl uppercase font-medium mb-2">Sudes Phone</h1>
          <div class="flex gap-1 mb-2">
            <h2 class="text-zinc-500">Xin chào,</h2>
            <p class="text-red-500 font-medium">{{ name }}</p>
          </div>
          <div class="flex flex-col gap-3 mt-5">
            <button @click="selectButton('account')"
              class="flex gap-2 rounded-lg p-3 transition-all duration-200 cursor-pointer" :class="selectedButton === 'account'
                ? 'bg-[#FEF2F2] border-l-5 border-l-red-500'
                : 'hover:bg-gray-100'">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-user w-5 h-5"
                :class="selectedButton === 'account' ? 'text-[#DC2626]' : 'text-black'">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <p class="font-medium" :class="selectedButton === 'account' ? 'text-[#DC2626]' : 'text-black'">Thông tin
                tài khoản</p>
            </button>
            <button @click="selectButton('orders')"
              class="flex items-center gap-2 rounded-lg p-3 transition-all duration-200 cursor-pointer" :class="selectedButton === 'orders'
                ? 'bg-[#FEF2F2] border-l-5 border-l-red-500'
                : 'hover:bg-gray-100'">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-package w-5 h-5"
                :class="selectedButton === 'orders' ? 'text-[#DC2626]' : 'text-black'">
                <path
                  d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z">
                </path>
                <path d="M12 22V12"></path>
                <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path>
                <path d="m7.5 4.27 9 5.15"></path>
              </svg>
              <p class="font-medium" :class="selectedButton === 'orders' ? 'text-[#DC2626]' : 'text-black'">Đơn hàng của
                bạn</p>
            </button>
            <button @click="selectButton('favorites')"
              class="flex items-center gap-2 rounded-lg p-3 transition-all duration-200 cursor-pointer" :class="selectedButton === 'favorites'
                ? 'bg-[#FEF2F2] border-l-5 border-l-red-500'
                : 'hover:bg-gray-100'">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-heart w-5 h-5"
                :class="selectedButton === 'favorites' ? 'text-[#DC2626]' : 'text-black'">
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
                </path>
              </svg>
              <p class="font-medium" :class="selectedButton === 'favorites' ? 'text-[#DC2626]' : 'text-black'">Danh sách
                yêu thích</p>
            </button>
            <button @click="selectButton('password')"
              class="flex items-center gap-2 rounded-lg p-3 transition-all duration-200 cursor-pointer" :class="selectedButton === 'password'
                ? 'bg-[#FEF2F2] border-l-5 border-l-red-500'
                : 'hover:bg-gray-100'">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-file-text w-5 h-5"
                :class="selectedButton === 'password' ? 'text-[#DC2626]' : 'text-black'">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
              <p class="font-medium" :class="selectedButton === 'password' ? 'text-[#DC2626]' : 'text-black'">Đổi mật
                khẩu</p>
            </button>
            <button @click="selectButton('address')"
              class="flex items-center gap-2 rounded-lg p-3 transition-all duration-200 cursor-pointer" :class="selectedButton === 'address'
                ? 'bg-[#FEF2F2] border-l-5 border-l-red-500'
                : 'hover:bg-gray-100'">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-map-pin w-5 h-5"
                :class="selectedButton === 'address' ? 'text-[#DC2626]' : 'text-black'">
                <path
                  d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0">
                </path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <p class="font-medium" :class="selectedButton === 'address' ? 'text-[#DC2626]' : 'text-black'">Sổ địa chỉ
              </p>
            </button>
            <button @click="selectButton('logout')"
              class="flex items-center gap-2 rounded-lg p-3 transition-all duration-200 cursor-pointer" :class="selectedButton === 'logout'
                ? 'bg-[#FEF2F2] border-l-5 border-l-red-500'
                : 'hover:bg-gray-100'">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-log-out w-5 h-5"
                :class="selectedButton === 'logout' ? 'text-[#DC2626]' : 'text-black'">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
              <p class="font-medium" :class="selectedButton === 'logout' ? 'text-[#DC2626]' : 'text-black'">Đăng xuất
              </p>
            </button>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 p-5 border border-zinc-100 rounded-lg shadow-lg">
        <!-- Account Information -->
        <div v-if="selectedButton === 'account'" class="space-y-6">
          <h2 class="text-2xl uppercase font-semibold text-gray-800">Thông tin tài khoản</h2>
          <p class="border-b-4 w-20 border-red-500 rounded-2xl -mt-5"></p>
          <div class="grid grid-cols-2 gap-6">
            <div class="p-4 border border-red-100 bg-gradient-to-r from-[#FEF2F2] to-[#FEF6ED] rounded-lg">
              <div class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-user w-6 h-6 text-red-600" data-lov-id="src/components/AccountInfo.tsx:18:14"
                  data-lov-name="User" data-component-path="src/components/AccountInfo.tsx" data-component-line="18"
                  data-component-file="AccountInfo.tsx" data-component-name="User"
                  data-component-content="%7B%22className%22%3A%22w-6%20h-6%20text-red-600%22%7D">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span class="font-medium text-[16px]">
                  Thông tin cá nhân
                </span>
              </div>
              <div class="flex justify-between mt-5 border-b-red-100 border-b pb-2">
                <p>Họ tên:</p>
                <span class="font-medium">{{ name }}</span>
              </div>
              <div class="flex justify-between mt-5 border-b-red-100 border-b pb-2">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-mail w-4 h-4 mr-2" data-lov-id="src/components/AccountInfo.tsx:30:18"
                    data-lov-name="Mail" data-component-path="src/components/AccountInfo.tsx" data-component-line="30"
                    data-component-file="AccountInfo.tsx" data-component-name="Mail"
                    data-component-content="%7B%22className%22%3A%22w-4%20h-4%20mr-2%22%7D"
                    bis_size="{&quot;x&quot;:475,&quot;y&quot;:487,&quot;w&quot;:16,&quot;h&quot;:16,&quot;abs_x&quot;:865,&quot;abs_y&quot;:536}">
                    <rect width="20" height="16" x="2" y="4" rx="2"
                      bis_size="{&quot;x&quot;:476,&quot;y&quot;:489,&quot;w&quot;:13,&quot;h&quot;:10,&quot;abs_x&quot;:866,&quot;abs_y&quot;:538}">
                    </rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                      bis_size="{&quot;x&quot;:476,&quot;y&quot;:491,&quot;w&quot;:13,&quot;h&quot;:3,&quot;abs_x&quot;:866,&quot;abs_y&quot;:540}">
                    </path>
                  </svg>
                  <p>Email:</p>
                </div>
                <span class="font-medium">{{ email }}</span>
              </div>
              <div class="flex justify-between mt-5 border-b-red-100 border-b pb-2">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-calendar w-4 h-4 mr-2" data-lov-id="src/components/AccountInfo.tsx:38:18"
                    data-lov-name="Calendar" data-component-path="src/components/AccountInfo.tsx"
                    data-component-line="38" data-component-file="AccountInfo.tsx" data-component-name="Calendar"
                    data-component-content="%7B%22className%22%3A%22w-4%20h-4%20mr-2%22%7D"
                    bis_size="{&quot;x&quot;:475,&quot;y&quot;:552,&quot;w&quot;:16,&quot;h&quot;:16,&quot;abs_x&quot;:865,&quot;abs_y&quot;:601}">
                    <path d="M8 2v4"
                      bis_size="{&quot;x&quot;:480,&quot;y&quot;:553,&quot;w&quot;:0,&quot;h&quot;:2,&quot;abs_x&quot;:870,&quot;abs_y&quot;:602}">
                    </path>
                    <path d="M16 2v4"
                      bis_size="{&quot;x&quot;:486,&quot;y&quot;:553,&quot;w&quot;:0,&quot;h&quot;:2,&quot;abs_x&quot;:876,&quot;abs_y&quot;:602}">
                    </path>
                    <rect width="18" height="18" x="3" y="4" rx="2"
                      bis_size="{&quot;x&quot;:477,&quot;y&quot;:554,&quot;w&quot;:12,&quot;h&quot;:12,&quot;abs_x&quot;:867,&quot;abs_y&quot;:603}">
                    </rect>
                    <path d="M3 10h18"
                      bis_size="{&quot;x&quot;:477,&quot;y&quot;:558,&quot;w&quot;:12,&quot;h&quot;:0,&quot;abs_x&quot;:867,&quot;abs_y&quot;:607}">
                    </path>
                  </svg>
                  <p>Ngày tham gia:</p>
                </div>
                <span class="font-medium">{{ new Date(date).toLocaleString('vi-VN', {
                  hour12: false
                }) }}</span>
              </div>
            </div>
            <div class="p-4 border border-blue-200 bg-gradient-to-r from-[#EFF5FF] to-[#EEF3FF] rounded-lg">
              <div class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-map-pin w-6 h-6 text-blue-600" data-lov-id="src/components/AccountInfo.tsx:51:14"
                  data-lov-name="MapPin" data-component-path="src/components/AccountInfo.tsx" data-component-line="51"
                  data-component-file="AccountInfo.tsx" data-component-name="MapPin"
                  data-component-content="%7B%22className%22%3A%22w-6%20h-6%20text-blue-600%22%7D"
                  bis_size="{&quot;x&quot;:968,&quot;y&quot;:364,&quot;w&quot;:24,&quot;h&quot;:24,&quot;abs_x&quot;:1358,&quot;abs_y&quot;:413}">
                  <path
                    d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                    bis_size="{&quot;x&quot;:972,&quot;y&quot;:366,&quot;w&quot;:16,&quot;h&quot;:19,&quot;abs_x&quot;:1362,&quot;abs_y&quot;:415}">
                  </path>
                  <circle cx="12" cy="10" r="3"
                    bis_size="{&quot;x&quot;:977,&quot;y&quot;:371,&quot;w&quot;:6,&quot;h&quot;:6,&quot;abs_x&quot;:1367,&quot;abs_y&quot;:420}">
                  </circle>
                </svg>
                <span class="font-medium text-[16px]">
                  Thống kê tài khoản
                </span>
              </div>
              <div class="grid grid-cols-2 gap-2 mt-3">
                <div class="bg-white flex items-center justify-center p-3 rounded-lg">
                  <span class="text-center text-2xl font-bold text-red-500">12<p
                      class="text-center text-[14px] font-normal text-zinc-600">
                      Đơn hàng
                    </p>
                  </span>
                </div>
                <div class="bg-white flex items-center justify-center p-3 rounded-lg">
                  <span class="text-center text-2xl font-bold text-[#EA580C]">4<p
                      class="text-center text-[14px] font-normal text-zinc-600">
                      Yêu thích
                    </p>
                  </span>
                </div>
                <div class="bg-white flex items-center justify-center p-3 rounded-lg">
                  <span class="text-center text-2xl font-bold text-[#16A34A]">3<p
                      class="text-center text-[14px] font-normal text-zinc-600">
                      So sánh
                    </p>
                  </span>
                </div>
                <div class="bg-white flex items-center justify-center p-3 rounded-lg">
                  <span class="text-center text-2xl font-bold text-[#9333EA]">0<p
                      class="text-center text-[14px] font-normal text-zinc-600">
                      Địa chỉ
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer">
              Cập nhật thông tin
            </button>
          </div>
        </div>

        <!-- Orders -->
        <div v-if="selectedButton === 'orders'" class="space-y-6">
          <h2 class="text-2xl font-semibold text-gray-800">Đơn hàng của bạn</h2>
          <div class="space-y-4">
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-center mb-3">
                <div>
                  <p class="font-medium">Đơn hàng #DH001</p>
                  <p class="text-sm text-gray-500">Đặt ngày: 15/12/2024</p>
                </div>
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Đã giao</span>
              </div>
              <div class="flex items-center gap-3">
                <img src="/src/assets/logo.svg" alt="Product" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                  <p class="font-medium">iPhone 15 Pro Max</p>
                  <p class="text-sm text-gray-500">Số lượng: 1</p>
                  <p class="text-red-500 font-medium">35.990.000đ</p>
                </div>
              </div>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-center mb-3">
                <div>
                  <p class="font-medium">Đơn hàng #DH002</p>
                  <p class="text-sm text-gray-500">Đặt ngày: 10/12/2024</p>
                </div>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Đang giao</span>
              </div>
              <div class="flex items-center gap-3">
                <img src="/src/assets/logo.svg" alt="Product" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                  <p class="font-medium">AirPods Pro</p>
                  <p class="text-sm text-gray-500">Số lượng: 1</p>
                  <p class="text-red-500 font-medium">7.990.000đ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Favorites -->
        <div v-if="selectedButton === 'favorites'" class="space-y-6">
          <h2 class="text-2xl font-semibold text-gray-800">Danh sách yêu thích</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="border border-gray-200 rounded-lg p-4">
              <img src="/src/assets/logo.svg" alt="Product" class="w-full h-32 object-cover rounded mb-3">
              <h3 class="font-medium mb-2">iPhone 15 Pro Max</h3>
              <p class="text-red-500 font-medium mb-3">35.990.000đ</p>
              <button class="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Thêm vào giỏ
              </button>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
              <img src="/src/assets/logo.svg" alt="Product" class="w-full h-32 object-cover rounded mb-3">
              <h3 class="font-medium mb-2">MacBook Pro M3</h3>
              <p class="text-red-500 font-medium mb-3">45.990.000đ</p>
              <button class="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Thêm vào giỏ
              </button>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
              <img src="/src/assets/logo.svg" alt="Product" class="w-full h-32 object-cover rounded mb-3">
              <h3 class="font-medium mb-2">iPad Air</h3>
              <p class="text-red-500 font-medium mb-3">18.990.000đ</p>
              <button class="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>

        <!-- Change Password -->
        <div v-if="selectedButton === 'password'" class="space-y-6">
          <h2 class="text-2xl font-semibold text-gray-800">Đổi mật khẩu</h2>
          <div class="max-w-md space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu hiện tại</label>
              <input type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
              <input type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu mới</label>
              <input type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
            </div>
            <button class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Đổi mật khẩu
            </button>
          </div>
        </div>

        <!-- Address Book -->
        <div v-if="selectedButton === 'address'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-gray-800">Sổ địa chỉ</h2>
            <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Thêm địa chỉ mới
            </button>
          </div>
          <div class="space-y-4">
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <p class="font-medium">Nhà riêng</p>
                  <p class="text-sm text-gray-600">123 Đường ABC, Quận 1, TP.HCM</p>
                  <p class="text-sm text-gray-600">SĐT: 0123456789</p>
                </div>
                <div class="flex gap-2">
                  <button class="text-blue-500 hover:text-blue-700">Sửa</button>
                  <button class="text-red-500 hover:text-red-700">Xóa</button>
                </div>
              </div>
              <span class="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Địa chỉ mặc
                định</span>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <p class="font-medium">Công ty</p>
                  <p class="text-sm text-gray-600">456 Đường XYZ, Quận 3, TP.HCM</p>
                  <p class="text-sm text-gray-600">SĐT: 0987654321</p>
                </div>
                <div class="flex gap-2">
                  <button class="text-blue-500 hover:text-blue-700">Sửa</button>
                  <button class="text-red-500 hover:text-red-700">Xóa</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Logout -->
        <div v-if="selectedButton === 'logout'" class="space-y-6">
          <h2 class="text-2xl font-semibold text-gray-800">Đăng xuất</h2>
          <div class="max-w-md">
            <p class="text-gray-600 mb-4">Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?</p>
            <button @click.prevent="logout"
              class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
