<script setup>
import { ref, defineProps, computed, onMounted, watch } from 'vue'
import axiosAdmin from '@/plugins/axion';
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue';
import LeftMenu from '@/components/layout/backend/LeftMenu.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Swal from 'sweetalert2'
import { useBlogPostStore } from '@/stores/blogpost';
import { storeToRefs } from 'pinia';
const blogPostStore = useBlogPostStore()
const {blogpost} = storeToRefs(blogPostStore)

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const blogpostId = props.id

const selectedFile = ref(null)
const isDragOver = ref(false)
const published = ref(0)
const currentThumbnail = ref('')
const showPreview = ref(false)

const title = ref('')
const summary = ref('')
const content = ref('')
const meta_title = ref('')
const meta_description =ref('')
const keywords = ref('')
const published_at = ref(null)
const selectedCategory = ref('')

// Lấy categoryBlogPost từ store
const { categoryBlogPost: storeCategoryBlogPost } = storeToRefs(blogPostStore)

// Computed property to check if published_at should be disabled
const isPublishedAtDisabled = computed(() => {
  return published.value !== 0
})

watch(published, (newVal) => {
  if (newVal === 1) {
    published_at.value = null
  }
})

const filePreview = computed(() => {
  if (selectedFile.value) {
    return URL.createObjectURL(selectedFile.value)
  }
  return null
})

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
  }
}

const handleDrop = (event) => {
  event.preventDefault()
  isDragOver.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
  }
}

const handleDragOver = (event) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = () => {
  isDragOver.value = false
}

async function submit() {
  try {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('title', title.value)
    formData.append('summary', summary.value)
    formData.append('content', content.value)
    formData.append('meta_title', meta_title.value)
    formData.append('meta_description', meta_description.value)
    formData.append('keywords', keywords.value)
    formData.append('published', published.value)
    formData.append('category_blog_id', selectedCategory.value)
    if (published.value === 0 && published_at.value) {
      formData.append('published_at', published_at.value)
    }
    if (selectedFile.value) {
      formData.append('thumbnail', selectedFile.value)
    }
    await axiosAdmin.post(`/api/blog-post/edit/${blogpostId}`, formData)
    Swal.fire({
      title: 'Thành công',
      text: 'Bài viết đã được cập nhật thành công',
      icon: 'success',
      confirmButtonText: 'OK'
    })
  } catch (error) {
    console.log(error)
    Swal.fire({
      title: 'Lỗi',
      text: 'Đã xảy ra lỗi khi cập nhật bài viết',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
}

// Watcher để đổ dữ liệu khi store thay đổi
watch(blogpost, (newBlogPost) => {
  if (newBlogPost && Object.keys(newBlogPost).length > 0) {
    title.value = newBlogPost.title || ''
    summary.value = newBlogPost.summary || ''
    content.value = newBlogPost.content || ''
    meta_title.value = newBlogPost.meta_title || ''
    meta_description.value = newBlogPost.meta_description || ''
    keywords.value = newBlogPost.keywords || ''
    published.value = newBlogPost.published || 0
    selectedCategory.value = newBlogPost.category_blog_id || ''
    published_at.value = newBlogPost.published_at || null
    currentThumbnail.value = newBlogPost.thumbnail_url || ''
  }
}, { immediate: true })

const togglePreview = () => {
  showPreview.value = !showPreview.value
}

const closePreview = () => {
  showPreview.value = false
}

onMounted(async () => {
  await blogPostStore.fetchBlogPostById(blogpostId)
  await blogPostStore.fetchCategoryBlogPost()
})

</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#F3F3F3] pt-5">
    <div class="mx-5 bg-white rounded-lg border border-zinc-300 p-5">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="create-note" width="26" height="26"
            class="icon glyph" fill="#7F7F88">
            <path
              d="M20.71,3.29a2.91,2.91,0,0,0-2.2-.84,3.25,3.25,0,0,0-2.17,1L9.46,10.29s0,0,0,0a.62.62,0,0,0-.11.17,1,1,0,0,0-.1.18l0,0L8,14.72A1,1,0,0,0,9,16a.9.9,0,0,0,.28,0l4-1.17,0,0,.18-.1a.62.62,0,0,0,.17-.11l0,0,6.87-6.88a3.25,3.25,0,0,0,1-2.17A2.91,2.91,0,0,0,20.71,3.29Z">
            </path>
            <path d="M20,22H4a2,2,0,0,1-2-2V4A2,2,0,0,1,4,2h8a1,1,0,0,1,0,2H4V20H20V12a1,1,0,0,1,2,0v8A2,2,0,0,1,20,22Z"
              style="fill:#7F7F88"></path>
          </svg>
          <span class="text-[16px] font-medium text-zinc-500">Tạo bài viết tin tức mới cho website</span>
        </div>
        <div class="flex items-center gap-2">
          <router-link :to="{name: 'blog'}" class="flex items-center border border-zinc-300 hover:border-green-600 rounded-lg px-4 py-1.5 mt-1 hover:bg-green-600 hover:text-zinc-100 cursor-pointer transition duration-200 ">
            <span class="text-[14px] font-medium">Hủy</span>
          </router-link>
          <!-- <button
            class="flex items-center border border-zinc-300 hover:border-green-600 rounded-lg px-4 py-1.5 mt-1 hover:bg-green-600 hover:text-zinc-100 cursor-pointer transition duration-200 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-save w-4 h-4 mr-2" data-lov-id="src/pages/admin/CreateNews.tsx:102:12"
              data-lov-name="Save" data-component-path="src/pages/admin/CreateNews.tsx" data-component-line="102"
              data-component-file="CreateNews.tsx" data-component-name="Save"
              data-component-content="%7B%22className%22%3A%22w-4%20h-4%20mr-2%22%7D">
              <path
                d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z">
              </path>
              <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
              <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
            </svg>
            <span class="text-[14px] font-medium">Lưu nháp</span>
          </button> -->
          <button @click="submit"
            class="border border-green-600 rounded-lg px-4 flex py-1.5 mt-1 bg-green-600 hover:bg-green-800 hover:border-green-800 text-zinc-100 cursor-pointer transition duration-200 ">
            <span class="text-[14px] font-medium">Chỉnh sửa</span>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-6 gap-7 mt-7">
        <div class="col-span-4 border border-zinc-300 rounded-lg py-2 px-5">
          <h1 class="text-[20px] font-medium text-zinc-500">
            Nội dung bài viết
          </h1>
          <h2 class="text-[14px] text-zinc-500">
            Nhập thông tin chi tiết cho bài viết
          </h2>
          <div class="mt-6">
            <div class="flex flex-col gap-1">
              <span class="text-[14px] font-medium text-zinc-500">Tiêu đề*</span>
              <input type="text"
                class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2"
                placeholder="Nhập tiêu đề bài viết..." v-model="title">
            </div>
          </div>
          <div class="mt-6">
            <div class="flex flex-col gap-1">
              <span class="text-[14px] font-medium text-zinc-500">Mô tả ngắn*</span>
              <QuillEditor v-model:content="summary" contentType="html" theme="snow"
                placeholder="Nhập mô tả ngắn cho bài viết..."
                style="height: 100px; border-bottom: 1px solid #e0e0e0; border-radius: 10px; margin-top: -10px" />
            </div>
          </div>
          <div class="mt-2">
            <div class="flex flex-col gap-1">
              <span class="text-[14px] font-medium text-zinc-500">Nội dung bài viết*</span>
              <QuillEditor v-model:content="content" contentType="html" theme="snow"
                placeholder="Nhập nội dung bài viết..."
                style="height: 400px; border-bottom: 1px solid #e0e0e0; border-radius: 10px; margin-top: -10px" />
            </div>
          </div>
          <p class="text-[12px] text-zinc-500 mt-2">Tip: Sử dụng markdown để định dạng văn bản</p>
        </div>
        <div class="col-span-2 self-start h-fit">
          <div class="py-2 px-5 border border-zinc-300 rounded-lg">
            <div class="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#7F7F88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-calendar w-5 h-5" data-lov-id="src/pages/admin/CreateNews.tsx:258:18"
                data-lov-name="Calendar" data-component-path="src/pages/admin/CreateNews.tsx" data-component-line="258"
                data-component-file="CreateNews.tsx" data-component-name="Calendar"
                data-component-content="%7B%22className%22%3A%22w-5%20h-5%22%7D">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <h1 class="text-[20px] font-medium text-zinc-500">Xuất bản</h1>
            </div>
            <div class="mt-6">
              <div class="flex flex-col gap-1">
                <span class="text-[14px] font-medium text-zinc-500">Trạng thái</span>
                <select name="" id="" v-model.number="published"
                  class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-2 px-2 text-sm text-zinc-500">
                  <option value="0">Nháp</option>
                  <option value="1">Đã xuất bản</option>
                </select>
              </div>
            </div>
            <div class="mt-4 mb-4">
              <div class="flex flex-col gap-1">
                <span class="text-[14px] font-medium text-zinc-500">Ngày xuất bản</span>
                <input type="datetime-local" v-model="published_at" :disabled="isPublishedAtDisabled"
                  class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-2 px-2 text-sm text-zinc-500"
                  :class="{ 'bg-gray-100 cursor-not-allowed': isPublishedAtDisabled }">
              </div>
            </div>
          </div>
          <div class="py-2 px-5 border border-zinc-300 rounded-lg mt-6">
            <div class="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                <path
                  d="M3 6C3 4.34315 4.34315 3 6 3H7C8.65685 3 10 4.34315 10 6V7C10 8.65685 8.65685 10 7 10H6C4.34315 10 3 8.65685 3 7V6Z"
                  stroke="#7F7F88" stroke-width="2"></path>
                <path
                  d="M14 6C14 4.34315 15.3431 3 17 3H18C19.6569 3 21 4.34315 21 6V7C21 8.65685 19.6569 10 18 10H17C15.3431 10 14 8.65685 14 7V6Z"
                  stroke="#7F7F88" stroke-width="2"></path>
                <path
                  d="M14 17C14 15.3431 15.3431 14 17 14H18C19.6569 14 21 15.3431 21 17V18C21 19.6569 19.6569 21 18 21H17C15.3431 21 14 19.6569 14 18V17Z"
                  stroke="#7F7F88" stroke-width="2"></path>
                <path
                  d="M3 17C3 15.3431 4.34315 14 6 14H7C8.65685 14 10 15.3431 10 17V18C10 19.6569 8.65685 21 7 21H6C4.34315 21 3 19.6569 3 18V17Z"
                  stroke="#7F7F88" stroke-width="2"></path>
              </svg>
              <h1 class="text-[20px] font-medium text-zinc-500">Danh mục</h1>
            </div>
            <select name="" id="" v-model="selectedCategory"
              class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-2 px-2 text-sm text-zinc-500 mb-5">
              <option value="">Chọn danh mục</option>
              <option v-for="category in storeCategoryBlogPost" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="py-2 px-5 border border-zinc-300 rounded-lg mt-6">
            <div class="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#7F7F88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-eye w-5 h-5" data-lov-id="src/pages/admin/CreateNews.tsx:303:18"
                data-lov-name="Eye" data-component-path="src/pages/admin/CreateNews.tsx" data-component-line="303"
                data-component-file="CreateNews.tsx" data-component-name="Eye"
                data-component-content="%7B%22className%22%3A%22w-5%20h-5%22%7D">
                <path
                  d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                </path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <h1 class="text-[20px] font-medium text-zinc-500">Xem trước</h1>
            </div>
            <div class="mt-6 flex items-center gap-2 mb-5">
              <button @click="togglePreview"
                class="w-full border border-zinc-300 rounded-lg px-4 py-1.5 font-medium text-zinc-500 flex items-center justify-center gap-2 cursor-pointer hover:bg-green-600 hover:text-zinc-100 hover:border-green-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-eye w-5 h-5" data-lov-id="src/pages/admin/CreateNews.tsx:303:18"
                  data-lov-name="Eye" data-component-path="src/pages/admin/CreateNews.tsx" data-component-line="303"
                  data-component-file="CreateNews.tsx" data-component-name="Eye"
                  data-component-content="%7B%22className%22%3A%22w-5%20h-5%22%7D">
                  <path
                    d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                  </path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>Xem trước bài viết</span>
              </button>
            </div>
          </div>
          <div class="py-2 px-5 border border-zinc-300 rounded-lg mt-6">
            <div class="flex items-center gap-2">
              <svg fill="#7F7F88" height="24px" width="24px" version="1.1" id="Layer_1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
                xml:space="preserve">
                <path
                  d="M490.667,341.333v-256c0-23.558-19.109-42.667-42.667-42.667H64c-23.558,0-42.667,19.109-42.667,42.667v256 C9.551,341.333,0,350.885,0,362.667v64c0,23.558,19.109,42.667,42.667,42.667h426.667c23.558,0,42.667-19.109,42.667-42.667v-64 C512,350.885,502.449,341.333,490.667,341.333z M64,85.333h384v256H320c-5.658,0-11.084,2.248-15.085,6.248l-15.085,15.085 h-67.66l-15.085-15.085c-4.001-4.001-9.427-6.248-15.085-6.248H64V85.333z M469.333,426.667H42.667V384h140.497l15.085,15.085 c4.001,4.001,9.427,6.248,15.085,6.248h85.333c5.658,0,11.084-2.248,15.085-6.248L328.837,384h140.497V426.667z">
                </path>
                <path
                  d="M214.078,231.733c0-13.397-10.901-24.277-24.277-24.277h-8.107h-8.085c-4.459,0-8.085-3.648-8.085-8.107 c0-4.459,3.627-8.085,8.085-8.085h12.843c5.205,0,10.112,2.027,13.803,5.717c3.157,3.157,8.277,3.157,11.435,0 c3.179-3.157,3.179-8.277,0-11.435c-6.741-6.763-15.701-10.475-25.237-10.475h-12.843c-13.397,0-24.277,10.901-24.277,24.277 c0,13.397,10.88,24.277,24.277,24.277h8.085h8.107c4.459,0,8.085,3.627,8.085,8.107c0,4.459-3.627,8.085-8.085,8.085h-12.843 c-5.205,0-10.112-2.027-13.803-5.739c-3.179-3.136-8.299-3.157-11.456,0.021c-3.157,3.157-3.157,8.277,0,11.435 c6.763,6.741,15.723,10.453,25.259,10.453h12.843C203.177,255.989,214.078,245.109,214.078,231.733z">
                </path>
                <path
                  d="M238.342,255.989h48.555c4.48,0,8.085-3.605,8.085-8.085c0-4.459-3.605-8.085-8.085-8.085h-40.469v-16.192h24.277 c4.48,0,8.107-3.627,8.107-8.085c0-4.48-3.627-8.085-8.107-8.085h-24.277v-16.192h40.469c4.48,0,8.085-3.627,8.085-8.085 c0-4.48-3.605-8.107-8.085-8.107h-48.555c-4.48,0-8.085,3.627-8.085,8.107v64.725 C230.257,252.384,233.862,255.989,238.342,255.989z">
                </path>
                <path
                  d="M343.533,255.994c17.856,0,32.384-14.507,32.384-32.363v-16.192c0-17.835-14.528-32.363-32.384-32.363 c-17.835,0-32.363,14.528-32.363,32.363v16.192C311.17,241.487,325.698,255.994,343.533,255.994z M327.362,207.439 c0-8.917,7.253-16.171,16.171-16.171c8.939,0,16.192,7.253,16.192,16.171v16.192c0,8.917-7.253,16.192-16.192,16.192 c-8.917,0-16.171-7.275-16.171-16.192V207.439z">
                </path>
              </svg>
              <h1 class="text-[20px] font-medium text-zinc-500">Cài đặt SEO</h1>
            </div>
            <p class="text-[14px] text-zinc-500">Tối ưu hóa bài viết cho công cụ tìm kiếm</p>
            <div class="mt-6">
              <div class="flex flex-col gap-1">
                <span class="text-[14px] font-medium text-zinc-500">Tiêu đề SEO</span>
                <input type="text" name="" id="" placeholder="Tiêu đề tối ưu cho SEO..." v-model="meta_title"
                  class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2">
              </div>
            </div>
            <div class="mt-6 mb-4">
              <div class="flex flex-col gap-1">
                <span class="text-[14px] font-medium text-zinc-500">Mô tả SEO</span>
                <textarea name="" id="" placeholder="Mô tả ngắn gọn cho công cụ tìm kiếm..." v-model="meta_description"
                  class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2"
                  rows="3"></textarea>
              </div>
            </div>
            <div class="mt-6 mb-4">
              <div class="flex flex-col gap-1">
                <span class="text-[14px] font-medium text-zinc-500">Từ khóa SEO (Cách nhau bằng dấu phẩy)</span>
                <input type="text" name="" id="" placeholder="Mô tả ngắn gọn cho công cụ tìm kiếm..." v-model="keywords"
                  class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-6 gap-7 mt-7">
        <div class="border border-zinc-300 rounded-lg p-5 mt-5 col-span-4">
          <div class="flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-image w-5 h-5" data-lov-id="src/pages/admin/CreateNews.tsx:169:18"
              data-lov-name="ImageIcon" data-component-path="src/pages/admin/CreateNews.tsx" data-component-line="169"
              data-component-file="CreateNews.tsx" data-component-name="ImageIcon"
              data-component-content="%7B%22className%22%3A%22w-5%20h-5%22%7D">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <circle cx="9" cy="9" r="2"></circle>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
            </svg>
            <h1 class="text-[20px] font-medium text-zinc-500">
              Hình ảnh đại diện
            </h1>
          </div>

          <!-- Upload Component -->
          <div v-if="!selectedFile && !currentThumbnail"
            class="border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer"
            :class="isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'"
            @drop="handleDrop" @dragover="handleDragOver" @dragleave="handleDragLeave" @click="$refs.fileInput.click()">
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileSelect">

            <div class="flex flex-col items-center gap-4">
              <!-- Upload Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="text-gray-400">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7,10 12,15 17,10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>

              <!-- Text -->
              <div class="text-gray-600">
                <p class="text-lg font-medium">Kéo thả hoặc click để tải ảnh lên</p>
              </div>

              <!-- Choose File Button -->
              <button
                class="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer hover:border-blue-400">
                Chọn file
              </button>
            </div>
          </div>

          <!-- Current Thumbnail Display -->
          <div v-if="!selectedFile && currentThumbnail" class="relative">
            <img :src="currentThumbnail" alt="Current thumbnail" class="w-full h-auto object-cover rounded-lg">
            <div class="absolute inset-0 bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <button @click="$refs.fileInput.click()"
                class="opacity-0 hover:opacity-100 bg-white text-gray-700 rounded-lg px-4 py-2 font-medium transition-opacity">
                Thay đổi ảnh
              </button>
            </div>
            <button @click="currentThumbnail = ''"
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" x2="6" y1="6" y2="18"></line>
                <line x1="6" x2="18" y1="6" y2="18"></line>
              </svg>
            </button>
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileSelect">
          </div>

          <!-- Preview Image -->
          <div v-if="selectedFile" class="relative">
            <img :src="filePreview" alt="Preview" class="w-full h-auto object-cover rounded-lg">
            <button @click="selectedFile = null"
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" x2="6" y1="6" y2="18"></line>
                <line x1="6" x2="18" y1="6" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Preview Modal -->
  <div v-if="showPreview" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
        <div class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="text-blue-600">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <h2 class="text-xl font-semibold text-gray-900">Xem trước bài viết</h2>
        </div>
        <button @click="closePreview"
          class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" x2="6" y1="6" y2="18"/>
            <line x1="6" x2="18" y1="6" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-6 overflow-y-auto flex-1">
        <!-- Preview Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ title || 'Tiêu đề bài viết' }}</h1>

          <div class="flex items-center gap-6 text-sm text-gray-600 mb-4">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>{{ blogpost?.user?.name || 'Admin' }} ({{ blogpost?.user?.role?.name || 'Quản trị viên' }})</span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 2v4"/>
                <path d="M16 2v4"/>
                <rect width="18" height="18" x="3" y="4" rx="2"/>
                <path d="M3 10h18"/>
              </svg>
              <span>{{ blogpost?.created_at ? new Date(blogpost.created_at).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span>{{ blogpost?.view_count || 0 }} lượt xem</span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <span :class="`px-3 py-1 rounded-full text-xs font-medium border ${
              published === 1 ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'
            }`">
              {{ published === 1 ? 'Đã xuất bản' : 'Nháp' }}
            </span>
            <span v-if="selectedCategory" class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
              {{ storeCategoryBlogPost.find(cat => cat.id === selectedCategory)?.name || 'Danh mục' }}
            </span>
          </div>
        </div>

        <!-- Featured Image -->
        <div v-if="filePreview || currentThumbnail" class="mb-6">
          <img :src="filePreview || currentThumbnail" :alt="title" class="w-full h-64 object-cover rounded-lg shadow-md">
        </div>

        <!-- Summary -->
        <div v-if="summary" class="mb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-3">Tóm tắt</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-gray-700 leading-relaxed" v-html="summary"></div>
          </div>
        </div>

        <!-- Content -->
        <div v-if="content" class="mb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-3">Nội dung chi tiết</h3>
          <div class="prose max-w-none">
            <div class="text-gray-700 leading-relaxed" v-html="content"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!title && !summary && !content" class="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="mx-auto text-gray-400 mb-4">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" x2="8" y1="13" y2="13"/>
            <line x1="16" x2="8" y1="17" y2="17"/>
            <line x1="10" x2="8" y1="9" y2="9"/>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Chưa có nội dung</h3>
          <p class="text-gray-600">Hãy nhập tiêu đề, tóm tắt và nội dung để xem trước bài viết</p>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 flex-shrink-0">
        <button @click="closePreview"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
          Đóng
        </button>
        <button @click="submit"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
          Cập nhật bài viết
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #1f2937;
}

.prose h1 {
  font-size: 1.875rem;
}

.prose h2 {
  font-size: 1.5rem;
}

.prose h3 {
  font-size: 1.25rem;
}

.prose ul, .prose ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #6b7280;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.prose img {
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.prose a {
  color: #2563eb;
  text-decoration: underline;
}

.prose a:hover {
  color: #1d4ed8;
}
</style>
