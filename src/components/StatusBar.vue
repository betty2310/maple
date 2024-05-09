<template>
    <div
        class="bg-primary text-base-content py-1 px-4 fixed bottom-0 left-0 right-0 z-10 flex justify-between items-center">
        <div class="flex items-center">
          <span class="font-bold text-xs text-primary-content">Connected {{ mode }}</span>
        </div>
        <div class="flex items-center text-xs text-primary-content">
            <span class="mr-4">Version:</span>
            <span>0.0.1</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const mode = ref(import.meta.env.DEV ? 'development' : 'production')
</script>