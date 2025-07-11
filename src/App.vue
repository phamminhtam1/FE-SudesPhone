<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

onMounted(() => {
  window.addEventListener('load', () => {
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition !== null) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      localStorage.removeItem('scrollPosition');
    }
  });
});
</script>
<template>
  <RouterView />
</template>
<style scoped></style>
