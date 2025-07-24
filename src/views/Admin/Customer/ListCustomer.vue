<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue'
import axiosAdmin from '@/plugins/axion'
import { onMounted } from 'vue'
import router from '@/router'
import { ref } from 'vue'

const customers = ref([])

onMounted(() => {
  axiosAdmin.get('/api/customer').then((res) => {
    customers.value = res.data.customers
    console.log(customers)
  })
})

const formatDateTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  // Nếu date không hợp lệ, trả về chuỗi gốc
  if (isNaN(date.getTime())) return dateString
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
function goDetailCustomer(id) {
  router.push({ name: 'customer-detail', params: { id } })
}
</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#F3F3F3] flex justify-start pt-5">
    <div class="border border-zinc-300 p-5 bg-white rounded-lg ml-5 mr-5">
      <table
        class="table-fixed w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs uppercase bg-[#384153] text-white dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3 w-12 border border-l-2px">
              <span class="flex items-center justify-center">STT</span>
            </th>
            <th scope="col" class="px-6 py-3 w-25 border border-l-2px">
              <span class="flex justify-center"> Họ tên </span>
            </th>
            <th scope="col" class="px-6 py-3 w-30 border border-l-2px">
              <span class="flex justify-center"> Email </span>
            </th>
            <th scope="col" class="px-6 py-3 w-25 border border-l-2px">
              <span class="flex justify-center"> Số điện thoại </span>
            </th>
            <th scope="col" class="px-6 py-3 w-20 border border-l-2px">
              <span class="flex justify-center"> Số đơn hàng </span>
            </th>
            <th scope="col" class="px-6 py-3 w-25 border border-l-2px">
              <span class="flex justify-center"> Ngày tham gia </span>
            </th>
            <th scope="col" class="px-6 py-3 w-20 border border-l-2px">
              <span class="flex justify-center"> Trạng thái </span>
            </th>
            <th scope="col" class="px-6 py-3 w-20 border border-l-2px">Hành động</th>
          </tr>
        </thead>
        <tbody class="font-medium text-zinc-500 text-[14px]">
          <tr
            v-for="(customer, index) in customers"
            :key="customer.cust_id"
            class="bg-white border-b hover:bg-zinc-200 transition dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <th scope="row" class="px-6 py-4 whitespace-nowrap dark:text-white">
              <div class="flex justify-center">
                {{ index + 1 }}
              </div>
            </th>
            <td class="px-6 py-4">
              <div class="flex justify-center">
                {{ customer.first_name + ' ' + customer.last_name }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="email-scroll max-w-full overflow-x-auto">
                <span class="whitespace-nowrap select-text flex justify-center">
                  {{ customer.email }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-center">
                {{ customer.phone }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-center">
                {{ customer.order.length }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-center items-center">
                {{ formatDateTime(customer.created_at) }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-center">
                <label class="relative inline-flex items-center ml-3 cursor-pointer">
                  <input
                    type="checkbox"
                    :checked="customer.status === 1"
                    @change="updateStatusSupplier(customer.cust_id, customer.status === 1 ? 0 : 1)"
                    class="sr-only peer"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#384153]"
                  ></div>
                </label>
              </div>
            </td>
            <td class="px-3 py-4">
              <div class="flex justify-center gap-2">
                <button
                  @click.prevent="goDetailCustomer(customer.cust_id)"
                  class="border border-green-500 bg-green-500 px-2 rounded-xl text-white cursor-pointer hover:-translate-y-0.5 transition duration-300 hover:bg-green-600 hover:border-green-600"
                >
                  Xem chi tiết
                </button>
                <button @click="deleteSupplier(supplier.supp_id)">
                  <span
                    class="flex items-center justify-center w-8 h-7 -mt-1 rounded-lg cursor-pointer hover:-translate-y-0.5 transition duration-300"
                  >
                    <svg
                      width="26px"
                      height="26px"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <rect width="22" height="22" rx="5" fill="url(#pattern0_48_276)" />
                      <defs>
                        <pattern
                          id="pattern0_48_276"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use xlink:href="#image0_48_276" transform="scale(0.0078125)" />
                        </pattern>
                        <image
                          id="image0_48_276"
                          width="128"
                          height="128"
                          preserveAspectRatio="none"
                          xlink:href="data:image/png;base64,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"
                        />
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

<style></style>
