<script setup>
import { onMounted } from 'vue';
import { getCurrentInstance } from 'vue';
import { useIntroductionStore } from '@/stores/introductionfe';
import { storeToRefs } from 'pinia';
const introductionStore = useIntroductionStore()
const {introduction} = storeToRefs(introductionStore)
const { emit } = getCurrentInstance()


onMounted(async () => {
  emit('update-product-name', { productName: 'Giới thiệu' })
  await introductionStore.fetchIntroduction()
})
</script>

<template>
  <div class="max-w-7xl mx-auto mt-5 flex flex-col gap-5 min-h-[66vh]">
    <span class="text-[20px] font-medium text-zinc-700">{{ introduction.title }}</span>
    <p class="text-zinc-600 text-[15px]" v-html="introduction.content"></p>
  </div>
</template>

<style></style>
