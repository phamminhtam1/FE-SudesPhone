import axiosCustomer from '@/plugins/axioscustomer'
import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useOrderDetailStore = defineStore('orderdetail', () => {
  const order_items = ref([])
  const products = ref([])
  const profile = ref('')

  async function fetchOrderDetail(order_id) {
    const res = await axiosCustomer.get(`/api/customer/my-order/${order_id}`)
    profile.value = res.data.order
    order_items.value = profile.value.items
    products.value = order_items.value.map((item) => {
      const product = item.product
      const color = product.specs?.find((spec) => spec.spec_key === 'Màu sắc')?.spec_value || ''
      const image = product.images?.[0]?.img_url || ''
      return {
        id: product.prod_id,
        name: product.name,
        color: color,
        price: Number(product.discount_price),
        quantity: item.qty,
        total: item.qty * Number(product.discount_price),
        image: image,
        images: product.images || [],
        specs: product.specs || [],
      }
    })
  }

  return {
    order_items,
    products,
    profile,
    fetchOrderDetail,
  }
})
