<template>
    <div
        class="bg-base-200 text-base-content py-2 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <div class="flex items-center">
            <h1 class="text-xl font-bold">🍁</h1>
        </div>
        <div class="flex items-center">
            <button class="mr-4 focus:outline-none">
                <PlayIcon class="h-6 w-6 text-success" />
            </button>
            <button class="mr-4 focus:outline-none">
                world
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PlayIcon } from '@heroicons/vue/24/outline';
</script>