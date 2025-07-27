import axiosAdmin from "@/plugins/axion";
import { ref } from "vue";
import { defineStore } from "pinia";
export const useAllOrderStore = defineStore('allorder', () => {
  const orders = ref([])
  const total_profit = ref(0)
  const total_order = ref(0)
  const total_order_waiting = ref(0)
  const total_order_completed = ref(0)

  async function fetchAllOrder() {
    const res = await axiosAdmin.get('/api/order')
    orders.value = res.data.order
  }
  async function fetchOrderProfit() {
    const res = await axiosAdmin.get('/api/order/total-profit')
    total_profit.value = res.data.total_profit
    total_order.value = res.data.total_order
    total_order_waiting.value = res.data.total_order_waiting
    total_order_completed.value = res.data.total_order_completed
  }
  return {
    orders,
    total_profit,
    total_order,
    total_order_waiting,
    total_order_completed,
    fetchAllOrder,
    fetchOrderProfit
  }
})
