<script setup>
import { onMounted, watch } from 'vue';
import { getCurrentInstance } from 'vue';
import { useBlogPostStore } from '@/stores/blogpostfe';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
import { storeToRefs } from 'pinia';
const blogPostStore = useBlogPostStore()
const { emit } = getCurrentInstance()
const {blogpost, categoryBlogPost, hotblogposts, categoryName} = storeToRefs(blogPostStore)

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const post_id = props.id

const formatVietnameseDate = (dateString) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }

  return date.toLocaleDateString('vi-VN', options)
}

const handleClickCategory = async (categoryId) => {
  await blogPostStore.fetchBlogPostByCategory(categoryId)
  router.push({ name: 'blog-category', params: { id: categoryId } })
}

onMounted(async () => {
  await blogPostStore.fetchCategoryBlogPost()
  await blogPostStore.fetchBlogPost()
  await blogPostStore.fetchHotBlogPost()
  const hasStoredData = blogPostStore.getBlogPostFromStorage(post_id)
  if (!hasStoredData) {
    await blogPostStore.fetchBlogPostById(post_id)
  }
})

// Watch for blogpost changes to update the title and category
watch(blogpost, (newBlogpost) => {
  if (newBlogpost && newBlogpost.meta_title) {
    emit('update-product-name', {
      productName: newBlogpost.meta_title,
      categoryBlogName: categoryName,
      categoryBlogId: newBlogpost.category_blog?.id
    })
  }
}, { immediate: true })

// Watch for changes in categoryName and emit the update
watch(categoryName, (newCategoryName) => {
  if (blogpost.value && blogpost.value.meta_title) {
    emit('update-product-name', {
      productName: blogpost.value.meta_title,
      categoryBlogName: newCategoryName,
      categoryBlogId: blogpost.value.category_blog?.id
    })
  }
})

</script>

<template>
  <div class=" flex max-w-[1260px] mx-auto mt-5 gap-7">
    <div class="w-3/4">
      <!-- Blog Post Detail -->
      <div v-if="blogpost && blogpost.title" class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-4" v-html="blogpost.title"></h1>
        <div class="flex items-center gap-2 mb-4 text-gray-500">
          <svg width="16" height="16" viewBox="0 0 11 11" fill="none">
            <path
              d="M5.50016 0.458252C4.50302 0.458252 3.52826 0.753941 2.69917 1.30793C1.87007 1.86191 1.22386 2.64931 0.842272 3.57056C0.460681 4.4918 0.360839 5.50551 0.555373 6.4835C0.749906 7.46149 1.23008 8.35983 1.93517 9.06492C2.64026 9.77001 3.5386 10.2502 4.51658 10.4447C5.49457 10.6392 6.50828 10.5394 7.42953 10.1578C8.35077 9.77622 9.13817 9.13002 9.69216 8.30092C10.2461 7.47182 10.5418 6.49707 10.5418 5.49992C10.5403 4.16327 10.0086 2.88182 9.06342 1.93666C8.11827 0.991509 6.83681 0.459829 5.50016 0.458252ZM7.19921 7.19896C7.11326 7.28488 6.9967 7.33315 6.87516 7.33315C6.75363 7.33315 6.63707 7.28488 6.55112 7.19896L5.17612 5.82396C5.09016 5.73803 5.04186 5.62147 5.04183 5.49992V2.74992C5.04183 2.62836 5.09012 2.51178 5.17607 2.42583C5.26203 2.33987 5.37861 2.29159 5.50016 2.29159C5.62172 2.29159 5.7383 2.33987 5.82426 2.42583C5.91021 2.51178 5.9585 2.62836 5.9585 2.74992V5.31017L7.19921 6.55088C7.28513 6.63683 7.3334 6.75339 7.3334 6.87492C7.3334 6.99645 7.28513 7.11301 7.19921 7.19896Z"
              fill="#898989" />
          </svg>
          <span class="text-sm">{{formatVietnameseDate(blogpost.created_at)}}</span>
          <div class="flex items-center gap-1">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" width="15px" height="15px" data-icon="user" role="img"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-user fa-w-14">
              <path fill="currentColor"
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                class=""></path>
            </svg>
            <span class="text-sm font-medium">Sudes Team</span>
          </div>
        </div>
        <div v-if="blogpost.thumbnail_url" class="mb-6">
          <img :src="blogpost.thumbnail_url" :alt="blogpost.title" class="w-full h-96 object-cover rounded-lg">
        </div>
        <div class="prose max-w-none">
          <div v-if="blogpost.summary" class="text-lg text-gray-600 mb-6" v-html="blogpost.summary"></div>
          <div v-if="blogpost.content" class="text-gray-700 leading-relaxed" v-html="blogpost.content"></div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-else-if="!blogpost" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p class="mt-4 text-gray-600">Đang tải bài viết...</p>
      </div>

      <div class="mt-4 border-b border-zinc-200 pt-4 p-2">
        <p class="text-[16px] font-medium text-zinc-600">Bài viết liên quan</p>
      </div>
      <div class="mt-4 grid grid-cols-3 gap-5">
        <div class="col-span-1 border border-zinc-200 rounded-lg overflow-hidden relative shadow-xl">
          <img src="https://bizweb.dktcdn.net/100/480/632/articles/003.jpg?v=1682691879797" alt=""
            class="absolute top-0 left-0 w-full h-[162px] object-cover transition-transform duration-300 ease-in-out hover:scale-105" />
          <div class="pt-[162px]"></div>
          <div class="px-4 py-2">
            <span class="text-[15px] font-medium text-zinc-600 line-clamp-2 capitalize">iPhone 15 Ultra sẽ 'cắt đuôi'
              đối thủ nhờ trang bị 'có một không hai' này</span>
            <span class="text-[13px] font-medium mt-2 text-zinc-400 line-clamp-3">Cải thiện khả năng chụp ảnh luôn là ưu
              tiên hàng đầu của Apple trong mỗi dịp ra mắt iPhone. Năm nay, mẫu iPhone cao cấp nhất có thể sẽ sở hữu một
              trang bị cực kỳ đáng tiền.</span>
          </div>
        </div>
        <div class="col-span-1 border border-zinc-200 rounded-lg overflow-hidden relative shadow-xl">
          <img src="https://bizweb.dktcdn.net/100/480/632/articles/003.jpg?v=1682691879797" alt=""
            class="absolute top-0 left-0 w-full h-[162px] object-cover transition-transform duration-300 ease-in-out hover:scale-105" />
          <div class="pt-[162px]"></div>
          <div class="px-4 py-2">
            <span class="text-[15px] font-medium text-zinc-600 line-clamp-2 capitalize">iPhone 15 Ultra sẽ 'cắt đuôi'
              đối thủ nhờ trang bị 'có một không hai' này</span>
            <span class="text-[13px] font-medium mt-2 text-zinc-400 line-clamp-3">Cải thiện khả năng chụp ảnh luôn là ưu
              tiên hàng đầu của Apple trong mỗi dịp ra mắt iPhone. Năm nay, mẫu iPhone cao cấp nhất có thể sẽ sở hữu một
              trang bị cực kỳ đáng tiền.</span>
          </div>
        </div>
        <div class="col-span-1 border border-zinc-200 rounded-lg overflow-hidden relative shadow-xl">
          <img src="https://bizweb.dktcdn.net/100/480/632/articles/003.jpg?v=1682691879797" alt=""
            class="absolute top-0 left-0 w-full h-[162px] object-cover transition-transform duration-300 ease-in-out hover:scale-105" />
          <div class="pt-[162px]"></div>
          <div class="px-4 py-2">
            <span class="text-[15px] font-medium text-zinc-600 line-clamp-2 capitalize">iPhone 15 Ultra sẽ 'cắt đuôi'
              đối thủ nhờ trang bị 'có một không hai' này</span>
            <span class="text-[13px] font-medium mt-2 text-zinc-400 line-clamp-3">Cải thiện khả năng chụp ảnh luôn là ưu
              tiên hàng đầu của Apple trong mỗi dịp ra mắt iPhone. Năm nay, mẫu iPhone cao cấp nhất có thể sẽ sở hữu một
              trang bị cực kỳ đáng tiền.</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/4 pr-3">
      <div class="border border-zinc-200 rounded-lg flex flex-col shadow-lg">
        <div class="text-white bg-black text-[16px] uppercase font-medium rounded-t-lg px-3 py-2">
          Danh mục tin tức
        </div>
        <span @click="handleClickCategory(categoryblog.id)" class="px-3 py-2 font-medium text-zinc-600 text-[15px] hover:text-red-700 cursor-pointer"
          v-for="categoryblog in categoryBlogPost" :key="categoryblog.id">{{ categoryblog.name }}</span>
      </div>
      <div class="border border-zinc-200 rounded-lg flex flex-col shadow-lg mt-5">
        <div
          class="text-white bg-black text-[16px] uppercase font-medium rounded-t-lg px-3 py-2 hover:text-red-700 cursor-pointer">
          Tin tức nổi bật
        </div>
        <div class="flex items-center justify-between w-full gap-2 p-2" v-for="hotblogpost in hotblogposts"
          :key="hotblogpost.post_id">
          <img :src="hotblogpost.thumbnail_url" alt="" class="w-[98px] h-[56px] rounded-lg">
          <div class="flex flex-col justify-between h-full">
            <span class=" cursor-pointer hover:text-red-700 text-[12px] font-medium text-zinc-600 line-clamp-2">{{
              hotblogpost.title }}</span>
            <span class="text-[12px] text-zinc-500 italic">{{formatVietnameseDate(hotblogpost.created_at)}}</span>
          </div>
        </div>
      </div>
      <img src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/aside_banner_blog.jpg?1746173377751" alt=""
        class=" rounded-lg mt-5">
    </div>
  </div>
</template>

<style>

</style>
