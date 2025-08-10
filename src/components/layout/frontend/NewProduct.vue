<script setup>
import { ref, onMounted } from 'vue'

const imageRef = ref(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.3 }
  )

  if (imageRef.value) {
    observer.observe(imageRef.value)
  }
})
</script>

<template>
  <div class="bg-[url('/public/images/section_banner_new_bg.webp')] bg-cover bg-center py-2">
    <div class="max-w-7xl mx-auto flex justify-center items-center mb-4">
      <span class="text-black font-medium text-2xl uppercase px-4 py-2 rounded">Thông tin sản phẩm mới</span>
    </div>
    <div class="grid-cols-2 gap-2 max-w-7xl mx-auto flex justify-center items-center">
      <div class="col-span-1 flex flex-col w-1/2 justify-start">
        <label for="" class="text-red-800 mb-2">iPhone 15 - 15 Pro Max</label>
        <span class="text-2xl font-bold mb-5">iPhone 15 Pro Max sẽ có viền màn hình mỏng nhất thế giới.</span>
        <p class="text-zinc-600 text-sm mb-5">
          Theo Apple Insider, dựa trên những bản CAD (thiết kế có sự hỗ trợ của máy tính) rò rỉ gần
          đây, iPhone 15 Pro Max có thể dày hơn iPhone 14 Pro Max, mặc dù phần lồi camera nhỏ hơn
          một chút. Thông tin mới nhất từ chuyên gia rò rỉ Ice Universe tiết lộ kích thước 1,55 mm
          của phần khung viền trên iPhone 15 Pro Max sẽ phá kỷ lục trước đó được thiết lập bởi
          Xiaomi 13 là 1,81mm.
        </p>
        <button
          class="flex items-center justify-center gap-2 rounded-lg border bg-black border-black px-5 py-1 hover:bg-orange-800 hover:border-orange-800 group cursor-pointer w-fit transition duration-200">
          <span class=" group-hover:text-white text-white">Xem thêm</span>
          <svg viewBox="0 0 1024 1024"
            class="icon fill-white transition-transform duration-300 group-hover:translate-x-1" width="13" height="13"
            version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
            <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"></path>
          </svg>
        </button>
      </div>
      <div class="col-span-1 w-1/2 flex justify-center items-center" ref="imageRef">
        <img
          :class="{ 'animate-float': isVisible }"
          src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/section_banner_new_product.png?1746173377751"
          alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
