<script setup>
// import { ref } from 'vue'
import LeftMenu from '@/components/layout/backend/LeftMenu.vue';
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue';

</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#F3F3F3] pt-5">
    <div class=" mx-5 bg-white rounded-lg border border-zinc-300 p-5">
      <span class="text-[18px] font-medium text-zinc-500">Bộ lọc & Tìm kiếm</span>
      <div class="grid grid-cols-6 gap-2 mt-8 mb-3">
        <div class="col-span-4">
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
          <input type="date" name="" id=""
            class="w-full border border-zinc-300 rounded-lg py-1.5 relative p-2 text-zinc-500">
        </div>
      </div>
    </div>
    <div class="mt-5 border border-zinc-300 rounded-lg p-5 mx-5 bg-white mb-2">
      <div class="flex items-center justify-between w-full mb-5">
        <span class="text-[16px] font-medium text-zinc-500">Quản lý và chỉnh sửa các bài viết tin tức</span>
        <button class="border rounded-lg px-4 flex py-1.5 mt-1 bg-[#2563EB] text-zinc-100 cursor-pointer
               hover:-translate-y-0.5 transition duration-300 ">
          <svg viewBox="0 0 24 24" fill="none" width="24px" height="24px" class="mr-2"
            xmlns="http://www.w3.org/2000/svg" stroke="#f5f5f5">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z" fill="#ededed"></path>
          </svg>
          <span class="text-[16px] font-medium">Thêm bài viết mới</span>
        </button>
      </div>
      <div class="border border-zinc-300 rounded-lg p-5 hover:shadow-blue-100 hover:shadow-lg hover:border-blue-100 transition duration-200 mb-4">
        <div class="flex items-center gap-4">
          <img class="w-[127px] h-[90px] rounded-lg self-start"
            src="https://bizweb.dktcdn.net/100/480/632/articles/010.jpg?v=1682692969433" alt="">
          <div class=" flex flex-col gap-2 w-full">
            <h1 class="text-[18px] font-medium text-zinc-500">iPhone 15 Pro Max - Những tính năng đột phá mới nhất</h1>
            <span class="text-[14px] text-zinc-500">Khám phá những tính năng cách mạng trên iPhone 15 Pro Max với chip
              A17 Pro và camera tiên tiến</span>
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
                <span class="text-[14px] text-zinc-500">Admin</span>
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
                <span class="text-[14px] text-zinc-500">10:30 20 thg 1, 2024</span>
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
                <span class="text-[14px] text-zinc-500">100</span>
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
            <div class="flex justify-between items-center w-full">
              <div class="border border-green-200 bg-green-200 rounded-xl text-green-900 text-[12px] font-medium  px-2">
                <span>Đã xuất bản</span>
              </div>
              <div class="flex gap-2 justify-center items-center">
                <button class="flex justify-center items-center gap-1 border border-zinc-300 rounded-lg px-2 py-1 text-zinc-500 hover:bg-green-600 hover:text-zinc-100 transition duration-200 font-medium cursor-pointer hover:border-green-600">
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
                <button class="flex justify-center items-center gap-1 border border-zinc-300 rounded-lg px-2 py-1 text-zinc-500 hover:bg-green-600 hover:text-zinc-100 transition duration-200 font-medium cursor-pointer hover:border-green-600">
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

<style>

</style>
