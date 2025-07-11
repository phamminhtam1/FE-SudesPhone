<script setup>
import { defineProps, ref, onMounted } from 'vue'
import axios from '@/plugins/axion'
import Swal from 'sweetalert2'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const productId = props.id
const name = ref('')
const sku = ref('')
const short_desc = ref('')
const long_desc = ref('')
const price = ref('')
const discount_price = ref('')
const warranty_months = ref('')
const stock_qty = ref('')
const keywords = ref('')
const previews = ref([])
const specs = ref([])
const category = ref('')

onMounted(async () => {
  try {
    const res = await axios.get(`/api/product/${productId}`)
    const p = res.data.product
    name.value = p.name
    sku.value = p.sku
    short_desc.value = p.short_desc
    long_desc.value = p.long_desc
    price.value = p.price
    discount_price.value = p.discount_price
    warranty_months.value = p.warranty_months
    stock_qty.value = p.stock_qty
    keywords.value = p.keywords
    previews.value = p.images.map(img => img.img_url)
    specs.value = p.specs || []
    category.value = p.category.name
  } catch (err) {
    console.error(err)
    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: 'Không lấy được dữ liệu',
      confirmButtonText: 'Đóng',
    })
  }
})

function format(value) {
  return new Intl.NumberFormat('vi-VN').format(value)
}

</script>

<template>
  <div class="h-screenh h-auto bg-[#1E293B] via-white to-purple-50">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Product Summary -->
      <div class="mb-8 rounded-xl overflow-hidden bg-[#334155] text-white shadow-lg">
        <div class="p-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-4xl font-bold mb-2">{{ name }}</h1>
            <p class="text-blue-100 mb-6">Thông tin sản phẩm chi tiết</p>

            <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div class="bg-white/10 rounded-lg p-4">
                <p class="text-blue-100">Mã Kho</p>
                <p class="font-semibold">{{ sku }}</p>
              </div>
              <div class="bg-white/10 rounded-lg p-4">
                <p class="text-blue-100">Danh mục</p>
                <p class="font-semibold">{{ category }}</p>
              </div>
            </div>

            <div class="flex gap-4">
              <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Còn hàng: {{ stock_qty }}</span>
              <span class="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">Bảo hành: {{ warranty_months }}
                tháng</span>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(src, index) in previews" :key="index"
              class="text-center bg-white/10 rounded-xl shadow-xl p-4 backdrop-blur-md">
              <img :src="src" :alt="'Ảnh sản phẩm ' + (index + 1)" class="w-full h-auto rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-[#334155] p-6 rounded-xl shadow-lg">
          <h3 class="text-xl font-semibold text-[#F87171] mb-2">Giá gốc</h3>
          <p class="text-3xl font-bold text-[#F87171]">{{ format(price) }}₫</p>
          <p class="text-sm text-gray-500">Giá niêm yết</p>
        </div>
        <div class="bg-[#334155] p-6 rounded-xl shadow-lg">
          <h3 class="text-xl font-semibold text-[#4ADE80] mb-2">Giá bán</h3>
          <p class="text-3xl font-bold text-[#4ADE80]">{{ format(discount_price) }}₫</p>
          <p class="text-sm text-gray-500">Giá khuyến mãi</p>
        </div>
      </div>

      <!-- Description -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-[#334155] p-6 rounded-xl shadow-md">
          <h3 class="text-xl text-white font-semibold mb-2">Mô tả ngắn</h3>
          <p class="text-white">{{ short_desc }}</p>
        </div>
        <div class="bg-[#334155] p-6 rounded-xl shadow-md">
          <h3 class="text-xl text-white font-semibold mb-2">Mô tả chi tiết</h3>
          <p class="text-white whitespace-pre-line">{{ long_desc }}</p>
        </div>
      </div>

      <!-- SEO -->
      <div class="bg-[#334155] p-6 rounded-xl shadow-md mb-8">
        <h3 class="text-xl text-white font-semibold mb-2">Từ khoá SEO</h3>
        <p class="text-white">{{ keywords }}</p>
      </div>

      <!-- Technical Specs -->
      <div class="bg-[#334155] p-6 rounded-xl shadow-md">
        <h3 class="text-xl text-white font-semibold mb-4">Thông số kỹ thuật</h3>
        <table class="w-full overflow-hidden rounded-xl border border-zinc-400 text-sm">
          <thead class=" text-white">
            <tr class="bg-zinc-500">
              <th class="px-4 py-2 text-left">Thuộc tính</th>
              <th class="px-4 py-2 text-left">Giá trị</th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="(spec, index) in specs" :key="index" class="border border-zinc-200 hover:bg-zinc-500 transition">
              <td class="px-4 py-2 text-white font-medium">{{ spec.spec_key }}</td>
              <td class="px-4 py-2 text-white">{{ spec.spec_value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* nếu cần custom thêm */
</style>
