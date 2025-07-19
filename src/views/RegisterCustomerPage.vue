<script setup>
import { onMounted, getCurrentInstance, reactive } from 'vue'
import router from '@/router'
import axios from '@/plugins/axioscustomer'
import { ref } from 'vue'

const { emit } = getCurrentInstance()
onMounted(() => {
  emit('update-product-name', { productName: 'Đăng ký tài khoản' })
})

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const phone = ref('')
const password_hash = ref('')
const errors = reactive({})
const loading = ref(false)

async function register() {
  try {
    loading.value = true
    const form = new FormData()
    form.append('first_name', first_name.value)
    form.append('last_name', last_name.value)
    form.append('email', email.value)
    form.append('phone', phone.value)
    form.append('password', password_hash.value)
    await axios.post('/api/customer/create', form)
    router.push({ name: 'login-customer' })
  } catch (err) {
    if (err.response?.status === 422) {
      const serverErrors = err.response.data.errors
      Object.keys(serverErrors).forEach(key => {
        errors[key] = serverErrors[key]
      })
    }
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div>
    <div class="flex justify-center max-w-1/4 mx-auto pb-7">
      <div class="border border-zinc-300 rounded-xl mt-12 p-4 w-full">
        <h1 class="text-xl text-center uppercase mb-5">Đăng ký</h1>
        <h2 class="text-center mb-5">Đã có tài khoản, đăng nhập <router-link :to="{ name: 'login-customer' }"
            class="text-red-600">tại đây</router-link>
        </h2>
        <div class="flex flex-col gap-3">
          <input v-model="first_name" class="border border-zinc-300 p-2" type="text" placeholder="Họ">
          <div v-if="errors.first_name" class="text-red-600">{{ errors.first_name[0] }}</div>
          <input v-model="last_name" class="border border-zinc-300 p-2" type="text" placeholder="Tên">
          <div v-if="errors.last_name" class="text-red-600">{{ errors.last_name[0] }}</div>
          <input v-model="email" class="border border-zinc-300 p-2" type="email" placeholder="Email">
          <div v-if="errors.email" class="text-red-600">{{ errors.email[0] }}</div>
          <input v-model="phone" class="border border-zinc-300 p-2" type="text" placeholder="Số điện thoại">
          <div v-if="errors.phone" class="text-red-600">{{ errors.phone[0] }}</div>
          <input v-model="password_hash" class="border border-zinc-300 p-2" type="password" placeholder="Mật khẩu">
          <div v-if="errors.password" class="text-red-600">{{ errors.password[0] }}</div>
        </div>
        <button @click.prevent="register"
          class="bg-black text-white w-full p-2 mt-3 uppercase font-medium cursor-pointer hover:bg-red-600 rounded-lg">
          Đăng ký
        </button>
        <p class="text-center text-zinc-800 mt-3">Hoặc đăng nhập bằng</p>
        <div class="flex justify-center gap-2 mt-5 mb-2">
          <a href="">
            <img class="w-[129px] h-[37px]" src="https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg" alt="">
          </a>
          <a href="">
            <img class="w-[129px] h-[37px]" src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
