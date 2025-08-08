<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue'
import Swal from 'sweetalert2'
import { ref, reactive, onMounted } from 'vue'
import axios from '@/plugins/axion'
import { useRouter } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const productId = props.id
const router = useRouter()
const errors = reactive({})
const loading = ref(false)

const name = ref('')
const short_desc = ref('')
const long_desc = ref('')
const price = ref('')
const discount_price = ref('')
const warranty_months = ref('')
const stock_qty = ref('')
const keywords = ref('')
const selectedCategory = ref('')
const cat_id = ref([])

const files = ref([])
const previews = ref([])
const oldPreviews = ref([])
const specs = ref([{ spec_key: '', spec_value: '' }])

onMounted(async () => {
  try {
    const res = await axios.get(`/api/product/${productId}`)
    const p = res.data.product
    name.value = p.name
    short_desc.value = p.short_desc
    long_desc.value = p.long_desc
    discount_price.value = p.discount_price
    price.value = p.price
    warranty_months.value = p.warranty_months
    stock_qty.value = p.stock_qty
    price.value = p.price
    keywords.value = p.keywords
    selectedCategory.value = p.cat_id
    specs.value = p.specs || []
    oldPreviews.value = p.images.map(img => img.img_url)
  } catch (err) {
    console.error(err)
    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: 'Không lấy được dữ liệu sản phẩm',
      confirmButtonText: 'Đóng',
    })
  }
})

function handleImage(e) {
  const selected = Array.from(e.target.files || [])
  previews.value.forEach(url => URL.revokeObjectURL(url))
  previews.value = []
  files.value = []
  if (selected.length) oldPreviews.value = []
  selected.forEach(f => {
    if (!f.type.startsWith('image/')) return
    previews.value.push(URL.createObjectURL(f))
    files.value.push(f)
  })
}

function removeImage(idx) {
  URL.revokeObjectURL(previews.value[idx])
  previews.value.splice(idx, 1)
  files.value.splice(idx, 1)
}

function addSpec() {
  specs.value.push({ spec_key: '', spec_value: '' })
}

function removeSpec(index) {
  specs.value.splice(index, 1)
}

async function fetchCategory() {
  try {
    const res = await axios.get('/api/category/leaf-only')
    cat_id.value = res.data.category
  } catch (err) {
    console.error(err)
  }
}

async function submit() {
  loading.value = true

  try {
    const form = new FormData()
    form.append('_method', 'PUT')
    form.append('name', name.value)
    form.append('short_desc', short_desc.value)
    form.append('long_desc', long_desc.value)
    form.append('price', price.value)
    form.append('discount_price', discount_price.value)
    form.append('warranty_months', warranty_months.value)
    form.append('stock_qty', stock_qty.value)
    form.append('keywords', keywords.value)
    form.append('cat_id', selectedCategory.value)
    specs.value.forEach((s, i) => {
      form.append(`specs[${i}][spec_key]`, s.spec_key)
      form.append(`specs[${i}][spec_value]`, s.spec_value)
    })
    files.value.forEach(file => form.append('images[]', file))

    await axios.post(`/api/product/edit/${productId}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Chỉnh sửa sản phẩm thành công',
      confirmButtonText: 'Đóng',
    })
    router.push({ name: 'product' })
  } catch (err) {
    if (err.response?.status === 422) {
      const serverErrors = err.response.data.errors
      Object.keys(serverErrors).forEach(key => {
        errors[key] = serverErrors[key]
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: 'Cập nhật thất bại',
        confirmButtonText: 'Đóng',
      })
    }
  } finally {
    loading.value = false
  }
}

function cloneToCreate() {
  const cloneData = {
    name: name.value,
    short_desc: short_desc.value,
    long_desc: long_desc.value,
    price: price.value,
    discount_price: discount_price.value,
    warranty_months: warranty_months.value,
    keywords: keywords.value,
    selectedCategory: selectedCategory.value,
    specs: specs.value
  }

  localStorage.setItem('cloned_product', JSON.stringify(cloneData))
  router.push({ name: 'create_product' })
}

onMounted(fetchCategory)
</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#f3f3f3] py-10 px-10 overflow-x-auto">
    <div class="grid md:grid-cols-2 gap-10 border bg-white border-zinc-300 px-7 py-3 rounded-xl">
      <!-- LEFT -->
      <div>
        <!-- Tên sản phẩm -->
        <div class="mb-6">
          <div class="flex flex-col gap-1">
            <span class="text-[14px] font-medium text-zinc-500">Tên sản phẩm*</span>
            <input type="text"
              class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2"
              placeholder="Nhập tên sản phẩm..." v-model="name">
          </div>
          <p v-if="errors.name" class="text-sm text-red-500 mt-1">{{ errors.name[0] }}</p>
        </div>

        <!-- Mô tả ngắn -->
        <div class="mb-6">
          <div class="flex flex-col gap-1">
            <span class="text-[14px] font-medium text-zinc-500">Mô tả ngắn*</span>
            <QuillEditor v-model:content="short_desc" contentType="html" theme="snow"
              placeholder="Nhập mô tả ngắn cho sản phẩm..."
              style="height: 100px; border-bottom: 1px solid #e0e0e0; border-radius: 10px; margin-top: -10px" />
          </div>
          <p v-if="errors.short_desc" class="text-sm text-red-500 mt-1">{{ errors.short_desc[0] }}</p>
        </div>

        <!-- Mô tả chi tiết -->
        <div class="mb-6">
          <div class="flex flex-col gap-1">
            <span class="text-[14px] font-medium text-zinc-500">Mô tả chi tiết*</span>
            <QuillEditor v-model:content="long_desc" contentType="html" theme="snow"
              placeholder="Nhập mô tả chi tiết cho sản phẩm..."
              style="height: 300px; border-bottom: 1px solid #e0e0e0; border-radius: 10px; margin-top: -10px" />
          </div>
          <p v-if="errors.long_desc" class="text-sm text-red-500 mt-1">{{ errors.long_desc[0] }}</p>
        </div>

        <!-- Keywords -->
        <div class="mb-6">
          <div class="flex flex-col gap-1">
            <span class="text-[14px] font-medium text-zinc-500">Từ khoá SEO*</span>
            <input type="text"
              class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2"
              placeholder="Nhập từ khoá SEO..." v-model="keywords">
          </div>
          <p v-if="errors.keywords" class="text-sm text-red-500 mt-1">{{ errors.keywords[0] }}</p>
        </div>

        <!-- Ảnh -->
        <div class="mb-2">
          <div class="flex flex-col gap-1">
            <span class="text-[14px] font-medium text-zinc-500">Hình ảnh*</span>
          </div>
          <label class="flex flex-col items-center justify-center bg-white w-full h-[256px] p-3
                 border-2 border-dashed border-zinc-300 text-zinc-500
                 cursor-pointer hover:bg-zinc-50 rounded-lg hover:border-blue-400 transition-colors">
            <i class="fa-solid fa-camera text-2xl mb-2"></i>
            <span class="text-sm">Chọn ảnh</span>
            <input type="file" accept="image/*" multiple class="hidden" @change="handleImage" />
          </label>
          <p v-if="errors.images" class="text-sm text-red-500 mt-1">{{ errors.images[0] }}</p>
          <div class="mt-3 flex flex-wrap gap-3">
            <div v-for="(p, idx) in previews" :key="idx" class="relative group">
              <img :src="p" class="w-32 h-32 object-cover rounded border" />
              <button @click.prevent="removeImage(idx)"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600">
                ✕
              </button>
            </div>
          </div>
        </div>
        <div v-if="oldPreviews.length" class="space-y-3 mb-2">
          <p class="text-zinc-600 font-medium text-[15px]">Ảnh hiện tại</p>
          <div class="flex flex-wrap gap-3">
            <img v-for="(src, idx) in oldPreviews" :key="idx" :src="src"
              class="w-40 h-40 object-cover rounded-lg border" />
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div>
        <!-- Giá và khuyến mãi -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div class="flex flex-col gap-1">
              <span class="text-[14px] font-medium text-zinc-500">Giá gốc*</span>
              <input v-model="price" type="number"
                class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2"
                placeholder="Nhập giá gốc..." />
            </div>
            <p v-if="errors.price" class="text-sm text-red-500 mt-1">{{ errors.price[0] }}</p>
          </div>
          <div>
            <div class="flex flex-col gap-1">
              <span class="text-[14px] font-medium text-zinc-500">Giá Bán*</span>
              <input v-model="discount_price" type="number"
                class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2"
                placeholder="Nhập giá bán..." />
            </div>
            <p v-if="errors.discount_price" class="text-sm text-red-500 mt-1">{{ errors.discount_price[0] }}</p>
          </div>
        </div>

        <!-- Bảo hành và tồn kho -->
        <div class="grid grid-cols-1 gap-4 mb-6">
          <div>
            <div class="flex flex-col gap-1">
              <span class="text-[14px] font-medium text-zinc-500">Bảo hành (tháng)*</span>
              <input v-model="warranty_months" type="number"
                class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2"
                placeholder="Nhập số tháng bảo hành..." />
            </div>
            <p v-if="errors.warranty_months" class="text-sm text-red-500 mt-1">{{ errors.warranty_months[0] }}</p>
          </div>
        </div>

        <!-- Danh mục -->
        <div class="mb-6">
          <div class="flex flex-col gap-1">
            <span class="text-[14px] font-medium text-zinc-500">Danh mục*</span>
            <select v-model="selectedCategory"
              class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2 text-sm text-zinc-500">
              <option disabled value="">-- Chọn danh mục --</option>
              <option v-for="cat in cat_id" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <p v-if="errors.cat_id" class="text-sm text-red-500 mt-1">{{ errors.cat_id[0] }}</p>
        </div>

        <!-- Specs -->
        <div class="mb-6">
          <div class="flex flex-col gap-1">
            <span class="text-[14px] font-medium text-zinc-500">Thông số kỹ thuật*</span>
          </div>
          <div v-for="(spec, index) in specs" :key="index" class="flex items-center gap-2 mb-3">
            <input v-model="spec.spec_key" type="text" placeholder="Thuộc tính"
              class="w-[45%] focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2" />
            <p v-if="errors[`specs.${index}.spec_key`]" class="text-sm text-red-500 mt-1">
              {{ errors[`specs.${index}.spec_key`][0] }}
            </p>
            <input v-model="spec.spec_value" type="text" placeholder="Giá trị"
              class="w-[45%] focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2" />
            <p v-if="errors[`specs.${index}.spec_value`]" class="text-sm text-red-500 mt-1">
              {{ errors[`specs.${index}.spec_value`][0] }}
            </p>
            <button v-if="specs.length > 1" @click.prevent="removeSpec(index)"
              class="text-red-500 hover:text-red-700 text-xl">−</button>
          </div>
          <button @click.prevent="addSpec" class="text-blue-600 hover:text-blue-800 text-sm mt-1">
            + Thêm thuộc tính
          </button>
        </div>

        <!-- Submit -->
        <div class="mt-5">
          <button @click="submit" :disabled="loading"
            class="bg-[#2563EB] cursor-pointer hover:-translate-y-0.5 transition duration-300 text-white px-8 py-2 rounded-lg hover:opacity-90 disabled:opacity-50">
            {{ loading ? 'Đang gửi...' : 'Chỉnh sửa' }}
          </button>
          <button @click="cloneToCreate"
            class="bg-green-600 cursor-pointer hover:-translate-y-0.5 transition duration-300 text-white px-4 py-2 rounded-lg ml-5">
            Tạo bản sao để thêm mới
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
