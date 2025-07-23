<script setup>
import { getCurrentInstance } from 'vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from '@/plugins/axioscustomer'
import { useAuth } from '@/composables/useAuth'
import router from '@/router'
import AccountCustomer from '@/components/layout/frontend/customer/AccountCustomer.vue'
import ListOrderCustomer from '@/components/layout/frontend/customer/ListOrderCustomer.vue'
import AddressCustomer from '@/components/layout/frontend/customer/AddressCustomer.vue'
import { useProfileStore } from '@/stores/customerprofile'
import { storeToRefs } from 'pinia'
const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)

const { emit } = getCurrentInstance()
onMounted(() => {
  emit('update-product-name', { productName: 'Thông tin tài khoản' })
})

const selectedButton = ref('account')
const selectButton = (buttonType) => {
  selectedButton.value = buttonType
  localStorage.setItem('profile_selected_button', buttonType)
}

const { logout: authLogout } = useAuth()
const name = ref('')
const email = ref('')
const phone = ref('')
const date = ref('')
const address = ref([])

async function fetchAddresses() {
  try {
    const res = await axios.get('/api/customer/me')
    address.value = res.data.customer.address
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  // Đọc trạng thái selectedButton từ localStorage
  const savedButton = localStorage.getItem('profile_selected_button')
  if (savedButton) {
    selectedButton.value = savedButton
  }
  const id = localStorage.getItem('customer_id')
  const token = localStorage.getItem('customer_token')
  if (!id || !token) {
    router.push({ name: 'login-customer' })
    return
  }
  if (!profile.value) {
    await profileStore.fetchProfile()
  }

  // Gán các field hiển thị
  if (profile.value) {
    name.value = `${profile.value.first_name} ${profile.value.last_name}`
    email.value = profile.value.email
    phone.value = profile.value.phone
    date.value = profile.value.created_at
    address.value = profile.value.address || []
  }
})
//   try {
//     const res = await axios.get('/api/customer/me')
//     name.value = (res.data.customer.first_name + " " + res.data.customer.last_name)
//     email.value = res.data.customer.email
//     phone.value = res.data.customer.phone
//     date.value = res.data.customer.created_at
//     address.value = res.data.customer.address
//     console.log(address.value);
//   } catch (err) {
//     console.error(err)
//   }
// })

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
          <AccountCustomer :name="name" :email="email" :date="date" />
        </div>

        <!-- Orders -->
        <div v-if="selectedButton === 'orders'">
          <h2 class="text-2xl font-semibold text-gray-800 mb-5">Đơn hàng của bạn</h2>
          <div>
            <ListOrderCustomer />
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
          <AddressCustomer :address="address" :phone="phone" @address-updated="fetchAddresses" />
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
