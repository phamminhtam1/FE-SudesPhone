import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
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
axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Với backend sliding expiration, chỉ logout khi thực sự cần thiết
      // Có thể thêm logic kiểm tra thêm trước khi logout

      // Clear token and redirect to login
      localStorage.removeItem('token')
      window.location.href = '/admin/login'
    }

    return Promise.reject(error)
  },
)

export default axios
