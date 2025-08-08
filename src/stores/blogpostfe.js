import axiosCustomer from "@/plugins/axioscustomer";
import { ref } from "vue";
import { defineStore } from "pinia";
export const useBlogPostStore = defineStore('blogpost', () => {
  const blogposts = ref([])
  const hotblogposts = ref([])
  const categoryBlogPost = ref([])
  const blogpost = ref({})
  const categoryName = ref('')

  async function fetchBlogPost() {
    const res = await axiosCustomer.get('/api/blog-post-fe')
    blogposts.value = res.data.blogPosts
  }

  async function fetchCategoryBlogPost() {
    const res = await axiosCustomer.get('/api/category-blog-post-fe')
    categoryBlogPost.value = res.data.categoryBlogPosts
  }

  async function fetchHotBlogPost() {
    const res = await axiosCustomer.get('/api/blog-post-fe/hot')
    hotblogposts.value = res.data.blogPosts
  }

  async function fetchBlogPostById(id) {
    const res = await axiosCustomer.get(`/api/blog-post-fe/${id}`)
    blogpost.value = res.data.blogPost

    const blogData = {
      post_id: res.data.blogPost.post_id,
      title: res.data.blogPost.title,
      created_at: res.data.blogPost.created_at,
      summary: res.data.blogPost.summary,
      content: res.data.blogPost.content,
      thumbnail_url: res.data.blogPost.thumbnail_url,
      meta_title: res.data.blogPost.meta_title,
      category_blog: res.data.blogPost.category_blog
    }
    localStorage.setItem(`blog_post_${id}`, JSON.stringify(blogData))
  }

  function getBlogPostFromStorage(id) {
    const storedData = localStorage.getItem(`blog_post_${id}`)
    if (storedData) {
      blogpost.value = JSON.parse(storedData)
      return true
    }
    return false
  }

  async function fetchBlogPostByCategory(categoryId) {
    const res = await axiosCustomer.get(`/api/blog-post-fe/category/${categoryId}`)
    blogposts.value = res.data.blogPosts
    categoryName.value = blogposts.value[0].category_blog.name
  }

  return {
    blogposts,
    fetchBlogPost,
    categoryBlogPost,
    fetchCategoryBlogPost,
    blogpost,
    fetchBlogPostById,
    getBlogPostFromStorage,
    hotblogposts,
    fetchHotBlogPost,
    fetchBlogPostByCategory,
    categoryName
  }
})
