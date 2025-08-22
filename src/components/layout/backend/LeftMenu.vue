<template>
  <div class="w-57 overflow-y-auto min-h-screen bg-[#2A3140] fixed font-hahmlet">
    <div class="flex flex-col justify-center items-center pt-5 pb-3">
      <img class="w-10 h-10 rounded-full object-cover" src="/images/avata.png" alt="">
      <span class="text-zinc-300 font-medium text-[17px] mt-1 uppercase" style="font-family: 'Hahmlet', serif;">Minh Tam
        Admin</span>

      <!-- Đường kẻ ngắn 10px ở giữa -->
      <div class="mt-2 flex justify-center">
        <div class="w-[200px] border-b border-zinc-400"></div>
      </div>

    </div>

    <div
      class="flex flex-col justify-start items-center h-screen bg-[#2A3140] text-zinc-300 font-medium text-[15px] mt-10 pt-1">

      <!-- DASHBOARD -->

      <div class="w-full py-3.5 cursor-pointer flex items-center hover:text-white">
        <svg viewBox="0 -0.5 25 25" fill="none" class="ml-7 " width="20px" height="20px"
          xmlns="http://www.w3.org/2000/svg" stroke="#f5f0f0">
          <path
            d="M6.25 10.5C6.25 10.0858 5.91421 9.75 5.5 9.75C5.08579 9.75 4.75 10.0858 4.75 10.5H6.25ZM11.5 19.75C11.9142 19.75 12.25 19.4142 12.25 19C12.25 18.5858 11.9142 18.25 11.5 18.25V19.75ZM4.75 10.5C4.75 10.9142 5.08579 11.25 5.5 11.25C5.91421 11.25 6.25 10.9142 6.25 10.5H4.75ZM11.5 5.75C11.9142 5.75 12.25 5.41421 12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25V5.75ZM5.5 9.75C5.08579 9.75 4.75 10.0858 4.75 10.5C4.75 10.9142 5.08579 11.25 5.5 11.25V9.75ZM11.5 11.25C11.9142 11.25 12.25 10.9142 12.25 10.5C12.25 10.0858 11.9142 9.75 11.5 9.75V11.25ZM10.75 10.5C10.75 10.9142 11.0858 11.25 11.5 11.25C11.9142 11.25 12.25 10.9142 12.25 10.5H10.75ZM12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5H12.25ZM12.25 10.5C12.25 10.0858 11.9142 9.75 11.5 9.75C11.0858 9.75 10.75 10.0858 10.75 10.5H12.25ZM10.75 14C10.75 14.4142 11.0858 14.75 11.5 14.75C11.9142 14.75 12.25 14.4142 12.25 14H10.75ZM11.5 18.25C11.0858 18.25 10.75 18.5858 10.75 19C10.75 19.4142 11.0858 19.75 11.5 19.75V18.25ZM20.25 14C20.25 13.5858 19.9142 13.25 19.5 13.25C19.0858 13.25 18.75 13.5858 18.75 14H20.25ZM10.75 19C10.75 19.4142 11.0858 19.75 11.5 19.75C11.9142 19.75 12.25 19.4142 12.25 19H10.75ZM12.25 14C12.25 13.5858 11.9142 13.25 11.5 13.25C11.0858 13.25 10.75 13.5858 10.75 14H12.25ZM11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5C10.75
            5.41421 11.0858 5.75 11.5 5.75V4.25ZM18.75 14C18.75 14.4142 19.0858 14.75 19.5 14.75C19.9142 14.75 20.25 14.4142 20.25 14H18.75ZM19.5 14.75C19.9142 14.75 20.25 14.4142 20.25 14C20.25 13.5858 19.9142 13.25 19.5 13.25V14.75ZM11.5 13.25C11.0858 13.25 10.75 13.5858 10.75 14C10.75 14.4142 11.0858 14.75 11.5 14.75V13.25ZM4.75 10.5L4.75 15H6.25L6.25 10.5H4.75ZM4.75 15C4.75 17.6234 6.87665 19.75 9.5 19.75V18.25C7.70507 18.25 6.25 16.7949 6.25 15H4.75ZM9.5 19.75H11.5V18.25H9.5V19.75ZM6.25 10.5V9H4.75V10.5H6.25ZM6.25 9C6.25 7.20507 7.70507 5.75 9.5 5.75V4.25C6.87665 4.25 4.75 6.37665 4.75 9H6.25ZM9.5 5.75H11.5V4.25H9.5V5.75ZM5.5 11.25H11.5V9.75H5.5V11.25ZM12.25 10.5V5H10.75V10.5H12.25ZM10.75 10.5V14H12.25V10.5H10.75ZM11.5 19.75H15.5V18.25H11.5V19.75ZM15.5 19.75C18.1234 19.75 20.25 17.6234 20.25 15H18.75C18.75 16.7949 17.2949 18.25 15.5 18.25V19.75ZM20.25 15V14H18.75V15H20.25ZM12.25 19V14H10.75V19H12.25ZM11.5 5.75H15.5L15.5 4.25H11.5V5.75ZM15.5 5.75C17.2949 5.75 18.75 7.20507 18.75 9L20.25 9C20.25 6.37665 18.1234 4.25 15.5 4.25L15.5 5.75ZM18.75 9V14H20.25V9L18.75 9ZM19.5 13.25H11.5V14.75H19.5V13.25Z"
            fill="#ffffff"></path>
        </svg>
        <button class="cursor-pointer ml-2 hover:-translate-y-0.5 transition duration-300">
          <router-link to="/admin/dasboard">Trang chủ</router-link>
        </button>
      </div>

      <!-- QL CHI NHÁNH -->

      <div class="w-full py-3.5 cursor-pointer flex items-center hover:text-white" @click="toggleBrach"
        :class="{ 'bg-[#384153]': isOpenBrach }">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="ml-7" width="20px" height="15px"
          fill="#ffffff" stroke="#ffffff">
          <path
            d="M44,9a7,7,0,1,0-9,6.7V16a6,6,0,0,1-6,6H21a10.3,10.3,0,0,0-6,2V15.7a7,7,0,1,0-4,0V32.3a7,7,0,1,0,4,0V32a6,6,0,0,1,6-6h8A10,10,0,0,0,39,16v-.3A7,7,0,0,0,44,9ZM10,9a3,3,0,0,1,6,0,3,3,0,0,1-6,0Zm6,30a3,3,0,1,1-3-3A2.9,2.9,0,0,1,16,39ZM37,12a2.9,2.9,0,0,1-3-3,3,3,0,0,1,6,0A2.9,2.9,0,0,1,37,12Z">
          </path>
        </svg>
        <button class="cursor-pointer ml-2 flex items-center hover:-translate-y-0.5 transition duration-300">
          QL chi nhánh
          <svg viewBox="0 0 24 24" fill="none" class="ml-10  transform transition-transform duration-300"
            :class="{ 'rotate-0': !isOpenBrach, '-rotate-90': isOpenBrach }" width="15px" height="15px"
            xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
              fill="#ffffff"></path>
          </svg>
        </button>
      </div>
      <transition>
        <ul v-if="isOpenBrach" class=" text-sm text-zinc-300 space-y-1 w-full bg-[#384153]">
          <li class="flex justify-center items-center hover:-translate-y-0.5 transition duration-300">
            <router-link to="/admin/branch" class="block py-1 ml-2 hover:text-white">
              Danh sách chi nhánh
            </router-link>
          </li>
          <li class="flex justify-center items-center -ml-7">
            <router-link to="/admin/branch/create"
              class="block py-1 hover:text-white ml-2 hover:-translate-y-0.5 transition duration-300">
              Thêm chi nhánh
            </router-link>
          </li>
        </ul>
      </transition>

      <!-- QL NHÂN SỰ -->

      <div class="w-full py-3.5 cursor-pointer flex items-center hover:text-white" @click="toggleUser"
        :class="{ 'bg-[#384153]': isOpenUser }">
        <svg width="20px" height="15px" class="ml-7" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff"
          stroke="#ffffff">
          <path class="st0"
            d="M256.008,411.524c54.5,0,91.968-7.079,92.54-13.881c2.373-28.421-34.508-43.262-49.381-48.834 c-7.976-2.984-19.588-11.69-19.588-17.103c0-3.587,0-8.071,0-14.214c4.611-5.119,8.095-15.532,10.183-27.317 c4.857-1.738,7.627-4.524,11.095-16.65c3.69-12.93-5.548-12.5-5.548-12.5c7.468-24.715-2.357-47.944-18.825-46.246 c-11.358-19.857-49.397,4.54-61.31,2.841c0,6.818,2.834,11.92,2.834,11.92c-4.143,7.882-2.548,23.564-1.389,31.485 c-0.667,0-9.016,0.079-5.468,12.5c3.452,12.126,6.23,14.912,11.088,16.65c2.079,11.786,5.571,22.198,10.198,27.317 c0,6.143,0,10.627,0,14.214c0,5.413-12.35,14.548-19.611,17.103c-14.953,5.262-51.746,20.413-49.373,48.834 C164.024,404.444,201.491,411.524,256.008,411.524z">
          </path>
          <path class="st0"
            d="M404.976,56.889h-75.833v16.254c0,31.365-25.524,56.889-56.889,56.889h-32.508 c-31.366,0-56.889-25.524-56.889-56.889V56.889h-75.834c-25.444,0-46.071,20.627-46.071,46.071v362.969 c0,25.444,20.627,46.071,46.071,46.071h297.952c25.445,0,46.072-20.627,46.072-46.071V102.96 C451.048,77.516,430.421,56.889,404.976,56.889z M402.286,463.238H109.714V150.349h292.572V463.238z">
          </path>
          <path class="st0"
            d="M239.746,113.778h32.508c22.405,0,40.635-18.23,40.635-40.635V40.635C312.889,18.23,294.659,0,272.254,0 h-32.508c-22.406,0-40.635,18.23-40.635,40.635v32.508C199.111,95.547,217.341,113.778,239.746,113.778z M231.619,40.635 c0-4.492,3.634-8.127,8.127-8.127h32.508c4.492,0,8.127,3.635,8.127,8.127v16.254c0,4.492-3.635,8.127-8.127,8.127h-32.508 c-4.493,0-8.127-3.635-8.127-8.127V40.635z">
          </path>
        </svg>
        <button class="cursor-pointer ml-2 flex items-center hover:-translate-y-0.5 transition duration-300">
          QL nhân sự
          <svg viewBox="0 0 24 24" fill="none" class="ml-13  transform transition-transform duration-300"
            :class="{ 'rotate-0': !isOpenUser, '-rotate-90': isOpenUser }" width="15px" height="15px"
            xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
              fill="#ffffff"></path>
          </svg>
        </button>
      </div>
      <transition>
        <ul v-if="isOpenUser" class=" text-sm text-zinc-300 space-y-1 w-full bg-[#384153]">
          <li>
            <router-link to="/admin/user/role"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              QL phân quyền
            </router-link>
          </li>
          <li>
            <router-link to="/admin/user"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              Danh sách nhân sự
            </router-link>
          </li>
          <li>
            <router-link to="/admin/user/create"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              Thêm nhân sự
            </router-link>
          </li>
        </ul>
      </transition>

      <!-- QL CATEGORY -->
      <div class="w-full py-3.5 cursor-pointer flex items-center hover:text-white" @click="toggleCategory"
        :class="{ 'bg-[#384153]': isOpenCategory }">
        <svg viewBox="0 0 512 512" width="20px" height="15px" class="ml-7" version="1.1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff">
          <title>product-management</title>
          <path
            d="M426.247658,366.986259 C426.477599,368.072636 426.613335,369.17172 426.653805,370.281095 L426.666667,370.986667 L426.666667,392.32 C426.666667,415.884149 383.686003,434.986667 330.666667,434.986667 C278.177524,434.986667 235.527284,416.264289 234.679528,393.025571 L234.666667,392.32 L234.666667,370.986667 L234.679528,370.281095 C234.719905,369.174279 234.855108,368.077708 235.081684,366.992917 C240.961696,371.41162 248.119437,375.487081 256.413327,378.976167 C275.772109,387.120048 301.875889,392.32 330.666667,392.32 C360.599038,392.32 387.623237,386.691188 407.213205,377.984536 C414.535528,374.73017 420.909655,371.002541 426.247658,366.986259 Z M192,7.10542736e-15 L384,106.666667 L384.001134,185.388691 C368.274441,181.351277 350.081492,178.986667 330.666667,178.986667 C301.427978,178.986667 274.9627,184.361969 255.43909,193.039129 C228.705759,204.92061 215.096345,223.091357 213.375754,241.480019 L213.327253,242.037312 L213.449,414.75 L192,426.666667 L-2.13162821e-14,320 L-2.13162821e-14,106.666667 L192,7.10542736e-15 Z M426.247658,302.986259 C426.477599,304.072636 426.613335,305.17172 426.653805,306.281095 L426.666667,306.986667 L426.666667,328.32 C426.666667,351.884149 383.686003,370.986667 330.666667,370.986667 C278.177524,370.986667 235.527284,352.264289 234.679528,329.025571 L234.666667,328.32 L234.666667,306.986667 L234.679528,306.281095
            C234.719905,305.174279 234.855108,304.077708 235.081684,302.992917 C240.961696,307.41162 248.119437,311.487081 256.413327,314.976167 C275.772109,323.120048 301.875889,328.32 330.666667,328.32 C360.599038,328.32 387.623237,322.691188 407.213205,313.984536 C414.535528,310.73017
            420.909655,307.002541 426.247658,302.986259 Z M127.999,199.108 L128,343.706 L170.666667,367.410315 L170.666667,222.811016 L127.999,199.108 Z M42.6666667,151.701991 L42.6666667,296.296296 L85.333,320.001 L85.333,175.405 L42.6666667,151.701991 Z M330.666667,200.32 C383.155809,200.32 425.80605,219.042377 426.653805,242.281095 L426.666667,242.986667 L426.666667,264.32 C426.666667,287.884149 383.686003,306.986667 330.666667,306.986667 C278.177524,306.986667 235.527284,288.264289 234.679528,265.025571 L234.666667,264.32 L234.666667,242.986667 L234.808715,240.645666 C237.543198,218.170241 279.414642,200.32 330.666667,200.32 Z M275.991,94.069 L150.412,164.155 L192,187.259259 L317.866667,117.333333 L275.991,94.069 Z M192,47.4074074 L66.1333333,117.333333 L107.795,140.479 L233.373,70.393 L192,47.4074074 Z"
            id="Combined-Shape"> </path>
        </svg>
        <button class="cursor-pointer ml-2 flex items-center hover:-translate-y-0.5 transition duration-300">
          QL sản phẩm
          <svg viewBox="0 0 24 24" fill="none" class="ml-10  transform transition-transform duration-300"
            :class="{ 'rotate-0': !isOpenCategory, '-rotate-90': isOpenCategory }" width="15px" height="15px"
            xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
              fill="#ffffff"></path>
          </svg>
        </button>
      </div>
      <transition>
        <ul v-if="isOpenCategory" class=" text-sm text-zinc-300 space-y-1 w-full bg-[#384153]">
          <li>
            <router-link to="/admin/category"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              QL danh mục
            </router-link>
          </li>
          <li>
            <router-link to="/admin/category/product"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              Danh sách sản phẩm
            </router-link>
          </li>
          <li>
            <router-link to="/admin/category/product/create"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              Thêm sản phẩm
            </router-link>
          </li>
        </ul>
      </transition>

      <!-- QL KHO -->
      <div class="w-full py-3.5 cursor-pointer flex items-center hover:text-white" @click="togglePurchase"
        :class="{ 'bg-[#384153]': isOpenPurchase }">
        <svg viewBox="0 0 1024 1024" fill="#ffffff" width="20px" height="15px" class="ml-7 mb-0.5" version="1.1"
          xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
          <path d="M300 462.4h424.8v48H300v-48zM300 673.6H560v48H300v-48z" fill=""></path>
          <path
            d="M818.4 981.6H205.6c-12.8 0-24.8-2.4-36.8-7.2-11.2-4.8-21.6-11.2-29.6-20-8.8-8.8-15.2-18.4-20-29.6-4.8-12-7.2-24-7.2-36.8V250.4c0-12.8 2.4-24.8 7.2-36.8 4.8-11.2 11.2-21.6 20-29.6 8.8-8.8 18.4-15.2 29.6-20 12-4.8 24-7.2 36.8-7.2h92.8v47.2H205.6c-25.6 0-47.2 20.8-47.2 47.2v637.6c0 25.6 20.8 47.2 47.2 47.2h612c25.6 0 47.2-20.8 47.2-47.2V250.4c0-25.6-20.8-47.2-47.2-47.2H725.6v-47.2h92.8c12.8 0 24.8 2.4 36.8 7.2 11.2 4.8 21.6 11.2 29.6 20 8.8 8.8 15.2 18.4 20 29.6 4.8 12 7.2 24 7.2 36.8v637.6c0 12.8-2.4 24.8-7.2 36.8-4.8 11.2-11.2 21.6-20 29.6-8.8 8.8-18.4 15.2-29.6 20-12 5.6-24 8-36.8 8z"
            fill=""></path>
          <path
            d="M747.2 297.6H276.8V144c0-32.8 26.4-59.2 59.2-59.2h60.8c21.6-43.2 66.4-71.2 116-71.2 49.6 0 94.4 28 116 71.2h60.8c32.8 0 59.2 26.4 59.2 59.2l-1.6 153.6z m-423.2-47.2h376.8V144c0-6.4-5.6-12-12-12H595.2l-5.6-16c-11.2-32.8-42.4-55.2-77.6-55.2-35.2 0-66.4 22.4-77.6 55.2l-5.6 16H335.2c-6.4 0-12 5.6-12 12v106.4z"
            fill=""></path>
        </svg>
        <button class="cursor-pointer ml-2 flex items-center hover:-translate-y-0.5 transition duration-300">
          QL kho
          <svg viewBox="0 0 24 24" fill="none" class="ml-20  transform transition-transform duration-300"
            :class="{ 'rotate-0': !isOpenPurchase, '-rotate-90': isOpenPurchase }" width="15px" height="15px"
            xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
              fill="#ffffff"></path>
          </svg>
        </button>
      </div>
      <transition>
        <ul v-if="isOpenPurchase" class=" text-sm text-zinc-300 space-y-1 w-full bg-[#384153]">
          <li>
            <router-link to="/admin/purchase/supplier"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              QL Nhà cung cấp
            </router-link>
          </li>
          <li>
            <router-link to="/admin/purchase/stock-receipt"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              QL Nhập kho
            </router-link>
          </li>
          <li>
            <router-link to="/admin/purchase/create"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              QL Xuất kho
            </router-link>
          </li>
        </ul>
      </transition>
      <div class="w-full py-3.5 cursor-pointer flex items-center hover:text-white" @click="toggleCustomer"
        :class="{ 'bg-[#384153]': isOpenCustomer }">
        <svg viewBox="0 0 1024 1024" class="icon ml-7" width="20px" height="18px" version="1.1"
          xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff">
          <path
            d="M670.5 471.7c-7.1-3.1-14.2-5.9-21.4-8.5 49.8-40.3 81.6-101.8 81.6-170.6 0-121-98.4-219.4-219.4-219.4s-219.4 98.4-219.4 219.4c0 68.9 31.9 130.5 81.7 170.7C219.4 519.6 109 667.8 109 841.3h73.1c0-181.5 147.7-329.1 329.1-329.1 45.3 0 89.1 9 130.2 26.7l29.1-67.2zM511.3 146.3c80.7 0 146.3 65.6 146.3 146.3S592 438.9 511.3 438.9 365 373.2 365 292.6s65.6-146.3 146.3-146.3zM612.5 636.5c0 10.2 5.6 19.5 14.6 24.2l128 67.6c4 2.1 8.4 3.2 12.8 3.2s8.8-1.1 12.8-3.2l128-67.6c9-4.8 14.6-14.1 14.6-24.2s-5.6-19.5-14.6-24.2l-128-67.7c-8-4.2-17.6-4.2-25.6 0l-128 67.7c-9 4.7-14.6 14-14.6 24.2z m155.4-36.6l69.3 36.6-69.3 36.6-69.3-36.6 69.3-36.6z"
            fill="#ffffff"></path>
          <path d="M767.9 763.4l-147-77.7-25.6 48.5 172.6 91.2 171.9-90.8-25.6-48.5z" fill="#ffffff"></path>
          <path d="M767.9 851.4l-147-77.6-25.6 48.4 172.6 91.3 171.3-90.6-25.6-48.5z" fill="#ffffff"></path>
        </svg>
        <button class="cursor-pointer ml-2 flex items-center hover:-translate-y-0.5 transition duration-300">
          QL Khách hàng
          <svg viewBox="0 0 24 24" fill="none" class="ml-6.5  transform transition-transform duration-300"
            :class="{ 'rotate-0': !isOpenCustomer, '-rotate-90': isOpenCustomer }" width="15px" height="15px"
            xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
              fill="#ffffff"></path>
          </svg>
        </button>
      </div>
      <transition>
        <ul v-if="isOpenCustomer" class=" text-sm text-zinc-300 space-y-1 w-full bg-[#384153]">
          <li>
            <router-link to="/admin/customer"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              Danh sách khách hàng
            </router-link>
          </li>
          <li>
            <router-link to="/admin/customer/order-management"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              QL đơn hàng
            </router-link>
          </li>
        </ul>
      </transition>

      <!-- QL Blog -->
      <div class="w-full py-3.5 cursor-pointer flex items-center hover:text-white" @click="toggleBlog"
        :class="{ 'bg-[#384153]': isOpenBlog }">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" ml-7"
          data-lov-id="src/components/AppSidebar.tsx:75:22" data-lov-name="item.icon"
          data-component-path="src/components/AppSidebar.tsx" data-component-line="75"
          data-component-file="AppSidebar.tsx" data-component-name="item.icon"
          data-component-content="%7B%22className%22%3A%22w-5%20h-5%20min-w-5%22%7D">
          <path
            d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2">
          </path>
          <path d="M18 14h-8"></path>
          <path d="M15 18h-5"></path>
          <path d="M10 6h8v4h-8V6Z"></path>
        </svg>
        <button class="cursor-pointer ml-2 flex items-center hover:-translate-y-0.5 transition duration-300">
          QL Bài viết
          <svg viewBox="0 0 24 24" fill="none" class="ml-14  transform transition-transform duration-300"
            :class="{ 'rotate-0': !isOpenBlog, '-rotate-90': isOpenBlog }" width="15px" height="15px"
            xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
              fill="#ffffff"></path>
          </svg>

        </button>
      </div>
      <transition>
        <ul v-if="isOpenBlog" class=" text-sm text-zinc-300 space-y-1 w-full bg-[#384153]">
          <li>
            <router-link :to="{ name: 'category_blog' }"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              QL danh mục bài viết
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'blog' }"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              Danh sách bài viết
            </router-link>
          </li>
          <li>
            <router-link to="/admin/blog/create"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              Thêm bài viết
            </router-link>
          </li>
        </ul>
      </transition>

      <!-- Website -->
      <div class="w-full py-3.5 cursor-pointer flex items-center hover:text-white" @click="toggleWebsite"
        :class="{ 'bg-[#384153]': isOpenWebsite }">
        <svg fill="#FFFFFF" viewBox="0 0 30 30" width="18px" height="18px" class="ml-8" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M17.5 15c-.797 0-1.456.314-1.88.793-.424.48-.62 1.098-.62 1.707 0 .78-.568 1.418-.81 1.607-.372.294-.165.892.31.893H17c.786 0 1.517-.23 2.072-.662.555-.432.928-1.09.928-1.838 0-.683-.193-1.32-.63-1.785C18.93 15.25 18.273 15 17.5 15zm0 1c.57 0 .914.16 1.14.4.227.24.36.602.36 1.1 0 .432-.19.776-.54 1.05-.353.272-.872.45-1.46.45h-1.423c.237-.4.422-.9.422-1.5 0-.39.13-.772.368-1.043.24-.27.583-.457 1.132-.457zM29.284 5.01c-.126.015-.233.048-.352.09-.238.08-.513.21-.838.374-.65.33-1.477.813-2.35 1.365-1.75 1.103-3.66 2.457-4.642 3.438-.935.934-1.616 1.784-1.936 2.637-.32.852-.186 1.777.478 2.44.665.665 1.59.8 2.442.48.853-.32 1.703-1.002 2.637-1.936.98-.983 2.335-2.893 3.44-4.64.552-.876 1.035-1.704 1.365-2.353.165-.324.293-.6.375-.838.04-.12.072-.226.086-.352.013-.126.047-.327-.167-.54-.214-.215-.413-.18-.54-.167zm-.647 1.444c-.307.603-.78 1.416-1.32 2.27-1.08 1.713-2.46 3.628-3.3 4.468-.888.887-1.678 1.48-2.283 1.707-.604.225-.954.177-1.383-.25-.427-.43-.475-.78-.25-1.384.228-.604.82-1.394 1.71-2.28.84-.84 2.754-2.22 4.466-3.3.856-.542 1.668-1.015 2.272-1.322.134-.036.13.022.09.09zM2.5 8h17c.277 0 .5.223.5.5s-.223.5-.5.5h-17c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zM7 6.5c0 .276-.224.5-.5.5S6 6.776 6 6.5s.224-.5.5-.5.5.224.5.5zm-2 0c0 .276-.224.5-.5.5S4 6.776 4 6.5s.224-.5.5-.5.5.224.5.5zm-2 0c0 .276-.224.5-.5.5S2 6.776 2 6.5s.224-.5.5-.5.5.224.5.5zM1.5 4C.678 4 0 4.678 0 5.5v19c0 .822.678 1.5 1.5 1.5h25c.822 0 1.5-.678 1.5-1.5v-12c0-.668-1-.665-1 0v12c0 .286-.214.5-.5.5h-25c-.286 0-.5-.214-.5-.5v-19c0-.286.214-.5.5-.5h25c.665 0 .657-1 0-1z">
            </path>
          </g>
        </svg>
        <button class="cursor-pointer ml-2 flex items-center hover:-translate-y-0.5 transition duration-300">
          QL Website
          <svg viewBox="0 0 24 24" fill="none" class="ml-12  transform transition-transform duration-300"
            :class="{ 'rotate-0': !isOpenWebsite, '-rotate-90': isOpenWebsite }" width="15px" height="15px"
            xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
              fill="#ffffff"></path>
          </svg>

        </button>
      </div>
      <transition>
        <ul v-if="isOpenWebsite" class=" text-sm text-zinc-300 space-y-1 w-full bg-[#384153]">
          <li>
            <router-link :to="{ name: 'introduction' }"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              Giới Thiệu
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'policy' }"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              Chính sách
            </router-link>
          </li>
          <li>
            <router-link to="/admin/blog/create"
              class="block py-1 hover:text-white ml-17 hover:-translate-y-0.5 transition duration-300">
              Liên hệ
            </router-link>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isOpenBrach = ref(false)
const isOpenUser = ref(false)
const isOpenCategory = ref(false)
const isOpenPurchase = ref(false)
const isOpenCustomer = ref(false)
const isOpenBlog = ref(false)
const isOpenWebsite = ref(false)

// Tự mở menu nếu vào đúng trang
watch(() => route.path, (newPath) => {
  isOpenBrach.value = newPath.startsWith('/admin/branch')
}, { immediate: true })

watch(() => route.path, (newPath) => {
  isOpenUser.value = newPath.startsWith('/admin/user')
}, { immediate: true })

watch(() => route.path, (newPath) => {
  isOpenCategory.value = newPath.startsWith('/admin/category')
}, { immediate: true })

watch(() => route.path, (newPath) => {
  isOpenPurchase.value = newPath.startsWith('/admin/purchase')
}, { immediate: true })

watch(() => route.path, (newPath) => {
  isOpenCustomer.value = newPath.startsWith('/admin/customer')
}, { immediate: true })

watch(() => route.path, (newPath) => {
  isOpenBlog.value = newPath.startsWith('/admin/blog')
}, { immediate: true })

watch(() => route.path, (newPath) => {
  isOpenWebsite.value = newPath.startsWith('/admin/website')
}, { immediate: true })



const toggleBrach = () => {
  isOpenBrach.value = !isOpenBrach.value
}
const toggleUser = () => {
  isOpenUser.value = !isOpenUser.value
}
const toggleCategory = () => {
  isOpenCategory.value = !isOpenCategory.value
}
const togglePurchase = () => {
  isOpenPurchase.value = !isOpenPurchase.value
}
const toggleCustomer = () => {
  isOpenCustomer.value = !isOpenCustomer.value
}
const toggleBlog = () => {
  isOpenBlog.value = !isOpenBlog.value
}
const toggleWebsite = () => {
  isOpenWebsite.value = !isOpenWebsite.value
}
</script>
<style></style>
