<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import axios from '@/plugins/axioscustomer'
import { defineProps } from 'vue'
import { getCurrentInstance } from 'vue';


const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const emit = getCurrentInstance()?.emit || (() => { })

const cate_name = ref('')
const cate_banner = ref('')
const children = ref([])

const products = ref([])
const pagination = ref({})
const currentPage = ref(1)
const sort = ref('default')

const uniqueColorProducts = computed(() => {
  const seenColors = new Set()
  return products.value.filter(prod => {
    const color = prod.specs.find(s => s.spec_key === 'Màu sắc')?.spec_value
    if (!color || seenColors.has(color)) return false
    seenColors.add(color)
    return true
  })
})

async function fetchCategory() {
  const res = await axios.get(`/api/category/${props.id}`)
  const c = res.data.category
  cate_name.value = c.name
  cate_banner.value = c.banner
  emit('update-product-name', {
    categoryName: c.name,
    categoryId: c.id
  })
}

async function fetchChildren() {
  const res = await axios.get(`/api/category/children/${props.id}`)
  children.value = res.data.children
}

async function fetchProduct() {
  const res = await axios.get(`/api/category/product/${props.id}?page=${currentPage.value}&sort=${sort.value}`)
  products.value = res.data.product.data
  pagination.value = {
    current_page: res.data.current_page,
    last_page: res.data.last_page,
    total: res.data.total
  }
}

onMounted(() => {
  fetchCategory()
  fetchChildren()
  fetchProduct()
})

watch(() => props.id, () => {
  currentPage.value = 1
  fetchCategory()
  fetchChildren()
  fetchProduct()
})

watch([currentPage, sort], () => {
  fetchProduct()
})

const setSort = (value) => {
  sort.value = value
  currentPage.value = 1
}
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <!-- Banner -->
    <div class="flex justify-center items-center pt-5 flex-col flex-wrap">
      <span class="text-3xl font-medium">{{ cate_name }}</span>
      <div class="mt-3 w-full">
        <img class="rounded-xl w-full" :src="cate_banner">
      </div>

      <!-- Children categories -->
      <div class="flex justify-center mt-7 gap-10 font-normal">
        <router-link v-for="chil in children" :key="chil.id"
          :to="{ name: 'fe-category', params: { id: chil.id, categoryName: chil.name } }"
          class="flex flex-col items-center group hover:-translate-y-1 transition duration-400 max-w-[110px] text-center">
          <img
            class="w-[85px] h-[85px] rounded-full group-hover:shadow-md group-hover:border group-hover:bg-black bg-zinc-300"
            :src="chil.image">
          <p class="text-zinc-700 pt-1 group-hover:text-red-600">{{ chil.name }}</p>
        </router-link>
      </div>

      <!-- Sort & Filter -->
      <div class="flex justify-between bg-[#F1F1F1] p-3 w-full rounded-lg mt-7">
        <button
          class="flex justify-center items-center gap-1 rounded-lg border-zinc-300 border py-1.5 px-5 hover:text-white hover:bg-black cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" width="22px" height="22px" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 3H5C3.58579 3 2.87868 3 2.43934 3.4122C2 3.8244 2 4.48782 2 5.81466V6.50448C2 7.54232 2 8.06124 2.2596 8.49142C2.5192 8.9216 2.99347 9.18858 3.94202 9.72255L6.85504 11.3624C7.49146 11.7206 7.80967 11.8998 8.03751 12.0976C8.51199 12.5095 8.80408 12.9935 8.93644 13.5872C9 13.8722 9 14.2058 9 14.8729L9 17.5424C9 18.452 9 18.9067 9.25192 19.2613C9.50385 19.6158 9.95128 19.7907 10.8462 20.1406C12.7248 20.875 13.6641 21.2422 14.3321 20.8244C15 20.4066 15 19.4519 15 17.5424V14.8729C15 14.2058 15 13.8722 15.0636 13.5872C15.1959 12.9935 15.488 12.5095 15.9625 12.0976C16.1903 11.8998 16.5085 11.7206 17.145 11.3624L20.058 9.72255C21.0065 9.18858 21.4808 8.9216 21.7404 8.49142C22 8.06124 22 7.54232 22 6.50448V5.81466C22 4.48782 22 3.8244 21.5607 3.4122C21.1213 3 20.4142 3 19 3Z"
              fill="currentColor"></path>
          </svg>
          <span>Bộ lọc</span>
        </button>

        <div class="flex gap-2 flex-wrap">
          <button @click="setSort('default')"
            :class="sort === 'default' ? 'bg-black text-white' : 'bg-white text-black'"
            class="border-zinc-300 border px-3 py-1 rounded-lg cursor-pointer hover:bg-black hover:text-white">Mặc
            định</button>
          <button @click="setSort('name_asc')"
            :class="sort === 'name_asc' ? 'bg-black text-white' : 'bg-white text-black'"
            class="border-zinc-300 border px-3 py-1 rounded-lg cursor-pointer hover:bg-black hover:text-white">Tên
            A-Z</button>
          <button @click="setSort('name_desc')"
            :class="sort === 'name_desc' ? 'bg-black text-white' : 'bg-white text-black'"
            class="border-zinc-300 border px-3 py-1 rounded-lg cursor-pointer hover:bg-black hover:text-white">Tên
            Z-A</button>
          <button @click="setSort('newest')" :class="sort === 'newest' ? 'bg-black text-white' : 'bg-white text-black'"
            class="border-zinc-300 border px-3 py-1 rounded-lg cursor-pointer hover:bg-black hover:text-white">Hàng
            mới</button>
          <button @click="setSort('price_asc')"
            :class="sort === 'price_asc' ? 'bg-black text-white' : 'bg-white text-black'"
            class="border-zinc-300 border px-3 py-1 rounded-lg cursor-pointer hover:bg-black hover:text-white">Giá thấp
            đến cao</button>
          <button @click="setSort('price_desc')"
            :class="sort === 'price_desc' ? 'bg-black text-white' : 'bg-white text-black'"
            class="border-zinc-300 border px-3 py-1 rounded-lg cursor-pointer hover:bg-black hover:text-white">Giá cao
            xuống thấp</button>
        </div>
      </div>

      <!-- Products -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full">
        <div class="flex justify-center group" v-for="prod in uniqueColorProducts" :key="prod.pro_id">
          <router-link :to="{ name: 'product-detail', params: { id: prod.prod_id, productName: prod.name } }">
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
                  <h3 class="text-[16px] text-zinc-700 font-medium hover:text-red-500 duration-200 h-[48px] line-clamp-2">
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
          </router-link>
        </div>
      </div>
      <!-- Pagination -->
      <div class="flex justify-center gap-4 mt-8">
        <button :disabled="pagination.current_page === 1" @click="currentPage--"
          class="border px-3 py-1 rounded disabled:opacity-50">Trước</button>
        <span>Trang {{ pagination.current_page }} / {{ pagination.last_page }}</span>
        <button :disabled="pagination.current_page === pagination.last_page" @click="currentPage++"
          class="border px-3 py-1 rounded disabled:opacity-50">Sau</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
}
</style>
