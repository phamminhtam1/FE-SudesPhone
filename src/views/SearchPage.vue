<script setup>
import { defineProps, ref, watch } from 'vue';
import axiosCustomer from '@/plugins/axioscustomer';
import { onMounted } from 'vue';

const props = defineProps({
  keyword: {
    type: [String, Number],
    required: true
  }
})

const products = ref([])
const isLoading = ref(false)

async function fetchProduct(keyword) {
  try {
    isLoading.value = true
    const res = await axiosCustomer.get(`/api/product?page=1&per_page=16&keyword=${keyword}`)
    products.value = res.data.product.data
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  fetchProduct(props.keyword)
})

watch(
  () => props.keyword,
  (newKeyword, oldKeyword) => {
    if (newKeyword !== oldKeyword) {
      fetchProduct(newKeyword)
    }
  }
)

</script>

<template>
  <div class="max-w-7xl mx-auto mt-5">
    <h1 class=" uppercase font-medium text-zinc-800">
      {{ isLoading ? 'Đang tải...' : `Có ${products.length} kết quả tìm kiếm phù hợp` }}
    </h1>

    <div v-if="isLoading" class="grid grid-cols-4 gap-5 mt-5">
      <div v-for="n in 8" :key="n" class="col-span-1 group border border-zinc-200 rounded-lg p-1 shadow-lg">
        <div class="flex justify-center items-center relative">
          <div class="w-[280px] h-[320px] bg-zinc-200 rounded-md my-2 animate-pulse"></div>
        </div>
        <div class="px-2 pb-2">
          <div class="h-4 bg-zinc-200 rounded mb-2 animate-pulse"></div>
          <div class="flex justify-between items-end">
            <div class="space-y-2 w-1/2">
              <div class="h-3 bg-zinc-200 rounded animate-pulse"></div>
              <div class="h-4 bg-zinc-300 rounded animate-pulse"></div>
            </div>
            <div class="h-8 w-10 bg-zinc-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="products.length" class="grid grid-cols-4 gap-5 mt-5">
      <div class="col-span-1 group border border-zinc-200 rounded-lg p-1 shadow-lg" v-for="product in products" :key="product.prod_id">
        <div class="flex justify-center items-center relative">
          <img class="transform scale-95 group-hover:scale-100 duration-300 w-[280px] h-[320px] object-cover py-2"
            :src="product.images[0].img_url"
            alt="">
          <label
            class="absolute bg-red-700 text-white text-[11px] px-2 py-0.5 font-medium top-1 -left-2 rounded-tl-lg rounded-r-xl"
            for="">Giảm 18%</label>
          <div class=" absolute flex flex-col gap-1 -left-1 bottom-5">
            <span class="bg-orange-600 text-white text-[11px] px-2 rounded-r-lg font-medium">Trả góp 0%</span>
            <span class=" bg-orange-600 text-white text-[11px] px-2 rounded-r-lg font-medium">BH 24 tháng</span>
          </div>
        </div>
        <span class="text-[16px] text-zinc-700 font-medium hover:text-red-500 duration-200 h-[48px] pl-2 line-clamp-2">{{product.name}} - Chinh hang VN/A</span>
        <div class="flex justify-between mt-2 items-end pl-2 pr-2">
          <div>
            <p class="text-[13px] line-through font-bold text-gray-400">{{ new
                      Intl.NumberFormat('vi-VN').format(product.price) }}đ</p>
            <p class="font-bold text-red-900 text-[18px]">{{ new
                      Intl.NumberFormat('vi-VN').format(product.discount_price) }}đ</p>
          </div>
          <button class="bg-gray-900 text-white px-2 rounded-lg cursor-pointer hover:bg-amber-700 duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="40" fill="currentColor" class="bi bi-gear"
              viewBox="0 0 16 16">
              <path
                d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z">
              </path>
              <path
                d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z">
              </path>
            </svg>
          </button>
        </div>
        <div class="bg-[#F1F1F1] rounded-lg mt-3 py-2 pl-2 pr-2 mb-1">
          <p class="text-xs">
            Giảm trực tiếp 40%, tối đa <strong class="text-red-800">600.000 VNĐ</strong> khi
            mở thẻ TP Bank EVO.
          </p>
        </div>
      </div>
    </div>
    <div v-else-if="!isLoading && !products.length" class="mt-6 text-center text-zinc-600">
      Không tìm thấy sản phẩm phù hợp.
    </div>
  </div>
</template>

<style></style>
