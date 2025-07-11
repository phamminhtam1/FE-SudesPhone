<script setup>
import { computed } from 'vue'

const props = defineProps({
  productName: String,
  categoryName: String,
  categoryId: [String, Number]
})

const breadcrumbs = computed(() => {
  const crumbs = [{ text: 'Trang chủ', to: '/' }]
  if (props.categoryName && props.categoryId) {
    crumbs.push({ text: props.categoryName, to: `/category/${props.categoryId}` })
  }
  if (props.productName) {
    crumbs.push({ text: props.productName, to: null })
  }
  return crumbs
})
</script>

<template>
  <div class="border-b-zinc-50 border-b p-2.5 shadow-md">
    <div class="max-w-7xl mx-auto pl-2">
      <nav aria-label="breadcrumb" class="breadcrumb">
        <ol class="flex">
          <li v-for="(crumb, index) in breadcrumbs" :key="index" class=" flex justify-center">
            <router-link v-if="crumb.to && index !== breadcrumbs.length - 1" :to="crumb.to"
              class="flex justify-center items-center gap-3 text-zinc-700 text-[15px] hover:text-red-700">
              {{ crumb.text }}
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" width="10px"
                height="10px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
                class="svg-inline--fa fa-chevron-right fa-w-10 mr-3">
                <path fill="currentColor"
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
                </path>
              </svg>
            </router-link>
            <span class="text-red-700 text-[15px]" v-else>{{ crumb.text }}</span>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>
<style></style>
