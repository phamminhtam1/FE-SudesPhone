<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue'
import Swal from 'sweetalert2'
import { defineProps, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axion'
import { reactive } from 'vue'

const errors = reactive({})

// 1) Khai báo prop nhận id từ Vue-Router
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

// 2) Dùng prop.id làm branchId
const branchId = props.id
const router = useRouter()

// 3) Các field form
const name = ref('')
const phone = ref('')
const email = ref('')
const address_line1 = ref('')
const city = ref('')
const loading = ref(false)

const oldPreviews = ref([])
const previews = ref([])
const files = ref([])


function handleImages(e) {
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

// 4) Khi mounted, fetch data về và đổ vào form
onMounted(async () => {
  try {
    const res = await axios.get(`/api/branch/${branchId}`)
    const b = res.data.branch
    name.value = b.name
    phone.value = b.phone
    email.value = b.email
    address_line1.value = b.address_line1
    city.value = b.city

    oldPreviews.value = b.images.map(img => `/storage/${img.path}`)

  } catch (err) {
    console.error(err)
    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: 'Không lấy được dữ liệu chi nhánh',
      confirmButtonText: 'Đóng',
    })
  }
})

// 5) Submit form
async function submit() {
  loading.value = true

  try {
    const form = new FormData()
    form.append('_method', 'PUT')
    form.append('name', name.value)
    form.append('phone', phone.value)
    form.append('email', email.value)
    form.append('address_line1', address_line1.value)
    form.append('city', city.value)

    files.value.forEach(f => form.append('images[]', f))

    await axios.post(
      `/api/branch/edit/${branchId}`,
      form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Cập nhật thành công',
      confirmButtonText: 'Đóng',
    })
    router.push({ name: 'branch' })
  } catch (err) {
    console.error(err)
    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: 'Cập nhật thất bại',
      confirmButtonText: 'Đóng',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#f3f3f3] flex justify-start overflow-x-auto">
    <!-- Left form -->
    <div class="flex-1 mx-10 mt-20 space-y-6">
      <div class="flex flex-col">
        <label class="text-zinc-600 font-medium mb-1">
          Tên chi nhánh <span class="text-red-500">*</span>
        </label>
        <input v-model="name" type="text" placeholder="Nhập tên chi nhánh..."
          class="border-2 bg-white border-zinc-400 pl-2 h-10 w-[480px] text-black" />
      </div>
      <div v-if="oldPreviews.length" class="space-y-3">
        <p class="text-zinc-600 font-medium text-[15px]">Ảnh hiện tại</p>

        <div class="flex flex-wrap gap-3">
          <img v-for="(src, idx) in oldPreviews" :key="idx" :src="src"
            class="w-40 h-40 object-cover rounded-lg border" />
        </div>
      </div>

      <!-- ====== KHU VỰC CHỌN ẢNH MỚI ====== -->
      <div class="flex flex-col">
        <label class="text-zinc-600 font-medium text-[15px] mb-2">
          Ảnh mới (tùy chọn)
        </label>

        <!-- Drop-zone -->
        <label class="flex flex-col items-center justify-center bg-white w-[480px] h-[256px] p-4
             border-2 border-dashed border-zinc-400 text-zinc-500 rounded-lg
             cursor-pointer transition hover:bg-zinc-50">
          <i class="fa-solid fa-camera text-3xl mb-2"></i>
          <span class="text-sm">Kéo thả hoặc bấm để chọn ảnh (JPG | PNG | WEBP ≤ 5 MB)</span>
          <input class="hidden" type="file" accept="image/*" multiple @change="handleImages" />
        </label>

        <p v-if="errors?.images?.length" class="text-red-500 text-sm mt-1">
          {{ errors.images[0] }}
        </p>
      </div>

      <!-- ====== ẢNH MỚI VỪA CHỌN (CÓ XOÁ) ====== -->
      <div v-if="previews.length" class="space-y-3">
        <p class="text-zinc-600 font-medium text-[15px]">Ảnh đã chọn</p>

        <div class="flex flex-wrap gap-3">
          <div v-for="(src, idx) in previews" :key="idx" class="relative group">
            <img :src="src" class="w-40 h-40 object-cover rounded-lg border" />
            <!-- nút xoá -->
            <button @click.prevent="removeImage(idx)" class="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6
                 flex items-center justify-center text-xs opacity-0
                 group-hover:opacity-100 transition" title="Xoá ảnh">
              ×
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right form -->
    <div class="flex-1 mx-10 mt-20 pl-7 space-y-6">
      <div class="flex flex-col">
        <label class="text-zinc-600 font-medium mb-1">
          Số điện thoại <span class="text-red-500">*</span>
        </label>
        <input v-model="phone" type="text" placeholder="Nhập số điện thoại..."
          class="border-2 bg-white border-zinc-400 pl-2 h-10 w-[360px] text-black" />
      </div>

      <div class="flex flex-col">
        <label class="text-zinc-600 font-medium mb-1">
          Email chi nhánh <span class="text-red-500">*</span>
        </label>
        <input v-model="email" type="email" placeholder="Nhập email chi nhánh..."
          class="border-2 bg-white border-zinc-400 pl-2 h-10 w-[360px] text-black" />
      </div>

      <div class="flex flex-col">
        <label class="text-zinc-600 font-medium mb-1">
          Địa chỉ chi nhánh <span class="text-red-500">*</span>
        </label>
        <input v-model="address_line1" type="text" placeholder="Nhập địa chỉ chi nhánh..."
          class="border-2 bg-white border-zinc-400 pl-2 h-10 w-[360px] text-black" />
      </div>

      <div class="flex flex-col mb-9">
        <label class="text-zinc-600 font-medium mb-1">
          Thành phố <span class="text-red-500">*</span>
        </label>
        <input v-model="city" type="text" placeholder="Nhập thành phố..."
          class="border-2 bg-white border-zinc-400 pl-2 h-10 w-[360px] text-black" />
      </div>
      <button @click="submit" :disabled="loading"
        class="bg-[#2563EB] cursor-pointer hover:-translate-y-0.5 transition duration-300 text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50">
        {{ loading ? 'Đang cập nhật...' : 'Cập nhật' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* nếu cần custom thêm */
</style>
