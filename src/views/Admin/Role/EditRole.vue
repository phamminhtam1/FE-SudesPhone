<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue'
import axios from '@/plugins/axion';
import Swal from 'sweetalert2';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import { onMounted, ref } from 'vue';
import { useEditorConfig } from '@/plugins/useEditorConfig';
import { useRouter } from 'vue-router';

const { editor, config } = useEditorConfig()

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const roleId = props.id
const router = useRouter()

const name = ref('')
const description = ref('')
const loading = ref(false)

onMounted(async () => {
  try {
    const res = await axios.get(`/api/role/${roleId}`)
    const r = res.data.role
    name.value = r.name
    description.value = r.description
  } catch (err) {
    console.error(err)
    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: 'Không lấy được dữ liệu phân quyền',
      confirmButtonText: 'Đóng',
    })
  }
})

async function submit() {
  loading.value = true
  try {
    const form = new FormData()
    form.append('_method', 'PUT')
    form.append('name', name.value)
    form.append('description', description.value)

    await axios.post(`/api/role/edit/${roleId}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Cập nhật thành công',
      confirmButtonText: 'Đóng',
    })
    router.push({ name: 'role' })
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
  <div class="ml-57 h-screen bg-[#f3f3f3] flex justify-start overflow-x-auto">
    <div class="flex-1 mx-10 mt-20">
      <ckeditor v-if="editor" v-model="description" :editor="editor" :config="config"
        class="w-full h-[500px] bg-white rounded shadow" />
    </div>
    <div class="w-[380px] mx-10 mt-17">
      <div class="flex flex-col mb-9">
        <label class="text-zinc-600 font-medium text-[15px] mb-2">
          Tên vị trí <span class="text-red-500 ml-1">*</span>
        </label>
        <input v-model="name" type="text" placeholder="Nhập tên vị trí..."
          class="border-2 bg-white border-zinc-400 pl-2 h-10 w-full text-black" />
        <!-- <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p> -->
      </div>
      <button @click.prevent="submit" :disabled="loading"
        class="bg-[#2563EB] cursor-pointer hover:-translate-y-0.5 transition duration-300 text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50">
        {{ loading ? 'Đang gửi...' : 'Chỉnh sửa' }}
      </button>
    </div>
  </div>

</template>

<style setup>
.ck-editor__editable {
  min-height: 400px;
  max-height: 600px;
}
</style>
