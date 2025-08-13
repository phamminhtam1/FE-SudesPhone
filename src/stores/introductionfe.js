import axiosAdmin from "@/plugins/axion";
import { ref } from "vue";
import { defineStore } from "pinia";
export const useIntroductionStore = defineStore('introduction', () => {
  const introduction = ref([])
  const policy = ref([])

  async function fetchIntroduction() {
    const res = await axiosAdmin.get('/api/introduction')
    introduction.value = res.data.introduction
  }

  async function fetchPolicy() {
    const res = await axiosAdmin.get('/api/policy')
    policy.value = res.data.policy
  }

  return {
    introduction,
    fetchIntroduction,
    fetchPolicy,
    policy,
  }
})
