<script setup>
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue';
import axiosCustomer from '@/plugins/axioscustomer';
import LeftMenu from '@/components/layout/backend/LeftMenu.vue';
import { QuillEditor } from '@vueup/vue-quill'
import { ref, reactive } from 'vue'
import { onMounted } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Swal from 'sweetalert2';

const content = ref('')
const errors = reactive({})

async function fetchIntroduction() {
  const res = await axiosCustomer.get('/api/policy')
  content.value = res.data.policy.content
}

const submit = async function submit() {
  try{
    const form = new FormData()
    form.append('_method', 'PUT')
    form.append('content', content.value)

    await axiosCustomer.post('/api/policy/edit', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Cập nhật thành công',
      confirmButtonText: 'Đóng',
    })
  }catch (err) {
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
  }
}

onMounted(fetchIntroduction)

</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 bg-[#F3F3F3] min-h-screen p-5">
    <div class="border border-zinc-300 rounded-lg bg-white p-5">
      <h1 class=" uppercase font-medium text-xl text-zinc-600">Nội dung trang</h1>
      <div class="grid grid-cols-2 gap-5 mt-7">
        <div class="col-span-1 flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-[14px] font-medium text-zinc-500">Nội dung chính sách*</span>
            <QuillEditor v-model:content="content" contentType="html" theme="snow"
              placeholder="Nhập nội dung chính sách..."
              style="height: 400px; border-bottom: 1px solid #e0e0e0; border-radius: 10px; margin-top: -10px" />
          </div>
          <button @click="submit" class="border border-blue-600 bg-blue-600 text-white py-1.5 px-3 w-fit rounded-lg flex right-0 hover:bg-blue-700 hover:border-blue-700 cursor-pointer">
            <span class=" font-medium text-[15px]">Lưu thay đổi</span>
          </button>
        </div>
        <div class="col-span-1 flex flex-col gap-5">
          <div class="flex flex-col">
            <span class="text-[18px] font-medium text-zinc-700">
              Xem trước
            </span>
            <p class="text-[14px] font-medium text-zinc-500">Bản xem trước nằm cùng khung nhìn để bạn chỉnh và so sánh nhanh.</p>
          </div>
          <div class="border border-zinc-200 rounded-lg py-5 px-3 shadow-xl">
            <div class="text-[14px] text-zinc-600 leading-relaxed" v-html="content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
