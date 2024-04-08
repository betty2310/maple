<template>
  <div
    class="absolute left-0 top-0 bottom-0 bg-white shadow-lg my-4 p-4 rounded-xl flex items-center justify-between z-10">
    <div class="flex flex-col space-y-4 cotent-center">
      <div v-for="component in components" :key="component.name" class="text-center">
        <button class="btn"> {{ component.name }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const components = ref([
  { name: 'Rectangle', icon: 'https://img.icons8.com/ios/452/rectangle.png' },
  { name: 'Voltage source', icon: 'https://img.icons8.com/ios/452/voltage.png' },
  { name: 'Voltage source', icon: 'https://img.icons8.com/ios/452/voltage.png' },
  { name: 'Voltage source', icon: 'https://img.icons8.com/ios/452/voltage.png' },
  { name: 'Node 3', icon: 'https://img.icons8.com/ios/452/3.png' }
])
</script>