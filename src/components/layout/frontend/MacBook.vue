<script setup>
import axios from '@/plugins/axioscustomer'
import { ref } from 'vue';
import { onMounted } from 'vue';
import { watch } from 'vue';
// import { setCache, getCache } from '@/composables/useCache'

const products = ref([])
const category_children = ref([])
const categories = ref([])
const activeTab = ref('')


watch(activeTab, async (newTab) => {
  if (newTab) {
    try {
      const product = await axios.get(`/api/category/product/${newTab}`)
      const allProducts = product.data.product.data
      const uniqueProducts = []
      const categoryCounts = {}
      for (const prod of allProducts) {
        const catId = prod.cat_id
        if (!categoryCounts[catId]) {
          categoryCounts[catId] = 0
        }
        if (categoryCounts[catId] < 3) {
          categoryCounts[catId]++
          uniqueProducts.push(prod)
        }
      }
      products.value = uniqueProducts
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
})

onMounted(async () => {
  const category = await axios.get('/api/category/tree')
  console.log(category);
  categories.value = category.data.category.find(c => c.slug === 'macbook-imac')
  category_children.value = categories.value.children
  if (category_children.value.length > 0) {
    activeTab.value = category_children.value[0].id
    const product = await axios.get(`/api/category/product/${activeTab.value}`)
    products.value = product.data.product.data
  }
})

const tabClass = (tabId) => {
  return activeTab.value === tabId
    ? 'border-b-2 border-black text-black pb-2 cursor-pointer'
    : 'text-gray-500 pb-2 hover:text-black cursor-pointer'
}


</script>

<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="font-medium text-3xl uppercase mb-6 text-zinc-700 text-center">Macbook - iMAC</h1>
    <!-- Tabs -->
    <div class="flex justify-center gap-6 text-sm font-medium mb-6">
      <span v-for="cat in category_children" :key="cat.id" @click="activeTab = cat.id" :class="tabClass(cat.id)">/ {{
        cat.name }}</span>
    </div>
    <!-- Products: iPhone 14 -->
    <div v-if="activeTab" class="grid grid-cols-2 md:grid-cols-4 gap-5">
      <div v-if="products.length === 0" class="col-span-full text-center py-8">
        <p class="text-gray-500">Không có sản phẩm nào</p>
      </div>
      <div v-for="prod in products.slice(0, 8)" :key="prod.prod_id" class="h-full">
        <router-link :to="{ name: 'product-detail', params: { id: prod.prod_id, productName: prod.name } }">
          <div class="flex justify-center group">
            <div class="w-full relative shadow-lg rounded-lg border-zinc-200 border">
              <!-- Ảnh sản phẩm -->
              <div class="flex flex-col relative">
                <!-- Nhãn giảm giá -->
                <span
                  class="absolute top-2 left-2 z-20 text-white text-xs py-0.5 px-2 bg-gradient-to-b from-orange-700 to-orange-600 rounded-tr-xl rounded-br-xl rounded-tl-lg inline-block w-fit">
                  <strong>Giảm {{ Math.floor((prod.price - prod.discount_price) / prod.price * 100) }}%</strong>
                </span>
                <a href="#" class=" flex justify-center items-center">
                  <img class="transform scale-95 group-hover:scale-100 duration-300 w-[250px] h-[290px] object-cover py-2"
                    :src="prod.images[0].img_url" alt="iPhone 12" />
                </a>
                <!-- Thẻ thông tin -->
                <div class="absolute bottom-2 left-2 z-20 flex flex-col space-y-1">
                  <span
                    class="text-white bg-gradient-to-b from-orange-700 to-orange-600 rounded-tr-lg rounded-br-lg text-xs px-2 flex items-center">
                    <strong>Trả góp 0%</strong>
                  </span>
                  <span
                    class="text-white bg-gradient-to-b from-orange-700 to-orange-600 rounded-tr-lg rounded-br-lg text-xs px-2 flex items-center">
                    <strong>BH {{ prod.warranty_months }} tháng</strong>
                  </span>
                </div>
              </div>

              <!-- Tên sản phẩm và giá -->
              <div class="flex flex-col mt-4 px-3">
                <a href="#">
                  <h3 class="text-[16px] text-zinc-700 font-medium hover:text-red-500 duration-200 h-[48px]">
                    {{ prod.name }} {{prod.specs.find(s => s.spec_key === 'Màu sắc')?.spec_value}} - Chính hãng VN/A
                  </h3>
                </a>
                <div class="flex justify-between mt-2 items-end">
                  <div>
                    <p class="text-[14px] line-through font-bold text-gray-400">{{ new
                      Intl.NumberFormat('vi-VN').format(prod.price) }}đ</p>
                    <p class="font-bold text-red-900 text-[19px]">{{ new
                      Intl.NumberFormat('vi-VN').format(prod.discount_price) }}đ</p>
                  </div>
                  <button class="bg-gray-900 text-white px-2 rounded-lg cursor-pointer hover:bg-amber-700 duration-200">
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
              <div class="bg-[#F1F1F1] rounded-lg mt-3 mx-3 py-3 px-2 mb-3">
                <p class="text-xs">
                  Giảm trực tiếp 40%, tối đa <strong class="text-red-800">600.000 VNĐ</strong> khi
                  mở thẻ TP Bank EVO.
                </p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="mt-5 flex justify-center">
      <button
        class="flex items-center rounded-lg border border-zinc-400 h-10 px-5 py-5 hover:bg-orange-700 hover:border-orange-700 group cursor-pointer">
        <span class="mx-3 group-hover:text-white">Xem tất cả</span>
        <svg viewBox="0 0 1024 1024" class="icon group-hover:fill-white -ml-2" width="13" height="15" version="1.1"
          xmlns="http://www.w3.org/2000/svg" stroke="#000000">
          <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z">
          </path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Add custom style if needed */
</style>
