import axiosCustomer from "@/plugins/axioscustomer";
import { ref } from "vue";
import { defineStore } from "pinia";
export const useBlogPostStore = defineStore('blogpost', () => {
  const blogposts = ref([])
  const categoryBlogPost = ref([])
  const blogpost = ref({})

  async function fetchBlogPost() {
    const res = await axiosCustomer.get('/api/blog-post-fe')
    blogposts.value = res.data.blogPosts
  }

  async function fetchCategoryBlogPost() {
    const res = await axiosCustomer.get('/api/category-blog-post-fe')
    categoryBlogPost.value = res.data.categoryBlogPosts
  }

  async function fetchBlogPostById(id) {
    const res = await axiosCustomer.get(`/api/blog-post-fe/${id}`)
    blogpost.value = res.data.blogPost
  }


  return {
    blogposts,
    fetchBlogPost,
    categoryBlogPost,
    fetchCategoryBlogPost,
    blogpost,
    fetchBlogPostById
  }
})
