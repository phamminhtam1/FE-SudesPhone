<script setup>
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="md:grid grid-cols-12">
      <div class="col-span-8 border-r-1">
        <div class="flex flex-col">
          <div class="flex justify-center mb-5">
            <img class=""
              src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/checkout_logo.png?1746173377751" alt="">
          </div>
          <span class="text-[20px] font-medium">Thông tin nhận hàng</span>
          <div class="md:grid grid-cols-2 gap-3 mt-3">
            <div class="col-span-1 flex flex-col items-center w-full gap-3">
              <div class="relative w-full">
                <select
                  class="w-full border border-zinc-300 rounded-lg py-1 px-3 pt-4 pr-8 text-gray-500 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none">
                  <option value="">Địa chỉ khác...</option>
                </select>
                <label class="absolute left-3 top-3 pb-1 text-xs text-gray-400 bg-white  pointer-events-none"
                  style="transform: translateY(-50%);">
                  Sổ địa chỉ
                </label>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <p class="border h-6 border-zinc-300 mr-2"></p>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              <div class="w-full relative">
                <input type="text" name="" id="" value="phamminhtam264@gmail.com" disabled
                  class="bg-[#DDDDDD] text-gray-500 w-full rounded-lg py-1 px-3 pt-4 pr-8">
                <span class=" absolute left-3 top-1 pb-1 text-xs text-gray-500 ">Email</span>
              </div>
              <div class="w-full relative">
                <input type="text" id="fullName" name="fullName" placeholder=" "
                  class="border border-zinc-300 w-full rounded-lg py-1 px-3 pt-4 pr-8 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-200 peer" />
                <label for="fullName"
                  class="absolute left-3 top-3 text-[14px] text-gray-400 pointer-events-none transition-all duration-200
                    peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-gray-400">Họ và tên</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-4 w-full">
        asdasd
      </div>
    </div>
  </div>
</template>

<style></style>
