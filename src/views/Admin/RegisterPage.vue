<template>
  <div class="bg-[#212631] min-h-screen flex justify-center items-center">
    <div class="max-w-xl w-full mx-auto max-h-5xl flex border border-slate-600 rounded-lg overflow-hidden">
      <div class="w-full flex flex-col bg-[#2a3140]">
        <form @submit.prevent="handleRegister">
          <div class="px-7 py-3 text-zinc-300 mt-6">
            <h1 class="text-3xl font-medium mb-1">Register</h1>
            <h2 class="font-medium">Create your account</h2>
          </div>
          <div class="flex px-7 py-3 ">
            <span
              class=" border bg-[#434f6b] border-slate-500 rounded-tl-lg  rounded-bl-lg h-10 w-10 flex items-center justify-center ">
              <svg viewBox="0 0 24 24" fill="none" width="20px" height="20px" class=""
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                </path>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#ffffff"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </span>
            <input v-model="form.name"
              class=" border rounded-tr-lg rounded-br-lg text-white border-slate-500 w-full pl-4 focus:border-purple-300 focus:outline-none"
              type="text" name="" id="" placeholder="Username">
          </div>
          <div class="flex px-7 py-3 -mt-3">
            <span
              class=" border bg-[#434f6b] border-slate-500 rounded-tl-lg  rounded-bl-lg h-10 w-10 flex items-center justify-center ">
              <svg height="18px" width="18px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff"
                stroke="#ffffff">
                <g>
                  <path class="st0"
                    d="M510.746,110.361c-2.128-10.754-6.926-20.918-13.926-29.463c-1.422-1.794-2.909-3.39-4.535-5.009 c-12.454-12.52-29.778-19.701-47.531-19.701H67.244c-17.951,0-34.834,7-47.539,19.708c-1.608,1.604-3.099,3.216-4.575,5.067 c-6.97,8.509-11.747,18.659-13.824,29.428C0.438,114.62,0,119.002,0,123.435v265.137c0,9.224,1.874,18.206,5.589,26.745 c3.215,7.583,8.093,14.772,14.112,20.788c1.516,1.509,3.022,2.901,4.63,4.258c12.034,9.966,27.272,15.45,42.913,15.45h377.51 c15.742,0,30.965-5.505,42.967-15.56c1.604-1.298,3.091-2.661,4.578-4.148c5.818-5.812,10.442-12.49,13.766-19.854l0.438-1.05 c3.646-8.377,5.497-17.33,5.497-26.628V123.435C512,119.06,511.578,114.649,510.746,110.361z M34.823,99.104 c0.951-1.392,2.165-2.821,3.714-4.382c7.689-7.685,17.886-11.914,28.706-11.914h377.51c10.915,0,21.115,4.236,28.719,11.929 c1.313,1.327,2.567,2.8,3.661,4.272l2.887,3.88l-201.5,175.616c-6.212,5.446-14.21,8.443-22.523,8.443 c-8.231,0-16.222-2.99-22.508-8.436L32.19,102.939L34.823,99.104z M26.755,390.913c-0.109-0.722-0.134-1.524-0.134-2.341V128.925 l156.37,136.411L28.199,400.297L26.755,390.913z M464.899,423.84c-6.052,3.492-13.022,5.344-20.145,5.344H67.244 c-7.127,0-14.094-1.852-20.142-5.344l-6.328-3.668l159.936-139.379l17.528,15.246c10.514,9.128,23.922,14.16,37.761,14.16 c13.89,0,27.32-5.032,37.827-14.16l17.521-15.253L471.228,420.18L464.899,423.84z M485.372,388.572 c0,0.803-0.015,1.597-0.116,2.304l-1.386,9.472L329.012,265.409l156.36-136.418V388.572z">
                  </path>
                </g>
              </svg>
            </span>
            <input v-model="form.email"
              class=" border rounded-tr-lg rounded-br-lg text-white border-slate-500 w-full pl-4 focus:border-purple-300 focus:outline-none"
              type="text" name="" id="" placeholder="Email">
          </div>
          <div class="flex px-7 py-3 -mt-3">
            <span
              class=" border bg-[#434f6b] border-slate-500 rounded-tl-lg  rounded-bl-lg h-10 w-10 flex items-center justify-center ">
              <svg fill="#ffffff" viewBox="0 0 35 35" data-name="Layer 2" width="16px" height="20px"
                id="a6b678a2-3714-46f6-ad50-598977cf64a4" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <path
                  d="M27.137,34.75H7.862a4.8,4.8,0,0,1-4.79-4.791V15.614a4.8,4.8,0,0,1,4.79-4.791H27.137a4.8,4.8,0,0,1,4.791,4.791V29.959A4.8,4.8,0,0,1,27.137,34.75ZM7.862,13.323a2.292,2.292,0,0,0-2.29,2.291V29.959a2.292,2.292,0,0,0,2.29,2.291H27.137a2.293,2.293,0,0,0,2.291-2.291V15.614a2.293,2.293,0,0,0-2.291-2.291Z">
                </path>
                <path
                  d="M25.537,13.323a1.25,1.25,0,0,1-1.25-1.25V8.608a5.409,5.409,0,0,0-1.935-4.082A7.253,7.253,0,0,0,17.5,2.75c-3.744,0-6.79,2.628-6.79,5.858v3.465a1.25,1.25,0,0,1-2.5,0V8.608C8.207,4,12.375.25,17.5.25a9.748,9.748,0,0,1,6.511,2.4,7.869,7.869,0,0,1,2.779,5.955v3.465A1.25,1.25,0,0,1,25.537,13.323Z">
                </path>
                <path
                  d="M17.5,25.779a1.25,1.25,0,0,1-1.25-1.25V21.2a1.25,1.25,0,0,1,2.5,0v3.334A1.25,1.25,0,0,1,17.5,25.779Z">
                </path>
              </svg>
            </span>
            <input v-model="form.password"
              class=" border rounded-tr-lg rounded-br-lg text-white border-slate-500 w-full pl-4 focus:border-purple-300 focus:outline-none"
              type="text" name="" id="" placeholder="Password">
          </div>
          <div class="flex px-7 py-3 -mt-3">
            <span
              class="border bg-[#434f6b] border-slate-500 rounded-tl-lg  rounded-bl-lg h-10 w-10 flex items-center justify-center">
              <svg fill="#ffffff" viewBox="0 0 35 35" data-name="Layer 2" width="16px" height="20px"
                id="a6b678a2-3714-46f6-ad50-598977cf64a4" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <path
                  d="M27.137,34.75H7.862a4.8,4.8,0,0,1-4.79-4.791V15.614a4.8,4.8,0,0,1,4.79-4.791H27.137a4.8,4.8,0,0,1,4.791,4.791V29.959A4.8,4.8,0,0,1,27.137,34.75ZM7.862,13.323a2.292,2.292,0,0,0-2.29,2.291V29.959a2.292,2.292,0,0,0,2.29,2.291H27.137a2.293,2.293,0,0,0,2.291-2.291V15.614a2.293,2.293,0,0,0-2.291-2.291Z">
                </path>
                <path
                  d="M25.537,13.323a1.25,1.25,0,0,1-1.25-1.25V8.608a5.409,5.409,0,0,0-1.935-4.082A7.253,7.253,0,0,0,17.5,2.75c-3.744,0-6.79,2.628-6.79,5.858v3.465a1.25,1.25,0,0,1-2.5,0V8.608C8.207,4,12.375.25,17.5.25a9.748,9.748,0,0,1,6.511,2.4,7.869,7.869,0,0,1,2.779,5.955v3.465A1.25,1.25,0,0,1,25.537,13.323Z">
                </path>
                <path
                  d="M17.5,25.779a1.25,1.25,0,0,1-1.25-1.25V21.2a1.25,1.25,0,0,1,2.5,0v3.334A1.25,1.25,0,0,1,17.5,25.779Z">
                </path>
              </svg>
            </span>
            <input v-model="form.password_confirmation"
              class=" border text-white border-slate-500 w-full pl-4 rounded-tr-lg rounded-br-lg focus:border-purple-300 focus:outline-none"
              type="text" name="" id="" placeholder="Repeat password">
          </div>
          <div class="px-7 py-3 flex flex-row justify-between items-center mb-5">
            <button :disabled="loading"
              class="border bg-[#249542] border-[#249542] rounded-lg px-6 py-1.5 cursor-pointer hover:bg-[#4c4c7e] w-full">
              <span class="text-zinc-100 font-medium">{{ loading ? 'Creating account...' : 'Create account' }}</span>
            </button>
          </div>
        </form>
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
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      loading: false,
      error: null
    }
  },
  methods: {
    async handleRegister() {
      this.loading = true
      this.error = null

      try {
        // Gọi API đăng ký
        const response = await axios.post('http://localhost:8000/api/register', this.form)

        // Xử lý response thành công
        console.log('Registration successful:', response.data)

        // Chuyển hướng đến trang đăng nhập hoặc dashboard
        this.$router.push('/admin/login')
      } catch (error) {
        // Xử lý lỗi
        this.error = error.response?.data?.message || 'Registration failed'
        console.error('Registration error:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style></style>
