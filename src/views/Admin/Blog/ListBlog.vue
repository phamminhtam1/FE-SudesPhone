<script setup>
import { ref } from 'vue'
import axiosAdmin from '@/plugins/axion';
import router from '@/router';
import Swal from 'sweetalert2';
import LeftMenu from '@/components/layout/backend/LeftMenu.vue';
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue';
import { onMounted } from 'vue';
import { useBlogPostStore } from '@/stores/blogpost';
import { storeToRefs } from 'pinia';
const blogPostStore = useBlogPostStore()
const { blogposts, categoryBlogPost } = storeToRefs(blogPostStore)

const openMenuId = ref(null)

const toggelMenu = (id) => {
  if (openMenuId.value === id) {
    openMenuId.value = null
  } else {
    openMenuId.value = id
  }
}

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

const goEditBlog = (id) => {
  router.push({name: 'edit_blog', params: {id: id}})
}

const goShowBlogDetail = (id) => {
  router.push({name: 'show_blog_detail', params: {id: id}})
}

async function goDeteleBlogPost(id) {
  try{
    await axiosAdmin.delete(`/api/blog-post/delete/${id}`)
    Swal.fire({
        title: 'Thành công',
        text: 'Bài viết đã được cập nhật thành công',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    blogPostStore.fetchBlogPost()
  }catch (error) {
    console.log(error)
    Swal.fire({
      title: 'Lỗi',
      text: 'Đã xảy ra lỗi khi cập nhật bài viết',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
}

onMounted(() => {
  blogPostStore.fetchBlogPost()
  blogPostStore.fetchCategoryBlogPost()
})
</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#F3F3F3] pt-5">
    <div class=" mx-5 bg-white rounded-lg border border-zinc-300 p-5">
      <span class="text-[18px] font-medium text-zinc-500">Bộ lọc & Tìm kiếm</span>
      <div class="grid grid-cols-6 gap-2 mt-5 mb-3">
        <div class="col-span-3">
          <div class=" border border-zinc-300 rounded-lg py-1.5 relative">
            <input type="text" class="w-full pl-10 focus:outline-none focus:ring-0"
              placeholder="Tìm kiếm theo tên bài viết...">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
              data-lov-id="src/pages/admin/NewsManagement.tsx:156:16" data-lov-name="Search"
              data-component-path="src/pages/admin/NewsManagement.tsx" data-component-line="156"
              data-component-file="NewsManagement.tsx" data-component-name="Search"
              data-component-content="%7B%22className%22%3A%22absolute%20left-3%20top-1%2F2%20transform%20-translate-y-1%2F2%20text-muted-foreground%20w-4%20h-4%22%7D">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
        </div>
        <div class="col-span-1">
          <select name="" id="" class="w-full border border-zinc-300 rounded-lg py-1.5 relative p-2 text-zinc-500">
            <option value="">Tất cả trạng thái</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Nháp</option>
          </select>
        </div>
        <div class="col-span-1">
          <select name="" id="" class="w-full border border-zinc-300 rounded-lg py-1.5 relative p-2 text-zinc-500">
            <option value="">Danh mục</option>
            <option v-for="categoryblog in categoryBlogPost" :key="categoryblog.id" :value="categoryblog.id">{{categoryblog.name}}</option>
          </select>
        </div>
        <div class="col-span-1">
          <input type="date" name="" id=""
            class="w-full border border-zinc-300 rounded-lg py-1.5 relative p-2 text-zinc-500">
        </div>
      </div>
    </div>
    <div class="mt-5 border border-zinc-300 rounded-lg p-5 mx-5 bg-white mb-2">
      <div class="flex items-center justify-between w-full mb-5">
        <span class="text-[16px] font-medium text-zinc-500">Quản lý và chỉnh sửa các bài viết tin tức</span>
        <router-link :to="{name: 'create_blog'}">
          <button class="border rounded-lg px-4 flex py-1.5 mt-1 bg-[#2563EB] text-zinc-100 cursor-pointer
               hover:-translate-y-0.5 transition duration-300 ">
          <svg viewBox="0 0 24 24" fill="none" width="24px" height="24px" class="mr-2"
            xmlns="http://www.w3.org/2000/svg" stroke="#f5f5f5">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z" fill="#ededed"></path>
          </svg>
          <span class="text-[16px] font-medium">Thêm bài viết mới</span>
        </button>
        </router-link>
      </div>
      <div v-for="blogpost in blogposts" :key="blogpost.post_id"
        class="border border-zinc-300 rounded-lg p-5 hover:shadow-blue-100 hover:shadow-lg hover:border-blue-100 transition duration-200 mb-4">
        <div class="flex items-center gap-4" >
          <img class="w-[127px] h-[90px] rounded-lg self-start"
            :src="blogpost.thumbnail_url" alt="">
          <div class=" flex flex-col gap-3 w-full relative">
            <h1 class="text-[18px] font-medium text-zinc-500 max-w-2/3 line-clamp-2 ">{{blogpost.title}}</h1>
            <div class="absolute top-0 right-4">
              <button @click="toggelMenu(blogpost.post_id)"
                class=" cursor-pointer hover:bg-green-600 rounded-xl px-2 py-1 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 28C14.2089 28 16 26.2097 16 24C16 21.7903 14.2089 20 12 20C9.79113 20 8 21.7903 8 24C8 26.2097 9.79113 28 12 28ZM24 28C26.2089 28 28 26.2097 28 24C28 21.7903 26.2089 20 24 20C21.7911 20 20 21.7903 20 24C20 26.2097 21.7911 28 24 28ZM24 22C25.1045 22 26 22.8951 26 24C26 25.1049 25.1045 26 24 26C22.8955 26 22 25.1049 22 24C22 22.8951 22.8955 22 24 22ZM14 24C14 22.8951 13.1045 22 12 22C10.8955 22 10 22.8951 10 24C10 25.1049 10.8955 26 12 26C13.1045 26 14 25.1049 14 24ZM38 24C38 22.8951 37.1045 22 36 22C34.8955 22 34 22.8951 34 24C34 25.1049 34.8955 26 36 26C37.1045 26 38 25.1049 38 24ZM36 28C38.2089 28 40 26.2097 40 24C40 21.7903 38.2089 20 36 20C33.7911 20 32 21.7903 32 24C32 26.2097 33.7911 28 36 28Z"
                    fill="currentColor"></path>
                </svg>
              </button>
            </div>
            <transition name="fade-slide">
              <div
              class="absolute top-10 right-4 border border-zinc-300 rounded-lg p-1 flex flex-col z-50 bg-white shadow-lg"
              v-if="openMenuId === blogpost.post_id">
              <button @click="goShowBlogDetail(blogpost.post_id)"
                class="w-full cursor-pointer hover:bg-green-600 rounded-lg px-2 py-1 hover:text-white flex items-center text-zinc-600 text-[14px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-eye w-4 h-4 mr-2" data-lov-id="src/pages/admin/NewsManagement.tsx:223:26"
                  data-lov-name="Eye" data-component-path="src/pages/admin/NewsManagement.tsx" data-component-line="223"
                  data-component-file="NewsManagement.tsx" data-component-name="Eye"
                  data-component-content="%7B%22className%22%3A%22w-4%20h-4%20mr-2%22%7D">
                  <path
                    d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                  </path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>Xem chi tiết</span>
              </button>
              <button
                class="cursor-pointer hover:bg-green-600 rounded-lg px-2 py-1.5 hover:text-white flex items-center text-zinc-600 text-[14px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-square-pen w-4 h-4 mr-2" data-lov-id="src/pages/admin/NewsManagement.tsx:227:26"
                  data-lov-name="Edit" data-component-path="src/pages/admin/NewsManagement.tsx"
                  data-component-line="227" data-component-file="NewsManagement.tsx" data-component-name="Edit"
                  data-component-content="%7B%22className%22%3A%22w-4%20h-4%20mr-2%22%7D">
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path
                    d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z">
                  </path>
                </svg>
                <span>Chỉnh sửa</span>
              </button>
              <button @click="goDeteleBlogPost(blogpost.post_id)"
                class="cursor-pointer hover:bg-green-600 rounded-lg px-2 py-1.5 hover:text-white flex items-center text-red-600 text-[14px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-trash2 w-4 h-4 mr-2" data-lov-id="src/pages/admin/NewsManagement.tsx:231:26"
                  data-lov-name="Trash2" data-component-path="src/pages/admin/NewsManagement.tsx"
                  data-component-line="231" data-component-file="NewsManagement.tsx" data-component-name="Trash2"
                  data-component-content="%7B%22className%22%3A%22w-4%20h-4%20mr-2%22%7D">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" x2="10" y1="11" y2="17"></line>
                  <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
                <span>Xóa bài viết</span>
              </button>
            </div>
            </transition>
            <span class="text-[14px] text-zinc-500 max-w-2/3 max-h-10 overflow-hidden line-clamp-2" v-html="blogpost.summary"></span>
            <div class="flex items-center gap-5 w-full">
              <div class="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-user w-4 h-4" data-lov-id="src/pages/admin/NewsManagement.tsx:241:22"
                  data-lov-name="User" data-component-path="src/pages/admin/NewsManagement.tsx"
                  data-component-line="241" data-component-file="NewsManagement.tsx" data-component-name="User"
                  data-component-content="%7B%22className%22%3A%22w-4%20h-4%22%7D">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span class="text-[14px] text-zinc-500">{{blogpost.user.name}} ( {{blogpost.user.role.name}} )</span>
              </div>
              <div class="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-calendar w-4 h-4" data-lov-id="src/pages/admin/NewsManagement.tsx:245:22"
                  data-lov-name="Calendar" data-component-path="src/pages/admin/NewsManagement.tsx"
                  data-component-line="245" data-component-file="NewsManagement.tsx" data-component-name="Calendar"
                  data-component-content="%7B%22className%22%3A%22w-4%20h-4%22%7D">
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <span class="text-[14px] text-zinc-500">{{formatVietnameseDate(blogpost.created_at)}}</span>
              </div>
              <div class="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-eye w-4 h-4" data-lov-id="src/pages/admin/NewsManagement.tsx:249:22"
                  data-lov-name="Eye" data-component-path="src/pages/admin/NewsManagement.tsx" data-component-line="249"
                  data-component-file="NewsManagement.tsx" data-component-name="Eye"
                  data-component-content="%7B%22className%22%3A%22w-4%20h-4%22%7D">
                  <path
                    d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                  </path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span class="text-[14px] text-zinc-500">{{blogpost.view_count}}</span>
              </div>
              <div class="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-message-square w-4 h-4" data-lov-id="src/pages/admin/NewsManagement.tsx:253:22"
                  data-lov-name="MessageSquare" data-component-path="src/pages/admin/NewsManagement.tsx"
                  data-component-line="253" data-component-file="NewsManagement.tsx" data-component-name="MessageSquare"
                  data-component-content="%7B%22className%22%3A%22w-4%20h-4%22%7D">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span class="text-[14px] text-zinc-500">10</span>
              </div>
            </div>
            <div class="flex justify-between items-center w-full -mt-2">
              <div class="flex gap-2">
                <div :class="blogpost.published === 1 ? 'border border-green-200 bg-green-200 rounded-xl text-green-900 text-[12px] font-medium px-2 py-1' : 'border border-zinc-200 bg-zinc-200 rounded-xl text-zinc-900 text-[12px] font-medium px-2 py-1'">
                  <span>{{blogpost.published === 1 ? 'Đã xuất bản' : 'Nháp'}}</span>
                </div>
                <div class="border border-zinc-200 rounded-xl text-[12px] font-medium px-2 py-1 text-zinc-500">
                  <span>{{blogpost.category_blog.name}}</span>
                </div>
              </div>
              <div class="flex gap-2 justify-center items-center">
                <button @click="goEditBlog(blogpost.post_id)"
                  class="flex justify-center items-center gap-1 border border-zinc-300 rounded-lg px-2 py-1 text-zinc-500 hover:bg-green-600 hover:text-zinc-100 transition duration-200 font-medium cursor-pointer hover:border-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-square-pen w-4 h-4 mr-1"
                    data-lov-id="src/pages/admin/NewsManagement.tsx:266:24" data-lov-name="Edit"
                    data-component-path="src/pages/admin/NewsManagement.tsx" data-component-line="266"
                    data-component-file="NewsManagement.tsx" data-component-name="Edit"
                    data-component-content="%7B%22className%22%3A%22w-4%20h-4%20mr-1%22%7D">
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path
                      d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z">
                    </path>
                  </svg>
                  <span>Sửa</span>
                </button>
                <button @click="goShowBlogDetail(blogpost.post_id)"
                  class="flex justify-center items-center gap-1 border border-zinc-300 rounded-lg px-2 py-1 text-zinc-500 hover:bg-green-600 hover:text-zinc-100 transition duration-200 font-medium cursor-pointer hover:border-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-eye w-4 h-4 mr-1" data-lov-id="src/pages/admin/NewsManagement.tsx:270:24"
                    data-lov-name="Eye" data-component-path="src/pages/admin/NewsManagement.tsx"
                    data-component-line="270" data-component-file="NewsManagement.tsx" data-component-name="Eye"
                    data-component-content="%7B%22className%22%3A%22w-4%20h-4%20mr-1%22%7D">
                    <path
                      d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                    </path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>Xem</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

