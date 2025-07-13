import { ref, computed } from 'vue'

// Reactive state cho authentication
const isCustomerLoggedIn = ref(false)

// Function để kiểm tra trạng thái đăng nhập
const checkAuthStatus = () => {
  const id = localStorage.getItem('customer_id')
  const token = localStorage.getItem('customer_token')
  isCustomerLoggedIn.value = !!(id && token)
}

// Function để đăng nhập
const login = (customerData) => {
  localStorage.setItem('customer_id', customerData.customer.cust_id)
  localStorage.setItem('customer_token', customerData.token)
  isCustomerLoggedIn.value = true

  // Dispatch custom event để thông báo thay đổi
  window.dispatchEvent(new CustomEvent('auth-changed', { detail: { isLoggedIn: true } }))
}

// Function để đăng xuất
const logout = () => {
  localStorage.removeItem('customer_id')
  localStorage.removeItem('customer_token')
  isCustomerLoggedIn.value = false

  // Dispatch custom event để thông báo thay đổi
  window.dispatchEvent(new CustomEvent('auth-changed', { detail: { isLoggedIn: false } }))
}

// Computed property để kiểm tra trạng thái
const isAuthenticated = computed(() => isCustomerLoggedIn.value)

// Khởi tạo trạng thái khi module được load
checkAuthStatus()

// Lắng nghe sự kiện storage change để cập nhật trạng thái
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'customer_id' || e.key === 'customer_token') {
      checkAuthStatus()
    }
  })

  // Lắng nghe custom event để cập nhật trạng thái
  window.addEventListener('auth-changed', () => {
    checkAuthStatus()
  })
}

export function useAuth() {
  return {
    isAuthenticated,
    checkAuthStatus,
    login,
    logout,
  }
}
