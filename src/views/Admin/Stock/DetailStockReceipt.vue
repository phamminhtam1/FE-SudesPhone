<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue';
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue';
import { onMounted, ref } from 'vue';
import axios from '@/plugins/axion'
import Swal from 'sweetalert2';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const receiptId = props.id
const receipt_code = ref('')
const branch = ref('')
const supplier = ref('')
const status = ref('')
const created_at = ref('')
const created_user = ref('')
const approved_user = ref('')
const sku = ref('')
const product = ref('')
const qty = ref('')
const unit_price = ref('')
const total_cost = ref('')
const loadingStatus = ref('')

function printReceipt() {
  // Tạo nội dung in với định dạng đẹp hơn
  const printContent = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1e40af; font-size: 28px; margin-bottom: 10px;">PHIẾU NHẬP KHO</h1>
        <p style="color: #6b7280; font-size: 16px;">Mã phiếu: ${receipt_code.value}</p>
      </div>

      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #1e40af; font-size: 20px; margin-bottom: 15px;">Thông tin phiếu nhập</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div>
            <strong>Chi nhánh:</strong> ${branch.value}
          </div>
          <div>
            <strong>Nhà cung cấp:</strong> ${supplier.value}
          </div>
          <div>
            <strong>Trạng thái:</strong> ${status.value}
          </div>
          <div>
            <strong>Thời gian tạo:</strong> ${new Date(created_at.value).toLocaleString('vi-VN', { hour12: false })}
          </div>
          <div>
            <strong>Người tạo:</strong> ${created_user.value}
          </div>
          <div>
            <strong>Người duyệt:</strong> ${approved_user.value || '----'}
          </div>
        </div>
      </div>

      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #166534; font-size: 20px; margin-bottom: 15px;">Thông tin sản phẩm</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div>
            <strong>Mã SP:</strong> ${sku.value}
          </div>
          <div>
            <strong>Tên sản phẩm:</strong> ${product.value}
          </div>
          <div>
            <strong>Số lượng:</strong> ${qty.value}
          </div>
          <div>
            <strong>Đơn giá:</strong> ${new Intl.NumberFormat('vi-VN').format(unit_price.value)} đ
          </div>
        </div>
      </div>

      <div style="text-align: right; padding: 20px; background: #fef3c7; border-radius: 8px;">
        <h3 style="color: #92400e; font-size: 24px; margin-bottom: 10px;">Tổng tiền phiếu nhập:</h3>
        <p style="color: #92400e; font-size: 32px; font-weight: bold; margin: 0;">
          ${new Intl.NumberFormat('vi-VN').format(total_cost.value)} đ
        </p>
      </div>
    </div>
  `

  const win = window.open('', '_blank', 'width=800,height=600')
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Phiếu nhập kho - ${receipt_code.value}</title>
      <meta charset="UTF-8">
      <style>
        @media print {
          body { margin: 0; padding: 20px; }
          .no-print { display: none; }
        }
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .print-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #1e40af;
        }
        .print-section {
          margin-bottom: 20px;
          padding: 15px;
          border-radius: 8px;
        }
        .print-total {
          text-align: right;
          font-size: 18px;
          font-weight: bold;
          margin-top: 20px;
          padding: 15px;
          background: #fef3c7;
          border-radius: 8px;
        }
        .signature-section {
          margin-top: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .signature-box {
          text-align: center;
        }
        .signature-line {
          border-top: 1px solid #000;
          margin-top: 50px;
          padding-top: 10px;
        }
      </style>
    </head>
    <body>
      ${printContent}
      <div class="no-print" style="text-align: center; margin-top: 20px;">
        <button onclick="window.print()" style="padding: 10px 20px; background: #1e40af; color: white; border: none; border-radius: 5px; cursor: pointer;">
          In phiếu
        </button>
        <button onclick="window.close()" style="padding: 10px 20px; background: #6b7280; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
          Đóng
        </button>
      </div>
    </body>
    </html>
  `)
  win.document.close()
}


async function approveReceipt(newStatus) {
  loadingStatus.value = newStatus
  try {
    const form = new FormData()
    form.append('_method', 'PUT')
    form.append('status', newStatus)
    await axios.post(`/api/stock-receipt/approve/${receiptId}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    status.value = newStatus
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Cập nhật thành công',
      confirmButtonText: 'Đóng',
    })
  } catch (err) {
    if (err.response && err.response.status === 403) {
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: 'Bạn không có quyền duyệt phiếu',
        confirmButtonText: 'Đóng',
      })
    }
  } finally {
    loadingStatus.value = ''
  }
}

onMounted(async () => {
  try {
    const res = await axios.get(`/api/stock-receipt/${receiptId}`)
    const s = res.data.stock
    receipt_code.value = s.receipt_code
    branch.value = s.branch.name
    supplier.value = s.supplier.name
    status.value = s.status
    created_at.value = s.created_at
    created_user.value = s.user.name
    approved_user.value = s.approver?.name
    sku.value = s.sku
    product.value = s.product.name
    qty.value = s.qty
    unit_price.value = s.unit_price
    total_cost.value = s.total_cost
  } catch (err) {
    console.error(err)
  }
})

</script>

<template>
  <div>
    <LeftMenu />
    <HeaderAdmin />
    <div class="ml-57 min-h-screen bg-[#F3F3F3] pt-5 pb-10">
      <div class="grid grid-cols-1 px-7 py-3">
        <div class="flex justify-end">
          <button @click="approveReceipt('đã duyệt')" v-if="status === 'chờ duyệt'"
            class=" flex justify-center items-center border rounded-lg bg-green-600 text-white font-medium px-3 py-2 mr-4 hover:bg-green-700 cursor-pointer">
            <svg fill="#FFFFFF" viewBox="0 0 32 32" width="20px" height="20px" enable-background="new 0 0 32 32"
              version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <path
                d="M26,24c-0.553,0-1,0.448-1,1v4H7V3h10v7c0,0.552,0.447,1,1,1h7v4c0,0.552,0.447,1,1,1s1-0.448,1-1v-4.903 c0.003-0.033,0.02-0.063,0.02-0.097c0-0.337-0.166-0.635-0.421-0.816l-7.892-7.891c-0.086-0.085-0.187-0.147-0.292-0.195 c-0.031-0.015-0.063-0.023-0.097-0.034c-0.082-0.028-0.166-0.045-0.253-0.05C18.043,1.012,18.022,1,18,1H6C5.447,1,5,1.448,5,2v28 c0,0.552,0.447,1,1,1h20c0.553,0,1-0.448,1-1v-5C27,24.448,26.553,24,26,24z M19,9V4.414L23.586,9H19z">
              </path>
              <path
                d="M30.73,15.317c-0.379-0.404-1.01-0.424-1.414-0.047l-10.004,9.36l-4.629-4.332c-0.404-0.378-1.036-0.357-1.414,0.047 c-0.377,0.403-0.356,1.036,0.047,1.413l5.313,4.971c0.192,0.18,0.438,0.27,0.684,0.27s0.491-0.09,0.684-0.27l10.688-10 C31.087,16.353,31.107,15.72,30.73,15.317z">
              </path>
            </svg>
            <span class="ml-2"> {{ loadingStatus === 'đã duyệt' ? 'Đang gửi...' : 'Duyệt' }}
            </span>
          </button>
          <button @click="approveReceipt('đã hủy')" v-if="status === 'chờ duyệt'"
            class=" flex justify-center items-center border rounded-lg bg-red-600 text-white font-medium px-3 py-2 mr-4 hover:bg-red-700 cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" width="13px" height="13px" class="mt-0.5"
              xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">=
              <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#ffffff"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span class="ml-2"> {{ loadingStatus === 'đã hủy' ? 'Đang gửi...' : 'Từ chối' }}
            </span>
          </button>
          <button @click="approveReceipt('đã nhập')" v-if="status === 'đã duyệt'"
            class=" flex justify-center items-center border rounded-lg bg-yellow-500 text-white font-medium px-3 py-2 mr-4 hover:bg-yellow-600 cursor-pointer">
            <svg fill="#ffffff" height="13px" width="13px" class=" mt-1" version="1.1" id="Layer_1"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
              enable-background="new 0 0 512 512" xml:space="preserve" stroke="#ffffff">
              <polygon points="437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94 "></polygon>
            </svg>
            <span class="ml-2"> {{ loadingStatus === 'đã nhập' ? 'Đang gửi...' : 'Đã nhận hàng' }}
            </span>
          </button>
          <button @click="printReceipt"
            class=" flex justify-center items-center border rounded-lg bg-[#2E5DEA] text-white font-medium px-3 py-2 hover:bg-blue-800 cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 16.75H16C15.8011 16.75 15.6103 16.671 15.4697 16.5303C15.329 16.3897 15.25 16.1989 15.25 16C15.25 15.8011 15.329 15.6103 15.4697 15.4697C15.6103 15.329 15.8011 15.25 16 15.25H18C18.3315 15.25 18.6495 15.1183 18.8839 14.8839C19.1183 14.6495 19.25 14.3315 19.25 14V10C19.25 9.66848 19.1183 9.35054 18.8839 9.11612C18.6495 8.8817 18.3315 8.75 18 8.75H6C5.66848 8.75 5.35054 8.8817 5.11612 9.11612C4.8817 9.35054 4.75 9.66848 4.75 10V14C4.75 14.3315 4.8817 14.6495 5.11612 14.8839C5.35054 15.1183 5.66848 15.25 6 15.25H8C8.19891 15.25 8.38968 15.329 8.53033 15.4697C8.67098 15.6103 8.75 15.8011 8.75 16C8.75 16.1989 8.67098 16.3897 8.53033 16.5303C8.38968 16.671 8.19891 16.75 8 16.75H6C5.27065 16.75 4.57118 16.4603 4.05546 15.9445C3.53973 15.4288 3.25 14.7293 3.25 14V10C3.25 9.27065 3.53973 8.57118 4.05546 8.05546C4.57118 7.53973 5.27065 7.25 6 7.25H18C18.7293 7.25 19.4288 7.53973 19.9445 8.05546C20.4603 8.57118 20.75 9.27065 20.75 10V14C20.75 14.7293 20.4603 15.4288 19.9445 15.9445C19.4288 16.4603 18.7293 16.75 18 16.75Z"
                fill="#FFFFFF"></path>
              <path
                d="M16 8.75C15.8019 8.74741 15.6126 8.66756 15.4725 8.52747C15.3324 8.38737 15.2526 8.19811 15.25 8V4.75H8.75V8C8.75 8.19891 8.67098 8.38968 8.53033 8.53033C8.38968 8.67098 8.19891 8.75 8 8.75C7.80109 8.75 7.61032 8.67098 7.46967 8.53033C7.32902 8.38968 7.25 8.19891 7.25 8V4.5C7.25 4.16848 7.3817 3.85054 7.61612 3.61612C7.85054 3.3817 8.16848 3.25 8.5 3.25H15.5C15.8315 3.25 16.1495 3.3817 16.3839 3.61612C16.6183 3.85054 16.75 4.16848 16.75 4.5V8C16.7474 8.19811 16.6676 8.38737 16.5275 8.52747C16.3874 8.66756 16.1981 8.74741 16 8.75Z"
                fill="#FFFFFF"></path>
              <path
                d="M15.5 20.75H8.5C8.16848 20.75 7.85054 20.6183 7.61612 20.3839C7.3817 20.1495 7.25 19.8315 7.25 19.5V12.5C7.25 12.1685 7.3817 11.8505 7.61612 11.6161C7.85054 11.3817 8.16848 11.25 8.5 11.25H15.5C15.8315 11.25 16.1495 11.3817 16.3839 11.6161C16.6183 11.8505 16.75 12.1685 16.75 12.5V19.5C16.75 19.8315 16.6183 20.1495 16.3839 20.3839C16.1495 20.6183 15.8315 20.75 15.5 20.75ZM8.75 19.25H15.25V12.75H8.75V19.25Z"
                fill="#FFFFFF"></path>
            </svg>
            <span class="ml-2">In phiếu</span>
          </button>
        </div>
        <div class="mt-6 shadow-xl border-b-zinc-300 rounded-lg">
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <h1 class=" text-white font-medium text-xl">Thông tin phiếu nhập</h1>
          </div>
          <div class="grid grid-cols-3 gap-4 p-6">
            <div class="flex flex-col">
              <label class="font-normal">Mã phiếu</label>
              <span class="text-xl text-zinc-700 font-medium mt-2">{{ receipt_code }}</span>
            </div>
            <div class="flex flex-col">
              <label class="font-normal">Chi nhánh</label>
              <span class="text-xl text-zinc-700 font-medium mt-2">{{ branch }}</span>
            </div>
            <div class="flex flex-col">
              <label for="">Nhà cung cấp</label>
              <span class="text-xl text-zinc-700 font-medium mt-2">{{ supplier }}</span>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4 p-6">
            <div class="flex flex-col">
              <label class="">Trạng thái</label>
              <span class="flex justify-center text-xl font-medium capitalize mt-2 px-3 py-1 rounded-xl w-1/2" :class="{
                'text-[#954D0E] bg-[#FEF9C3]': status === 'chờ duyệt',
                'text-[#166534] bg-[#98f8ba]': status === 'đã nhập',
                'text-[#1E40AF] bg-[#DBEAFE]': status === 'đã duyệt',
                'text-[#991B1B] bg-[#FEE2E2]': status === 'đã hủy'
              }">
                {{ status }}
              </span>
            </div>
            <div class="flex flex-col">
              <label for="">Thời gian tạo</label>
              <span class="text-xl text-zinc-700 font-medium mt-2">{{ new Date(created_at).toLocaleString('vi-VN', {
                hour12: false
              }) }}</span>
            </div>
            <div class="flex flex-col">
              <label for="">Người tạo </label>
              <span class="text-xl text-zinc-700 font-medium mt-2">{{ created_user }}</span>
            </div>
          </div>
          <div class="p-6">
            <label for="">Người duyệt: </label>
            <span class="text-xl text-zinc-700 font-medium mt-2 ml-1">{{ approved_user ?? '----' }}</span>
          </div>
        </div>
        <div class="mt-6 shadow-xl border-b-zinc-300 rounded-lg">
          <div class="bg-gradient-to-r from-green-600 to-green-700 p-6">
            <h1 class=" text-white font-medium text-xl">Thông tin sản phẩm</h1>
          </div>
          <div class="grid grid-cols-3 gap-4 p-6">
            <div class="flex flex-col">
              <label class="">Mã SP</label>
              <span class="text-xl text-zinc-700 font-medium mt-2">{{ sku }}</span>
            </div>
            <div class="flex flex-col">
              <label for="">Tên sản phẩm</label>
              <span class="text-xl text-zinc-700 font-medium mt-2">{{ product }}</span>
            </div>
            <div class="flex flex-col">
              <label for="">Số lượng</label>
              <span class="text-xl text-zinc-700 font-medium mt-2">{{ qty }}</span>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4 p-6">
            <div class="flex flex-col">
              <label class="">Đơn giá</label>
              <span class="text-xl text-zinc-700 font-medium mt-2">{{ new
                Intl.NumberFormat('vi-VN').format(unit_price) }} đ</span>
            </div>
            <div class="flex flex-col">
              <label for="">Tổng tiền sản phẩm</label>
              <span class="text-xl text-zinc-700 font-medium mt-2">{{ new
                Intl.NumberFormat('vi-VN').format(total_cost) }} đ</span>
            </div>
          </div>
        </div>
        <div class="mt-10 shadow-xl border-zinc-300 rounded-lg flex justify-between">
          <span class="text-xl text-zinc-700 font-medium p-6">
            Tổng tiền phiếu nhập:
          </span>
          <span class="text-3xl text-green-600 font-bold p-6 mr-10"> {{ new
            Intl.NumberFormat('vi-VN').format(total_cost) }} đ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>