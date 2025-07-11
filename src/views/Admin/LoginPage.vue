<template>
  <div class="bg-[#212631] min-h-screen flex justify-center items-center">
    <div class="max-w-3xl w-full mx-auto max-h-5xl flex border border-slate-600 rounded-lg overflow-hidden">
      <div class="w-4/7 flex flex-col bg-[#2a3140]">
        <form @submit.prevent="handleLogin">
          <div class="px-7 py-3 text-zinc-300 mt-6">
            <h1 class="text-3xl font-medium mb-1">Login</h1>
            <h2 class="font-medium">Sign In to your account</h2>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="px-7 py-2">
            <p class="text-red-500 text-sm">{{ error }}</p>
          </div>

          <div class="flex px-7 py-3">
            <span
              class="border bg-[#434f6b] border-slate-500 rounded-tl-lg rounded-bl-lg h-10 w-10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#ffffff"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <input v-model="form.email"
              class="border rounded-tr-lg rounded-br-lg text-white border-slate-500 w-full pl-4 focus:border-purple-300 focus:outline-none"
              type="email" placeholder="Email" required>
          </div>
          <div class="flex px-7 py-3 -mt-3">
            <span
              class="border bg-[#434f6b] border-slate-500 rounded-tl-lg rounded-bl-lg h-10 w-10 flex items-center justify-center">
              <svg fill="#ffffff" viewBox="0 0 35 35" data-name="Layer 2" width="16px" height="20px"
                xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <path
                  d="M27.137,34.75H7.862a4.8,4.8,0,0,1-4.79-4.791V15.614a4.8,4.8,0,0,1,4.79-4.791H27.137a4.8,4.8,0,0,1,4.791,4.791V29.959A4.8,4.8,0,0,1,27.137,34.75Z" />
                <path
                  d="M25.537,13.323a1.25,1.25,0,0,1-1.25-1.25V8.608a5.409,5.409,0,0,0-1.935-4.082A7.253,7.253,0,0,0,17.5,2.75c-3.744,0-6.79,2.628-6.79,5.858v3.465a1.25,1.25,0,0,1-2.5,0V8.608C8.207,4,12.375.25,17.5.25a9.748,9.748,0,0,1,6.511,2.4,7.869,7.869,0,0,1,2.779,5.955v3.465A1.25,1.25,0,0,1,25.537,13.323Z" />
              </svg>
            </span>
            <input v-model="form.password"
              class="border text-white border-slate-500 w-full pl-4 rounded-tr-lg rounded-br-lg focus:border-purple-300 focus:outline-none"
              type="password" placeholder="Password" required>
          </div>
          <div class="px-7 py-3 flex flex-row justify-between items-center mb-5">
            <button type="submit" :disabled="loading"
              class="border bg-[#6261CC] border-[#6261CC] rounded-lg px-6 py-1.5 cursor-pointer hover:bg-[#4c4c7e]">
              <span class="text-zinc-100 font-medium">{{ loading ? 'Logging in...' : 'Login' }}</span>
            </button>
            <a href="" class="text-[#6261AE] hover:text-[#5a59a0] underline">Forgot password</a>
          </div>
        </form>
      </div>
      <div class="w-3/7 bg-[#6261CC] flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center items-center px-5 py-3 text-zinc-200 mb-4">
          <h1 class="text-3xl font-medium mb-1">Sign up</h1>
          <h2 class="font-medium">Welcome to Sudes Phone</h2>
        </div>
        <div class="">
          <router-link to="/admin/register">
            <button
              class="border border-amber-50 rounded-lg px-2 py-2 text-white cursor-pointer hover:bg-amber-50 hover:text-[#5a59a0]">
              <span class="font-medium">Register Now!</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axion'

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loading: false,
      error: null
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post('/api/login', this.form)
        localStorage.setItem('token', response.data.access_token)

        // Lưu thêm thông tin về expiration nếu backend trả về
        if (response.data.expires_at) {
          localStorage.setItem('token_expires_at', response.data.expires_at)
        }

        // Cập nhật header mặc định
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`

        // Chuyển hướng
        this.$router.push('/admin/dasboard')
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed'
        console.error('Login error:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
