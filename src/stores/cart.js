import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])

  // Lấy giỏ hàng từ API
  async function fetchCart() {
    const res = await axios.get('/api/customer/cart/me')
    const c = res.data.cart
    if (Array.isArray(c) && c.length > 0) {
      cartItems.value = c[0].items.map((item) => {
        const product = item.product[0]
        return {
          id: item.id,
          name: product.name,
          color: product.specs?.find((s) => s.spec_key === 'Màu sắc')?.spec_value || '',
          price: Number(product.discount_price),
          quantity: item.qty,
          image: product.images?.[0]?.img_url || '',
        }
      })
    } else {
      cartItems.value = []
    }
  }

  // Tăng số lượng
  async function increase(item) {
    const newQty = item.quantity + 1
    item.quantity = newQty
    try {
      await axios.put(`/api/customer/cart/update-quantity/${item.id}?qty=${newQty}`)
    } catch (err) {
      console.error(err)
    }
  }

  // Giảm số lượng
  async function decrease(item) {
    if (item.quantity > 1) {
      const newQty = item.quantity - 1
      item.quantity = newQty
      try {
        await axios.put(`/api/customer/cart/update-quantity/${item.id}?qty=${newQty}`)
      } catch (err) {
        console.error(err)
      }
    }
  }

  // Xóa sản phẩm
  async function removeItem(itemId) {
    try {
      cartItems.value = cartItems.value.filter((item) => item.id !== itemId)
      await axios.delete(`/api/customer/cart/delete/${itemId}`)
    } catch {
      alert('Xóa sản phẩm thất bại!')
    }
  }

  // Tổng số sản phẩm
  const count = computed(() => cartItems.value.length)

  // Tổng tiền
  const totalPrice = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  return {
    cartItems,
    fetchCart,
    increase,
    decrease,
    removeItem,
    count,
    totalPrice,
  }
})
