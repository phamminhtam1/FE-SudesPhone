<script setup>
import Banner from '@/components/layout/frontend/Banner.vue';
import HotSale from '@/components/layout/frontend/HotSale.vue';
import TopCategories from '@/components/layout/frontend/TopCategories.vue';
import iPhone from '@/components/layout/frontend/iPhone.vue';
import iPad from '@/components/layout/frontend/iPad.vue';
</script>

<template>
  <main>
    <Banner />
    <div
      class="flex flex-wrap justify-center md:justify-between gap-4 max-w-7xl w-full mx-auto pt-5  lg:whitespace-nowrap cursor-default">
      <div
        class="flex flex-col md:flex-row items-center bg-blue-100 rounded-2xl px-4 md:px-9  py-1 transition duration-300 hover:shadow-md w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]">
        <div class="mb-2 md:mb-0 md:mr-4">
          <img class="w-16 md:w-20 h-16 md:h-20" src="/images/freeship.png" alt="">
        </div>
        <div class="text-center md:text-left">
          <h3 class="text-lg md:text-sm font-medium">Vận chuyển miễn phí</h3>
          <span class="text-xs md:text-sm">Hóa đơn trên 5 triệu</span>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row items-center bg-red-100 rounded-2xl px-4 md:px-9 h-auto py-2 transition duration-300 hover:shadow-md w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]">
        <div class="mb-2 md:mb-0 md:mr-4">
          <img class="w-16 md:w-20 h-16 md:h-20" src="/images/cart.png" alt="">
        </div>
        <div class="text-center md:text-left">
          <h3 class="text-lg md:text-sm font-medium">Quà tặng hấp dẫn</h3>
          <span class="text-xs md:text-sm">Hóa đơn trên 10 triệu</span>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row items-center bg-yellow-100 rounded-2xl px-4 md:px-9 h-auto py-2 transition duration-300 hover:shadow-md w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]">
        <div class="mb-2 md:mb-0 md:mr-4">
          <img class="w-16 md:w-20 h-16 md:h-20" src="/images/cer.png" alt="">
        </div>
        <div class="text-center md:text-left">
          <h3 class="text-lg md:text-sm font-medium">Chứng nhận chất lượng</h3>
          <span class="text-xs md:text-sm">Sản phẩm chính hãng</span>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row items-center bg-lime-100 rounded-2xl px-4 md:px-9 h-auto py-2 transition duration-300 hover:shadow-md w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]">
        <div class="mb-2 md:mb-0 md:mr-4">
          <img class="w-16 md:w-20 h-16 md:h-20" src="/images/hotline.png" alt="">
        </div>
        <div class="text-center md:text-left">
          <h3 class="text-lg md:text-sm font-medium">Hotline: 1900 6750</h3>
          <span class="text-xs md:text-sm">Hóa đơn trên 5 triệu</span>
        </div>
      </div>
    </div>
    <section class="3-banner">
      <div class="flex flex-wrap justify-center md:justify-between gap-4 max-w-7xl mx-auto pt-8 w-full">
        <a href="" class="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)]"><img
            class="w-full rounded-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/img_3banner_1.jpg?1746173377751" alt=""></a>
        <a href="" class="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)]"><img
            class="w-full rounded-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/img_3banner_2.jpg?1746173377751" alt=""></a>
        <a href="" class="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)]"><img
            class="w-full rounded-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/img_3banner_3.jpg?1746173377751" alt=""></a>
      </div>
    </section>
    <HotSale />
    <TopCategories />
    <iPhone class="mb-20" />
    <iPad />
    <div class="mb-7"></div>
  </main>
</template>
