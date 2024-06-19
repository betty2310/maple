<template>
  <div class="flex flex-col items-center w-screen h-screen justify-center gap-5">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Page not found</h1>
    <RouterLink :to="'/playground'"><Button variant="link">Return to home</Button></RouterLink>
  </div>
</template>
<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
</script>
