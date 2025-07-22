import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/plugins/axioscustomer'
export const useProfileStore = defineStore('profile', () => {
  const profile = ref(null)
  const addresses = ref(null)

  async function fetchProfile() {
    try {
      const res = await axios.get('/api/customer/me')
      profile.value = res.data.customer
      addresses.value = res.data.customer.address
    } catch (err) {
      console.error(err)
    }
  }

  return {
    fetchProfile,
    profile,
    addresses,
  }
})
