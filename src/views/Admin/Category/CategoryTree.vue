<template>
  <VueDraggable class="drag-area" tag="ul" v-model="list" group="categories" @change="onChange">
    <li v-for="el in list" :key="el.id" class="ml-2 mt-2 border p-2 rounded shadow"
      :style="{ backgroundColor: getColor(level) }">
      <p class="font-medium text-[#384153]">{{ el.name }}</p>
      <CategoryTree v-if="el.children" v-model="el.children" :level="level + 1" />
    </li>
  </VueDraggable>
</template>

<script setup>
import { VueDraggable } from 'vue-draggable-plus'
import { computed } from 'vue'

const props = defineProps({
  modelValue: Array,
  level: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])

const list = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})

const onChange = () => {
  emit('update:modelValue', list.value)
}

// Hàm chọn màu theo cấp độ
const getColor = (level) => {
  const colors = [
    '#f0f4ff', // level 0
    '#e0ecff', // level 1
    '#d0e4ff', // level 2
    '#c0dcff', // level 3
    '#b0d4ff'  // level 4+
  ]
  return colors[level] || '#a0ccff'
}
</script>

<style scoped>
.drag-area {
  min-height: 20px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
