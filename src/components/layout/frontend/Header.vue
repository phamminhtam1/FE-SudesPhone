<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

// Define component name to fix linter error
defineOptions({
  name: 'FrontendHeader'
})

const { isAuthenticated, logout } = useAuth()
const router = useRouter()

const category_tree = ref([])
const categorys = ref([])
const isMobileMenuOpen = ref(false)
const isAccountDropdownOpen = ref(false)

const handleLogout = () => {
  logout()
  router.push({ name: 'home' })
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (!isMobileMenuOpen.value) {
    isAccountDropdownOpen.value = false
  }
}

const toggleAccountDropdown = () => {
  isAccountDropdownOpen.value = !isAccountDropdownOpen.value
}
onMounted(async () => {
  try {
    const res_tree = await axios.get('/api/category/tree')
    const res_cate = await axios.get('/api/category')
    category_tree.value = res_tree.data.category
    categorys.value = res_cate.data.category
  } catch (err) {
    console.error(err)
  }
})

</script>

<template>
  <header class="header">
    <div class="main-header">
      <div class="bg-gradient-to-b from-zinc-900 to-zinc-800 text-white">
        <div class="max-w-7xl mx-auto gap-8  flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="text-2xl font-bold">
            <router-link :to="{ name: 'home' }">
              <img width="200" height="26"
                src="//bizweb.dktcdn.net/100/480/632/themes/900313/assets/logo.png?1746173377751"
                class="w-[280px] h-6 md:h-8">
            </router-link>
          </div>

          <!-- Search Bar - Hidden on mobile -->
          <div class="hidden md:block ml-2 mr-1 flex-1 max-w-xl">
            <form action="seach" method="get" class="flex w-100">
              <input type="text"
                class="flex-1 px-2 py-1.5 bg-white border border-gray-300 border-r-0 rounded-l-md placeholder-gray-500 text-gray-800 outline-none focus:outline-none"
                placeholder="Tìm sản phẩm...">
              <button type="submit"
                class="px-4 py-1.5 bg-white border border-gray-300 border-l-0 rounded-r-md outline-none focus:outline-none"><i
                  class="fas fa-search text-gray-600"></i></button>
            </form>
          </div>

          <!-- Right Section -->
          <div class="flex items-center text-white">
            <!-- Mobile Menu Button -->
            <button @click="toggleMobileMenu" class="md:hidden p-2">
              <i class="fas fa-bars text-xl"></i>
            </button>

            <!-- Desktop Menu Items -->
            <div class="hidden md:flex items-center">
              <!-- Store System -->
              <div class="flex bg-zinc-700 text-white px-2 py-1 rounded-md">
                <a href="/he-thong-cua-hang" class="flex bg-zinc-700 text-white rounded-md cursor-pointer">
                  <i class="fas fa-map-marker-alt text-xl mt-2 mr-3"></i>
                  <div class="flex flex-col leading-tight">
                    <span class="text-xs">Hệ thống cửa hàng</span>
                    <span class="text-sm font-semibold">7 cửa hàng</span>
                  </div>
                </a>
              </div>

              <!-- Call to Order -->
              <div class="flex px-2 py-1 text-white">
                <a href="tel:19006750" class="flex px-2 py-1 text-white cursor-pointer">
                  <i class="fas fa-phone text-xl mt-2 mr-2"></i>
                  <div class="flex flex-col leading-tight">
                    <span class="text-xs">Gọi mua hàng</span>
                    <span class="text-sm font-semibold">1900 6750</span>
                  </div>
                </a>
              </div>

              <!-- Account Info -->
              <div class="relative group cursor-pointer">
                <div class="flex items-center text-white">
                  <i class="fas fa-user mr-2 text-xl"></i>
                  <div class="flex flex-col">
                    <span class="text-xs">Thông tin</span>
                    <span class="text-sm font-semibold flex items-center">
                      Tài khoản
                      <svg class="-mr-1 size-5 text-gray-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor"
                        aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                          clip-rule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="absolute top-full left-0 h-4 w-full bg-transparent z-40"></div>
                <div
                  class="absolute top-full left-0 mt-3 w-64 bg-white text-black shadow-lg rounded-md p-2 z-50 hidden group-hover:block">
                  <div v-if="isAuthenticated">
                    <router-link :to="{ name: 'profile-customer' }">
                      <div class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                        <i class="fas fa-user w-5 text-gray-600"></i>
                        <span>Tài khoản</span>
                      </div>
                    </router-link>
                    <div @click="handleLogout"
                      class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                      <i class="fa fa-sign-out w-5 text-gray-600"></i>
                      <span>Đăng xuất</span>
                    </div>
                  </div>
                  <div v-else>
                    <router-link :to="{ name: 'login-customer' }">
                      <div class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                        <i class="fas fa-sign-in-alt w-5 text-gray-600"></i>
                        <span>Đăng nhập</span>
                      </div>
                    </router-link>
                    <router-link :to="{ name: 'register-customer' }">
                      <div class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                        <i class="fas fa-user-plus w-5 text-gray-600"></i>
                        <span>Đăng ký</span>
                      </div>
                    </router-link>
                  </div>
                  <div class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                    <i class="far fa-heart w-5 text-gray-600"></i>
                    <span>Danh sách yêu thích (0)</span>
                  </div>
                  <div class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                    <i class="fas fa-random w-5 text-gray-600"></i>
                    <span>So sánh sản phẩm (0)</span>
                  </div>
                </div>
              </div>

              <!-- Cart -->
              <div class="relative flex items-center px-2 py-1 text-white">
                <a href="/gio-hang" class="relative flex items-center px-2 py-1 text-white cursor-pointer">
                  <router-link :to="{ name: 'my-cart' }" class="fas fa-shopping-cart text-xl"></router-link>
                  <div>
                    <router-link :to="{ name: 'my-cart' }">
                      <span class="text-sm ml-2">Giỏ hàng</span>
                    </router-link>
                    <span
                      class="absolute -top-1 left-4 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center ml-2">1</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMobileMenuOpen" class="md:hidden bg-zinc-800 text-white transition-all duration-300 ease-in-out"
      :class="{ 'max-h-screen py-2': isMobileMenuOpen, 'max-h-0 py-0': !isMobileMenuOpen, 'overflow-hidden': true }">
      <div class="px-4 py-2">
        <form action="seach" method="get" class="flex w-full mb-4">
          <input type="text"
            class="flex-1 px-2 py-2 bg-white border border-gray-300 border-r-0 rounded-l-md placeholder-gray-500 text-gray-800 outline-none focus:outline-none"
            placeholder="Tìm sản phẩm...">
          <button type="submit"
            class="px-4 py-2 bg-white border border-gray-300 border-l-0 rounded-r-md outline-none focus:outline-none"><i
              class="fas fa-search text-gray-600"></i></button>
        </form>
        <div class="space-y-2">
          <a href="/he-thong-cua-hang" class="flex items-center py-2 px-3 hover:bg-zinc-700 rounded-md">
            <i class="fas fa-map-marker-alt text-lg mr-3"></i>
            <span>Hệ thống cửa hàng</span>
          </a>
          <a href="tel:19006750" class="flex items-center py-2 px-3 hover:bg-zinc-700 rounded-md">
            <i class="fas fa-phone text-lg mr-3"></i>
            <span>Gọi mua hàng: 1900 6750</span>
          </a>
          <div class="relative">
            <div @click="toggleAccountDropdown"
              class="flex items-center justify-between py-2 px-3 hover:bg-zinc-700 rounded-md cursor-pointer">
              <div class="flex items-center">
                <i class="fas fa-user text-lg mr-3"></i>
                <span>Thông tin / Tài khoản</span>
              </div>
              <svg class="size-5 text-gray-400 transform transition-transform duration-200"
                :class="{ 'rotate-180': isAccountDropdownOpen }" viewBox="0 0 20 20" fill="currentColor"
                aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <div v-show="isAccountDropdownOpen"
              class="pl-8 pt-2 space-y-1 transition-all duration-300 ease-in-out transform origin-top"
              :class="{ 'max-h-screen opacity-100 scale-y-100': isAccountDropdownOpen, 'max-h-0 opacity-0 scale-y-0 overflow-hidden': !isAccountDropdownOpen }">
              <div v-if="isAuthenticated">
                <router-link :to="{ name: 'profile-customer' }"
                  class="flex items-center py-2 px-3 hover:bg-zinc-700 rounded-md">
                  <i class="fas fa-user w-5 text-gray-300 mr-2"></i>
                  <span>Tài khoản</span>
                </router-link>
                <div @click="handleLogout"
                  class="flex items-center py-2 px-3 hover:bg-zinc-700 rounded-md cursor-pointer">
                  <i class="fa fa-sign-out w-5 text-gray-300 mr-2"></i>
                  <span>Đăng xuất</span>
                </div>
              </div>
              <div v-else>
                <router-link :to="{ name: 'login-customer' }"
                  class="flex items-center py-2 px-3 hover:bg-zinc-700 rounded-md">
                  <i class="fas fa-sign-in-alt w-5 text-gray-300 mr-2"></i>
                  <span>Đăng nhập</span>
                </router-link>
                <router-link :to="{ name: 'register-customer' }"
                  class="flex items-center py-2 px-3 hover:bg-zinc-700 rounded-md">
                  <i class="fas fa-user-plus w-5 text-gray-300 mr-2"></i>
                  <span>Đăng ký</span>
                </router-link>
              </div>
              <a href="#" class="flex items-center py-2 px-3 hover:bg-zinc-700 rounded-md">
                <i class="far fa-heart w-5 text-gray-300 mr-2"></i>
                <span>Danh sách yêu thích</span>
              </a>
              <a href="#" class="flex items-center py-2 px-3 hover:bg-zinc-700 rounded-md">
                <i class="fas fa-random w-5 text-gray-300 mr-2"></i>
                <span>So sánh sản phẩm</span>
              </a>
            </div>
          </div>
          <a href="/gio-hang" class="flex items-center py-2 px-3 hover:bg-zinc-700 rounded-md">
            <i class="fas fa-shopping-cart text-lg mr-3"></i>
            <span>Giỏ hàng</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <div class="header-menu">
      <div class="bg-gradient-to-b from-zinc-800 to-zinc-700 border-t-[0.1px] border-t-zinc-600 text-white">
        <div class="max-w-7xl mx-auto px-4">
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center justify-between h-10">
            <a href="#" class="relative group px-2 py-1 text-white">
              Trang chủ
              <span
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[0px] h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-[40px]"></span>
            </a>
            <a href="#" class="relative group px-2 py-1 text-white">
              Giới thiệu
              <span
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[0px] h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-[40px]"></span>
            </a>
            <div class="relative group " v-for="cate in category_tree" :key="cate.id">
              <router-link :to="{ name: 'fe-category', params: { id: cate.id, categoryName: cate.name } }"
                class="relative group flex items-center px-2 py-1 text-white">
                {{ cate.name }}
                <svg class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.72-3.73a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" />
                </svg>
                <span
                  class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[0px] h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-[40px]"></span>
              </router-link>
              <div class="absolute left-1/2 -translate-x-1/2 top-full h-4 w-full z-40"></div>
              <div v-if="cate.children && cate.children.length"
                class="fixed left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible grid grid-cols-4 gap-4 bg-white text-black shadow-xl rounded-lg px-4 py-3 mt-1 min-w-6xl transition-all duration-300 ease-in-out transform scale-95 group-hover:scale-100">
                <div v-for="cate_children in cate.children" :key="cate_children.id" class="">
                  <div class="font-semibold text-sm mb-2 uppercase text-gray-900">
                    <router-link :to="{ name: 'fe-category', params: { id: cate_children.id } }">
                      {{ cate_children.name }}
                    </router-link>
                  </div>
                  <div class=" mt-4 flex flex-col gap-2">
                    <a v-for="sub_child in cate_children.children" :key="sub_child.id" href="#"
                      class="block text-sm text-gray-700 hover:text-blue-600">
                      <router-link :to="{ name: 'fe-category', params: { id: sub_child.id } }">
                        {{ sub_child.name }}
                      </router-link>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <a href="#" class="relative group px-2 py-1 text-white">
              Chính sách
              <span
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[0px] h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-[40px]"></span>
            </a>
            <a href="#" class="relative group px-2 py-1 text-white">
              Tin tức
              <span
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[0px] h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-[40px]"></span>
            </a>
            <a href="#" class="relative group px-2 py-1 text-white">
              Liên hệ
              <span
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[0px] h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-[40px]"></span>
            </a>
          </div>

          <!-- Mobile Navigation -->
          <div class="md:hidden overflow-x-auto">
            <div class="flex space-x-4 py-2">
              <a href="#" class="whitespace-nowrap px-2 py-1">Trang chủ</a>
              <a href="#" class="whitespace-nowrap px-2 py-1">Giới thiệu</a>
              <a href="#" class="whitespace-nowrap px-2 py-1">iPhone</a>
              <a href="#" class="whitespace-nowrap px-2 py-1">iPad</a>
              <a href="#" class="whitespace-nowrap px-2 py-1">Macbook</a>
              <a href="#" class="whitespace-nowrap px-2 py-1">Apple watch</a>
              <a href="#" class="whitespace-nowrap px-2 py-1">Airpods</a>
              <a href="#" class="whitespace-nowrap px-2 py-1">Phụ kiện</a>
              <a href="#" class="whitespace-nowrap px-2 py-1">Chính sách</a>
              <a href="#" class="whitespace-nowrap px-2 py-1">Tin tức</a>
              <a href="#" class="whitespace-nowrap px-2 py-1">Liên hệ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<style scoped>
/* Custom scrollbar for mobile navigation */
.header-menu .overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.header-menu .overflow-x-auto::-webkit-scrollbar-track {
  background: #374151;
}

.header-menu .overflow-x-auto::-webkit-scrollbar-thumb {
  background: #4B5563;
  border-radius: 2px;
}

.header-menu .overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #6B7280;
}

/* Smooth transitions */
.header-menu a {
  transition: all 0.3s ease;
}

/* Mobile menu animation */
.md\:hidden {
  transition: all 0.3s ease-in-out;
}

/* Smooth dropdown animations */
.group:hover .group-hover\:grid {
  animation: fadeInScale 0.3s ease-in-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Enhanced hover effects for menu items */
.header-menu a {
  transition: all 0.3s ease;
}

/* .header-menu a:hover {
  transform: translateY(-1px);
} */
</style>
