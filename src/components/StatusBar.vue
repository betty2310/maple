<template>
  <span class="font-bold text-xs">Connected {{ mode }}</span>
  <div class="font-bold text-xs">
    <span class="mr-4">Version:</span>
    <span>0.0.1</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const mode = ref(import.meta.env.DEV ? 'development' : 'production')
</script>