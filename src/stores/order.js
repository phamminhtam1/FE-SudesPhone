import axiosCustomer from '@/plugins/axioscustomer'
import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useOrderStore = defineStore('order', () => {
  const order_list = ref([])

  async function fetchOrderList() {
    const res = await axiosCustomer.get('/api/customer/my-order')
    order_list.value = res.data.orderlist
  }

  return {
    order_list,
    fetchOrderList,
  }
})
