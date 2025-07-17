<script setup>
import { onMounted, ref, watch, defineEmits } from 'vue';
import axios from '@/plugins/axioscustomer'
import Swal from 'sweetalert2';

defineProps({
  address: Array,
  phone: String
})

const isAdding = ref(false)
const isEditting = ref(false)
const citys = ref([])
const regions = ref([])
const wards = ref([])
const selectCity = ref('')
const selectRegion = ref('')
const selectWard = ref('')
const selectLabel = ref('')
const line = ref('')
const is_default = ref(false)
const editingAddressId = ref(null)

const emit = defineEmits(['address-updated'])

const fetchcity = async () => {
  const res = await axios.get('/api/location/provinces')
  citys.value = res.data
}

const fetchRegion = async (city_id) => {
  if (!city_id) { regions.value = []; return }
  const res = await axios.get(`/api/location/provinces/${city_id}/districts`)
  regions.value = res.data
}

const fetchWard = async (region_id) => {
  if (!region_id) { wards.value = []; return }
  const res = await axios.get(`/api/location/districts/${region_id}/wards`)
  wards.value = res.data
}

watch(selectCity, (city_id) => {
  selectRegion.value = ''
  selectWard.value = ''
  fetchRegion(city_id)
})

watch(selectRegion, (region_id) => {
  selectWard.value = ''
  fetchWard(region_id)
})

onMounted(fetchcity)

async function addAddress() {
  isAdding.value = true
  selectLabel.value = ''
  line.value = ''
  selectLabel.value = ''
  selectCity.value = ''
}

async function back() {
  isAdding.value = false
  isEditting.value = false
}

async function editting(address) {
  isEditting.value = true;
  editingAddressId.value = address.id; // Lưu id lại
  selectLabel.value = address.label;
  line.value = address.line;
  is_default.value = address.is_default === '1' || address.is_default === 1

  const selectedCity = citys.value.find(c => c.name.trim() === address.city.trim());
  if (selectedCity) {
    selectCity.value = selectedCity.id;
    await fetchRegion(selectedCity.id);

    const selectedRegion = regions.value.find(r => r.name.trim() === address.region.trim());
    if (selectedRegion) {
      selectRegion.value = selectedRegion.id;
      await fetchWard(selectedRegion.id);

      const selectedWard = wards.value.find(w => w.name.trim() === address.ward.trim());
      if (selectedWard) {
        selectWard.value = selectedWard.id;
      }
    }
  }
}

async function saveAddress() {
  isAdding.value = false

  try {
    const selectedCity = citys.value.find(c => c.id === selectCity.value)
    const selectedRegion = regions.value.find(r => r.id === selectRegion.value)
    const selectedWard = wards.value.find(w => w.id === selectWard.value)

    const form = new FormData()
    form.append('label', selectLabel.value)
    form.append('line', line.value)
    form.append('city', selectedCity?.name || '')
    form.append('region', selectedRegion?.name || '')
    form.append('ward', selectedWard?.name || '');
    form.append('is_default', is_default.value ? '1' : '0')
    await axios.post('/api/customer/address/create', form)
    emit('address-updated') // Thông báo cho cha biết đã cập nhật
  } catch (err) {
    console.error(err)
  }
}

async function editAddress() {
  isEditting.value = false
  try {
    const selectedCity = citys.value.find(c => c.id === selectCity.value)
    const selectedRegion = regions.value.find(r => r.id === selectRegion.value)
    const selectedWard = wards.value.find(w => w.id === selectWard.value)

    const form = new FormData()
    form.append('_method', 'PUT')
    form.append('label', selectLabel.value)
    form.append('line', line.value)
    form.append('city', selectedCity?.name || '')
    form.append('region', selectedRegion?.name || '')
    form.append('ward', selectedWard?.name || '');
    form.append('is_default', is_default.value ? '1' : '0')
    await axios.post(`/api/customer/address/edit/${editingAddressId.value}`, form)
    emit('address-updated')
  } catch (err) {
    console.error(err)
  }
}

async function goDelete(addre_id) {
  const result = await Swal.fire({
    title: 'Xác nhận xóa',
    text: 'Bạn có chắc chắn muốn xóa vị trí này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      await axios.delete(`/api/customer/address/delete/${addre_id}`)
      Swal.fire('Đã xóa!', 'Địa chỉ này đã được xóa thành công.', 'success')
      emit('address-updated')
    } catch (err) {
      console.error(err)
    }
  }
}

</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-semibold text-gray-800">Sổ địa chỉ</h2>
    <div class="flex gap-5">
      <button v-if="isAdding || isEditting" @click.prevent="back"
        class="px-4 py-2 bg-black text-white rounded-lg hover:bg-black transition-colors cursor-pointer flex justify-center items-center">
        <svg viewBox="0 0 32 32" width="24" height="24" version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor">
          <path
            d="M14.389 7.956v4.374l1.056 0.010c7.335 0.071 11.466 3.333 12.543 9.944-4.029-4.661-8.675-4.663-12.532-4.664h-1.067v4.337l-9.884-7.001 9.884-7zM15.456 5.893l-12.795 9.063 12.795 9.063v-5.332c5.121 0.002 9.869 0.26 13.884 7.42 0-4.547-0.751-14.706-13.884-14.833v-5.381z"
            fill="currentColor"> </path>
        </svg>
        <span class="ml-2">Trở về</span>
      </button>
      <button v-if="!isAdding && !isEditting" @click.prevent="addAddress"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-plus h-4 w-4 mr-2">
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        <span>Thêm địa chỉ mới</span>
      </button>
      <button v-if="isAdding && !isEditting" @click.prevent="saveAddress"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-save h-4 w-4 mr-2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
        <span>Lưu địa chỉ</span>
      </button>
      <button v-if="isEditting" @click.prevent="editAddress"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-save h-4 w-4 mr-2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
        <span>Sửa địa chỉ</span>
      </button>
    </div>
  </div>
  <div class="space-y-4" v-if="isAdding">
    <div class="border border-gray-200 rounded-lg p-4">
      <div class="flex flex-col gap-2">
        <label>Loại địa chỉ<span class="text-red-500 ml-1">*</span></label>
        <div class="border border-zinc-300 p-2 rounded-lg">
          <select v-model="selectLabel" name="" id=""
            class="w-full cursor-pointer appearance-none border-none focus:ring-0 focus:outline-none bg-transparent">
            <option value="">Chọn loại địa chỉ</option>
            <option value="Nhà riêng">Nhà riêng</option>
            <option value="Văn phòng">Văn phòng</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-5 mt-6">
        <div class="flex flex-col gap-2">
          <label>Tỉnh/Thành phố<span class="text-red-500 ml-1">*</span></label>
          <div class="border border-zinc-300 p-2 rounded-lg">
            <select v-model="selectCity" name="" id=""
              class="w-full cursor-pointer appearance-none border-none focus:ring-0 focus:outline-none bg-transparent">
              <option value="">Chọn Tỉnh/Thành phố</option>
              <option v-for="city in citys" :key="city.id" :value="city.id">{{ city.name }}</option>
            </select>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label>Quận/Huyện<span class="text-red-500 ml-1">*</span></label>
          <div class="border border-zinc-300 p-2 rounded-lg">
            <select v-model="selectRegion" name="" id=""
              class="w-full cursor-pointer appearance-none border-none focus:ring-0 focus:outline-none bg-transparent">
              <option value="">Chọn Quận/Huyện</option>
              <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
            </select>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label>Phường/Xã<span class="text-red-500 ml-1">*</span></label>
          <div class="border border-zinc-300 p-2 rounded-lg">
            <select v-model="selectWard" name="" id=""
              class="w-full cursor-pointer appearance-none border-none focus:ring-0 focus:outline-none bg-transparent">
              <option value="">Chọn Phường/Xã</option>
              <option v-for="ward in wards" :key="ward.id" :value="ward.id">{{ ward.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="mt-6 flex flex-col gap-2">
        <label>Địa chỉ cụ thể<span class="text-red-500 ml-1">*</span></label>
        <textarea v-model="line" name="" id="" placeholder="Nhập tên đường, số nhà,..." rows="4"
          class="border border-zinc-300 rounded-lg p-2"></textarea>
      </div>
      <div class="mt-4 flex items-center gap-2">
        <input type="checkbox" id="default-address" v-model="is_default"
          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-0" />
        <label for="default-address" class="text-gray-700">Đặt làm địa chỉ mặc định</label>
      </div>
    </div>
  </div>
  <div v-if="!isAdding && !isEditting" class="space-y-4">
    <div class="border border-gray-200 rounded-lg p-4" v-for="addre in address" :key="addre.id">
      <div class="flex justify-between items-start mb-3">
        <div>
          <p class="font-medium">{{ addre.label }}</p>
          <p class="text-sm text-gray-600 mt-1">{{ addre.line + ", " + addre.ward + ", " + addre.region + ", " +
            addre.city }}</p>
          <p class="text-sm text-gray-600 mt-1">{{ phone }}</p>
        </div>
        <div class="flex gap-2">
          <button @click.prevent="editting(addre)" class="text-blue-500 hover:text-blue-700 cursor-pointer">Sửa</button>
          <button @click.prevent="goDelete(addre.id)"
            class="text-red-500 hover:text-red-700 cursor-pointer">Xóa</button>
        </div>
      </div>
      <span v-if="addre.is_default == '1'"
        class="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Địa chỉ mặc
        định</span>
    </div>
  </div>
  <div>
    <div class="space-y-4" v-if="isEditting">
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="flex flex-col gap-2">
          <label>Loại địa chỉ<span class="text-red-500 ml-1">*</span></label>
          <div class="border border-zinc-300 p-2 rounded-lg">
            <select v-model="selectLabel" name="" id=""
              class="w-full cursor-pointer appearance-none border-none focus:ring-0 focus:outline-none bg-transparent">
              <option value="">Chọn loại địa chỉ</option>
              <option value="Nhà riêng">Nhà riêng</option>
              <option value="Văn phòng">Văn phòng</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-5 mt-6">
          <div class="flex flex-col gap-2">
            <label>Tỉnh/Thành phố<span class="text-red-500 ml-1">*</span></label>
            <div class="border border-zinc-300 p-2 rounded-lg">
              <select v-model="selectCity" name="" id=""
                class="w-full cursor-pointer  border-none focus:ring-0 focus:outline-none bg-transparent">
                <option value="">Chọn Tỉnh/Thành phố</option>
                <option v-for="city in citys" :key="city.id" :value="city.id">{{ city.name }}</option>
              </select>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label>Quận/Huyện<span class="text-red-500 ml-1">*</span></label>
            <div class="border border-zinc-300 p-2 rounded-lg">
              <select v-model="selectRegion" name="" id=""
                class="w-full cursor-pointer appearance-none border-none focus:ring-0 focus:outline-none bg-transparent">
                <option value="">Chọn Quận/Huyện</option>
                <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
              </select>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label>Phường/Xã<span class="text-red-500 ml-1">*</span></label>
            <div class="border border-zinc-300 p-2 rounded-lg">
              <select v-model="selectWard" name="" id=""
                class="w-full cursor-pointer appearance-none border-none focus:ring-0 focus:outline-none bg-transparent">
                <option value="">Chọn Phường/Xã</option>
                <option v-for="ward in wards" :key="ward.id" :value="ward.id">{{ ward.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-6 flex flex-col gap-2">
          <label>Địa chỉ cụ thể<span class="text-red-500 ml-1">*</span></label>
          <textarea v-model="line" name="" id="" placeholder="Nhập tên đường, số nhà,..." rows="4"
            class="border border-zinc-300 rounded-lg p-2"></textarea>
        </div>
        <div class="mt-4 flex items-center gap-2">
          <input type="checkbox" id="default-address" v-model="is_default"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-0" />
          <label for="default-address" class="text-gray-700">Đặt làm địa chỉ mặc định</label>
        </div>
      </div>
    </div>
  </div>
</template>
