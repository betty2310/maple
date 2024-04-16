<!-- ActivityBar.vue -->
<script setup lang="ts">
import { QueueListIcon } from '@heroicons/vue/24/outline';
</script>

<template>
    <div
        class="bg-base-300 text-base-content py-4 px-2 fixed left-0 top-11 bottom-7 w-16 flex flex-col items-center space-y-4">
        <button class="focus:outline-none">
            <QueueListIcon class="h-6 w-6 text-centre-content" />
        </button>
    </div>
</template>