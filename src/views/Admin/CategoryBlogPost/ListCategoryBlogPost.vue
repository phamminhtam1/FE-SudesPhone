<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue';
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue';
import { useCategoryBlogStore } from '@/stores/categoryblog';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import Swal from 'sweetalert2';
import axiosAdmin from '@/plugins/axion';
import { useRouter } from 'vue-router';

const router = useRouter();
const categoryBlogStore = useCategoryBlogStore()
const { categoryblogs } = storeToRefs(categoryBlogStore)

onMounted(() => {
  categoryBlogStore.fetchCategoryBlog()
})

const addCategoryBlog = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Thêm danh mục blog',
    html: `
      <input id="swal-input1" class="swal2-input" placeholder="Tên danh mục" required>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Thêm',
    cancelButtonText: 'Hủy',
    preConfirm: () => {
      const name = document.getElementById('swal-input1').value

      if (!name) {
        Swal.showValidationMessage('Vui lòng điền đầy đủ thông tin')
        return false
      }

      return { name }
    }
  })

  if (formValues) {
    try {
      const response = await axiosAdmin.post(`/api/category-blog-post/create?name=${encodeURIComponent(formValues.name)}`)
      if (response.data.message === 'success') {
        Swal.fire({
        title: 'Thành công',
        text: 'Danh mục đã được tạo thành công',
        icon: 'success',
        confirmButtonText: 'OK'
      })
        await categoryBlogStore.fetchCategoryBlog()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: response.data.message || 'Có lỗi xảy ra khi thêm danh mục'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: error.response?.data?.message || 'Có lỗi xảy ra khi thêm danh mục'
      })
    }
  }
}

async function updateCategoryBlogStatus(id, newStatus) {
  try {
    await axiosAdmin.put(`/api/category-blog-post/update-status/${id}`, {
      status: newStatus
    })
    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Danh mục đã được cập nhật trạng thái thành công',
      confirmButtonText: 'OK'
    })
    await categoryBlogStore.fetchCategoryBlog() // Refresh the list after status update
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi!',
      text: err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái'
    })
  }
}

const goEditCategoryBlog = (id) => {
  router.push({ name: 'edit_category_blog', params: { id } })
}

const deleteCategoryBlog = async (id) => {
  const result = await Swal.fire({
    title: 'Xác nhận xóa',
    text: 'Bạn có chắc chắn muốn xóa danh mục blog này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      await axiosAdmin.delete(`/api/category-blog-post/delete/${id}`)
      await categoryBlogStore.fetchCategoryBlog()
      Swal.fire('Đã xóa!', 'Danh mục blog đã được xóa thành công.', 'success')
    } catch (error) {
      const msg = error.response?.data?.message || 'Có lỗi xảy ra khi xóa danh mục blog'
      Swal.fire('Lỗi!', msg, 'error')
    }
  }
}
</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#F3F3F3] pt-5">
    <div class="mx-5 bg-white rounded-lg border border-zinc-300 p-5">
      <div class="flex justify-between items-center mb-5">
        <div class=" flex items-center gap-2 w-1/3 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            class="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
            stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            data-lov-id="src/pages/admin/Categories.tsx:60:18" data-lov-name="Search"
            data-component-path="src/pages/admin/Categories.tsx" data-component-line="60"
            data-component-file="Categories.tsx" data-component-name="Search"
            data-component-content="%7B%22className%22%3A%22absolute%20left-3%20top-1%2F2%20h-4%20w-4%20-translate-y-1%2F2%20text-muted-foreground%22%7D">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input type="text" placeholder="Tìm kiếm danh mục..."
            class="w-full focus:outline-none focus:ring-1 focus:ring-blue-300 border border-zinc-300 rounded-lg py-1.5 px-2 text-sm text-zinc-500 pl-7">
        </div>
        <div>
          <button @click="addCategoryBlog" class="border rounded-lg px-4 flex py-1.5 mt-1 bg-[#2563EB] text-zinc-100 cursor-pointer
               hover:-translate-y-0.5 transition duration-300 ">
              <svg viewBox="0 0 24 24" fill="none" width="24px" height="24px" class="mr-2"
                xmlns="http://www.w3.org/2000/svg" stroke="#f5f5f5">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z" fill="#ededed"></path>
              </svg>
              <span class="text-[16px] font-medium">Thêm danh mục</span>
            </button>
        </div>
      </div>
      <label for="" class="text-[16px] font-medium text-zinc-500">Danh sách danh mục</label>
      <table class=" table-fixed w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
        <thead class="text-xs uppercase bg-[#384153] text-white dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 w-12 border border-l-2px">
              <span class="flex items-center justify-center">STT</span>
            </th>
            <th scope="col" class="px-6 py-3 w-40 border border-l-2px">
              <span class="flex items-center justify-center">
                Tên danh mục
              </span>
            </th>
            <th scope="col" class="px-6 py-3 w-50 border border-l-2px">
              <span class="flex items-center justify-center">
                Slug
              </span>
            </th>
            <th scope="col" class="px-6 py-3 w-20 border border-l-2px">
              <span class="flex items-center justify-center">
                Số bài viết
              </span>
            </th>
            <th scope="col" class="px-6 py-3 w-30 border border-l-2px">
              <span class="flex items-center justify-center">
                Trạng thái
              </span>
            </th>
            <th scope="col" class="px-6 py-3 w-20 border border-l-2px">
              <span class="flex items-center justify-center">
                Hành động
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="font-medium text-zinc-500 text-[14px]">
          <tr v-for="(categoryblog, index) in categoryblogs" :key="categoryblog.id"
            class="bg-white border-b hover:bg-zinc-200 dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th scope="row" class="px-6 py-4 whitespace-nowrap dark:text-white">
              <span class="flex items-center justify-center">
                {{ index + 1 }}
              </span>
            </th>
            <td class="px-6 py-4 text-[#4485a3]">
              <span class="flex items-center justify-center">
                {{ categoryblog.name }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span class="flex items-center justify-center">
                {{ categoryblog.slug }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-center items-center">
                <span class="border border-green-500 bg-green-500 rounded-2xl px-2 py-2 text-white">
                  <!-- {{ branch.city }} -->
                    0
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="flex items-center justify-center">
                <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" :checked="categoryblog.status === 1"
                  @change="updateCategoryBlogStatus(categoryblog.id, categoryblog.status === 1 ? 0 : 1)" class="sr-only peer">
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white  after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#384153]">
                </div>
              </label>
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-center items-center">
                <button @click="goEditCategoryBlog(categoryblog.id)">
                  <span
                    class="mr-2 w-9 pb-1 flex items-center justify-center h-8 rounded-lg cursor-pointer hover:-translate-y-0.5 transition duration-300">
                    <svg viewBox="0 0 24 24" fill="none" width="26px" height="26px" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                        fill="#3d3d3d"></path>
                    </svg>
                  </span>
                </button>
                <button @click="deleteCategoryBlog(categoryblog.id)">
                  <span
                    class="flex items-center justify-center w-8 h-7 -mt-1 rounded-lg cursor-pointer hover:-translate-y-0.5 transition duration-300">
                    <svg width="26px" height="26px" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <rect width="22" height="22" rx="5" fill="url(#pattern0_48_276)" />
                      <defs>
                        <pattern id="pattern0_48_276" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlink:href="#image0_48_276" transform="scale(0.0078125)" />
                        </pattern>
                        <image id="image0_48_276" width="128" height="128" preserveAspectRatio="none"
                          xlink:href="data:image/png;base64,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" />
                      </defs>
                    </svg>
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>

</style>
