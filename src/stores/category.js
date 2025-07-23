import { ref } from 'vue'
import axiosCustomer from '@/plugins/axioscustomer'
import { defineStore } from 'pinia'
export const useCategoryStore = defineStore('category', () => {
  const category_tree = ref([])
  const categorys = ref([])

  async function fetchCategory() {
    try {
      const res_tree = await axiosCustomer.get('/api/category/tree')
      const res_cate = await axiosCustomer.get('/api/category')
      category_tree.value = res_tree.data.category
      categorys.value = res_cate.data.category
    } catch (err) {
      console.error(err)
    }
  }
  return { category_tree, categorys, fetchCategory }
})
