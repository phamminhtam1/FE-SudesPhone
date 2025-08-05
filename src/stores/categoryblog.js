import axiosAdmin from "@/plugins/axion";
import { ref } from "vue";
import { defineStore } from "pinia";
export const useCategoryBlogStore = defineStore('categoryblog', () => {
  const categoryblogs = ref([])

  async function fetchCategoryBlog() {
    const res = await axiosAdmin.get('api/category-blog-post')
    categoryblogs.value = res.data.categoryBlogPosts
  }
  return {
    categoryblogs,
    fetchCategoryBlog
  }
})
