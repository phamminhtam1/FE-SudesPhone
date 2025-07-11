<template>
  <div class="ml-57 h-[50px] flex border-b border-zinc-300">
    <div class=" w-full px-3 flex justify-between items-center ">
      <div class="flex justify-center items-center">
        <button class="cursor-pointer hover:-translate-y-0.5 transition duration-300">
          <svg viewBox="0 0 24 24" width="30px" height="30px" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"></path>
          </svg>
        </button>
        <span class="md:ml-15 ml-2 text-zinc-600 font-bold text-[20px]">{{ route.meta.name_page }}</span>
      </div>
      <div class="flex items-center mr-4">
        <button class="cursor-pointer hover:-translate-y-0.5 transition duration-300 border-r-1 border-zinc-300">
          <svg width="45" height="50" viewBox="0 0 60 60" class="mr-5" fill="none" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="60" height="60" fill="url(#pattern0_34_151)" />
            <defs>
              <pattern id="pattern0_34_151" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_34_151" transform="scale(0.0078125)" />
              </pattern>
              <image id="image0_34_151" width="128" height="128" preserveAspectRatio="none"
                xlink:href="data:image/png;base64,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" />
            </defs>
          </svg>

        </button>
        <button class="ml-5 cursor-pointer hover:-translate-y-0.5 transition duration-300 mr-3">
          <svg width="26" height="26" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="40" height="35" fill="url(#pattern0_34_148)" />
            <defs>
              <pattern id="pattern0_34_148" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_34_148" transform="matrix(0.0078125 0 0 0.00892857 0 -0.0714286)" />
              </pattern>
              <image id="image0_34_148" width="128" height="128" preserveAspectRatio="none"
                xlink:href="data:image/png;base64,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" />
            </defs>
          </svg>

        </button>
        <button class="ml-2 cursor-pointer hover:-translate-y-0.5 transition duration-300">
          <svg width="25" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="40" height="40" fill="url(#pattern0_34_149)" />
            <defs>
              <pattern id="pattern0_34_149" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_34_149" transform="scale(0.0078125)" />
              </pattern>
              <image id="image0_34_149" width="128" height="128" preserveAspectRatio="none"
                xlink:href="data:image/png;base64,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" />
            </defs>
          </svg>

        </button>
        <div class="ml-4 flex justify-center items-center cursor-pointer hover:-translate-y-0.5 transition duration-300"
          @click="handleLogout">
          <svg viewBox="0 -0.5 25 25" width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.75 9.874C11.75 10.2882 12.0858 10.624 12.5 10.624C12.9142 10.624 13.25 10.2882 13.25 9.874H11.75ZM13.25 4C13.25 3.58579 12.9142 3.25 12.5 3.25C12.0858 3.25 11.75 3.58579 11.75 4H13.25ZM9.81082 6.66156C10.1878 6.48991 10.3542 6.04515 10.1826 5.66818C10.0109 5.29121 9.56615 5.12478 9.18918 5.29644L9.81082 6.66156ZM5.5 12.16L4.7499 12.1561L4.75005 12.1687L5.5 12.16ZM12.5 19L12.5086 18.25C12.5029 18.25 12.4971 18.25 12.4914 18.25L12.5 19ZM19.5 12.16L20.2501 12.1687L20.25 12.1561L19.5 12.16ZM15.8108 5.29644C15.4338 5.12478 14.9891 5.29121 14.8174 5.66818C14.6458 6.04515 14.8122 6.48991 15.1892 6.66156L15.8108 5.29644ZM13.25 9.874V4H11.75V9.874H13.25ZM9.18918 5.29644C6.49843 6.52171 4.7655 9.19951 4.75001 12.1561L6.24999 12.1639C6.26242 9.79237 7.65246 7.6444 9.81082 6.66156L9.18918 5.29644ZM4.75005 12.1687C4.79935 16.4046 8.27278 19.7986 12.5086 19.75L12.4914 18.25C9.08384 18.2892 6.28961 15.5588 6.24995 12.1513L4.75005 12.1687ZM12.4914 19.75C16.7272 19.7986 20.2007 16.4046 20.2499 12.1687L18.7501 12.1513C18.7104 15.5588 15.9162 18.2892 12.5086 18.25L12.4914 19.75ZM20.25 12.1561C20.2345 9.19951 18.5016 6.52171 15.8108 5.29644L15.1892 6.66156C17.3475 7.6444 18.7376 9.79237 18.75 12.1639L20.25 12.1561Z"
              fill="#000000"></path>
          </svg>
          <span class="text-zinc-800 font-basic -mt-[1.5px]">Logout</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const route = useRoute()
const router = useRouter()

const handleLogout = async () => {
  try {
    await axios.post('/logout')
    localStorage.removeItem('token')
    router.push('/admin/login')
  } catch (error) {
    console.error('Lỗi logout:', error)
    localStorage.removeItem('token')
    router.push('/admin/login')
  }
}
</script>
<style></style>