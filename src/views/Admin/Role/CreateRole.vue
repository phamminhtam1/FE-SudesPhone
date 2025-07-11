<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue'
import axios from '@/plugins/axion';
import Swal from 'sweetalert2';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import { ref } from 'vue';
import { useEditorConfig } from '@/plugins/useEditorConfig';
import router from '@/router';

const { editor, config } = useEditorConfig()

const name = ref('')
const data = ref('<p>Nhập mô tả vị trí...</p>')
const loading = ref(false)

const submit = async () => {
  loading.value = true
  try {
    const res = await axios.post('api/role/create', {
      name: name.value,
      description: data.value

    })
    console.log(res)
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Tạo vị trí thành công',
      confirmButtonText: 'Đóng',
    })
    router.push({ name: 'role' })
  }
  catch (err) {
    alert('Có lỗi xảy ra khi tạo vai trò!')
    console.error(err)
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
      <ckeditor v-if="editor" v-model="data" :editor="editor" :config="config" class="w-full bg-white rounded shadow" />
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
        {{ loading ? 'Đang gửi...' : 'Thêm chức vụ' }}
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