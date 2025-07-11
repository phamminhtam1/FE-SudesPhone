<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue'
import Swal from 'sweetalert2'
import { ref, reactive, onMounted } from 'vue'
import axios from '@/plugins/axion'
import { Html5QrcodeScanner } from 'html5-qrcode'
import router from '@/router'

const errors = reactive({})
const loading = ref(false)

const sku = ref('')
const qty = ref('')
const unit_price = ref('')
const note = ref('')
const selectedBranch = ref('')
const branches = ref([])
const selectedSupplier = ref('')
const suppliers = ref([])

function openQrModal() {
  // Hiển thị Swal modal
  Swal.fire({
    title: 'Quét mã QR',
    html: `
  <div style="display: flex; flex-direction: column; align-items: center;">
    <p style="font-weight: 500; margin-bottom: 10px;">Đưa mã QR của sản phẩm vào khung bên dưới</p>
    <div id="reader" style="width: 280px; height: 320px; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);"></div>
    <p style="font-size: 13px; color: gray; margin-top: 8px;">* Hệ thống sẽ tự động nhận mã</p>
  </div>
`,
    showCloseButton: true,
    showConfirmButton: false,
    willClose: () => {
      if (window.qrScannerInstance) {
        window.qrScannerInstance.clear()
        window.qrScannerInstance = null
      }
    },
    didOpen: () => {
      const scanner = new Html5QrcodeScanner("reader", {
        fps: 20,
        qrbox: { width: 200, height: 200 }
      }, false)

      window.qrScannerInstance = scanner

      scanner.render(
        (decodedText) => {
          sku.value = decodedText
          scanner.clear()
          Swal.close()

          Swal.fire({
            icon: 'success',
            title: 'Đã quét xong',
            text: `Mã SKU: ${decodedText}`,
            timer: 1500,
            showConfirmButton: false
          })
        }
      )
    }
  })
}

async function fetchBranch() {
  try {
    const res = await axios.get('/api/branch/')
    branches.value = res.data.branch
  } catch (err) {
    console.error(err)
  }
}

async function fetchSupplier() {
  try {
    const res = await axios.get('/api/supplier')
    suppliers.value = res.data.supplier
  } catch (err) {
    console.error(err)
  }
}

async function submit() {
  Object.keys(errors).forEach(key => delete errors[key])
  loading.value = true

  const form = new FormData()
  form.append('sku', sku.value)
  form.append('note', note.value)
  form.append('branch_id', selectedBranch.value)
  form.append('supplier_id', selectedSupplier.value)
  form.append('qty', qty.value)
  form.append('unit_price', unit_price.value)

  try {
    await axios.post('/api/stock-receipt/create', form)
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Tạo sản phẩm thành công',
      confirmButtonText: 'Đóng',
    })
    router.push({ name: 'stock-receipt' })
  } catch (err) {
    if (err.response?.status === 422) {
      const serverErrors = err.response.data.errors
      Object.keys(serverErrors).forEach(key => {
        errors[key] = serverErrors[key]
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: 'Có lỗi xảy ra khi tạo sản phẩm',
        confirmButtonText: 'Đóng',
      })
    }
  } finally {
    loading.value = false
  }
}

onMounted(fetchBranch)
onMounted(fetchSupplier)
</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#f3f3f3] py-10 px-10 overflow-x-auto">
    <div class="grid md:grid-cols-2 gap-10 border bg-white border-zinc-300 px-7 py-3 rounded-xl">
      <!-- LEFT -->
      <div>
        <div class="mb-6">
          <label class="font-medium text-zinc-700 mb-1 block">
            SKU (Mã SP)<span class="text-red-500 ml-1">*</span>
          </label>
          <div class="flex gap-2">
            <input v-model="sku" type="text" class="w-full border border-zinc-400 bg-white px-3 h-10" />
            <button type="button" @click="openQrModal"
              class="bg-gray-600 text-white px-1 w-1/6 rounded hover:bg-gray-500 cursor-pointer">
              <span class="max-h-10">Scan</span>
            </button>
          </div>
          <p v-if="errors.name" class="text-sm text-red-500 mt-1">{{ errors.name[0] }}</p>
        </div>

        <!-- Mô tả ngắn -->
        <div class="mb-6">
          <label class="font-medium text-zinc-700 mb-1 block">Chi nhánh<span class="text-red-500 ml-1">*</span></label>
          <select v-model="selectedBranch" class="w-full border border-zinc-400 bg-white px-3 h-10">
            <option disabled value="">-- Chọn chi nhánh --</option>
            <option v-for="branch in branches" :key="branch.branch_id" :value="branch.branch_id">{{ branch.name }}
            </option>
          </select>
          <p v-if="errors.cat_id" class="text-sm text-red-500 mt-1">{{ errors.cat_id[0] }}</p>
        </div>

        <!-- Mô tả chi tiết -->
        <div class="mb-6">
          <label class="font-medium text-zinc-700 mb-1 block">Nhà cung cấp<span
              class="text-red-500 ml-1">*</span></label>
          <select v-model="selectedSupplier" class="w-full border border-zinc-400 bg-white px-3 h-10">
            <option disabled value="">-- Chọn nhà cung cấp --</option>
            <option v-for="supplier in suppliers" :key="supplier.supp_id" :value="supplier.supp_id">{{ supplier.name }}
            </option>
          </select>
          <p v-if="errors.cat_id" class="text-sm text-red-500 mt-1">{{ errors.cat_id[0] }}</p>
        </div>
      </div>
      <div>
        <!-- Giá và khuyến mãi -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="font-medium text-zinc-700 mb-1 block">Số lượng<span class="text-red-500 ml-1">*</span></label>
            <input v-model="qty" type="number" class="w-full border border-zinc-400 bg-white px-3 h-10" />
            <p v-if="errors.price" class="text-sm text-red-500 mt-1">{{ errors.price[0] }}</p>
          </div>
          <div>
            <label class="font-medium text-zinc-700 mb-1 block">Đơn giá / SP<span
                class="text-red-500 ml-1">*</span></label>
            <input v-model="unit_price" type="number" class="w-full border border-zinc-400 bg-white px-3 h-10" />
            <p v-if="errors.discount_price" class="text-sm text-red-500 mt-1">{{ errors.discount_price[0] }}</p>
          </div>
        </div>

        <!-- Danh mục -->
        <div class="mb-6">
          <label class="font-medium text-zinc-700 mb-1 block">Ghi chú</label>
          <textarea v-model="note" rows="5" class="w-full border border-zinc-400 bg-white px-3 py-2"></textarea>
          <p v-if="errors.cat_id" class="text-sm text-red-500 mt-1">{{ errors.cat_id[0] }}</p>
        </div>

        <!-- Subit -->
        <div class="mt-5">
          <button @click="submit" :disabled="loading"
            class="bg-[#2563EB] cursor-pointer hover:-translate-y-0.5 transition duration-300 text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50">
            {{ loading ? 'Đang gửi...' : 'Tạo phiếu' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
