<script setup>
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'
import { onMounted, ref } from 'vue'
import axios from '@/plugins/axioscustomer'
// import { setCache, getCache } from '@/composables/useCache'

const products = ref([])

onMounted(async () => {
  // const productCacheKey = 'product_hotsale'
  // const cachedProducts = getCache(productCacheKey)
  // if (productCacheKey && cachedProducts) {
  // products.value = cachedProducts
  // } else {
  const res = await axios.get('/api/product/hot-sale')
  products.value = res.data.product
  // setCache(productCacheKey, products.value)
  // }
})

const config = {
  itemsToShow: 7,
  itemsToScroll: 1,
  wrapAround: false,
  snapAlign: 'start'
}

const carouselBreakpoints = {
  0: { itemsToShow: 1.5 },
  640: { itemsToShow: 2 },
  768: { itemsToShow: 3 },
  1024: { itemsToShow: 4 },
}
</script>

<template>
  <div class="bg-gradient-to-b from-orange-800 to-orange-700 flex flex-col rounded-xl max-w-7xl mx-auto mt-10 mb-15">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 px-4 sm:px-6 lg:px-8 mt-3">
      <!-- Tiêu đề + icon -->
      <div class="flex items-center justify-center">
        <a href="#" class="text-white font-black text-2xl font-baloo" style="font-family: 'Baloo 2', cursive;">
          HOT SALE CUỐI TUẦN
        </a>
        <img class="w-10 h-10 sm:w-[50px] sm:h-[50px] ml-2" src="/images/icon_fire.png"
          alt="Biểu tượng lửa khuyến mãi" />
      </div>

      <!-- Bộ đếm thời gian -->
      <div class="flex flex-wrap justify-center gap-2">
        <div class="bg-black text-white text-center px-3 py-1 rounded-md w-[70px]">
          <p class="text-xl font-bold">564</p>
          <p class="text-xs">Ngày</p>
        </div>
        <div class="bg-black text-white text-center px-3 py-1 rounded-md w-[70px]">
          <p class="text-xl font-bold">09</p>
          <p class="text-xs">Giờ</p>
        </div>
        <div class="bg-black text-white text-center px-3 py-1 rounded-md w-[70px]">
          <p class="text-xl font-bold">58</p>
          <p class="text-xs">Phút</p>
        </div>
        <div class="bg-black text-white text-center px-3 py-1 rounded-md w-[70px]">
          <p class="text-xl font-bold">29</p>
          <p class="text-xs">Giây</p>
        </div>
      </div>
    </div>

    <!-- Carousel container thay cho Swiper -->
    <div class="w-[95.5%] relative mt-4 ml-7">
      <Carousel v-bind="config" :breakpoints="carouselBreakpoints" class="relative pb-4 mb-1 group/carousel">
        <Slide v-for="prod in products" :key="prod.prod_id">
          <router-link :to="{ name: 'product-detail', params: { id: prod.prod_id } }">
            <div class="flex justify-center group">
              <div class="bg-gray-50 rounded-xl w-full max-w-[290px] relative">
                <!-- Nhãn giảm giá -->
                <span
                  class="absolute top-0 z-20 text-white text-xs py-0.5 px-2 -ml-2 bg-gradient-to-b from-orange-700 to-orange-600 rounded-tr-xl rounded-br-xl rounded-tl-lg mt-1 inline-block w-fit">
                  <strong>Giảm {{ Math.floor((prod.price - prod.discount_price) / prod.price * 100) }} %</strong>
                </span>

                <!-- Ảnh sản phẩm -->
                <div class="flex flex-col -mt-6">
                  <a href="#">
                    <div class="flex justify-center">
                      <img class="transform scale-95 group-hover:scale-100 duration-300 w-[221px] h-[276px] py-5"
                        :src="prod.images[0].img_url" alt="iPhone 12" />
                    </div>
                  </a>
                  <!-- Thẻ thông tin -->
                  <div class="flex flex-col -mt-10 items-start z-10 space-y-1 ml-2">
                    <span
                      class="text-white bg-gradient-to-b -ml-3 from-orange-700 to-orange-600 rounded-tr-lg rounded-br-lg text-xs px-2 flex items-center">
                      <strong>Trả góp 0%</strong>
                    </span>
                    <span
                      class="text-white bg-gradient-to-b -ml-3 from-orange-700 to-orange-600 rounded-tr-lg rounded-br-lg text-xs px-2 flex items-center">
                      <strong>BH {{ prod.warranty_months }} tháng</strong>
                    </span>
                  </div>
                </div>

                <!-- Tên sản phẩm và giá -->
                <div class="flex flex-col mt-4 px-3">
                  <a href="#">
                    <h3 class="text-[17px] text-zinc-00 font-normal hover:text-red-500 duration-200 line-clamp-2">
                      {{ prod.name }} {{prod.specs?.find(s => s.spec_key === 'Màu sắc')?.spec_value || ''}} - Chính hãng VN/A
                    </h3>
                  </a>
                  <div class="flex justify-between mt-2 items-end">
                    <div>
                      <p class="font-medium text-[14px] line-through text-gray-400">{{ new
                        Intl.NumberFormat('vi-VN').format(prod.price) }} đ</p>
                      <p class="font-medium text-[18px] text-red-900">{{ new
                        Intl.NumberFormat('vi-VN').format(prod.discount_price) }}đ</p>
                    </div>
                    <button
                      class="bg-gray-900 text-white px-2 rounded-lg cursor-pointer hover:bg-amber-700 duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="40" fill="currentColor"
                        class="bi bi-gear" viewBox="0 0 16 16">
                        <path
                          d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z">
                        </path>
                        <path
                          d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z">
                        </path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Ưu đãi ngân hàng -->
                <div class="bg-gray-200 rounded-lg mt-3 mx-3 py-2 px-2">
                  <p class="text-xs">
                    Giảm trực tiếp 40%, tối đa <strong class="text-red-800">600.000 VNĐ</strong> khi
                    mở thẻ TP Bank EVO.
                  </p>
                </div>

                <!-- Đã bán -->
                <div class="flex bg-amber-700 text-white rounded-2xl mt-3 mx-3 px-2 mb-2">
                  <div class="-mt-1.5 absolute -ml-2.5">
                    <svg width="30px" height="30px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                      class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet">
                      <radialGradient id="IconifyId17ecdb2904d178eab8626" cx="68.884" cy="124.296" r="70.587"
                        gradientTransform="matrix(-1 -.00434 -.00713 1.6408 131.986 -79.345)"
                        gradientUnits="userSpaceOnUse">
                        <stop offset=".314" stop-color="#ff9800"></stop>
                        <stop offset=".662" stop-color="#ff6d00"></stop>
                        <stop offset=".972" stop-color="#f44336"></stop>
                      </radialGradient>
                      <path
                        d="M35.56 40.73c-.57 6.08-.97 16.84 2.62 21.42c0 0-1.69-11.82 13.46-26.65c6.1-5.97 7.51-14.09 5.38-20.18c-1.21-3.45-3.42-6.3-5.34-8.29c-1.12-1.17-.26-3.1 1.37-3.03c9.86.44 25.84 3.18 32.63 20.22c2.98 7.48 3.2 15.21 1.78 23.07c-.9 5.02-4.1 16.18 3.2 17.55c5.21.98 7.73-3.16 8.86-6.14c.47-1.24 2.1-1.55 2.98-.56c8.8 10.01 9.55 21.8 7.73 31.95c-3.52 19.62-23.39 33.9-43.13 33.9c-24.66 0-44.29-14.11-49.38-39.65c-2.05-10.31-1.01-30.71 14.89-45.11c1.18-1.08 3.11-.12 2.95 1.5z"
                        fill="url(#IconifyId17ecdb2904d178eab8626)"></path>
                      <radialGradient id="IconifyId17ecdb2904d178eab8627" cx="64.921" cy="54.062" r="73.86"
                        gradientTransform="matrix(-.0101 .9999 .7525 .0076 26.154 -11.267)"
                        gradientUnits="userSpaceOnUse">
                        <stop offset=".214" stop-color="#fff176"></stop>
                        <stop offset=".328" stop-color="#fff27d"></stop>
                        <stop offset=".487" stop-color="#fff48f"></stop>
                        <stop offset=".672" stop-color="#fff7ad"></stop>
                        <stop offset=".793" stop-color="#fff9c4"></stop>
                        <stop offset=".822" stop-color="#fff8bd" stop-opacity=".804"></stop>
                        <stop offset=".863" stop-color="#fff6ab" stop-opacity=".529"></stop>
                        <stop offset=".91" stop-color="#fff38d" stop-opacity=".209"></stop>
                        <stop offset=".941" stop-color="#fff176" stop-opacity="0"></stop>
                      </radialGradient>
                      <path
                        d="M76.11 77.42c-9.09-11.7-5.02-25.05-2.79-30.37c.3-.7-.5-1.36-1.13-.93c-3.91 2.66-11.92 8.92-15.65 17.73c-5.05 11.91-4.69 17.74-1.7 24.86c1.8 4.29-.29 5.2-1.34 5.36c-1.02.16-1.96-.52-2.71-1.23a16.09 16.09 0 0 1-4.44-7.6c-.16-.62-.97-.79-1.34-.28c-2.8 3.87-4.25 10.08-4.32 14.47C40.47 113 51.68 124 65.24 124c17.09 0 29.54-18.9 19.72-34.7c-2.85-4.6-5.53-7.61-8.85-11.88z"
                        fill="url(#IconifyId17ecdb2904d178eab8627)"></path>
                    </svg>
                  </div>
                  <div class="ml-22">
                    <span>Đã bán 133</span>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </Slide>
        <template #addons>
          <Navigation>
            <template #prev>
              <button
                class="bg-zinc-900  flex justify-center items-center text-white px-3 -ml-1 h-8 rounded hover:bg-red-500 cursor-pointer
                opacity-0 -translate-x-2 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 duration-300 ">
                <span class="mb-1.5">‹</span>
              </button>
            </template>
            <template #next>
              <button
                class="bg-zinc-900  flex justify-center items-center text-white px-3 -mr-1 h-8 rounded hover:bg-red-500 cursor-pointer
                opacity-0 translate-x-2 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 duration-300 ">
                <span class="mb-1.5">›</span>
              </button>
            </template>
          </Navigation>
        </template>
      </Carousel>
    </div>
    <div class="flex justify-center mb-3">
      <button
        class="flex items-center border border-amber-50 cursor-pointer rounded-lg h-10 px-5 py-5 hover:bg-zinc-900 hover:border-zinc-900">
        <span class="mx-3 text-amber-50">Xem tất cả</span>
        <svg viewBox="0 0 1024 1024" class="icon -ml-2" width="13" height="15" version="1.1"
          xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff">
          <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#ffffff">
          </path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="">

</style>
