import axiosAdmin from "@/plugins/axion";
import { ref } from "vue";
import { defineStore } from "pinia";
export const useBlogPostStore = defineStore('blogpost', () => {
  const blogposts = ref([])

  async function fetchBlogPost() {
    const res = await axiosAdmin.get('/api/blog-post/')
    blogposts.value = res.data.blogPosts
  }
  return {
    blogposts,
    fetchBlogPost
  }
})
