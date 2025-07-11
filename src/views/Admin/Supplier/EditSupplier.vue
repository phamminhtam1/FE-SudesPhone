<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue'
import axios from '@/plugins/axion';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import router from '@/router';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})
const supplier_id = props.id
const name = ref('')
const phone = ref('')
const email = ref('')
const address = ref('')
const loading = ref(false)

onMounted(async () => {
  try {
    const res = await axios.get(`/api/supplier/${supplier_id}`)
    const s = res.data.supplier
    name.value = s.name
    phone.value = s.phone
    email.value = s.email
    address.value = s.address
  } catch (err) {
    console.error(err)
    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: 'Không lấy được dữ liệu nhà cung cấp',
      confirmButtonText: 'Đóng',
    })
  }
})

const submit = async () => {
  loading.value = true
  try {
    const form = new FormData
    form.append('_method', 'PUT')
    form.append('name', name.value)
    form.append('phone', phone.value)
    form.append('email', email.value)
    form.append('address', address.value)

    await axios.post(`/api/supplier/edit/${supplier_id}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Chỉnh sửa nhà cung cấp thành công',
      confirmButtonText: 'Đóng',
    })
    router.push({ name: 'supplier' })
  }
  catch (err) {
    console.error(err)
    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: 'Có lỗi xảy ra khi chỉnh sửa nhà cung cấp',
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
  <div class="ml-57 h-screen bg-[#f3f3f3] py-10 px-50 overflow-x-auto">
    <div class="grid md:grid-cols-1 gap-10">
      <div>
        <div class="mb-6">
          <label class="font-medium text-zinc-700 mb-1 block">Tên nhà cung cấp <span
              class="text-red-500 ml-1">*</span></label>
          <input v-model="name" type="text" class="w-full border border-zinc-400 bg-white px-3 h-10" />
        </div>
        <div class="mb-6">
          <label class="font-medium text-zinc-700 mb-1 block">Số điện thoại nhà cung cấp <span
              class="text-red-500 ml-1">*</span></label>
          <input v-model="phone" type="text" class="w-full border border-zinc-400 bg-white px-3 h-10" />
        </div>
        <div class="mb-6">
          <label class="font-medium text-zinc-700 mb-1 block">Email nhà cung cấp <span
              class="text-red-500 ml-1">*</span></label>
          <input v-model="email" type="text" class="w-full border border-zinc-400 bg-white px-3 h-10" />
        </div>
        <div class="mb-6">
          <label class="font-medium text-zinc-700 mb-1 block">Địa chỉ nhà cung cấp <span
              class="text-red-500 ml-1">*</span></label>
          <input v-model="address" type="text" class="w-full border border-zinc-400 bg-white px-3 h-10" />
        </div>
        <div class="flex justify-center">
          <button @click.prevent="submit" :disabled="loading" class="text-white rounded-lg uppercase bg-[#6261CC] border-[#6261CC] border px-8 py-2
               hover:bg-[#6261CC] hover:border-[#6261CC] cursor-pointer
               hover:-translate-y-0.5 transition duration-300 disabled:opacity-50">
            {{ loading ? 'Đang gửi...' : 'UPDATE' }}
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<style setup>
.ck-editor__editable {
  min-height: 400px;
  max-height: 600px;
}
</style>