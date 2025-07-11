<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue'
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue'
import axios from '@/plugins/axion';
import Swal from 'sweetalert2';
import { onMounted, reactive, ref } from 'vue';
import router from '@/router';

const branches = ref([])
const roles = ref([])

const name = ref('')
const email = ref('')
const phone = ref('')
const hire_date = ref('')
const salary = ref('')
const password = ref('')
const password_confirmation = ref('')

const errors = reactive({});
const loading = ref(false)

const selectBranchs = ref('')
const selectRoles = ref('')

const fetchBranchs = async () => {
  try {
    const res = await axios.get('/api/branch')
    branches.value = res.data.branch
  } catch (err) {
    console.error('Lỗi khi tải chi nhánh', err)
  }
}

const fetchRoles = async () => {
  try {
    const res = await axios.get('/api/role')
    roles.value = res.data.roles
  } catch (err) {
    console.error('Lỗi khi tải vị trí', err)
  }
}

onMounted(async () => {
  await fetchBranchs()
  await fetchRoles()
})

async function submit() {
  Object.keys(errors).forEach(key => delete errors[key])
  loading.value = true

  const form = new FormData()
  form.append('branch_id', selectBranchs.value)
  form.append('role_id', selectRoles.value)
  form.append('name', name.value)
  form.append('email', email.value)
  form.append('phone', phone.value)
  form.append('hire_date', hire_date.value)
  form.append('salary', salary.value)
  form.append('password', password.value)
  form.append('password_confirmation', password_confirmation.value)

  try {
    const res = await axios.post('/api/user/create', form)
    console.log('Create:', res.data.user)
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Thêm nhân sự thành công',
      confirmButtonText: 'Đóng',
    })
    router.push({ name: 'user' })
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
        text: 'Lỗi không xác định khi tạo nhân sự',
      })
    }
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 min-h-screen bg-[#f3f3f3] overflow-x-auto pt-5 px-7 py-7">
    <div class="grid md:grid-cols-2 border min-h-screen border-zinc-300 px-7 py-7 rounded-lg bg-white">
      <div class="p-6">
        <div class="flex flex-col mb-6">
          <label class="text-zinc-600 font-medium text-[15px] mb-2">
            Tên nhân sự <span class="text-red-500 ml-1">*</span>
          </label>
          <input v-model="name" type="text" placeholder="Nhập tên nhân sự..."
            class="border-2 bg-white border-zinc-400 pl-2 h-10 text-black" />
          <span v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</span>
        </div>
        <div class="flex justify-between">
          <div>
            <label class="text-zinc-600 font-medium text-[15px] mb-2">
              Chi nhánh:<span class="text-red-500 ml-1"> *</span></label>
            <div class="mb-6">
              <div class="flex flex-col mb-1 mr-2">
                <select v-model="selectBranchs" class="border-2 bg-white pl-2 border-zinc-400 h-10 text-black">
                  <option disabled value="">-- Chọn Chi Nhánh --</option>
                  <option v-for="branch in branches" :key="branch.branch_id" :value="branch.branch_id">
                    {{ branch.name }}
                  </option>
                </select>
                <span v-if="errors.branch_id" class="text-red-500 text-sm mt-1">{{ errors.branch_id[0] }}</span>
              </div>
            </div>
          </div>
          <div>
            <label class="text-zinc-600 font-medium text-[15px] mb-2">
              Vị trí:<span class="text-red-500 ml-1"> *</span></label>
            <div>
              <div class="flex flex-col mb-1 mr-2">
                <select v-model="selectRoles" class="border-2 bg-white pl-5 border-zinc-400 h-10 text-black">
                  <option disabled value="">-- Chọn Vị Trí --</option>
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name }}
                  </option>
                </select>
                <span v-if="errors.role_id" class="text-red-500 text-sm mt-1">{{ errors.role_id[0] }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-col mb-6">
            <label class="text-zinc-600 font-medium text-[15px] mb-2">
              Ngày vào làm <span class="text-red-500 ml-1">*</span>
            </label>
            <input v-model="hire_date" type="date" placeholder="Chọn ngày vào làm..."
              class="border-2 bg-white border-zinc-400 pl-2 h-10 text-black" />
            <span v-if="errors.hire_date" class="text-red-500 text-sm mt-1">{{ errors.hire_date[0] }}</span>
          </div>
          <div class="flex flex-col mb-6">
            <label class="text-zinc-600 font-medium text-[15px] mb-2">
              Lương theo tháng (Vnd) <span class="text-red-500 ml-1">*</span>
            </label>
            <input v-model="salary" type="number" min="0" step="1000000" placeholder="Nhập tiền lương..."
              class="border-2 bg-white border-zinc-400 pl-2 h-10 w-[280px] text-black" />
            <span v-if="errors.salary" class="text-red-500 text-sm mt-1">{{ errors.salary[0] }}</span>
          </div>
        </div>
      </div>
      <div class="p-6">
        <div class="flex flex-col mb-6">
          <label class="text-zinc-600 font-medium text-[15px] mb-2">
            Số điện thoại <span class="text-red-500 ml-1">*</span>
          </label>
          <input v-model="phone" type="text" placeholder="Nhập số điện thoại..."
            class="border-2 bg-white border-zinc-400 pl-2 h-10 text-black" />
          <span v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone[0] }}
          </span>
        </div>
        <div class="flex flex-col mb-2">
          <label class="text-zinc-600 font-medium text-[15px] mb-2">
            Email <span class="text-red-500 ml-1">*</span>
          </label>
          <input v-model="email" type="email" placeholder="Nhập email..."
            class="border-2 bg-white border-zinc-400 pl-2 h-10 text-black" />
          <span v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email[0] }}</span>

        </div>
        <div class="flex flex-col mb-2">
          <input v-model="password" type="password" placeholder="Password..."
            class="border-2 bg-white border-zinc-400 pl-2 h-10 w-2/3 rounded-lg text-black" />
          <span v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password[0] }}</span>
        </div>
        <div class="flex flex-col mb-6">
          <input v-model="password_confirmation" type="password" placeholder="Password confirmation..."
            class="border-2 bg-white border-zinc-400 pl-2 h-10 w-2/3 rounded-lg text-black" />
        </div>
        <div class="">
          <button @click.prevent="submit" :disabled="loading"
            class="bg-[#2563EB] cursor-pointer hover:-translate-y-0.5 mb-9 transition duration-300 text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50">
            {{ loading ? 'Đang gửi...' : 'Thêm nhân sự' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style setup>
.ck-editor__editable {
  min-height: 400px;
  max-height: 600px;
}
</style>