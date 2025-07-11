<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue'
import Swal from 'sweetalert2'
import { ref, reactive } from 'vue'
import axios from '@/plugins/axion'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { watch } from 'vue'


const router = useRouter()

const provinces = ref([])
const districts = ref([])
const wards = ref([])

const selectedProvince = ref('')
const selectedDistrict = ref('')
const selectedWard = ref('')

// Form fields
const name = ref('')
const phone = ref('')
const email = ref('')
const addressLine1 = ref('')

// Image previews & files
const previews = ref([])
const files = ref([])

// Validation errors
const errors = reactive({})

// Loading state
const loading = ref(false)

const fetchProvinces = async () => {
  const { data } = await axios.get('/api/location/provinces')
  provinces.value = data
}

const fetchDistricts = async (province_id) => {
  if (!province_id) { districts.value = []; return }
  const { data } = await axios.get(`/api/location/provinces/${province_id}/districts`)
  districts.value = data
}

const fetchWards = async (district_id) => {
  if (!district_id) { wards.value = []; return }
  const { data } = await axios.get(`/api/location/districts/${district_id}/wards`)
  wards.value = data
}

watch(selectedProvince, (v) => {
  selectedDistrict.value = ''
  selectedWard.value = ''
  fetchDistricts(v)
  updateCity()          // reset/ghép lại city
})

watch(selectedDistrict, (v) => {
  selectedWard.value = ''
  fetchWards(v)
  updateCity()
})

watch(selectedWard, updateCity)

const city = ref('')

function updateCity() {
  // tìm name theo id
  const p = provinces.value.find(x => x.id === selectedProvince.value)?.name
  const d = districts.value.find(x => x.id === selectedDistrict.value)?.name
  const w = wards.value.find(x => x.id === selectedWard.value)?.name

  // chỉ ghép những phần đã chọn
  const parts = [w, d, p].filter(Boolean)
  city.value = parts.join(', ')
}

onMounted(fetchProvinces)

function handleImage(e) {
  const selected = Array.from(e.target.files || [])
  previews.value = []
  files.value = []

  selected.forEach(file => {
    if (!file.type.startsWith('image/')) {
      return
    }
    previews.value.push(URL.createObjectURL(file))
    files.value.push(file)
  })
}

function removeImage(idx) {
  URL.revokeObjectURL(previews.value[idx])
  previews.value.splice(idx, 1)
  files.value.splice(idx, 1)
}

async function submit() {
  // reset errors
  Object.keys(errors).forEach(key => delete errors[key])
  loading.value = true

  const form = new FormData()
  form.append('name', name.value)
  form.append('phone', phone.value)
  form.append('email', email.value)
  form.append('address_line1', addressLine1.value)
  form.append('city', city.value)
  files.value.forEach(file => form.append('images[]', file))

  try {
    const res = await axios.post('/api/branch/create', form)
    // handle success: clear form or redirect
    console.log('Created:', res.data.branch)
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Thêm chi nhánh thành công',
      confirmButtonText: 'Đóng',
    })
    router.push({ name: 'branch' })

  } catch (err) {
    if (err.response?.status === 422) {
      Object.assign(errors, err.response.data.errors)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: 'Lỗi khi tạo chi nhánh',
        confirmButtonText: 'Đóng',
      })
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#f3f3f3] pt-10 py-10 px-10 overflow-x-auto">
    <div class="grid md:grid-cols-2 gap-10 min-h-screen border bg-white border-zinc-300 px-7 py-7 rounded-xl">
      <div class="">
        <div class="flex flex-col mb-6">
          <label class="text-zinc-600 font-medium text-[15px] mb-2">
            Tên chi nhánh <span class="text-red-500 ml-1">*</span>
          </label>
          <input v-model="name" type="text" placeholder="Nhập tên chi nhánh..."
            class="border-2 bg-white border-zinc-400 pl-2 h-10 w-full text-black" />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p>
        </div>

        <div class="flex flex-col mb-6">
          <label class="text-zinc-600 font-medium text-[15px] mb-2">
            Hình ảnh chi nhánh <span class="text-red-500 ml-1">*</span>
          </label>
          <label class="flex flex-col items-center justify-center bg-white w-full h-[256px] p-3
                 border-2 border-dashed border-zinc-400 text-zinc-500
                 cursor-pointer hover:bg-zinc-50 rounded-lg">
            <i class="fa-solid fa-camera text-2xl mb-2"></i>
            <span class="text-sm">Chọn ảnh</span>
            <input type="file" accept="image/*" multiple class="hidden" @change="handleImage" />
          </label>
          <p v-if="errors.images" class="text-red-500 text-sm mt-1">{{ errors.images[0] }}</p>

          <div class="mt-3 flex flex-wrap gap-3">
            <div v-for="(p, idx) in previews" :key="idx" class="relative group">
              <img :src="p" class="w-44 h-44 object-cover rounded-lg border" />
              <button @click.prevent="removeImage(idx)" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     hover:bg-red-600">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right form -->
      <div class="">
        <div class="flex flex-col mb-6">
          <label class="text-zinc-600 font-medium text-[15px] mb-2">
            Số điện thoại <span class="text-red-500 ml-1">*</span>
          </label>
          <input v-model="phone" type="text" placeholder="Nhập số điện thoại chi nhánh..."
            class="border-2 bg-white border-zinc-400 pl-2 h-10 w-full text-black" />
          <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone[0] }}</p>
        </div>

        <div class="flex flex-col mb-6">
          <label class="text-zinc-600 font-medium text-[15px] mb-2">
            Email chi nhánh <span class="text-red-500 ml-1">*</span>
          </label>
          <input v-model="email" type="email" placeholder="Nhập email chi nhánh..."
            class="border-2 bg-white border-zinc-400 pl-2 h-10 w-full text-black" />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email[0] }}</p>
        </div>

        <div class="flex flex-col mb-6">
          <label class="text-zinc-600 font-medium text-[15px] mb-2">
            Địa chỉ chi nhánh <span class="text-red-500 ml-1">*</span>
          </label>
          <input v-model="addressLine1" type="text" placeholder="Nhập địa chỉ chi nhánh..."
            class="border-2 bg-white border-zinc-400 pl-2 h-10 w-full text-black" />
          <p v-if="errors.address_line1" class="text-red-500 text-sm mt-1">{{ errors.address_line1[0] }}</p>
        </div>
        <label class="text-zinc-600 font-medium text-[15px]">
          Tỉnh/Thành phố
        </label>
        <div class="flex justify-between w-full">
          <div class="flex flex-col mb-1 mr-2">
            <select v-model="selectedProvince" class="border-2 bg-white border-zinc-400 h-10 w-full text-black">
              <option disabled value="">-- Chọn Tỉnh/Thành --</option>
              <option v-for="p in provinces" :key="p.id" :value="p.id">
                {{ p.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col mb-1 mr-2">
            <select v-model="selectedDistrict" :disabled="!districts.length"
              class="border-2 bg-white border-zinc-400 h-10 w-full text-black">
              <option disabled value="">-- Chọn Quận/Huyện --</option>
              <option v-for="d in districts" :key="d.id" :value="d.id">
                {{ d.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col mb-6">
            <select v-model="selectedWard" :disabled="!wards.length"
              class="border-2 bg-white border-zinc-400 h-10 w-full text-black">
              <option disabled value="">-- Chọn Xã/Phường --</option>
              <option v-for="w in wards" :key="w.id" :value="w.id">
                {{ w.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex flex-col mb-7">
          <input v-model="city" type="text" readonly
            class="border-2 bg-white border-zinc-300 pl-2 h-10 w-full text-black" />
          <p v-if="errors.city" class="text-red-500 text-sm mt-1">{{ errors.city[0] }}</p>
        </div>
        <button @click.prevent="submit" :disabled="loading"
          class="bg-[#2563EB] cursor-pointer hover:-translate-y-0.5 mb-9 transition duration-300 text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50">
          {{ loading ? 'Đang gửi...' : 'Thêm chi nhánh' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* thêm bất kỳ style tuỳ chỉnh nào ở đây */
</style>
