import axios from 'axios'
import router from '@/router'

const axiosCustomer = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
})

// Add a request interceptor (đúng instance)
axiosCustomer.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('customer_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor
axiosCustomer.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If the error is 402 and we haven't retried yet
    if (error.response?.status === 402 && !originalRequest._retry) {
      originalRequest._retry = true
      // Check if user has token - if not, redirect to login
      const token = localStorage.getItem('customer_token')
      if (!token) {
        // If no token, redirect to login page
        if (router.currentRoute.value.name !== 'login-customer') {
          router.push({ name: 'login-customer' })
        }
      } else {
        // If has token but still getting 402, redirect to profile
        if (router.currentRoute.value.name !== 'profile-customer') {
          router.push({ name: 'profile-customer' })
        }
      }
    }
    return Promise.reject(error)
  },
)

export default axiosCustomer
