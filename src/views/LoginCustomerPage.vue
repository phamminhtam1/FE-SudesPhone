<script setup>
import { onMounted, getCurrentInstance } from 'vue'
import { ref } from 'vue'
import { reactive } from 'vue'
import router from '@/router'
import axios from 'axios'

const { emit } = getCurrentInstance()
onMounted(() => {
  emit('update-product-name', { productName: 'Đăng nhập tài khoản' })
})

const loading = ref(false)
const errors = reactive({})
const email = ref('')
const password = ref('')

async function submit() {
  Object.keys(errors).forEach(key => delete errors[key])
  loading.value = true
  const form = new FormData()
  form.append('email', email.value)
  form.append('password', password.value)
  try {
    await axios.post('/api/customer/login', form)
    router.push('/')
  } catch (err) {
    console.error(err)
  }
}

</script>

<template>
  <div>
    <div class="flex justify-center max-w-1/4 mx-auto pb-7">
      <div class="border border-zinc-300 rounded-xl mt-12 p-4 w-full">
        <h1 class="text-xl text-center uppercase mb-5">Đăng nhập</h1>
        <div class="flex flex-col gap-3">
          <input v-model="email" class="border border-zinc-300 p-2" type="email" placeholder="Email">
          <input v-model="password" class="border border-zinc-300 p-2" type="password" placeholder="Mật khẩu">
        </div>
        <button @click.prevent="submit" :disabled="loading"
          class="bg-black text-white w-full p-2 mt-3  font-medium cursor-pointer hover:bg-red-600 rounded-lg">
          {{ loading ? 'Đang xác thực...' : 'Đăng nhập' }}
        </button>
        <div class="flex justify-between text-zinc-800 mt-3">
          <a href="" class="hover:text-red-600">Quên mật khẩu?</a>
          <router-link :to="{ name: 'register-customer' }" class="hover:text-red-600">
            Đăng ký tại đây
          </router-link>
        </div>
        <p class="text-center text-zinc-800 mt-3">Hoặc đăng nhập qua</p>
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
