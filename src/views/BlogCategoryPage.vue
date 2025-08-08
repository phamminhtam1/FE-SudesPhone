<script setup>
import { onMounted, watch } from 'vue';
import { getCurrentInstance } from 'vue';
import { useBlogPostStore } from '@/stores/blogpostfe';
import { useRouter } from 'vue-router'
const router = useRouter()
import { storeToRefs } from 'pinia';
const blogPostStore = useBlogPostStore()
const { emit } = getCurrentInstance()
const {blogposts, categoryBlogPost, hotblogposts, categoryName} = storeToRefs(blogPostStore)

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

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

const handleClickPost = async (postId) => {
  await blogPostStore.fetchBlogPostById(postId)

  router.push({ name: 'blog-detail', params: { id: postId } })
}

const handleClickCategory = async (categoryId) => {
  await blogPostStore.fetchBlogPostByCategory(categoryId)
  router.push({ name: 'blog-category', params: { id: categoryId } })
}

onMounted(async () => {
  emit('update-product-name', { productName: categoryName })
  await blogPostStore.fetchCategoryBlogPost()
  await blogPostStore.fetchHotBlogPost()
  await blogPostStore.fetchBlogPostByCategory(props.id)
})

// Watch for changes in categoryName and emit the update
watch(categoryName, (newCategoryName) => {
  emit('update-product-name', { productName: newCategoryName })
})

</script>

<template>
  <div class=" flex max-w-[1260px] mx-auto mt-5 gap-7">
    <div class="w-3/4">
      <h1 class="text-[18px] uppercase font-medium">{{ categoryName }}</h1>
      <div class="flex mt-2 gap-5 border-b-zinc-300 border-b pb-7">
        <div class="w-4/7 flex flex-col justify-start gap-2">
          <template v-if="blogposts && blogposts.length > 0">
            <div @click="handleClickPost(blogposts[0].post_id)">
              <div class="overflow-hidden rounded-lg cursor-pointer">
                <img :src="blogposts[0].thumbnail_url" alt=""
                  class="w-full h-[301px] rounded-lg transition-transform duration-300 ease-in-out hover:scale-105">
              </div>
              <div class="flex items-center gap-1 mt-2">
                <svg width="18" height="18" viewBox="0 0 11 11" fill="none">
                  <g>
                    <path
                      d="M5.50016 0.458252C4.50302 0.458252 3.52826 0.753941 2.69917 1.30793C1.87007 1.86191 1.22386 2.64931 0.842272 3.57056C0.460681 4.4918 0.360839 5.50551 0.555373 6.4835C0.749906 7.46149 1.23008 8.35983 1.93517 9.06492C2.64026 9.77001 3.5386 10.2502 4.51658 10.4447C5.49457 10.6392 6.50828 10.5394 7.42953 10.1578C8.35077 9.77622 9.13817 9.13002 9.69216 8.30092C10.2461 7.47182 10.5418 6.49707 10.5418 5.49992C10.5403 4.16327 10.0086 2.88182 9.06342 1.93666C8.11827 0.991509 6.83681 0.459829 5.50016 0.458252ZM7.19921 7.19896C7.11326 7.28488 6.9967 7.33315 6.87516 7.33315C6.75363 7.33315 6.63707 7.28488 6.55112 7.19896L5.17612 5.82396C5.09016 5.73803 5.04186 5.62147 5.04183 5.49992V2.74992C5.04183 2.62836 5.09012 2.51178 5.17607 2.42583C5.26203 2.33987 5.37861 2.29159 5.50016 2.29159C5.62172 2.29159 5.7383 2.33987 5.82426 2.42583C5.91021 2.51178 5.9585 2.62836 5.9585 2.74992V5.31017L7.19921 6.55088C7.28513 6.63683 7.3334 6.75339 7.3334 6.87492C7.3334 6.99645 7.28513 7.11301 7.19921 7.19896Z"
                      fill="#898989"></path>
                  </g>
                  <defs>
                    <clipPath>
                      <rect width="11" height="11" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <span class="text-[12px] text-zinc-500">{{formatVietnameseDate(blogposts[0].created_at)}}</span>
              </div>
              <span class=" cursor-pointer hover:text-red-800 font-medium text-[15px] text-zinc-600 line-clamp-2 mt-1"
                v-html="blogposts[0].title"></span>
            </div>
            <span class="text-[14px] line-clamp-2 -mt-1" v-html="blogposts[0].summary || ''"></span>
          </template>
        </div>
        <div class="w-3/7 flex flex-col gap-6">
          <template v-if="blogposts && blogposts.length > 1">
            <div @click="handleClickPost(blogpost.post_id)" class="flex items-center justify-between w-full gap-2"
              v-for="blogpost in blogposts.slice(1, 6)" :key="blogpost.post_id">
              <img :src="blogpost.thumbnail_url" alt="" class="w-[125px] h-[65px] rounded-lg">
              <div class="flex flex-col justify-between h-full">
                <span class=" cursor-pointer hover:text-red-700 text-[14px] font-medium text-zinc-500 line-clamp-2"
                  v-html="blogpost.title"></span>
                <div class="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 11 11" fill="none">
                    <g>
                      <path
                        d="M5.50016 0.458252C4.50302 0.458252 3.52826 0.753941 2.69917 1.30793C1.87007 1.86191 1.22386 2.64931 0.842272 3.57056C0.460681 4.4918 0.360839 5.50551 0.555373 6.4835C0.749906 7.46149 1.23008 8.35983 1.93517 9.06492C2.64026 9.77001 3.5386 10.2502 4.51658 10.4447C5.49457 10.6392 6.50828 10.5394 7.42953 10.1578C8.35077 9.77622 9.13817 9.13002 9.69216 8.30092C10.2461 7.47182 10.5418 6.49707 10.5418 5.49992C10.5403 4.16327 10.0086 2.88182 9.06342 1.93666C8.11827 0.991509 6.83681 0.459829 5.50016 0.458252ZM7.19921 7.19896C7.11326 7.28488 6.9967 7.33315 6.87516 7.33315C6.75363 7.33315 6.63707 7.28488 6.55112 7.19896L5.17612 5.82396C5.09016 5.73803 5.04186 5.62147 5.04183 5.49992V2.74992C5.04183 2.62836 5.09012 2.51178 5.17607 2.42583C5.26203 2.33987 5.37861 2.29159 5.50016 2.29159C5.62172 2.29159 5.7383 2.33987 5.82426 2.42583C5.91021 2.51178 5.9585 2.62836 5.9585 2.74992V5.31017L7.19921 6.55088C7.28513 6.63683 7.3334 6.75339 7.3334 6.87492C7.3334 6.99645 7.28513 7.11301 7.19921 7.19896Z"
                        fill="#898989"></path>
                    </g>
                    <defs>
                      <clipPath>
                        <rect width="11" height="11" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <span class="text-[12px] text-zinc-500">{{formatVietnameseDate(blogpost.created_at)}}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="mt-4 grid grid-cols-3 gap-5">
        <div class="col-span-1 border border-zinc-200 rounded-lg overflow-hidden relative shadow-xl" v-for="blogpost in blogposts.slice(6, 12)" :key="blogpost.post_id">
          <img :src="blogpost.thumbnail_url" alt=""
            class="absolute top-0 left-0 w-full h-[162px] object-cover transition-transform duration-300 ease-in-out hover:scale-105" />
          <div class="pt-[162px]"></div>
          <div class="px-4 py-2">
            <span class="text-[15px] font-medium text-zinc-600 line-clamp-2 capitalize" v-html="blogpost.title"></span>
            <span class="text-[13px] font-medium mt-2 text-zinc-400 line-clamp-3" v-html="blogpost.summary"></span>
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
        <div class="flex items-center justify-between w-full gap-2 p-2" v-for="hotblogpost in hotblogposts" :key="hotblogpost.post_id">
          <img :src="hotblogpost.thumbnail_url" alt=""
            class="w-[98px] h-[56px] rounded-lg">
          <div class="flex flex-col justify-between h-full">
            <span class=" cursor-pointer hover:text-red-700 text-[12px] font-medium text-zinc-600 line-clamp-2">{{ hotblogpost.title }}</span>
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
