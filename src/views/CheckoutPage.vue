<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'
import axiosCustomer from '@/plugins/axioscustomer'
import { useCartStore } from '@/stores/cart'
import { useProfileStore } from '@/stores/customerprofile'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import router from '@/router'
const cartStore = useCartStore()
const profileStore = useProfileStore()
const { cartItems, totalPrice } = storeToRefs(cartStore)
const { addresses, profile } = storeToRefs(profileStore)

const phone = ref('')
const isFullNameFocused = ref(false)
const isPhoneFocused = ref(false)
let iti = null
const phoneInputRef = ref(null)
const isPhoneHasValue = ref(false)
const note = ref('')
const isNoteFocused = ref(false)
const sale = ref('')
const issale = ref(false)
const shipping_fee = ref(40000)
const discount = ref(0)
const specific_address = ref('')
const isSpecificAddressFocused = ref(false)
const paymentMethod = ref('cod')
const isLoading = ref(false)


onMounted(() => {
  if (phoneInputRef.value) {
    iti = intlTelInput(phoneInputRef.value, {
      initialCountry: 'vn',
      nationalMode: false,
      utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.6.1/build/js/utils.js',
    })
    phoneInputRef.value.addEventListener('countrychange', () => {
      phone.value = iti.getNumber()
      isPhoneHasValue.value = !!phoneInputRef.value.value
    })
    phoneInputRef.value.addEventListener('input', () => {
      phone.value = iti.getNumber()
      isPhoneHasValue.value = !!phoneInputRef.value.value
    })
  }
  fetchProvince()
  cartStore.fetchCart()
  profileStore.fetchProfile()
})

onBeforeUnmount(() => {
  if (iti) {
    iti.destroy()
    iti = null
  }
})

watch(phone, (val) => {
  isPhoneHasValue.value = !!val
})

//Location
const selectedProvince = ref('')
const provinces = ref([])
async function fetchProvince() {
  const res = await axiosCustomer.get('/api/location/provinces')
  provinces.value = res.data
}

watch(selectedProvince, (province_id) => {
  selectedDistrict.value = ''
  selectedWard.value = ''
  fetchDistrict(province_id)
})

const selectedDistrict = ref('')
const districts = ref([])
async function fetchDistrict(province_id) {
  const res = await axiosCustomer.get(`/api/location/provinces/${province_id}/districts`)
  districts.value = res.data
}

watch(selectedDistrict, (district_id) => {
  selectedWard.value = ''
  fetchWard(district_id)
})

const selectedWard = ref('')
const wards = ref([])
async function fetchWard(district_id) {
  const res = await axiosCustomer.get(`/api/location/districts/${district_id}/wards`)
  wards.value = res.data
}

const selectedAddress = ref('')
const email = computed(() => profile.value?.email)
const name = ref('')

const formatPrice = (number) => {
  return number.toLocaleString('vi-VN') + '₫'
}

watch(selectedAddress, () => {
  selectedWard.value = ''
  selectedProvince.value = ''
  selectedDistrict.value = ''
})

async function submit() {
  if (isLoading.value) return

  isLoading.value = true

  try {
    let phoneNumber = '';
    if (iti) {
      phoneNumber = iti.getNumber();
      if (!phoneNumber) {
        phoneNumber = phoneInputRef.value.value;
      }
    }

    const provinceObj = provinces.value.find(p => p.id === selectedProvince.value)
    const districtObj = districts.value.find(d => d.id === selectedDistrict.value)
    const wardObj = wards.value.find(w => w.id === selectedWard.value)
    const address_customer = selectedAddress.value
      ? `${selectedAddress.value.line}, ${selectedAddress.value.ward}, ${selectedAddress.value.region}, ${selectedAddress.value.city}`
      : [
        specific_address.value,
        wardObj ? wardObj.name : '',
        districtObj ? districtObj.name : '',
        provinceObj ? provinceObj.name : ''
      ].filter(Boolean).join(', ')

    const order_items = cartItems.value.map(item => ({
      prod_id: item.prod_id,
      qty: item.quantity,
      unit_price: item.price
    }))

    const form = new FormData();
    form.append('payment_method', paymentMethod.value)
    form.append('name', name.value)
    form.append('phone', phoneNumber)
    form.append('sub_total', totalPrice.value)
    form.append('shipping_fee', shipping_fee.value)
    form.append('discount', discount.value)
    form.append('total_amount', totalPrice.value + shipping_fee.value - discount.value)
    form.append('address_customer', address_customer)

    order_items.forEach((item, idx) => {
      form.append(`order_items[${idx}][prod_id]`, item.prod_id);
      form.append(`order_items[${idx}][qty]`, item.qty);
      form.append(`order_items[${idx}][unit_price]`, item.unit_price);
    });

    // Gọi API checkout
    const response = await axiosCustomer.post('/api/customer/checkout/process', form)

    if (response.data.success) {
      if (paymentMethod.value === 'momo') {
        // Chuyển hướng đến trang thanh toán MoMo
        const paymentUrl = response.data.data.payment_url
        if (paymentUrl) {
          window.location.href = paymentUrl
        } else {
          throw new Error('Không nhận được URL thanh toán')
        }
      } else {
        // COD hoặc bank transfer - chuyển đến trang hoàn tất
        // Set session để cho phép truy cập trang checkoutdone (chỉ trong tab hiện tại)
        sessionStorage.setItem('recent_order_placed', 'true')
        sessionStorage.setItem('order_timestamp', Date.now().toString())

        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: response.data.message || 'Đặt hàng thành công',
          confirmButtonText: 'Đóng',
        })
        router.push({ name: 'checkoutdone' })
      }
    } else {
      throw new Error(response.data.message || 'Có lỗi xảy ra')
    }

  } catch (err) {
    console.error('Checkout error:', err)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: err.response?.data?.message || err.message || 'Có lỗi xảy ra khi đặt hàng',
      confirmButtonText: 'Đóng',
    })
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="md:grid grid-cols-12">
      <div class="col-span-8  min-h-screen">
        <div class="flex flex-col mr-5">
          <div class="flex justify-center mb-5">
            <img class="pt-5"
              src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/checkout_logo.png?1746173377751" alt="">
          </div>
          <div class="md:grid grid-cols-2 gap-8 mt-3">
            <div class="col-span-1 flex flex-col w-full gap-3">
              <span class="text-[20px] font-medium text-start">Thông tin nhận hàng</span>
              <div class="relative w-full">
                <select v-model="selectedAddress"
                  class="w-full border border-zinc-300 rounded-lg py-1 px-3 pt-5 pr-12 text-gray-500 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none">
                  <option value="">---</option>
                  <option v-for="address in addresses" :key="address.id" :value="address">{{ address.line + " " +
                    address.ward + " " + address.region }}</option>
                </select>
                <label class="absolute left-3 top-3 pb-1 text-xs text-gray-400 bg-white  pointer-events-none"
                  style="transform: translateY(-50%);">
                  Sổ địa chỉ
                </label>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <p class="border h-6 border-zinc-300 mr-2"></p>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              <div class="w-full relative">
                <input type="text" name="" id="" :value="email" disabled
                  class="bg-[#DDDDDD] text-gray-700 w-full rounded-lg py-1 px-3 pt-4 pr-8">
                <span class=" absolute left-3 top-1 pb-1 text-xs text-gray-500 ">Email</span>
              </div>
              <div class="w-full relative">
                <input type="text" name="" id="" v-model="name" @focus="isFullNameFocused = true"
                  @blur="isFullNameFocused = false"
                  class="border border-zinc-300 w-full rounded-lg py-1 px-3 pt-5 pr-8 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-200">
                <span :class="[
                  (isFullNameFocused || name)
                    ? 'absolute left-3 top-1 pb-1 text-xs text-gray-500 pointer-events-none transition-all duration-200'
                    : 'absolute left-3 top-3 text-[14px] text-gray-400 pointer-events-none transition-all duration-200'
                ]">Họ và tên</span>
              </div>
              <div class="w-full relative">
                <input ref="phoneInputRef" type="tel" @focus="isPhoneFocused = true" @blur="isPhoneFocused = false">
                <span :class="[
                  'phone-label',
                  (isPhoneFocused || isPhoneHasValue)
                    ? 'floating'
                    : ''
                ]">Số điện thoại (tùy chọn)</span>
                <span class="border left-10 border-zinc-300 top-3 h-6 absolute"></span>
              </div>
              <div class="relative w-full">
                <select v-model="selectedProvince" :disabled="!!selectedAddress" :class="[
                  (!!selectedAddress) ? 'w-full border border-zinc-300 bg-[#EEEEEE] rounded-lg py-1 px-3 pt-5 pr-8 text-gray-700 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none'
                    : 'w-full border  border-zinc-300 rounded-lg py-1 px-3 pt-5 pr-8 text-gray-700 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none'
                ]">
                  <option value="">---</option>
                  <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}
                  </option>
                </select>
                <label :class="[
                  (!!selectedAddress) ? 'absolute bg-[#EEEEEE] left-3 top-1 pb-1 text-xs text-gray-400 pointer-events-none' :
                    'absolute left-3 top-1 pb-1 text-xs text-gray-400 bg-white pointer-events-none'
                ]">
                  Tình thành
                </label>
                <span class=" pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <p class="border h-6 border-zinc-300 mr-2"></p>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              <div class="relative w-full">
                <select v-model="selectedDistrict" :disabled="!selectedProvince" :class="[
                  'w-full border border-zinc-300 rounded-lg py-1 px-3 pt-5 pr-8 text-gray-700 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none',
                  !selectedProvince && 'bg-[#EEEEEE]'
                ]">
                  <option value=""></option>
                  <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name }}
                  </option>
                </select>
                <label :class="[
                  'absolute left-3 top-1 pb-1 text-xs text-gray-400  pointer-events-none',
                  !selectedProvince ? 'absolute left-3 top-1 pb-1 bg-[#EEEEEE] text-xs text-gray-400  pointer-events-none' : ''
                ]">
                  Quận huyện (tùy chọn)
                </label>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <p class="border h-6 border-zinc-300 mr-2"></p>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              <div class="relative w-full">
                <select :disabled="!selectedDistrict" v-model="selectedWard" :class="[
                  'w-full border border-zinc-300 rounded-lg py-1 px-3 pt-5 pr-8 text-gray-700 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none',
                  !selectedDistrict && 'bg-[#EEEEEE]'
                ]">
                  <option value=""></option>
                  <option v-for="ward in wards" :key="ward.id" :value="ward.id">{{ ward.name }}</option>
                </select>
                <label :class="[
                  !selectedDistrict ? 'absolute left-3 top-1 pb-1 bg-[#EEEEEE] text-xs text-gray-400 pointer-events-none' : 'absolute left-3 top-1 pb-1 text-xs text-gray-400  pointer-events-none'
                ]">
                  Phường xã (tùy chọn)
                </label>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <p class="border h-6 border-zinc-300 mr-2"></p>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              <div class="relative w-full">
                <input type="text" v-model="specific_address" @focus="isSpecificAddressFocused = true"
                  @blur="isSpecificAddressFocused = false" :disabled="!!selectedAddress" :class="[
                    (!selectedAddress) ? 'border border-zinc-300 rounded-lg w-full py-1 pt-5 px-3 text-gray-700 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none'
                      : 'border border-zinc-300 rounded-lg w-full py-1 pt-5 px-3 bg-[#EEEEEE] text-gray-700 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none'
                  ]">
                <label :class="[
                  (note || isSpecificAddressFocused) ? 'absolute top-1 left-3 text-xs text-gray-400 pointer-events-none transition-all duration-200' : 'absolute top-3 left-3 text-xs text-gray-400 pointer-events-none transition-all duration-200'
                ]">Địa chỉ cụ
                  thể</label>
              </div>
              <div class="w-full relative">
                <textarea v-model="note" @focus="isNoteFocused = true" @blur="isNoteFocused = false"
                  class="w-full border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 py-1 px-3 pt-8 pr-8 text-[15px]"
                  name="" id="note" rows="2"></textarea>
                <label for="note" :class="[
                  (note || isNoteFocused) ? 'absolute text-[13px] text-gray-400 pointer-events-none top-1 left-3 transition-all duration-200' : 'absolute text-[13px] text-gray-400 pointer-events-none top-5 left-3 transition-all duration-200'
                ]"> Ghi chú (tùy
                  chọn)</label>
              </div>
            </div>
            <div class=" col-span-1">
              <div class="flex flex-col">
                <span class="text-[20px] font-medium text-start">Vận chuyển</span>
                <div class="border border-zinc-300 mt-3 py-3 px-3 flex justify-between rounded-lg ">
                  <div class="flex gap-4">
                    <input type="radio" name="" id="" class="w-5" checked>
                    <span>Giao hàng tận nơi</span>
                  </div>
                  <span>40.000₫</span>
                </div>
                <span class="text-[20px] font-medium text-start mt-7">Thanh toán</span>
                <label
                  class="border border-zinc-300 mt-3 py-3 px-3 flex justify-between rounded-lg cursor-pointer hover:bg-[#EEEEEE]">
                  <div class="flex gap-4 cursor-pointer">
                    <input type="radio" name="payment" id="" value="cod" v-model="paymentMethod" class="w-5 cursor-pointer">
                    <span class="cursor-pointer"> Thanh toán khi giao hàng (COD)</span>
                  </div>
                  <svg fill="#3d72db" viewBox="0 0 32 32" width="27px" height="27px" version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                    <title>dollar</title>
                    <path
                      d="M0 25v-18h32v18h-32zM2 8.938v14.062h28v-14.062h-28zM21 16c0-3.313-2.238-6-5-6h13v12h-13c2.762 0 5-2.687 5-6zM25 18c0.828 0 1.5-0.896 1.5-2s-0.672-2-1.5-2-1.5 0.896-1.5 2 0.672 2 1.5 2zM18.118 13.478c-0.015 0.055-0.036 0.094-0.062 0.119-0.027 0.025-0.063 0.037-0.109 0.037s-0.118-0.028-0.219-0.086c-0.1-0.059-0.223-0.121-0.368-0.189-0.146-0.068-0.314-0.13-0.506-0.187s-0.402-0.083-0.631-0.083c-0.18 0-0.336 0.021-0.469 0.065s-0.245 0.104-0.334 0.18c-0.090 0.077-0.156 0.17-0.2 0.277s-0.065 0.222-0.065 0.342c0 0.18 0.049 0.335 0.147 0.466s0.229 0.248 0.394 0.35c0.165 0.103 0.351 0.198 0.56 0.287 0.207 0.090 0.42 0.185 0.637 0.284 0.217 0.101 0.429 0.214 0.637 0.341s0.395 0.279 0.557 0.456 0.293 0.385 0.394 0.624c0.1 0.24 0.149 0.521 0.149 0.847 0 0.425-0.078 0.797-0.236 1.118s-0.373 0.588-0.645 0.802c-0.271 0.215-0.587 0.376-0.949 0.484-0.046 0.014-0.096 0.020-0.143 0.031v1.092h-0.983v-0.963c-0.013 0-0.024 0.002-0.036 0.002-0.279 0-0.539-0.022-0.778-0.067s-0.451-0.101-0.634-0.164c-0.184-0.064-0.336-0.131-0.459-0.201s-0.211-0.132-0.265-0.186c-0.054-0.054-0.093-0.132-0.116-0.234-0.023-0.103-0.035-0.249-0.035-0.441 0-0.129 0.004-0.237 0.013-0.325s0.022-0.158 0.041-0.213 0.043-0.093 0.075-0.116c0.031-0.022 0.067-0.034 0.109-0.034 0.058 0 0.14 0.034 0.247 0.103s0.243 0.145 0.409 0.228c0.167 0.084 0.365 0.159 0.597 0.229 0.231 0.068 0.499 0.103 0.803 0.103 0.2 0 0.379-0.024 0.537-0.072s0.293-0.115 0.403-0.203 0.194-0.196 0.253-0.325c0.059-0.13 0.088-0.273 0.088-0.433 0-0.183-0.051-0.34-0.15-0.472-0.1-0.131-0.23-0.247-0.391-0.35-0.16-0.102-0.342-0.197-0.546-0.287s-0.414-0.185-0.631-0.284c-0.216-0.1-0.427-0.213-0.631-0.341s-0.386-0.278-0.546-0.455c-0.16-0.177-0.291-0.387-0.39-0.628s-0.15-0.531-0.15-0.868c0-0.388 0.072-0.728 0.215-1.021s0.337-0.537 0.581-0.73 0.531-0.338 0.862-0.434c0.17-0.050 0.346-0.085 0.526-0.109v-1.034h0.983v1.034c0.039 0.005 0.078 0.003 0.117 0.009 0.191 0.029 0.371 0.068 0.537 0.118 0.167 0.049 0.314 0.104 0.444 0.167 0.129 0.062 0.214 0.113 0.256 0.155s0.069 0.076 0.085 0.105c0.014 0.029 0.026 0.068 0.037 0.116s0.018 0.108 0.021 0.182c0.004 0.072 0.006 0.163 0.006 0.271 0 0.121-0.003 0.224-0.009 0.308-0.009 0.079-0.019 0.149-0.034 0.203zM11 16c0 3.313 2.238 6 5 6h-13v-12h13c-2.762 0-5 2.687-5 6zM7 14c-0.829 0-1.5 0.896-1.5 2s0.671 2 1.5 2c0.828 0 1.5-0.896 1.5-2s-0.672-2-1.5-2z">
                    </path>
                  </svg>
                </label>
                <label
                  class="border border-zinc-300 mt-3 py-3 px-3 flex justify-between rounded-lg cursor-pointer hover:bg-[#EEEEEE]">
                  <div class="flex gap-4 cursor-pointer">
                    <input type="radio" name="payment" id="" value="momo" v-model="paymentMethod" class="w-5 cursor-pointer">
                    <span class="cursor-pointer">Thanh toán qua ví điện tử (MOMO)</span>
                  </div>
                  <img class="w-[27px] h-[27px] rounded-lg" src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png" alt="">
                </label>
                <label
                  class="border border-zinc-300 mt-3 py-3 px-3 flex justify-between rounded-lg cursor-pointer hover:bg-[#EEEEEE]">
                  <div class="flex gap-4 cursor-pointer">
                    <input type="radio" name="payment" id="" value="bank" v-model="paymentMethod" class="w-5 cursor-pointer">
                    <span class="cursor-pointer">Thanh toán VNPAY</span>
                  </div>
                  <img class="w-[27px] h-[27px] rounded-lg" src="https://vinadesign.vn/uploads/thumbnails/800/2023/05/vnpay-logo-vinadesign-25-12-59-16.jpg" alt="">
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>

      <div class="col-span-4 w-full shadow-lg bg-[#FAFAFA]">
        <div class="p-5 border-b border-zinc-300">
          <span class="text-[20px] font-medium text-start">Đơn hàng (4 sản phẩm)</span>
        </div>
        <div class="px-5 py-3 flex justify-between gap-3 items-center" v-for="item in cartItems" :key="item.id">
          <div class="flex gap-4 relative">
            <img class="w-[50px] h-[57px] border border-zinc-300 rounded-lg self-end" :src="item.image" alt="">
            <label
              class=" absolute -top-1 left-9 border border-[#2A9DCC] text-white bg-[#2A9DCC] rounded-full px-1.5 text-[12px] font-medium">{{
                item.quantity }}</label>
            <div>
              <span class="text-[14px]">{{ item.name }} - Chính hãng VN</span>
              <p class="text-[13px] text-zinc-400">{{ item.color }}</p>
            </div>
          </div>
          <span class="text-[16px] text-zinc-500">{{ formatPrice(item.price * item.quantity) }}</span>
        </div>
        <div class="border-b-1 border-zinc-300 mx-5 mt-4"></div>
        <div class="grid grid-cols-7 mt-4 mx-5 gap-3">
          <div class="col-span-5 relative ">
            <input type="text" name="" id="" v-model="sale" @focus="issale = true" @blur="issale = false"
              class="border border-zinc-300 rounded-lg py-1 px-3 pt-5 pl-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-200">
            <label for="sale" :class="[
              (sale || issale) ? 'absolute top-0 left-4 text-[13px] text-zinc-400 pointer-events-none transition-all duration-200' : 'absolute top-3 left-4 text-[15px] text-zinc-400 pointer-events-none transition-all duration-200'
            ]">Nhập mã giảm
              giá</label>
          </div>
          <div :class="[
            (sale) ? 'col-span-2 border flex justify-center items-center rounded-lg border-[#2785d8] bg-[#2785d8] text-white cursor-pointer hover:bg-[#2A6395] hover:border-[#2A6395]' : 'col-span-2 border flex justify-center items-center rounded-lg border-[#7aadda] bg-[#7aadda] text-white cursor-pointer hover:bg-[#2A6395] hover:border-[#2A6395]'
          ]">
            <button class="cursor-pointer">Áp dụng</button>
          </div>
        </div>
        <div class="border-b-1 border-zinc-300 mx-5 mt-5"></div>
        <div class="mt-4 mx-5">
          <div class="flex justify-between">
            <span class="text-[16px] text-zinc-500">
              Tạm tính
            </span>
            <span class="text-[16px] text-zinc-500">
              {{ formatPrice(totalPrice) }}
            </span>
          </div>
          <div class="flex justify-between mt-2">
            <span class="text-[16px] text-zinc-500">
              Phí vận chuyển
            </span>
            <span class="text-[14px] text-zinc-500">
              {{ formatPrice(shipping_fee) }}
            </span>
          </div>
        </div>
        <div class="border-b-1 border-zinc-300 mx-5 mt-5"></div>
        <div class="mt-4 mx-5">
          <div class="flex justify-between mt-2">
            <span class="text-[19px] text-zinc-500">
              Tổng cộng
            </span>
            <span class="text-[20px] text-[#2A9DCE]">
              {{ formatPrice(totalPrice - shipping_fee) }}
            </span>
          </div>
        </div>
        <div class="mt-4 mx-5 mb-5 flex justify-between items-center">
          <router-link :to="{ name: 'my-cart' }">
            <div class="flex gap-1.5 cursor-pointer group">
              <p
                class="text-[#2A9DCE] group-hover:text-[#2A6395] group-hover:-translate-x-0.5 transition-transform duration-200">
                ❮</p>
              <span class="text-[#2A9DCE] group-hover:text-[#2A6395]">
                Quay về giỏ hàng </span>
            </div>
          </router-link>
          <button
            @click.prevent="submit"
            :disabled="isLoading"
            :class="[
              'rounded-lg py-3 px-6 transition-colors',
              isLoading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'text-white bg-[#2785d8] border border-[#2785d8] cursor-pointer hover:bg-[#2A6395] hover:border-[#2A6395]'
            ]"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang xử lý...
            </span>
            <span v-else>Đặt hàng</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.iti {
  width: 100%;
}

.iti--allow-dropdown {
  width: 100%;
}

.iti__flag-container {
  height: 100%;
}

.iti input[type="tel"] {
  width: 100%;
  border: 1px solid #d4d4d8;
  /* border-zinc-300 */
  border-radius: 0.5rem;
  /* rounded-lg */
  padding: 1.25rem 2rem 0.25rem 3.2rem;
  /* top right bottom left, để tránh đè lên cờ */
  font-size: 15px;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  background: #fff;
}

.iti input[type="tel"]:focus {
  border: 1px solid #83a3e9;
  /* focus:ring-blue-200 */
  box-shadow: 0 0 0 2px #bfdbfe;
}

.iti input[type="tel"]:disabled {
  background: #dddddd;
  color: #888;
}

.iti__selected-flag {
  border-radius: 0.5rem 0 0 0.5rem;
  height: 100%;
  background: transparent;
}

.iti__country-list {
  border-radius: 0.5rem;
  z-index: 9999;
}

/* Custom floating label for phone input */
.phone-label {
  position: absolute;
  left: 3rem;
  top: 13px;
  font-size: 14px;
  color: #a1a1aa;
  /* text-gray-400 */
  pointer-events: none;
  transition: all 0.2s;
  background: #fff;
  padding: 0 2px;
}

.phone-label.floating {
  top: 0.25rem;
  font-size: 12px;
  color: #6b7280;
  /* text-gray-500 */
}
</style>
