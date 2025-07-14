<script setup>
defineProps(['name', 'email', 'date'])
</script>

<template>
  <h2 class="text-2xl uppercase font-semibold text-gray-800">Thông tin tài khoản</h2>
  <p class="border-b-4 w-20 border-red-500 rounded-2xl -mt-5"></p>
  <div class="grid grid-cols-2 gap-6">
    <div class="p-4 border border-red-100 bg-gradient-to-r from-[#FEF2F2] to-[#FEF6ED] rounded-lg">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-user w-6 h-6 text-red-600" data-lov-id="src/components/AccountInfo.tsx:18:14"
          data-lov-name="User" data-component-path="src/components/AccountInfo.tsx" data-component-line="18"
          data-component-file="AccountInfo.tsx" data-component-name="User"
          data-component-content="%7B%22className%22%3A%22w-6%20h-6%20text-red-600%22%7D">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span class="font-medium text-[16px]">
          Thông tin cá nhân
        </span>
      </div>
      <div class="flex justify-between mt-5 border-b-red-100 border-b pb-2">
        <p>Họ tên:</p>
        <span class="font-medium">{{ name }}</span>
      </div>
      <div class="flex justify-between mt-5 border-b-red-100 border-b pb-2">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-mail w-4 h-4 mr-2" data-lov-id="src/components/AccountInfo.tsx:30:18"
            data-lov-name="Mail" data-component-path="src/components/AccountInfo.tsx" data-component-line="30"
            data-component-file="AccountInfo.tsx" data-component-name="Mail"
            data-component-content="%7B%22className%22%3A%22w-4%20h-4%20mr-2%22%7D"
            bis_size="{&quot;x&quot;:475,&quot;y&quot;:487,&quot;w&quot;:16,&quot;h&quot;:16,&quot;abs_x&quot;:865,&quot;abs_y&quot;:536}">
            <rect width="20" height="16" x="2" y="4" rx="2"
              bis_size="{&quot;x&quot;:476,&quot;y&quot;:489,&quot;w&quot;:13,&quot;h&quot;:10,&quot;abs_x&quot;:866,&quot;abs_y&quot;:538}">
            </rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
              bis_size="{&quot;x&quot;:476,&quot;y&quot;:491,&quot;w&quot;:13,&quot;h&quot;:3,&quot;abs_x&quot;:866,&quot;abs_y&quot;:540}">
            </path>
          </svg>
          <p>Email:</p>
        </div>
        <span class="font-medium">{{ email }}</span>
      </div>
      <div class="flex justify-between mt-5 border-b-red-100 border-b pb-2">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-calendar w-4 h-4 mr-2" data-lov-id="src/components/AccountInfo.tsx:38:18"
            data-lov-name="Calendar" data-component-path="src/components/AccountInfo.tsx" data-component-line="38"
            data-component-file="AccountInfo.tsx" data-component-name="Calendar"
            data-component-content="%7B%22className%22%3A%22w-4%20h-4%20mr-2%22%7D"
            bis_size="{&quot;x&quot;:475,&quot;y&quot;:552,&quot;w&quot;:16,&quot;h&quot;:16,&quot;abs_x&quot;:865,&quot;abs_y&quot;:601}">
            <path d="M8 2v4"
              bis_size="{&quot;x&quot;:480,&quot;y&quot;:553,&quot;w&quot;:0,&quot;h&quot;:2,&quot;abs_x&quot;:870,&quot;abs_y&quot;:602}">
            </path>
            <path d="M16 2v4"
              bis_size="{&quot;x&quot;:486,&quot;y&quot;:553,&quot;w&quot;:0,&quot;h&quot;:2,&quot;abs_x&quot;:876,&quot;abs_y&quot;:602}">
            </path>
            <rect width="18" height="18" x="3" y="4" rx="2"
              bis_size="{&quot;x&quot;:477,&quot;y&quot;:554,&quot;w&quot;:12,&quot;h&quot;:12,&quot;abs_x&quot;:867,&quot;abs_y&quot;:603}">
            </rect>
            <path d="M3 10h18"
              bis_size="{&quot;x&quot;:477,&quot;y&quot;:558,&quot;w&quot;:12,&quot;h&quot;:0,&quot;abs_x&quot;:867,&quot;abs_y&quot;:607}">
            </path>
          </svg>
          <p>Ngày tham gia:</p>
        </div>
        <span class="font-medium">{{ new Date(date).toLocaleString('vi-VN', {
          hour12: false
        }) }}</span>
      </div>
    </div>
    <div class="p-4 border border-blue-200 bg-gradient-to-r from-[#EFF5FF] to-[#EEF3FF] rounded-lg">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-map-pin w-6 h-6 text-blue-600" data-lov-id="src/components/AccountInfo.tsx:51:14"
          data-lov-name="MapPin" data-component-path="src/components/AccountInfo.tsx" data-component-line="51"
          data-component-file="AccountInfo.tsx" data-component-name="MapPin"
          data-component-content="%7B%22className%22%3A%22w-6%20h-6%20text-blue-600%22%7D"
          bis_size="{&quot;x&quot;:968,&quot;y&quot;:364,&quot;w&quot;:24,&quot;h&quot;:24,&quot;abs_x&quot;:1358,&quot;abs_y&quot;:413}">
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
            bis_size="{&quot;x&quot;:972,&quot;y&quot;:366,&quot;w&quot;:16,&quot;h&quot;:19,&quot;abs_x&quot;:1362,&quot;abs_y&quot;:415}">
          </path>
          <circle cx="12" cy="10" r="3"
            bis_size="{&quot;x&quot;:977,&quot;y&quot;:371,&quot;w&quot;:6,&quot;h&quot;:6,&quot;abs_x&quot;:1367,&quot;abs_y&quot;:420}">
          </circle>
        </svg>
        <span class="font-medium text-[16px]">
          Thống kê tài khoản
        </span>
      </div>
      <div class="grid grid-cols-2 gap-2 mt-3">
        <div class="bg-white flex items-center justify-center p-3 rounded-lg">
          <span class="text-center text-2xl font-bold text-red-500">12<p
              class="text-center text-[14px] font-normal text-zinc-600">
              Đơn hàng
            </p>
          </span>
        </div>
        <div class="bg-white flex items-center justify-center p-3 rounded-lg">
          <span class="text-center text-2xl font-bold text-[#EA580C]">4<p
              class="text-center text-[14px] font-normal text-zinc-600">
              Yêu thích
            </p>
          </span>
        </div>
        <div class="bg-white flex items-center justify-center p-3 rounded-lg">
          <span class="text-center text-2xl font-bold text-[#16A34A]">3<p
              class="text-center text-[14px] font-normal text-zinc-600">
              So sánh
            </p>
          </span>
        </div>
        <div class="bg-white flex items-center justify-center p-3 rounded-lg">
          <span class="text-center text-2xl font-bold text-[#9333EA]">0<p
              class="text-center text-[14px] font-normal text-zinc-600">
              Địa chỉ
            </p>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
