<script setup>
import { onMounted } from 'vue';
import { getCurrentInstance } from 'vue';
import { useIntroductionStore } from '@/stores/introductionfe';
import { storeToRefs } from 'pinia';
const introductionStore = useIntroductionStore()
const { policy } = storeToRefs(introductionStore)
const { emit } = getCurrentInstance()


onMounted(async () => {
  emit('update-product-name', { productName: 'Chính sách' })
  await introductionStore.fetchPolicy()
})
</script>

<template>
  <div class="max-w-7xl mx-auto mt-5 flex flex-col gap-5 min-h-[66vh]">
    <p class="text-zinc-600 text-[15px]" v-html="policy.content"></p>
  </div>
</template>

<style></style>
