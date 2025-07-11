<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { onMounted, ref, getCurrentInstance } from 'vue';
import axios from 'axios';
import Loading from '@/components/Loading.vue'

const isLoading = ref(true)

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const productId = props.id
const name = ref('')
const cat_id = ref('')
const short_desc = ref('')
const long_desc = ref('')
const price = ref('')
const discount_price = ref('')
const stock_qty = ref('')
const images = ref([])
const specs = ref([])
const relatedProducts = ref([])
const phoneImages = ref([])

const selectedIndex = ref(0)
const quantity = ref(1)
const expanded = ref(false)
const expanded_2 = ref(false)

const selectedColor = ref('')
const availableColors = ref([])

// Thêm biến cho bộ nhớ trong
const selectedStorage = ref('')
const availableStorages = ref([])

const emit = getCurrentInstance()?.emit || (() => { })

// Hàm để lấy màu sắc từ specs
const getColorFromSpecs = (productSpecs) => {
  const colorSpec = productSpecs.find(spec => spec.spec_key === 'Màu sắc')
  return colorSpec ? colorSpec.spec_value : 'Không rõ'
}
// Hàm để lấy bộ nhớ trong từ specs
const getStorageFromSpecs = (productSpecs) => {
  const storageSpec = productSpecs.find(spec => spec.spec_key === 'Bộ nhớ trong')
  return storageSpec ? storageSpec.spec_value : 'Không rõ'
}
// Hàm để lấy sản phẩm theo màu sắc
const getProductByColor = (color) => {
  return relatedProducts.value.find(product => {
    const productColor = getColorFromSpecs(product.specs)
    return productColor === color
  })
}
// Hàm để lấy sản phẩm theo bộ nhớ trong
const getProductByStorage = (storage) => {
  return relatedProducts.value.find(product => {
    const productStorage = getStorageFromSpecs(product.specs)
    return productStorage === storage && getColorFromSpecs(product.specs) === selectedColor.value
  })
}
// Hàm để chọn màu sắc
const selectColor = (color) => {
  selectedColor.value = color
  // Cập nhật danh sách bộ nhớ trong cho màu này
  const storagesSet = new Set()
  relatedProducts.value.forEach(prod => {
    if (getColorFromSpecs(prod.specs) === color) {
      const storage = getStorageFromSpecs(prod.specs)
      if (storage && storage !== 'Không rõ') {
        storagesSet.add(storage)
      }
    }
  })
  availableStorages.value = Array.from(storagesSet)
  if (availableStorages.value.length) {
    selectedStorage.value = availableStorages.value[0]
  } else {
    selectedStorage.value = ''
  }
  // Cập nhật sản phẩm theo màu và bộ nhớ trong đầu tiên
  const productWithColor = getProductByColor(color)
  if (productWithColor) {
    name.value = productWithColor.name
    price.value = productWithColor.price
    discount_price.value = productWithColor.discount_price
    stock_qty.value = productWithColor.stock_qty
    specs.value = productWithColor.specs
    const productImages = productWithColor.images?.map(img => img.img_url) || []
    phoneImages.value = [...productImages, ...phoneImages.value.filter(img => !productImages.includes(img))]
    selectedIndex.value = 0
    emit('update-product-name', {
      productName: productWithColor.name,
      categoryName: productWithColor.category?.name,
      categoryId: productWithColor.category?.id
    })
  }
}
// Hàm để chọn bộ nhớ trong
const selectStorage = (storage) => {
  selectedStorage.value = storage
  const productWithStorage = getProductByStorage(storage)
  if (productWithStorage) {
    name.value = productWithStorage.name
    price.value = productWithStorage.price
    discount_price.value = productWithStorage.discount_price
    stock_qty.value = productWithStorage.stock_qty
    specs.value = productWithStorage.specs
    // KHÔNG cập nhật phoneImages ở đây!
    selectedIndex.value = 0
    emit('update-product-name', {
      productName: productWithStorage.name,
      categoryName: productWithStorage.category?.name,
      categoryId: productWithStorage.category?.id
    })
  }
}

// Gọi sau khi load xong sản phẩm chính
const fetchRelatedProducts = async () => {
  try {
    const productofCate = await axios.get(`/api/product?cat_id=${cat_id.value}`)
    relatedProducts.value = productofCate.data.product.data
    // Map để lưu màu sắc và 3 ảnh đại diện cho mỗi màu (chỉ lấy 1 sản phẩm đại diện cho mỗi màu)
    const colorImageMap = new Map()
    relatedProducts.value.forEach(prod => {
      const color = getColorFromSpecs(prod.specs)
      if (color && color !== 'Không rõ' && !colorImageMap.has(color)) {
        // Lấy tối đa 3 ảnh đầu tiên của sản phẩm này
        const imgs = prod.images?.slice(0, 3).map(img => img.img_url) || []
        if (imgs.length) colorImageMap.set(color, imgs)
      }
    })
    // Ưu tiên sản phẩm chính nếu có màu riêng (ghi đè nếu trùng màu)
    const mainColor = getColorFromSpecs(specs.value)
    const mainImgs = images.value?.slice(0, 3).map(img => img.img_url) || []
    if (mainColor && mainImgs.length) {
      colorImageMap.set(mainColor, mainImgs)
    }
    // Chỉ lấy 3 ảnh đầu tiên của sản phẩm đại diện cho mỗi màu
    phoneImages.value = Array.from(colorImageMap.values()).flat()
    availableColors.value = Array.from(colorImageMap.keys())
    // Lấy các bộ nhớ trong khả dụng cho màu đã chọn
    const storagesSet = new Set()
    relatedProducts.value.forEach(prod => {
      if (getColorFromSpecs(prod.specs) === selectedColor.value) {
        const storage = getStorageFromSpecs(prod.specs)
        if (storage && storage !== 'Không rõ') {
          storagesSet.add(storage)
        }
      }
    })
    availableStorages.value = Array.from(storagesSet)
    if (!selectedStorage.value && availableStorages.value.length) {
      selectedStorage.value = availableStorages.value[0]
    }
  } catch (err) {
    console.error(err)
  }
  isLoading.value = false
}

onMounted(async () => {
  try {
    const res = await axios.get(`/api/product/${productId}`)
    const p = res.data.product

    name.value = p.name
    cat_id.value = p.cat_id
    short_desc.value = p.short_desc
    long_desc.value = p.long_desc
    price.value = p.price
    discount_price.value = p.discount_price
    stock_qty.value = p.stock_qty
    images.value = p.images
    specs.value = p.specs

    const currentProductImages = p.images?.map(img => img.img_url) || []
    phoneImages.value = [...currentProductImages]
    selectedColor.value = getColorFromSpecs(p.specs)
    emit('update-product-name', {
      productName: p.name,
      categoryName: p.category?.name,
      categoryId: p.category?.id
    })

    // ❗ Delay load sản phẩm liên quan 50ms sau khi sản phẩm chính đã render
    fetchRelatedProducts()

  } catch (err) {
    console.error(err)
    isLoading.value = false
  }
})

const decrease = () => {
  if (quantity.value > 1) quantity.value--
}
const increase = () => {
  quantity.value++
}

const config = {
  itemsToShow: 5,
  wrapAround: false,
  snapAlign: 'center'
}
const config2 = {
  itemsToShow: 4,
  itemsToScroll: 1,
  wrapAround: false,
  snapAlign: 'start'
}

const getColorClass = (colorName) => {
  const colorMap = {
    'Tím': 'bg-purple-600',
    'Đen': 'bg-black',
    'Bạc': 'bg-gray-300',
    'Vàng': 'bg-yellow-400',
    'Vàng (Gold)': 'bg-yellow-500',
    'Xanh': 'bg-blue-500',
    'Đỏ': 'bg-red-500',
    'Trắng': 'bg-white border border-gray-300',
    'Xanh lá': 'bg-green-500',
    'Xanh dương': 'bg-blue-500',
    'Cam': 'bg-orange-500',
    'Hồng': 'bg-pink-500'
  }
  return colorMap[colorName] || 'bg-gray-400'
}
</script>


<template>
  <Loading v-if="isLoading" />
  <div v-else class="max-w-7xl mx-auto">
    <div class="grid grid-cols-9 w-full pt-10">
      <div class="col-span-3 mt-6">
        <div class=" flex justify-center items-center h-105 overflow-hidden">
          <img
            class="w-4/5 h-full object-content transition-all duration-200  ease-out transform hover:-translate-y-1.5"
            :class="{
              'slide-in-right': selectedIndex > 0,
              'slide-in-left': selectedIndex < 0
            }" :key="selectedIndex" :src="phoneImages[selectedIndex]" alt="">
        </div>
        <Carousel v-bind="config" class="w-full mt-1">
          <Slide v-for="(img, index) in phoneImages" :key="index">
            <div class=" p-1 w-20 h-22">
              <img :src="img" @click="selectedIndex = index"
                class="w-full h-full object-content rounded-lg border cursor-pointer transition hover:bg-zinc-200 hover:-translate-y-0.5 duration-300"
                :class="{
                  'border-zinc-300 bg-zinc-300 ring-1 ring-gray-300': selectedIndex === index,
                  'border-gray-200': selectedIndex !== index
                }" />
            </div>
          </Slide>
          <template #addons>
            <Navigation>
              <template #prev>
                <button
                  class="bg-zinc-900  flex justify-center items-center text-white px-1 h-6 rounded hover:bg-red-500 cursor-pointer">
                  <span class="mb-1.5">‹</span>
                </button>
              </template>
              <template #next>
                <button
                  class="bg-zinc-900  flex justify-center items-center text-white px-1 h-6 rounded hover:bg-red-500 cursor-pointer">
                  <span class="mb-1.5">›</span>
                </button>
              </template>
            </Navigation>
          </template>
        </Carousel>
        <div class="mt-4">
          <img src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/product_banner.jpg?1746173377751"
            class=" rounded-lg" alt="">
        </div>
      </div>
      <div class="col-span-4 ml-2 mr-2 p-3">
        <div class=" border-b-1 border-zinc-300 pb-5">
          <div>
            <h1 class="text-[27px] font-medium mb-2">{{ name }} - Chính hãng VN/A</h1>
            <h2 class="text-zinc-700 text-sm">Mã: Đang cập nhật</h2>
          </div>
          <div class=" mt-2">
            <span class="text-zinc-700 text-sm mr-2">Thương hiệu: Apple</span>
            <span class="text-zinc-700 text-sm"> | </span>
            <span class="text-zinc-700 text-sm ml-2 mb-2">Tình trạng:
              {{ stock_qty > 0 ? 'Còn ' + stock_qty + ' sản phẩm' :
                'Hết hàng' }}</span>
          </div>
        </div>
        <div class="flex items-center mt-4">
          <h1 class="text-2xl font-medium text-red-700 mr-5">{{ new
            Intl.NumberFormat('vi-VN').format(discount_price) }}đ</h1>
          <h2 class="text-lg font-medium text-zinc-400 line-through">{{ new
            Intl.NumberFormat('vi-VN').format(price) }}đ</h2>
        </div>
        <div class="flex items-center mt-5">
          <h2 class="text-zinc-500  font-medium">Màu sắc: </h2>
          <span class="ml-2 font-medium"> {{ selectedColor || 'Không rõ' }}
          </span>
        </div>
        <div class="flex mt-4 gap-5">
          <span v-for="color in availableColors" :key="color" :class="[
            getColorClass(color),
            'h-7 w-7 rounded-4xl cursor-pointer transition-all duration-200',
            selectedColor === color ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:scale-110'
          ]" @click="selectColor(color)" :title="color">
          </span>
        </div>
        <!-- Thêm phần chọn bộ nhớ trong -->
        <div class="flex items-center mt-5">
          <h2 class="text-zinc-500 font-medium">Bộ nhớ trong: </h2>
          <span class="ml-2 font-medium">{{ selectedStorage || 'Không rõ' }}</span>
        </div>
        <div class="flex mt-4 gap-5">
          <span v-for="storage in availableStorages" :key="storage"
            class="px-4 py-1 rounded-2xl border border-gray-300 cursor-pointer transition-all duration-200"
            :class="selectedStorage === storage ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-zinc-200'"
            @click="selectStorage(storage)">
            {{ storage }}
          </span>
        </div>
        <div class="mt-8 text-sm text-zinc-800 font-normal">
          <h2>
            ✔️Máy mới Fullbox 100% - Chưa Active - Chính Hãng Apple
          </h2>
          ✔️Được hỗ trợ 1 đổi 1 trong 30 ngày nếu có lỗi từ nhà sản xuất
          <h2>
            ✔️Bảo hành chính hãng Apple 12 tháng
          </h2>
        </div>
        <div class="mt-5 flex items-center">
          <span class="text-[18px]">Số lượng:</span>
          <div
            class="inline-flex items-center justify-between border border-zinc-300 h-10 rounded overflow-hidden w-26 ml-4">
            <button @click="decrease"
              class="w-1/4 text-center h-full bg-gray-100 border-r border-zinc-300 hover:bg-black hover:text-white cursor-pointer">
              −
            </button>
            <div class="w-1/3 text-center select-none">
              {{ quantity }}
            </div>
            <button @click="increase"
              class="w-1/4 text-center h-full bg-gray-100  border-l border-zinc-300  hover:bg-black hover:text-white cursor-pointer">
              +
            </button>
          </div>
        </div>
        <div class="grid grid-cols-10 mt-8 gap-5 p">
          <div
            class="col-span-7 flex flex-col justify-center items-center bg-black text-white rounded-lg p-2 font-medium hover:bg-red-600 cursor-pointer transition duration-200">
            <h1 class="text-xl">MUA NGAY</h1>
            <h2>Giao hàng tận nơi hoặc nhận tại cửa hàng</h2>
          </div>
          <div
            class="col-span-3 flex flex-col justify-center items-center border-red-500 border rounded-lg text-red-500 hover:bg-black hover:border-black hover:text-white cursor-pointer transition duration-200">
            <svg viewBox="0 0 24 24" fill="none" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg"
              stroke="#ec2222">
              <path
                d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                stroke="#ec2222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span>Thêm vào giỏ</span>
          </div>
        </div>
      </div>
      <div class="col-span-2 p-2 -ml-2">
        <div class=" border border-red-700 rounded-xl">
          <div class="flex bg-red-700 text-white p-2 rounded-t-xl items-center gap-2 font-medium">
            <svg viewBox="0 0 24 24" fill="none" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff">
              <path d="M4 11V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V11" stroke="#ffffff"
                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M6 4.5C6 3.11929 7.11929 2 8.5 2V2C10.433 2 12 3.567 12 5.5V7H8.5C7.11929 7 6 5.88071 6 4.5V4.5Z"
                stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"></path>
              <path
                d="M18 4.5C18 3.11929 16.8807 2 15.5 2V2C13.567 2 12 3.567 12 5.5V7H15.5C16.8807 7 18 5.88071 18 4.5V4.5Z"
                stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"></path>
              <path d="M3 7H21V11H3V7Z" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"
                stroke-linejoin="round">
              </path>
              <path d="M12 11V21" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              </path>
              <defs>
                <clipPath id="clip0_429_11037">
                  <rect width="24" height="24" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <span>Khuyến mãi đặc biệt</span>
          </div>
          <div class=" flex flex-col p-1">
            <span class="text-[14px] text-zinc-600 font-medium p-1">- Giảm <strong
                class="text-red-700">250.000đ</strong>
              khi mua kèm gói bảo hành VIP 12 tháng 1 Đổi 1.</span>
            <span class="text-[14px] text-zinc-600 font-medium p-1">- Giảm trực tiếp 40%, tối đa <strong
                class="text-red-700">250.000đ</strong>
              khi mở thẻ TP Bank EVO.</span>
            <span class="text-[14px] text-zinc-600 font-medium p-1">- <strong class="text-red-700">Thu cũ đổi
                mới:</strong>
              Thu giá cao trợ giá đến 95%.</span>
            <span class="text-[14px] text-zinc-600 font-medium p-1">- Tặng cường lực.</span>
          </div>
        </div>
        <div class=" border border-black rounded-xl mt-5">
          <div class="flex bg-black text-white p-2 rounded-t-xl items-center gap-2 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
              class="bi bi-check-circle-fill" viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z">
              </path>
            </svg>
            <span>Chính sách hỗ trợ</span>
          </div>
          <div class=" flex flex-col p-1">
            <div class="flex gap-3 p-1 border-zinc-300 border-b pb-3 items-center">
              <img src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/product_policy_1.svg?1746173377751"
                alt="">
              <div class="flex flex-col justify-start">
                <p class="font-medium">Vận chuyển miễn phí</p>
                <p class="text-xs">Hóa đơn trên 5 triệu</p>
              </div>
            </div>
            <div class="flex gap-3 p-1 border-zinc-300 border-b pb-3 items-center ml-1">
              <img src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/product_policy_2.svg?1746173377751"
                alt="">
              <div class="flex flex-col justify-start">
                <p class="font-medium">Quà tặng</p>
                <p class="text-xs">Hóa đơn trên 10 triệu</p>
              </div>
            </div>
            <div class="flex gap-3 p-1 border-zinc-300 border-b pb-3 items-center">
              <img src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/product_policy_3.svg?1746173377751"
                alt="">
              <div class="flex flex-col justify-start">
                <p class="font-medium">Chứng nhận chất lượng</p>
                <p class="text-xs">Sản phẩm chính hãng</p>
              </div>
            </div>
            <div class="flex gap-3 p-1 items-center ml-2">
              <img src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/product_policy_4.svg?1746173377751"
                alt="">
              <div class="flex flex-col justify-start">
                <p class="font-medium">Hotline: 1900 6750</p>
                <p class="text-xs">Hỗ trợ 24/7</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col mt-5 gap-3">
          <div
            class="flex justify-center items-center gap-2 border-zinc-400 border rounded-lg p-2.5 hover:bg-zinc-100 cursor-pointer hover:text-red-500">
            <img src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/heart.png?1746173377751"
              class="w-5 h-5" alt="">
            <button class="-mt-1 cursor-pointer font-medium">Thêm vào yêu thích</button>
          </div>
          <div
            class="flex justify-center items-center gap-2 border-zinc-400 border rounded-lg p-2.5 hover:bg-zinc-100 cursor-pointer hover:text-red-500">
            <img src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/repeat.svg?1746173377751"
              class="w-5 h-5" alt="">
            <button class="-mt-1 cursor-pointer font-medium">Thêm vào so sánh</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <span class="font-medium text-2xl">THƯỜNG ĐƯỢC MUA CÙNG</span>
      <Carousel v-bind="config2" class=" mt-2 group/carousel">
        <Slide v-for="(img, index) in phoneImages" :key="index" class="">
          <div class="p-3">
            <div class="p-2 border-zinc-100 border rounded-lg shadow-md group">
              <span
                class=" rounded-r-xl border-[#e31934] px-[10px] py-[3px] text-xs font-bold text-white bg-[#e31934] to-red-700 -ml-4 rounded-t-lg text-shadow-2xs">Giảm
                50%
              </span>
              <div class="flex justify-center items-center w-[260px] h-[350px]">
                <img :src="img" class="-mt-4 transform scale-95 group-hover:scale-100 duration-300 cursor-pointer" />
              </div>
              <div class="flex flex-col gap-3">
                <span>Ốp lưng MagSafe iPhone 14 Apple Silicone Chính Hãng</span>
                <div class="flex justify-between items-center">
                  <div class="flex flex-col gap-2">
                    <span class="text-sm text-zinc-400 font-medium line-through">1.590.000đ</span>
                    <span class="-mt-2 text-xl font-bold text-red-600">590.000đ</span>
                  </div>
                  <button class="bg-black p-2 rounded-lg hover:bg-red-700 cursor-pointer transform duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFFFFF"
                      class="bi bi-cart-plus" viewBox="0 0 16 16">
                      <path
                        d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z">
                      </path>
                      <path
                        d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Navigation>
            <template #prev>
              <button
                class="bg-zinc-600 border flex justify-center items-center text-white px-2 -ml-1 h-8 rounded hover:bg-red-500 cursor-pointer
                opacity-0 -translate-x-2 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 duration-300 ">
                <span class="mb-1.5">‹</span>
              </button>
            </template>
            <template #next>
              <button
                class="bg-zinc-600 border flex justify-center items-center text-white px-2 -mr-1 h-8 rounded hover:bg-red-500 cursor-pointer
                opacity-0 translate-x-2 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 duration-300 ">
                <span class="mb-1.5">›</span>
              </button>
            </template>
          </Navigation>
        </template>
      </Carousel>
    </div>
    <div class="grid grid-cols-3 pt-10 p-2">
      <div class="col-span-2 bg-[#F7F7F7] p-4 rounded-xl shadow">
        <h1 class="text-xl font-medium text-zinc-800">THÔNG TIN SẢN PHẨM</h1>
        <div class="relative overflow-hidden duration-400"
          :class="{ 'max-h-[650px]': !expanded, 'max-h-full': expanded }">
          <div class="space-y-4 mt-3 text-justify text-zinc-800">
            <p>
              {{ short_desc }}
            </p>
            <img src="https://bizweb.dktcdn.net/100/480/632/files/aads.jpg?v=1681768733956" alt=""
              class="rounded-md w-full" />
            <p>
              {{ long_desc }}
            </p>
          </div>
          <div v-if="!expanded" class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#F7F7F7]">
          </div>
        </div>
        <div class="flex justify-center">
          <button @click="expanded = !expanded"
            class="mt-6 bg-black text-white px-8 py-1.5 rounded-full hover:bg-red-700 transition cursor-pointer duration-200">
            {{ expanded ? 'Thu gọn ▲' : 'Xem thêm ▼' }}
          </button>
        </div>
      </div>
      <div class="col-span-1 p-2">
        <h1 class="text-xl font-medium text-zinc-800 pl-3">THÔNG SỐ KỸ THUẬT</h1>
        <div class="mt-3 pl-4 relative overflow-hidden duration-400"
          :class="{ 'max-h-[250px]': !expanded_2, 'max-h-full': expanded_2 }">
          <table class="w-full text-left text-sm">
            <tbody class="">
              <tr class="bg-gray-100" v-for="spec in specs" :key="spec.spec_key">
                <td class="p-2 font-medium w-1/3">{{ spec.spec_key }}</td>
                <td class="p-2">{{ spec.spec_value }}</td>
              </tr>
            </tbody>
          </table>
          <div v-if="!expanded_2" class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#F7F7F7]">
          </div>
        </div>
        <div class="flex justify-center mt-5">
          <button @click="expanded_2 = !expanded_2"
            class="bg-black rounded-3xl text-white px-4 py-1.5 hover:bg-red-700 cursor-pointer duration-200">
            {{ expanded_2 ? 'Thu gọn ▲' : 'Xem cấu hình chi tiết ▼' }}
          </button>
        </div>
        <h1
          class="text-xl font-medium text-zinc-800 pl-3 mt-10 uppercase hover:text-red-700 cursor-pointer duration-200">
          Tin tức nổi
          bật
        </h1>
        <div class="mt-3 pl-4 flex flex-col gap-3">
          <div class="flex gap-3">
            <img src="https://bizweb.dktcdn.net/100/480/632/articles/010.jpg?v=1682692969433"
              class="w-[100px] h-[53px] rounded-lg" alt="">
            <div class="flex flex-col gap-1">
              <a href="" class="hover:text-red-700 duration-200 text-sm line-clamp-2">
                'Thò thụt': iPhone đã đúng khi không đụng đến tính năng này
                suốt những năm qua bac assdasd
              </a>
              <p class="text-xs italic">28/04/2023</p>
            </div>
          </div>
          <div class="flex gap-3">
            <img src="https://bizweb.dktcdn.net/100/480/632/articles/010.jpg?v=1682692969433"
              class="w-[100px] h-[53px] rounded-lg" alt="">
            <div class="flex flex-col gap-1">
              <a href="" class="hover:text-red-700 duration-200 text-sm line-clamp-2">
                'Thò thụt': iPhone đã đúng khi không đụng đến tính năng này
                suốt những năm qua bac assdasd
              </a>
              <p class="text-xs italic">28/04/2023</p>
            </div>
          </div>
          <div class="flex gap-3">
            <img src="https://bizweb.dktcdn.net/100/480/632/articles/010.jpg?v=1682692969433"
              class="w-[100px] h-[53px] rounded-lg" alt="">
            <div class="flex flex-col gap-1">
              <a href="" class="hover:text-red-700 duration-200 text-sm line-clamp-2">
                'Thò thụt': iPhone đã đúng khi không đụng đến tính năng này
                suốt những năm qua bac assdasd
              </a>
              <p class="text-xs italic">28/04/2023</p>
            </div>
          </div>
          <div class="flex gap-3">
            <img src="https://bizweb.dktcdn.net/100/480/632/articles/010.jpg?v=1682692969433"
              class="w-[100px] h-[53px] rounded-lg" alt="">
            <div class="flex flex-col gap-1">
              <a href="" class="hover:text-red-700 duration-200 text-sm line-clamp-2">
                'Thò thụt': iPhone đã đúng khi không đụng đến tính năng này
                suốt những năm qua bac assdasd
              </a>
              <p class="text-xs italic">28/04/2023</p>
            </div>
          </div>
          <div class="flex gap-3">
            <img src="https://bizweb.dktcdn.net/100/480/632/articles/010.jpg?v=1682692969433"
              class="w-[100px] h-[53px] rounded-lg" alt="">
            <div class="flex flex-col gap-1">
              <a href="" class="hover:text-red-700 duration-200 text-sm line-clamp-2">
                'Thò thụt': iPhone đã đúng khi không đụng đến tính năng này
                suốt những năm qua bac assdasd
              </a>
              <p class="text-xs italic">28/04/2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* .shadow-all {
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
} */

@keyframes slideInRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-right {
  animation: slideInRight 0.7s ease-out forwards;
}

.slide-in-left {
  animation: slideInLeft 0.7s ease-out forwards;
}
</style>
