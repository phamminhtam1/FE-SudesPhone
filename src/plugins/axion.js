import axios from 'axios'

const axiosAdmin = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
})

// Add a request interceptor
axiosAdmin.interceptors.request.use(
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
axiosAdmin.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      localStorage.removeItem('token')
      window.location.href = '/admin/login'
    }

    return Promise.reject(error)
  },
)

export default axiosAdmin
