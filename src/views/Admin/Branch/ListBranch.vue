<script setup>

import LeftMenu from '@/components/layout/backend/LeftMenu.vue';
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue';
import Swal from 'sweetalert2';
import { ref, onMounted } from 'vue';
import axios from '@/plugins/axion';
import router from '@/router';
import { watch } from 'vue';

const braches = ref([])
const error = ref(null)
const keyword = ref('')

watch(keyword, async () => {
  await featchBranches()
})

async function featchBranches() {
  error.value = null
  try {
    const params = {}
    if (keyword.value) {
      params.keyword = keyword.value
    }
    const res = await axios.get('/api/branch', { params })
    braches.value = res.data.branch
  } catch (err) {
    error.value = err.response?.data?.message
  }
}

async function deleteBranch(id) {
  const result = await Swal.fire({
    title: 'Xác nhận xóa',
    text: 'Bạn có chắc chắn muốn xóa chi nhánh này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      await axios.delete(`/api/branch/delete/${id}`)
      await featchBranches()
      Swal.fire('Đã xóa!', 'Chi nhánh đã được xóa thành công.', 'success')
    } catch (err) {
      const msg = err.response?.data?.message || 'Có lỗi xảy ra khi xóa chi nhánh'
      Swal.fire('Lỗi!', msg, 'error')
    }
  }
}

async function updateBranchStatus(id, newStatus) {
  try {
    await axios.put(`/api/branch/update-status/${id}`, {
      status: newStatus
    })
    await featchBranches() // Refresh the list after status update
  } catch (err) {
    error.value = err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái'
  }
}

function goEditBranch(id) {
  router.push({ name: 'edit_branch', params: { id } })
}

onMounted(featchBranches)

</script>
<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#F3F3F3] pt-5 flex justify-start">
    <div class="flex-1 overflow-x-auto mx-5 rounded-lg bg-white border border-zinc-300">
      <div class="flex justify-between mb-1 mt-1 p-4">
        <div class="flex border border-zinc-300 rounded-lg w-1/3 h-10 justify-start items-center">
          <svg viewBox="0 0 32 32" version="1.1" width="13px" height="13px" class="mx-3 mt-0.5"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#6b6b6b" stroke="#6b6b6b">
            <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-256.000000, -1139.000000)" fill="#6b6b6b">
              <path
                d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"
                id="search" sketch:type="MSShapeGroup"> </path>
            </g>
          </svg>
          <input v-model="keyword" type="text" class="w-full focus:outline-none focus:ring-0"
            placeholder="Tìm kiếm theo tên chi nhánh...">
        </div>
        <div class="flex">
          <div class="mr-3 mt-1 text-zinc-600">
            Tổng cộng: <span class="text-[#2563EB]">{{ braches.length }}</span> chi nhánh
          </div>
          <router-link to="/admin/branch/create">
            <button class="border rounded-lg px-4 flex py-1.5 bg-[#2563EB] text-zinc-100 cursor-pointer
               hover:-translate-y-0.5 transition duration-300 ">
              <svg viewBox="0 0 24 24" fill="none" width="24px" height="24px" class="mr-2"
                xmlns="http://www.w3.org/2000/svg" stroke="#f5f5f5">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z" fill="#ededed"></path>
              </svg>
              <span class="text-[16px] font-medium">Thêm chi nhánh</span>
            </button>
          </router-link>
        </div>
      </div>
      <table class=" table-fixed w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs uppercase bg-[#384153] text-white dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 w-12 border border-l-2px">
              <span class="flex items-center justify-center">STT</span>
            </th>
            <th scope="col" class="px-6 py-3 w-33 border border-l-2px">
              Tên chi nhánh
            </th>
            <th scope="col" class="px-6 py-3 w-33 border border-l-2px">
              Ảnh đại diện
            </th>
            <th scope="col" class="px-6 py-3 w-33 border border-l-2px">
              Số điện thoại
            </th>
            <th scope="col" class="px-6 py-3 w-50 border border-l-2px">
              Email chi nhánh
            </th>
            <th scope="col" class="px-6 py-3 w-40 border border-l-2px">
              Địa chỉ
            </th>
            <th scope="col" class="px-6 py-3 w-42 border border-l-2px">
              Thành phố
            </th>
            <th scope="col" class="px-6 py-3 w-26 border border-l-2px">
              Trạng thái
            </th>
            <th scope="col" class="px-6 py-3 w-28 border border-l-2px">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody class="font-medium text-zinc-500 text-[14px]">
          <tr v-for="(branch, index) in braches" :key="branch.branch_id"
            class="bg-white border-b hover:bg-zinc-200 dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th scope="row" class="px-6 py-4 whitespace-nowrap dark:text-white">
              {{ index + 1 }}
            </th>
            <td class="px-6 py-4 text-[#4485a3]">
              {{ branch.name }}
            </td>
            <td class="px-6 py-4 flex">
              <img v-if="branch.images.length" :src="`/storage/${branch.images[0].path}`" alt=""
                class=" w-full h-15 object-cover rounded" />
            </td>
            <td class="px-6 py-4">
              {{ branch.phone }}
            </td>
            <td class="px-6 py-4 w-56"> <!-- w-56 ≈ 224 px, đổi tùy ý -->
              <div class=" email-scroll max-w-full overflow-x-auto">
                <span class="whitespace-nowrap select-text">
                  {{ branch.email }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              {{ branch.address_line1 }}
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-center items-center">
                <span class="border border-green-500 bg-green-500 rounded-2xl px-2 py-2 text-white">
                  {{ branch.city }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" :checked="branch.status === 1"
                  @change="updateBranchStatus(branch.branch_id, branch.status === 1 ? 0 : 1)" class="sr-only peer">
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white  after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#384153]">
                </div>
              </label>
            </td>
            <td class="px-6 py-4">
              <div class="flex">
                <button @click="goEditBranch(branch.branch_id)">
                  <span
                    class="mr-2 w-9 pb-1 flex items-center justify-center h-8 rounded-lg cursor-pointer hover:-translate-y-0.5 transition duration-300">
                    <svg viewBox="0 0 24 24" fill="none" width="26px" height="26px" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                        fill="#3d3d3d"></path>
                    </svg>
                  </span>
                </button>
                <button @click="deleteBranch(branch.branch_id)">
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
/* Chỉ mảnh 4px, bo tròn nhẹ, màu trung tính */


/* Firefox */
.email-scroll {
  scrollbar-width: thin;
  scrollbar-color: #9ca3af transparent;
}
</style>
