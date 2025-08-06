<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LeftMenu from '@/components/layout/backend/LeftMenu.vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue'
import { useBlogPostStore } from '@/stores/blogpost'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const blogPostStore = useBlogPostStore()
const { blogposts } = storeToRefs(blogPostStore)

const blogDetail = ref(null)
const loading = ref(true)

const formatVietnameseDate = (dateString) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }

  return date.toLocaleDateString('vi-VN', options)
}

const goBack = () => {
  router.push({ name: 'blog' })
}

const goEdit = () => {
  router.push({ name: 'edit_blog', params: { id: route.params.id } })
}

const getStatusBadge = (published) => {
  return published === 1
    ? 'bg-green-100 text-green-800 border-green-200'
    : 'bg-yellow-100 text-yellow-800 border-yellow-200'
}

const getStatusText = (published) => {
  return published === 1 ? 'Đã xuất bản' : 'Nháp'
}

onMounted(async () => {
  try {
    await blogPostStore.fetchBlogPost()
    const blogId = parseInt(route.params.id)
    blogDetail.value = blogposts.value.find(blog => blog.post_id === blogId)

    if (!blogDetail.value) {
      router.push({ name: 'blog' })
      return
    }
  } catch (error) {
    console.error('Error fetching blog detail:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <LeftMenu />
  <HeaderAdmin />

  <div class="ml-57 min-h-screen bg-[#F3F3F3] pt-5">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Blog Detail Content -->
    <div v-else-if="blogDetail" class="mx-5">
      <!-- Header Section -->
      <div class="bg-white rounded-lg border border-zinc-300 p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <button @click="goBack"
              class="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointers">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" class="cursor-pointer -mb-0.5 -mr-1" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              <span class="font-medium cursor-pointer">Quay lại</span>
            </button>
          </div>
          <div class="flex items-center gap-3">
            <button @click="goEdit"
              class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
              </svg>
              <span>Chỉnh sửa</span>
            </button>
          </div>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ blogDetail.title }}</h1>

        <div class="flex items-center gap-6 text-sm text-gray-600 mb-4">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>{{ blogDetail.user?.name }} ({{ blogDetail.user?.role?.name }})</span>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2v4"/>
              <path d="M16 2v4"/>
              <rect width="18" height="18" x="3" y="4" rx="2"/>
              <path d="M3 10h18"/>
            </svg>
            <span>{{ formatVietnameseDate(blogDetail.created_at) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span>{{ blogDetail.view_count || 0 }} lượt xem</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span :class="`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(blogDetail.published)}`">
            {{ getStatusText(blogDetail.published) }}
          </span>
          <span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
            {{ blogDetail.category_blog?.name }}
          </span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Content Section -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg border border-zinc-300 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Nội dung bài viết</h2>

            <!-- Featured Image -->
            <div class="mb-6">
              <img :src="blogDetail.thumbnail_url"
                :alt="blogDetail.title"
                class="w-full h-64 object-cover rounded-lg shadow-md">
            </div>

            <!-- Summary -->
            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Tóm tắt</h3>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-gray-700 leading-relaxed" v-html="blogDetail.summary"></p>
              </div>
            </div>

            <!-- Content -->
            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Nội dung chi tiết</h3>
              <div class="prose max-w-none">
                <div class="text-gray-700 leading-relaxed" v-html="blogDetail.content"></div>
              </div>
            </div>

            <!-- Tags -->
            <div v-if="blogDetail.tags && blogDetail.tags.length > 0" class="mb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Tags</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in blogDetail.tags" :key="tag"
                  class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Blog Info Card -->
          <div class="bg-white rounded-lg border border-zinc-300 p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Thông tin bài viết</h3>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Trạng thái:</span>
                <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(blogDetail.published)}`">
                  {{ getStatusText(blogDetail.published) }}
                </span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-gray-600">Danh mục:</span>
                <span class="text-gray-900 font-medium">{{ blogDetail.category_blog?.name }}</span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-gray-600">Tác giả:</span>
                <span class="text-gray-900 font-medium">{{ blogDetail.user?.name }}</span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-gray-600">Ngày tạo:</span>
                <span class="text-gray-900">{{ formatVietnameseDate(blogDetail.created_at) }}</span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-gray-600">Lượt xem:</span>
                <span class="text-gray-900 font-medium">{{ blogDetail.view_count || 0 }}</span>
              </div>
            </div>
          </div>

          <!-- Actions Card -->
          <div class="bg-white rounded-lg border border-zinc-300 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Hành động</h3>

            <div class="space-y-3">
              <button @click="goEdit"
                class="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                </svg>
                <span>Chỉnh sửa bài viết</span>
              </button>

              <button @click="goBack"
                class="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                <span>Quay lại danh sách</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="flex items-center justify-center h-64">
      <div class="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-gray-400 mb-4">
          <circle cx="12" cy="12" r="10"/>
          <path d="m15 9-6 6"/>
          <path d="m9 9 6 6"/>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Không tìm thấy bài viết</h3>
        <p class="text-gray-600 mb-4">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <button @click="goBack"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Quay lại danh sách
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
