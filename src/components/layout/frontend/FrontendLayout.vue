<template>
  <Header />
  <AppBreadcrumb v-if="route.name !== 'home'" v-bind="breadcrumbInfo" />
  <router-view @update-product-name="updateProductName" />
  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from './Header.vue'
import Footer from './Footer.vue'
import AppBreadcrumb from './AppBreadcrumb.vue';

const breadcrumbInfo = ref({})
function updateProductName(info) {
  breadcrumbInfo.value = info
}

const route = useRoute()
</script>
