<script setup>
import axios from '@/plugins/axioscustomer'
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart'
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia'

// Define component name to fix linter error
defineOptions({
  name: 'FrontendHeader'
})

const { isAuthenticated, logout } = useAuth()
const router = useRouter()

const isMobileMenuOpen = ref(false)
const isAccountDropdownOpen = ref(false)

const cartStore = useCartStore()
const { count } = storeToRefs(cartStore)
const categotyStore = useCategoryStore()
const { category_tree, categorys } = storeToRefs(categotyStore)

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
    // Fetch cart khi header mount
    if (isAuthenticated.value) {
      await cartStore.fetchCart()
    }
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
                class="px-4 py-1.5 bg-white border border-gray-300 border-l-0 rounded-r-md outline-none focus:outline-none cursor-pointer">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" class="bi bi-search"
                    viewBox="0 0 16 16">
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">
                    </path>
                  </svg>
                </span>
              </button>
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
                <a href="/he-thong-cua-hang" class="flex items-center bg-zinc-700 text-white rounded-md cursor-pointer">
                  <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 0C6.12297 0 2.96875 3.15422 2.96875 7.03125C2.96875 8.34117 3.3316 9.61953 4.01832 10.7286L9.59977 19.723C9.70668 19.8953 9.89504 20 10.0976 20C10.0992 20 10.1007 20 10.1023 20C10.3066 19.9984 10.4954 19.8905 10.6003 19.7152L16.0395 10.6336C16.6883 9.54797 17.0312 8.3023 17.0312 7.03125C17.0312 3.15422 13.877 0 10 0ZM15.0338 10.032L10.0888 18.2885L5.01434 10.1112C4.44273 9.18805 4.13281 8.12305 4.13281 7.03125C4.13281 3.80039 6.76914 1.16406 10 1.16406C13.2309 1.16406 15.8633 3.80039 15.8633 7.03125C15.8633 8.09066 15.5738 9.12844 15.0338 10.032Z"
                      fill="white"></path>
                    <path
                      d="M10 3.51562C8.06148 3.51562 6.48438 5.09273 6.48438 7.03125C6.48438 8.95738 8.03582 10.5469 10 10.5469C11.9884 10.5469 13.5156 8.93621 13.5156 7.03125C13.5156 5.09273 11.9385 3.51562 10 3.51562ZM10 9.38281C8.7009 9.38281 7.64844 8.32684 7.64844 7.03125C7.64844 5.73891 8.70766 4.67969 10 4.67969C11.2923 4.67969 12.3477 5.73891 12.3477 7.03125C12.3477 8.30793 11.3197 9.38281 10 9.38281Z"
                      fill="white"></path>
                  </svg>
                  <div class="flex flex-col leading-tight ml-1">
                    <span class="text-xs">Hệ thống cửa hàng</span>
                    <span class="text-sm font-semibold">7 cửa hàng</span>
                  </div>
                </a>
              </div>

              <!-- Call to Order -->
              <div class="flex px-2 py-1 text-white">
                <a href="tel:19006750" class="flex px-2 py-1 text-white cursor-pointer items-center">
                  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_509_1081)">
                      <path
                        d="M18.1771 14.2476C17.7063 13.7573 17.1383 13.4952 16.5364 13.4952C15.9393 13.4952 15.3665 13.7525 14.8762 14.2428L13.3422 15.7719C13.216 15.7039 13.0898 15.6408 12.9685 15.5777C12.7937 15.4903 12.6287 15.4078 12.4879 15.3204C11.051 14.4078 9.74519 13.2185 8.49278 11.6797C7.88599 10.9127 7.47823 10.2671 7.18212 9.61177C7.58017 9.2477 7.9491 8.86906 8.30832 8.50499C8.44424 8.36907 8.58016 8.22829 8.71608 8.09237C9.73548 7.07297 9.73548 5.7526 8.71608 4.73319L7.39085 3.40797C7.24037 3.25748 7.08503 3.10214 6.9394 2.94681C6.64814 2.64584 6.34232 2.33516 6.02679 2.04391C5.55592 1.57789 4.99282 1.33032 4.4006 1.33032C3.80837 1.33032 3.23556 1.57789 2.75013 2.04391C2.74528 2.04876 2.74528 2.04876 2.74043 2.05361L1.08996 3.71864C0.46861 4.33999 0.114245 5.09726 0.0365763 5.97589C-0.0799271 7.39335 0.337543 8.71372 0.657928 9.57779C1.44433 11.6991 2.61907 13.6651 4.37147 15.7719C6.49766 18.3107 9.05588 20.3155 11.9782 21.7281C13.0947 22.2572 14.5849 22.8834 16.25 22.9902C16.3519 22.9951 16.4587 22.9999 16.5558 22.9999C17.6771 22.9999 18.6189 22.597 19.3567 21.7961C19.3616 21.7864 19.3713 21.7815 19.3761 21.7718C19.6286 21.466 19.9198 21.1893 20.2256 20.8932C20.4344 20.6942 20.648 20.4854 20.8567 20.267C21.3373 19.767 21.5897 19.1845 21.5897 18.5874C21.5897 17.9855 21.3324 17.4078 20.8421 16.9224L18.1771 14.2476ZM19.915 19.3592C19.9101 19.3641 19.9101 19.3592 19.915 19.3592C19.7256 19.5631 19.5315 19.7476 19.3227 19.9514C19.0072 20.2524 18.6868 20.5679 18.3859 20.9223C17.8956 21.4466 17.3179 21.6941 16.5606 21.6941C16.4878 21.6941 16.4102 21.6941 16.3373 21.6893C14.8956 21.5971 13.5558 21.034 12.551 20.5534C9.80344 19.2233 7.39085 17.335 5.38602 14.9418C3.7307 12.9467 2.62392 11.102 1.89092 9.12149C1.43947 7.91276 1.27442 6.97103 1.34724 6.08269C1.39578 5.51474 1.61423 5.04387 2.01713 4.64096L3.67245 2.98564C3.91031 2.76234 4.16274 2.64099 4.41031 2.64099C4.71613 2.64099 4.9637 2.82545 5.11904 2.98079C5.12389 2.98564 5.12874 2.9905 5.1336 2.99535C5.42971 3.27205 5.71126 3.55845 6.00737 3.86427C6.15786 4.01961 6.3132 4.17495 6.46853 4.33514L7.79376 5.66036C8.30832 6.17492 8.30832 6.65064 7.79376 7.1652C7.65298 7.30597 7.51706 7.44675 7.37629 7.58267C6.96853 8.00014 6.58018 8.38848 6.15786 8.76712C6.14815 8.77683 6.13844 8.78168 6.13359 8.79139C5.71612 9.20886 5.79378 9.61662 5.88116 9.89332C5.88602 9.90788 5.89087 9.92245 5.89573 9.93701C6.24038 10.7719 6.72581 11.5583 7.46367 12.4952L7.46852 12.5001C8.80831 14.1505 10.2209 15.4369 11.7791 16.4224C11.9782 16.5486 12.1821 16.6505 12.3762 16.7476C12.551 16.835 12.716 16.9175 12.8568 17.0049C12.8762 17.0146 12.8956 17.0292 12.9151 17.0389C13.0801 17.1214 13.2354 17.1602 13.3956 17.1602C13.7985 17.1602 14.051 16.9078 14.1335 16.8253L15.7937 15.1651C15.9587 15.0001 16.2208 14.801 16.5267 14.801C16.8276 14.801 17.0752 14.9903 17.2257 15.1554C17.2305 15.1602 17.2305 15.1602 17.2354 15.1651L19.9101 17.8398C20.4101 18.335 20.4101 18.8447 19.915 19.3592Z"
                        fill="white"></path>
                      <path
                        d="M12.4296 5.47116C13.7014 5.68475 14.8567 6.28669 15.779 7.209C16.7013 8.13132 17.2984 9.28665 17.5169 10.5585C17.5703 10.8789 17.847 11.1022 18.1625 11.1022C18.2013 11.1022 18.2353 11.0973 18.2741 11.0924C18.6334 11.0342 18.8712 10.6944 18.813 10.3352C18.5508 8.79636 17.8227 7.39347 16.7111 6.28183C15.5994 5.17019 14.1965 4.44205 12.6577 4.17992C12.2985 4.12166 11.9635 4.35953 11.9004 4.71389C11.8373 5.06825 12.0703 5.41291 12.4296 5.47116Z"
                        fill="white"></path>
                      <path
                        d="M22.9732 10.1458C22.5411 7.61184 21.347 5.30604 19.512 3.47111C17.6771 1.63618 15.3713 0.442024 12.8374 0.00999088C12.483 -0.0531151 12.148 0.1896 12.0849 0.543965C12.0267 0.903183 12.2646 1.23813 12.6238 1.30124C14.8859 1.68473 16.949 2.75753 18.5897 4.39343C20.2305 6.03419 21.2984 8.09727 21.6819 10.3594C21.7353 10.6798 22.012 10.9031 22.3275 10.9031C22.3664 10.9031 22.4003 10.8982 22.4392 10.8933C22.7935 10.84 23.0363 10.5001 22.9732 10.1458Z"
                        fill="white"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_509_1081">
                        <rect width="23" height="23" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <div class="flex flex-col leading-tight ml-2">
                    <span class="text-xs">Gọi mua hàng</span>
                    <span class="text-sm font-semibold">1900 6750</span>
                  </div>
                </a>
              </div>

              <!-- Account Info -->
              <div class="relative group cursor-pointer">
                <div class="flex items-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                    class="bi bi-person" viewBox="0 0 16 16">
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z">
                    </path>
                  </svg>
                  <div class="flex flex-col ml-1">
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
                      <div class="flex items-center gap-2 px-3 py-1 hover:bg-black hover:text-white rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                          class="bi bi-person" viewBox="0 0 16 16">
                          <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z">
                          </path>
                        </svg>
                        <span>Tài khoản</span>
                      </div>
                    </router-link>
                    <div @click="handleLogout"
                      class="flex items-center gap-2 px-3 py-1 hover:bg-black hover:text-white rounded-lg cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z">
                        </path>
                        <path fill-rule="evenodd"
                          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z">
                        </path>
                      </svg> <span>Đăng xuất</span>
                    </div>
                  </div>
                  <div v-else>
                    <router-link :to="{ name: 'login-customer' }">
                      <div class="flex items-center gap-2 px-3 py-1 hover:bg-black hover:text-white rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                          <path fill-rule="evenodd"
                            d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z">
                          </path>
                          <path fill-rule="evenodd"
                            d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z">
                          </path>
                        </svg> <span>Đăng nhập</span>
                      </div>
                    </router-link>
                    <router-link :to="{ name: 'register-customer' }">
                      <div class="flex items-center gap-2 px-3 py-1 hover:bg-black hover:text-white rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-person-plus" viewBox="0 0 16 16">
                          <path
                            d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z">
                          </path>
                          <path fill-rule="evenodd"
                            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z">
                          </path>
                        </svg> <span>Đăng ký</span>
                      </div>
                    </router-link>
                  </div>
                  <div class="flex items-center gap-2 px-3 py-1 hover:bg-black hover:text-white rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-heart" viewBox="0 0 16 16">
                      <path
                        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z">
                      </path>
                    </svg> <span>Danh sách yêu thích (0)</span>
                  </div>
                  <div class="flex items-center gap-2 px-3 py-1 hover:bg-black hover:text-white rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-repeat" viewBox="0 0 16 16">
                      <path
                        d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z">
                      </path>
                    </svg> <span>So sánh sản phẩm (0)</span>
                  </div>
                </div>
              </div>

              <!-- Cart -->
              <div class="relative flex items-center px-2 py-1 text-white">
                <!-- <a href="/gio-hang" class="relative flex items-center px-2 py-1 text-white cursor-pointer"> -->
                <router-link :to="{ name: 'my-cart' }" class="flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart3"
                    viewBox="0 0 16 16">
                    <path
                      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z">
                    </path>
                  </svg>
                  <span class="text-sm ml-2">Giỏ hàng</span>
                </router-link>
                <div>
                  <span
                    class="absolute -top-1 left-4 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center ml-2">{{
                      count }}</span>
                </div>
                <!-- </a> -->
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
            <router-link :to="{name: 'home'}" class="relative group px-2 py-1 text-white">
              Trang chủ
              <span
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[0px] h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-[40px]"></span>
            </router-link>
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
            <router-link :to="{name: 'blog-all'}" class="relative group px-2 py-1 text-white">
              Tin tức
              <span
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[0px] h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-[40px]"></span>
            </router-link>
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
