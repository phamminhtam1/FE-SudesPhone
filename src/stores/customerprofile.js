import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref(null)

  async function fetchProfile() {
    try {
      const res = await axios.get('/api/customer/me')
      profile.value = res.data.customer
    } catch (err) {
      console.error(err)
    }
  }

  return {
    fetchProfile,
  }
})
