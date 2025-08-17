<script setup>
import { onMounted } from 'vue';
import Banner from '@/components/layout/frontend/Banner.vue';
import HotSale from '@/components/layout/frontend/HotSale.vue';
import TopCategories from '@/components/layout/frontend/TopCategories.vue';
import iPhone from '@/components/layout/frontend/iPhone.vue';
import iPad from '@/components/layout/frontend/iPad.vue';
import NewProduct from '@/components/layout/frontend/NewProduct.vue';
import MacBook from '@/components/layout/frontend/MacBook.vue';
import AppleWatch from '@/components/layout/frontend/AppleWatch.vue';

onMounted(() => {
  // Intersection Observer để kích hoạt animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Quan sát tất cả các phần tử có class 'animate-on-scroll'
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(el => observer.observe(el));
});
</script>

<template>
  <main>
    <Banner />
    <div
      class="flex flex-wrap justify-center md:justify-between gap-4 max-w-7xl w-full mx-auto pt-5 lg:whitespace-nowrap cursor-default animate-on-scroll">
      <div
        class="flex flex-col md:flex-row items-center bg-blue-100 rounded-2xl px-2 md:px-9 transition duration-300 hover:shadow-md w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] animate-on-scroll">
        <div class="mb-2 md:mb-0 md:mr-4">
          <img class="w-14 md:w-14 h-10 md:h-14" src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/ser_1.svg?1746173377751" alt="">
        </div>
        <div class="text-center md:text-left">
          <h3 class="text-lg md:text-sm font-medium">Vận chuyển miễn phí</h3>
          <span class="text-xs md:text-sm">Hóa đơn trên 5 triệu</span>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row items-center bg-red-100 rounded-2xl px-4 md:px-9 h-auto py-2 transition duration-300 hover:shadow-md w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] animate-on-scroll">
        <div class="mb-2 md:mb-0 md:mr-4">
          <img class="w-14 md:w-14 h-10 md:h-14" src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/ser_2.svg?1746173377751" alt="">
        </div>
        <div class="text-center md:text-left">
          <h3 class="text-lg md:text-sm font-medium">Quà tặng hấp dẫn</h3>
          <span class="text-xs md:text-sm">Hóa đơn trên 10 triệu</span>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row items-center bg-yellow-100 rounded-2xl px-4 md:px-9 h-auto py-2 transition duration-300 hover:shadow-md w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] animate-on-scroll">
        <div class="mb-2 md:mb-0 md:mr-4">
          <img class="w-14 md:w-14 h-10 md:h-14" src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/ser_3.svg?1746173377751" alt="">
        </div>
        <div class="text-center md:text-left">
          <h3 class="text-lg md:text-sm font-medium">Chứng nhận chất lượng</h3>
          <span class="text-xs md:text-sm">Sản phẩm chính hãng</span>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row items-center bg-lime-100 rounded-2xl px-4 md:px-9 h-auto py-2 transition duration-300 hover:shadow-md w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] animate-on-scroll">
        <div class="mb-2 md:mb-0 md:mr-4">
          <img class="w-14 md:w-14 h-10 md:h-14" src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/ser_4.svg?1746173377751" alt="">
        </div>
        <div class="text-center md:text-left">
          <h3 class="text-lg md:text-sm font-medium">Hotline: 1900 6750</h3>
          <span class="text-xs md:text-sm">Hóa đơn trên 5 triệu</span>
        </div>
      </div>
    </div>
    <section class="3-banner animate-on-scroll">
      <div class="flex flex-wrap justify-center md:justify-between gap-4 max-w-7xl mx-auto pt-8 w-full">
        <a href="" class="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)] animate-on-scroll"><img
            class="w-full rounded-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/img_3banner_1.jpg?1746173377751" alt=""></a>
        <a href="" class="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)] animate-on-scroll"><img
            class="w-full rounded-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/img_3banner_2.jpg?1746173377751" alt=""></a>
        <a href="" class="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)] animate-on-scroll"><img
            class="w-full rounded-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/img_3banner_3.jpg?1746173377751" alt=""></a>
      </div>
    </section>
    <div class="animate-on-scroll">
      <HotSale />
    </div>
    <div class="animate-on-scroll">
      <TopCategories />
    </div>
    <div class="animate-on-scroll">
      <iPhone class="mb-10" />
    </div>
    <div class="animate-on-scroll">
      <iPad />
    </div>
    <div class="mb-10"></div>
    <div class="animate-on-scroll">
      <NewProduct/>
    </div>
    <div class="mb-10"></div>
    <div class="animate-on-scroll">
      <MacBook/>
    </div>
    <div class="mb-10"></div>
    <div class="animate-on-scroll">
      <AppleWatch/>
    </div>
  </main>
</template>

<style scoped>
/* Fade & Slide Up Animation */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.animate-on-scroll.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger animation cho các phần tử con */
.animate-on-scroll:nth-child(1) { transition-delay: 0.1s; }
.animate-on-scroll:nth-child(2) { transition-delay: 0.2s; }
.animate-on-scroll:nth-child(3) { transition-delay: 0.3s; }
.animate-on-scroll:nth-child(4) { transition-delay: 0.4s; }

/* Animation cho các section chính */
.animate-on-scroll.animate-in {
  animation: fadeSlideUp 0.8s ease-out forwards;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects với animation */
.animate-on-scroll:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

/* Responsive animation delays */
@media (max-width: 768px) {
  .animate-on-scroll:nth-child(1) { transition-delay: 0.05s; }
  .animate-on-scroll:nth-child(2) { transition-delay: 0.1s; }
  .animate-on-scroll:nth-child(3) { transition-delay: 0.15s; }
  .animate-on-scroll:nth-child(4) { transition-delay: 0.2s; }
}
</style>
