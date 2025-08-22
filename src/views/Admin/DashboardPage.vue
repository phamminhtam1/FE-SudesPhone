<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue';
import LeftMenu from '@/components/layout/backend/LeftMenu.vue';
import HeaderAdmin from '@/components/layout/backend/HeaderAdmin.vue';

const revenueChartEl = ref(null);
const topProductsChartEl = ref(null);
let chartInstance = null;
let topProductsChartInstance = null;

const initRevenueChart = () => {
  if (!revenueChartEl.value || !(window).echarts) return;
  const echarts = (window).echarts;
  chartInstance = echarts.init(revenueChartEl.value);
  const option = {
    grid: { left: 40, right: 20, top: 30, bottom: 35 },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (val) => `${Math.round(val / 1e6)}M`
      }
    },
    series: [
      {
        name: 'Doanh thu',
        type: 'line',
        smooth: true,
        showSymbol: true,
        symbolSize: 8,
        lineStyle: { width: 3 },
        itemStyle: { color: '#2563eb' },
        areaStyle: { color: 'rgba(37,99,235,0.08)' },
        data: [45, 52, 49, 61, 55, 67, 72, 69, 75, 82, 88, 96].map(v => v * 1e6)
      }
    ]
  };
  chartInstance.setOption(option);
};

const initTopProductsChart = () => {
  if (!topProductsChartEl.value || !(window).echarts) return;
  const echarts = (window).echarts;
  topProductsChartInstance = echarts.init(topProductsChartEl.value);

  const option = {
    grid: {
      left: 140,
      right: 40,
      top: 40,
      bottom: 40
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: {
        color: '#374151',
        fontSize: 12
      },
      formatter: function(params) {
        return `<div style="padding: 8px;">
          <div style="font-weight: 600; margin-bottom: 4px;">${params.name}</div>
          <div style="color: #6b7280;">Doanh số: <span style="color: #3b82f6; font-weight: 600;">${params.value}</span></div>
        </div>`;
      }
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#9ca3af',
        fontSize: 11,
        formatter: (val) => `${val}`
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['AirPods Pro', 'Apple Watch', 'iPad Pro', 'MacBook Air M3', 'iPhone 15 Pro'],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#374151',
        fontSize: 12,
        fontWeight: 500
      }
    },
    series: [
      {
        name: 'Doanh số',
        type: 'bar',
        data: [0.85, 0.72, 0.68, 0.91, 0.95],
        barWidth: '70%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#1d4ed8' }
            ]
          },
          borderRadius: [0, 6, 6, 0],
          shadowBlur: 8,
          shadowColor: 'rgba(125, 211, 252, 0.25)',
          shadowOffsetX: 1
        },
        emphasis: {
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#3b82f6' },
                { offset: 1, color: '#1d4ed8' }
              ]
            },
            shadowBlur: 12,
            shadowColor: 'rgba(125, 211, 252, 0.35)'
          }
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}',
          fontSize: 11,
          fontWeight: 600,
          color: '#374151',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: [4, 8],
          borderRadius: 4
        }
      }
    ]
  };

  topProductsChartInstance.setOption(option);
};

const handleResize = () => {
  if (chartInstance) chartInstance.resize();
  if (topProductsChartInstance) topProductsChartInstance.resize();
};

onMounted(async () => {
  await nextTick();
  initRevenueChart();
  initTopProductsChart();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
  if (topProductsChartInstance) {
    topProductsChartInstance.dispose();
    topProductsChartInstance = null;
  }
});
</script>
<template>
  <LeftMenu />
  <HeaderAdmin />
  <div class="ml-57 p-4">
    <h1 class="text-xl font-medium text-zinc-700">Tổng quan hoạt động bán hàng Sudes Phone</h1>
    <div class="grid grid-cols-4 gap-4 mt-5">
      <div class="col-span-1 group border border-zinc-200 rounded-lg px-5 py-3 shadow-lg flex flex-col gap-3 transition-shadow duration-200 hover:shadow-xl">
        <div class="flex justify-between items-center">
          <span class="text-zinc-700 text-[14px] font-medium ">Tổng doanh thu</span>
          <div class="border border-[#E9EFFC] rounded-lg p-1 bg-[#E9EFFC]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-dollar-sign w-4 h-4 text-primary"
              data-lov-id="src/components/admin/DashboardCards.tsx:48:14" data-lov-name="DollarSign"
              data-component-path="src/components/admin/DashboardCards.tsx" data-component-line="48"
              data-component-file="DashboardCards.tsx" data-component-name="DollarSign"
              data-component-content="%7B%22className%22%3A%22w-4%20h-4%20text-primary%22%7D">
              <line x1="12" x2="12" y1="2" y2="22"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
        </div>
        <span class="text-2xl font-bold text-zinc-700">2.340.500.000đ</span>
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-trending-up w-3 h-3 text-success"
            data-lov-id="src/components/admin/DashboardCards.tsx:30:10" data-lov-name="TrendIcon"
            data-component-path="src/components/admin/DashboardCards.tsx" data-component-line="30"
            data-component-file="DashboardCards.tsx" data-component-name="TrendIcon" data-component-content="%7B%7D">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
          </svg>
          <span class="text-green-700 text-[12px]">+12%</span>
          <span class="text-zinc-700 text-[12px] font-medium">so với tháng trước</span>
        </div>
      </div>
      <div class="col-span-1 group border border-zinc-200 rounded-lg px-5 py-3 shadow-lg flex flex-col gap-3 transition-shadow duration-200 hover:shadow-xl">
        <div class="flex justify-between items-center">
          <span class="text-zinc-700 text-[14px] font-medium ">Tổng đơn hàng</span>
          <div class="border border-[#E9EFFC] rounded-lg p-1 bg-[#E9EFFC]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-shopping-bag w-4 h-4 text-primary"
              data-lov-id="src/components/admin/DashboardCards.tsx:57:14" data-lov-name="ShoppingBag"
              data-component-path="src/components/admin/DashboardCards.tsx" data-component-line="57"
              data-component-file="DashboardCards.tsx" data-component-name="ShoppingBag"
              data-component-content="%7B%22className%22%3A%22w-4%20h-4%20text-primary%22%7D">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
        </div>
        <span class="text-2xl font-bold text-zinc-700">1.234</span>
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-trending-up w-3 h-3 text-success"
            data-lov-id="src/components/admin/DashboardCards.tsx:30:10" data-lov-name="TrendIcon"
            data-component-path="src/components/admin/DashboardCards.tsx" data-component-line="30"
            data-component-file="DashboardCards.tsx" data-component-name="TrendIcon" data-component-content="%7B%7D">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
          </svg>
          <span class="text-green-700 text-[12px]">+8.2%</span>
          <span class="text-zinc-700 text-[12px] font-medium">so với tuần trước</span>
        </div>
      </div>
      <div class="col-span-1 group border border-zinc-200 rounded-lg px-5 py-3 shadow-lg flex flex-col gap-3 transition-shadow duration-200 hover:shadow-xl">
        <div class="flex justify-between items-center">
          <span class="text-zinc-700 text-[14px] font-medium ">Khách hàng mới</span>
          <div class="border border-[#E9EFFC] rounded-lg p-1 bg-[#E9EFFC]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-users w-4 h-4 text-primary"
              data-lov-id="src/components/admin/DashboardCards.tsx:66:14" data-lov-name="Users"
              data-component-path="src/components/admin/DashboardCards.tsx" data-component-line="66"
              data-component-file="DashboardCards.tsx" data-component-name="Users"
              data-component-content="%7B%22className%22%3A%22w-4%20h-4%20text-primary%22%7D">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        </div>
        <span class="text-2xl font-bold text-zinc-700">156</span>
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-trending-down w-3 h-3 text-destructive"
            data-lov-id="src/components/admin/DashboardCards.tsx:30:10" data-lov-name="TrendIcon"
            data-component-path="src/components/admin/DashboardCards.tsx" data-component-line="30"
            data-component-file="DashboardCards.tsx" data-component-name="TrendIcon" data-component-content="%7B%7D">
            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
            <polyline points="16 17 22 17 22 11"></polyline>
          </svg>
          <span class="text-red-700 text-[12px]">-2.1%</span>
          <span class="text-zinc-700 text-[12px] font-medium">so với tuần trước</span>
        </div>
      </div>
      <div class="col-span-1 group border border-zinc-200 rounded-lg px-5 py-3 shadow-lg flex flex-col gap-3 transition-shadow duration-200 hover:shadow-xl">
        <div class="flex justify-between items-center">
          <span class="text-zinc-700 text-[14px] font-medium ">Tổng doanh thu</span>
          <div class="border border-[#E9EFFC] rounded-lg p-1 bg-[#E9EFFC]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-package w-4 h-4 text-primary"
              data-lov-id="src/components/admin/DashboardCards.tsx:75:14" data-lov-name="Package"
              data-component-path="src/components/admin/DashboardCards.tsx" data-component-line="75"
              data-component-file="DashboardCards.tsx" data-component-name="Package"
              data-component-content="%7B%22className%22%3A%22w-4%20h-4%20text-primary%22%7D">
              <path
                d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z">
              </path>
              <path d="M12 22V12"></path>
              <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path>
              <path d="m7.5 4.27 9 5.15"></path>
            </svg>
          </div>
        </div>
        <span class="text-2xl font-bold text-zinc-700">121</span>
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-trending-up w-3 h-3 text-success"
            data-lov-id="src/components/admin/DashboardCards.tsx:30:10" data-lov-name="TrendIcon"
            data-component-path="src/components/admin/DashboardCards.tsx" data-component-line="30"
            data-component-file="DashboardCards.tsx" data-component-name="TrendIcon" data-component-content="%7B%7D">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
          </svg>
          <span class="text-green-700 text-[12px]">+3</span>
          <span class="text-zinc-700 text-[12px] font-medium">đang kinh doanh</span>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-7">
      <div class="col-span-1 border border-zinc-200 rounded-lg px-5 py-3 flex flex-col gap-1">
        <h1 class="text-xl font-medium text-zinc-700">Doanh thu theo tháng</h1>
        <h2 class="text-[13px] text-zinc-600">Tổng doanh thu 12 tháng qua (VNĐ)</h2>
        <div ref="revenueChartEl" style="height: 320px; width: 100%;" class="mt-3"></div>
      </div>
      <div class="col-span-1 border border-zinc-200 rounded-lg px-5 py-3 flex flex-col gap-1">
        <h1 class="text-xl font-medium text-zinc-700">Sản phẩm bán chạy</h1>
        <h2 class="text-[13px] text-zinc-600">Top 5 sản phẩm có doanh số cao nhất</h2>
        <div ref="topProductsChartEl" style="height: 320px; width: 100%;" class="mt-3"></div>
      </div>
    </div>
  </div>
</template>

<style></style>
