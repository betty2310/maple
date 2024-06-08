<template>
  <RouterLink :to="'/'" class="flex items-center gap-2">
    <Zap class="size-5 text-yellow-500" />
    <p class="pixelify-sans text-lg">CircuitCraft</p>
  </RouterLink>
</template>
<script setup lang="ts">
import { Zap } from 'lucide-vue-next'
</script>
