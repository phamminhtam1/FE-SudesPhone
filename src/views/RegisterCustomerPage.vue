<script setup>
import { onMounted, getCurrentInstance } from 'vue'

const { emit } = getCurrentInstance()
onMounted(() => {
  emit('update-product-name', { productName: 'Đăng ký tài khoản' })
})
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
          <input class="border border-zinc-300 p-2" type="text" placeholder="Họ">
          <input class="border border-zinc-300 p-2" type="text" placeholder="Tên">
          <input class="border border-zinc-300 p-2" type="email" placeholder="Email">
          <input class="border border-zinc-300 p-2" type="text" placeholder="Số điện thoại">
          <input class="border border-zinc-300 p-2" type="password" placeholder="Mật khẩu">
        </div>
        <button
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
