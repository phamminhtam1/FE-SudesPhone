<script setup>
import LeftMenu from '@/components/layout/backend/LeftMenu.vue';
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue';
import axios from '@/plugins/axion';
import Swal from 'sweetalert2';
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const userId = props.id
const router = useRouter()

const name = ref('')
const email = ref('')
const phone = ref('')
const hire_date = ref('')
const salary = ref('')
const branches = ref([])
const roles = ref([])

const selectBranchs = ref('')
const selectRoles = ref('')

const loading = ref(false)
const errors = reactive({})

const fetchBranches = async () => {
  const { data } = await axios.get('/api/branch')
  branches.value = data.branch
}

const fetchRoles = async () => {
  const { data } = await axios.get('/api/role')
  roles.value = data.roles
}

onMounted(async () => {
  await fetchBranches()
  await fetchRoles()
  try {
    const res = await axios.get(`/api/user/${userId}`)
    const u = res.data.user
    name.value = u.name
    phone.value = u.phone
    email.value = u.email
    hire_date.value = u.hire_date
    salary.value = u.salary
    selectBranchs.value = u.branch_id
    selectRoles.value = u.role_id
  } catch (err) {
    console.error(err)
    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: 'Không lấy được dữ liệu nhân sự',
      confirmButtonText: 'Đóng',
    })
  }
})

async function submit() {
  loading.value = true
  try {
    const form = new FormData()
    form.append('_method', 'PUT')
    form.append('branch_id', selectBranchs.value)
    form.append('role_id', selectRoles.value)
    form.append('name', name.value)
    form.append('email', email.value)
    form.append('phone', phone.value)
    form.append('hire_date', hire_date.value)
    form.append('salary', salary.value)

    await axios.post(`/api/user/edit/${userId}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Cập nhật thành công',
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
        text: 'Cập nhật thất bại',
        confirmButtonText: 'Đóng',
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
  <div class="ml-57 min-h-screen bg-[#f3f3f3] px-7 py-7 overflow-x-auto">
    <div class="grid md:grid-cols-2 gap-10 border rounded-lg min-h-screen border-zinc-300 bg-white">
      <div class="p-6">
        <div class="flex flex-col mb-6">
          <label class="text-zinc-600 font-medium text-[15px] mb-2">
            Tên nhân sự <span class="text-red-500 ml-1">*</span>
          </label>
          <input v-model="name" type="text" placeholder="Nhập tên nhân sự..."
            class="border-2 bg-white border-zinc-400 pl-2 h-10 text-black" />
          <span v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</span>
        </div>
        <div class="grid md:grid-cols-3 gap-3">
          <div class="">
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
          <div class="flex flex-col">
            <label class="text-zinc-600 font-medium text-[15px] mb-0.5">
              Ngày vào làm <span class="text-red-500 ml-1">*</span>
            </label>
            <input v-model="hire_date" type="date" placeholder="Chọn ngày vào làm..."
              class="border-2 bg-white border-zinc-400 pl-2 h-10  text-black" />
            <span v-if="errors.hire_date" class="text-red-500 text-sm mt-1">{{ errors.hire_date[0] }}</span>
          </div>
        </div>
        <div class="flex justify-start">
          <div class="flex flex-col mb-6 w-full">
            <label class="text-zinc-600 font-medium text-[15px] mb-2">
              Lương theo tháng (Vnd) <span class="text-red-500 ml-1">*</span>
            </label>
            <input v-model="salary" type="number" min="0" step="1000000" placeholder="Nhập tiền lương..."
              class="border-2 bg-white border-zinc-400 pl-2 h-10  text-black" />
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
            class="border-2 bg-white border-zinc-400 pl-2 h-10  text-black" />
          <span v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone[0] }}</span>
        </div>
        <div class="flex flex-col mb-9">
          <label class="text-zinc-600 font-medium text-[15px] mb-2">
            Email <span class="text-red-500 ml-1">*</span>
          </label>
          <input v-model="email" type="email" placeholder="Nhập email..."
            class="border-2 bg-white border-zinc-400 pl-2 h-10  text-black" />
          <span v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email[0] }}</span>
        </div>
        <div class="">
          <button @click.prevent="submit" :disabled="loading"
            class="bg-[#2563EB] cursor-pointer hover:-translate-y-0.5 mb-9 transition duration-300 text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50">
            {{ loading ? 'Đang gửi...' : 'Chỉnh sửa' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="">

</style>