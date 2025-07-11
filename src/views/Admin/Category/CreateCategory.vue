<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue'
import axios from '@/plugins/axion'
import { useEditorConfig } from '@/plugins/useEditorConfig';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const router = useRouter()

// Form data
const name = ref('')
const meta_title = ref('')
const keywords = ref('')
const parent_id = ref(null)
const loading = ref(false)

// Thêm state cho image và banner
const image = ref(null)
const banner = ref(null)
const imagePreview = ref(null)
const bannerPreview = ref(null)

// Flat category list for parent dropdown
const flatCategories = ref([])

const { editor, config } = useEditorConfig()
const data = ref('<p>Nhập mô tả danh mục...</p>')


// Đệ quy phẳng hóa cây danh mục
const buildFlatCategoryTree = (nodes, level = 0) => {
  nodes.forEach(node => {
    flatCategories.value.push({
      id: node.id,
      name: `${'-----'.repeat(level)} ${node.name}`
    })
    if (node.children?.length) {
      buildFlatCategoryTree(node.children, level + 1)
    }
  })
}

// Lấy dữ liệu danh mục cây
const fetchCategories = async () => {
  try {
    const res = await axios.get('/api/category/tree')
    buildFlatCategoryTree(res.data.category)
  } catch (err) {
    console.error('Lỗi lấy danh mục:', err)
  }
}

onMounted(fetchCategories)

// Thêm hàm xử lý chọn file
const onImageChange = (e) => {
  const file = e.target.files[0]
  image.value = file
  imagePreview.value = file ? URL.createObjectURL(file) : null
}
const removeImage = () => {
  if (imagePreview.value) URL.revokeObjectURL(imagePreview.value)
  image.value = null
  imagePreview.value = null
}
const onBannerChange = (e) => {
  const file = e.target.files[0]
  banner.value = file
  bannerPreview.value = file ? URL.createObjectURL(file) : null
}
const removeBanner = () => {
  if (bannerPreview.value) URL.revokeObjectURL(bannerPreview.value)
  banner.value = null
  bannerPreview.value = null
}

// Gửi form
const submit = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('meta_title', meta_title.value)
    formData.append('meta_description', data.value)
    formData.append('keywords', keywords.value)
    formData.append('parent_id', parent_id.value)
    if (image.value) formData.append('image', image.value)
    if (banner.value) formData.append('banner', banner.value)

    await axios.post('/api/category/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    Swal.fire({
      icon: 'success',
      title: 'Tạo danh mục thành công!',
      confirmButtonText: 'OK'
    })
    router.push({ name: 'category' })
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: err.response?.data?.message || 'Có lỗi xảy ra!'
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
      <div class="flex flex-col mb-4">
        <label class="text-zinc-600 font-medium text-[15px] mb-1">Tên danh mục <span
            class="text-red-500">*</span></label>
        <input v-model="name" type="text" placeholder="Nhập tên danh mục..."
          class="border-2 bg-white border-zinc-400 pl-2 h-10 w-[480px] text-black" />
      </div>
      <div class="flex flex-col mb-4">
        <label class="text-zinc-600 font-medium text-[15px] mb-1">Danh mục cha</label>
        <select v-model="parent_id" class="border-2 bg-white border-zinc-400 pl-2 h-10 w-[480px] text-black">
          <option :value="null">Root</option>
          <option v-for="cat in flatCategories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col mb-4">
        <label class="text-zinc-600 font-medium text-[15px] mb-1">Meta title</label>
        <input v-model="meta_title" type="text" placeholder="Meta title..."
          class="border-2 bg-white border-zinc-400 pl-2 h-10 w-[480px] text-black" />
      </div>
      <div class="flex flex-col mb-4">
        <label class="text-zinc-600 font-medium text-[15px] mb-1">Keywords</label>
        <input v-model="keywords" type="text" placeholder="Keywords..."
          class="border-2 bg-white border-zinc-400 pl-2 h-10 w-[480px] text-black" />
      </div>
      <!-- Upload Ảnh đại diện đẹp -->
      <div class="mb-4">
        <span class="font-medium text-zinc-700">Ảnh đại diện</span>
        <label class="flex flex-col items-center justify-center bg-white w-[320px] h-[180px] p-3
               border-2 border-dashed border-zinc-400 text-zinc-500
               cursor-pointer hover:bg-zinc-50 rounded-lg relative">
          <i class="fa-solid fa-camera text-2xl mb-2"></i>
          <span class="text-sm">Chọn ảnh đại diện</span>
          <input type="file" accept="image/*" class="hidden" @change="onImageChange" />
          <div v-if="imagePreview" class="absolute inset-0 flex items-center justify-center bg-white/80">
            <img :src="imagePreview" class="w-32 h-32 object-cover rounded border" />
            <button @click.stop.prevent="removeImage"
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600">✕</button>
          </div>
        </label>
      </div>
      <!-- Upload Ảnh banner đẹp -->
      <div class="mb-4">
        <span class="font-medium text-zinc-700">Ảnh banner</span>
        <label class="flex flex-col items-center justify-center bg-white w-[320px] h-[180px] p-3
               border-2 border-dashed border-zinc-400 text-zinc-500
               cursor-pointer hover:bg-zinc-50 rounded-lg relative">
          <i class="fa-solid fa-camera text-2xl mb-2"></i>
          <span class="text-sm">Chọn ảnh banner</span>
          <input type="file" accept="image/*" class="hidden" @change="onBannerChange" />
          <div v-if="bannerPreview" class="absolute inset-0 flex items-center justify-center bg-white/80">
            <img :src="bannerPreview" class="w-32 h-32 object-cover rounded border" />
            <button @click.stop.prevent="removeBanner"
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600">✕</button>
          </div>
        </label>
      </div>
    </div>
    <div class="flex-1 mr-10 mt-25">
      <ckeditor v-if="editor" v-model="data" :editor="editor" :config="config" class="w-full bg-white rounded shadow" />
      <button @click.prevent="submit" :disabled="loading" class="text-white mt-5 rounded-lg uppercase bg-[#6261CC] border-[#6261CC] border px-8 py-2
               hover:-translate-y-0.5 transition duration-300 disabled:opacity-50">
        {{ loading ? 'Đang gửi...' : 'ADD' }}
      </button>
    </div>
  </div>
</template>

<style>
.ck-editor__editable {
  min-height: 250px;
}
</style>
