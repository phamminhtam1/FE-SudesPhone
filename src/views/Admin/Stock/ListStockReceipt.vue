<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue';
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue';
import Swal from 'sweetalert2';
import { ref, onMounted } from 'vue';
import axios from '@/plugins/axion';
import router from '@/router';
import { watch } from 'vue';

function goDetailStockReceipt(id) {
  router.push({ name: 'detail-stock-receipt', params: { id } })
}

function resetFilters() {
  keyword.value = ''
  selectedStatus.value = ''
  selectedBranch.value = ''
  selectedDate.value = ''
}

function getPageNumbers() {
  const pages = []
  const maxVisiblePages = 5
  if (lastPage.value <= maxVisiblePages) {
    for (let i = 1; i <= lastPage.value; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    if (currentPage.value > 3) {
      pages.push('...')
    }
    const start = Math.max(2, currentPage.value - 1)
    const end = Math.min(lastPage.value - 1, currentPage.value + 1)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    if (currentPage.value < lastPage.value - 2) {
      pages.push('...')
    }
    if (lastPage.value > 1) {
      pages.push(lastPage.value)
    }
  }
  return pages
}

const stocks = ref([])
const branches = ref([])
const error = ref(false)
const keyword = ref('')
const selectedPerPage = ref(10)
const selectedStatus = ref('')
const selectedBranch = ref('')
const selectedDate = ref('')
const statusCount = ref({
  'chờ duyệt': 0,
  'đã duyệt': 0,
  'đã nhập': 0,
  'đã hủy': 0
})

const currentPage = ref(1)
const lastPage = ref(1)
const total = ref(0)
const from = ref(0)
const to = ref(0)

watch([keyword, selectedStatus, selectedBranch, selectedPerPage], async () => {
  currentPage.value = 1
  await featchStockReceipt()
})

async function featchStatus() {
  try {
    const res = await axios.get('/api/stock-receipt/statusCount')
    statusCount.value = res.data.statusCount
  } catch (err) {
    console.error(err)
  }
}

async function featchBranch() {
  try {
    const res = await axios.get('/api/branch')
    branches.value = res.data.branch
  } catch (err) {
    console.error(err)
  }
}

async function featchStockReceipt() {
  error.value = null
  try {
    const params = {
      page: currentPage.value,
      per_page: selectedPerPage.value
    }
    if (keyword.value) {
      params.keyword = keyword.value
    }
    if (selectedStatus.value) {
      params.status = selectedStatus.value
    }
    if (selectedBranch.value) {
      params.branch_id = selectedBranch.value
    }
    if (selectedDate.value) {
      params.created_at = selectedDate.value
    }
    const res = await axios.get('/api/stock-receipt', { params })
    stocks.value = res.data.stock.data
    currentPage.value = res.data.stock.current_page
    lastPage.value = res.data.stock.last_page
    total.value = res.data.stock.total
    from.value = res.data.stock.from
    to.value = res.data.stock.to
  } catch (err) {
    error.value = err.response?.data?.message
  }
}

async function goToPage(page) {
  if (page >= 1 && page <= lastPage.value) {
    currentPage.value = page
    await featchStockReceipt()
  }
}


async function deleteProduct(id) {
  const result = await Swal.fire({
    title: 'Xác nhận xóa',
    text: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  })
  if (result.isConfirmed) {
    try {
      await axios.delete(`api/product/delete/${id}`)
      await featchStockReceipt()
      Swal.fire('Đã xóa!', 'Sản phẩm này đã được xóa thành công.', 'success')
    } catch (err) {
      error.value = err.response?.data?.message || 'Có lỗi xảy ra khi xóa vị trí'
    }
  }
}
onMounted(async () => {
  await featchStockReceipt()
  await featchStatus()
  await featchBranch()
})

</script>
<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#F3F3F3] pt-5">
    <div class="mx-5 border bg-white border-zinc-300 rounded-lg">
      <div class="flex p-5">
        <svg viewBox="0 0 24 24" fill="none" width="28px" height="28px" class="mr-2" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z"
            stroke="#2563EB" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
          </path>
          <path
            d="M2 7V21C2 21.83 2.93998 22.3 3.59998 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.28998 22.29C8.67998 22.68 9.32002 22.68 9.71002 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z"
            stroke="#2563EB" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
          </path>
          <path opacity="0.4" d="M6 9H12" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"></path>
          <path opacity="0.4" d="M6.75 13H11.25" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"></path>
        </svg>
        <span class="font-medium">Quản lý phiếu nhập kho và theo dõi trạng thái</span>
      </div>
      <div class="grid grid-cols-4 gap-5 p-5 ">
        <div class="w-full border shadow-md hover:bg-zinc-200 transition duration-300 border-zinc-300 rounded-lg">
          <div class="p-4">
            <span class="text-2xl font-bold text-[#2563EB]">{{ statusCount['chờ duyệt'] }}</span>
            <h3 class="text-sm text-zinc-600">Chờ duyệt</h3>
          </div>
        </div>
        <div class="w-full border shadow-md hover:bg-zinc-200 transition duration-300 border-zinc-300 rounded-lg">
          <div class="p-4">
            <span class="text-2xl  font-bold text-[#16A34A]">{{ statusCount['đã nhập'] }}</span>
            <h3 class="text-sm text-zinc-600">Đã nhập</h3>
          </div>
        </div>
        <div class="w-full border shadow-md hover:bg-zinc-200 transition duration-300 border-zinc-300 rounded-lg">
          <div class="p-4">
            <span class="text-2xl  font-bold text-[#CA8A04]">{{ statusCount['đã duyệt'] }}</span>
            <h3 class="text-sm text-zinc-600">Đã duyệt</h3>
          </div>
        </div>
        <div class="w-full border shadow-md hover:bg-zinc-200 transition duration-300 border-zinc-300 rounded-lg">
          <div class="p-4">
            <span class="text-2xl font-bold text-[#DC2626]">{{ statusCount['đã hủy'] }}</span>
            <h3 class="text-sm text-zinc-600">Đã hủy</h3>
          </div>
        </div>
      </div>
      <div class="flex justify-end mr-7 text-sm items-center">
        <span @click="resetFilters"
          class="cursor-pointer hover:text-red-500 transition duration-200 mt-5 -mb-5 py-2">Xóa bộ
          lọc</span>
      </div>
      <div class="flex justify-between w-full mb-2 p-2">
        <div class="p-3 w-1/3">
          <span class="text-[12px] font-medium block mb-2">Tìm kiếm</span>
          <div class="flex border border-zinc-300 rounded-lg h-10 justify-start items-center">
            <svg viewBox="0 0 32 32" version="1.1" width="13px" height="13px" class="mx-3 mt-0.5"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#6b6b6b" stroke="#6b6b6b">
              <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-256.000000, -1139.000000)"
                fill="#6b6b6b">
                <path
                  d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"
                  id="search" sketch:type="MSShapeGroup"> </path>
              </g>
            </svg>
            <input v-model="keyword" type="text" class="w-full focus:outline-none focus:ring-0"
              placeholder="Tìm kiếm theo mã phiếu, mã SP...">
          </div>
        </div>
        <div class="p-3 w-2/3 flex justify-between overflow-hidden">
          <div class="w-1/4 mr-3">
            <span class="text-[12px] font-medium block mb-2">Trạng thái</span>
            <div class="">
              <select v-model="selectedStatus"
                class="border text-zinc-700 border-zinc-300 w-full h-10 rounded-lg pl-3 pr-8 mr-2">
                <option value="">Tất cả trạng thái</option>
                <option value="chờ duyệt">Chờ duyệt</option>
                <option value="đã duyệt">Đã duyệt</option>
                <option value="đã nhập">Đã nhập</option>
                <option value="đã hủy">Đã hủy</option>

              </select>
            </div>
          </div>
          <div class="w-1/4 mr-3">
            <span class="text-[12px] font-medium block mb-2">Chi nhánh</span>
            <div>
              <select v-model="selectedBranch"
                class="border text-zinc-700 border-zinc-300 w-full h-10 rounded-lg pl-3 pr-8">
                <option value="">Tất cả chi nhánh</option>
                <option v-for="branch in branches" :key="branch.branch_id" :value="branch.branch_id">{{ branch.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="w-1/4 mr-3">
            <span class="text-[12px] font-medium block mb-2">Ngày</span>
            <input type="date" v-model="selectedDate"
              class="border text-zinc-700 border-zinc-300 h-10 rounded-lg px-3 w-full" placeholder="ngày" />
          </div>
          <div class="w-1/4 pl-4">
            <div class="flex justify-start w-full mt-6.5">
              <button @click="exportToExcel"
                class="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition duration-300">
                Xuất Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-5 mt-5 border border-zinc-300 bg-white rounded-lg">
      <div class="flex justify-between mb-1 p-4">
        <div class=" flex justify-between items-center">
          <select v-model="selectedPerPage" class="border text-zinc-700 border-zinc-400 w-12 h-7 rounded-lg">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div class="flex">
          <div class="mr-3 mt-1 text-zinc-600">
            Tổng cộng: <span class="text-[#2563EB]">{{ total }}</span> phiếu
          </div>
          <router-link to="/admin/purchase/stock-receipt/create">
            <button class="border rounded-lg px-4 flex py-1.5 bg-[#2563EB] text-zinc-100 cursor-pointer
               hover:-translate-y-0.5 transition duration-300 ">
              <svg viewBox="0 0 24 24" fill="none" width="24px" height="24px" class="mr-2"
                xmlns="http://www.w3.org/2000/svg" stroke="#f5f5f5">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z" fill="#ededed"></path>
              </svg>
              <span class="text-[16px] font-medium">Thêm phiếu nhập</span>
            </button>
          </router-link>
        </div>
      </div>
      <div class="overflow-x-auto ">
        <table class="table-auto w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs bg-[#384153] uppercase text-white dark:bg-gray-700 dark:text-gray-400">
            <tr class="">
              <th scope="col" class="px-2 py-3 w-12">
                <span class="flex items-center justify-center">STT</span>
              </th>
              <th scope="col" class="px-2 py-3 w-33 border-l">
                <span class="flex items-center justify-center">Mã phiếu</span>
              </th>
              <th scope="col" class="px-2 py-3 w-35 border-l">
                <span class="flex items-center justify-center">Chi nhánh</span>
              </th>
              <th scope="col" class="px-2 py-3 w-35 border-l">
                <span class="flex items-center justify-center">Mã SP</span>
              </th>
              <th scope="col" class="px-2 py-3 w-20 border-l">
                <span class="flex items-center justify-center">Số lượng</span>
              </th>
              <th scope="col" class="px-2 py-3 w-20 border-l">
                <span class="flex items-center justify-center">Tổng tiền</span>
              </th>
              <th scope="col" class="px-2 py-3 w-25 border-l">
                <span class="flex items-center justify-center">Trạng thái</span>
              </th>
              <th scope="col" class="px-2 py-3 w-25 border-l">
                <span class="flex items-center justify-center">Thời gian tạo</span>
              </th>
              <th scope="col" class="px-2 py-3 w-25 border-l">
                <span class="flex items-center justify-center">Hành động</span>
              </th>
            </tr>
          </thead>
          <tbody class="font-medium text-zinc-700 text-[13px]">
            <tr v-for="(stock, index) in stocks" :key="stock.receipt_id"
              class="bg-white border-b text-sm hover:bg-zinc-200 transition dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th scope="row" class="px-6 py-4 whitespace-nowrap dark:text-white">
                <span class="flex justify-center items-center"> {{ index + 1 }}</span>
              </th>
              <td class="px-2 py-4 text-[#2563EC]">
                <span class="flex justify-center items-center"> {{ stock.receipt_code }}</span>
              </td>
              <td class="px-2 py-4 ">
                <span class="flex justify-center items-center">{{ stock.branch.name }}</span>
              </td>
              <td class="px-2 py-4 ">
                <span class="flex justify-center items-center">{{ stock.product.sku }}</span>
              </td>
              <td class="px-2 py-4 ">
                <span class="flex justify-center items-center">{{ stock.qty }}</span>
              </td>
              <td class="px-2 py-4 ">
                <p class="flex justify-center text-zinc-700 font-bold items-center">{{ new
                  Intl.NumberFormat('vi-VN').format(stock.total_cost) }} đ
                </p>
              </td>
              <td class="px-2 py-4 flex justify-center items-center">
                <span class="rounded-xl inline-block capitalize text-[15px] py-2 px-2" :class="{
                  'text-[#954D0E] bg-[#FEF9C3]': stock.status === 'chờ duyệt',
                  'text-[#166534] bg-[#DCFCE7]': stock.status === 'đã nhập',
                  'text-[#1E40AF] bg-[#DBEAFE]': stock.status === 'đã duyệt',
                  'text-[#991B1B] bg-[#FEE2E2]': stock.status === 'đã hủy'
                }">{{ stock.status }}</span>
              </td>
              <td class="px-6 py-4 ">
                <span class="flex justify-center items-center">{{ new Date(stock.created_at).toLocaleString('vi-VN', {
                  hour12: false
                }) }}</span>
              </td>
              <td class="px-1 py-4 max-w-30">
                <div class="flex justify-center items-center gap-x-1">
                  <button @click="goDetailStockReceipt(stock.receipt_id)"
                    class="border-red-500 rounded-xl p-2 bg-red-500 cursor-pointer hover:-translate-y-0.5 transition duration-300 hover:bg-red-600">
                    <span class="text-white">
                      Xem / Duyệt
                    </span>
                  </button>
                  <button @click="deleteProduct(stock.receipt_id)">
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
    <div v-if="lastPage > 1" class="flex items-center justify-between px-6 py-4 ">
      <div class="text-sm text-gray-700">
        Hiển thị {{ from }} đến {{ to }} trong tổng số <span class="text-[#2563EB]"> {{ total }}</span> kết quả
      </div>
      <div class="flex items-center space-x-2">
        <!-- Previous button -->
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          Trước
        </button>

        <!-- Page numbers -->
        <template v-for="page in getPageNumbers()" :key="page">
          <button v-if="page !== '...'" @click="goToPage(page)" :class="[
            'px-3 py-2 text-sm font-medium rounded-md',
            currentPage === page
              ? 'bg-[#2563EB] text-white'
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
          ]">
            {{ page }}
          </button>
          <span v-else class="px-3 py-2 text-sm text-gray-500">...</span>
        </template>

        <!-- Next button -->
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === lastPage"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          Sau
        </button>
      </div>
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
