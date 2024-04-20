<template>
    <div
        class="bg-base-200 text-base-content py-1 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <div class="flex items-center text-sm">
            <h1 class="text-xl font-bold">🍁</h1>
        </div>
        <div class="flex items-center text-sm">
            <button class="mr-4 focus:outline-none hover:bg-base-100" @click="onRun">
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
import { useVueFlow } from '@vue-flow/core'
import { convertGraphToNetlist } from '@/logic/main';

const { toObject } = useVueFlow()

const onRun = () => {
    convertGraphToNetlist(toObject())
}
</script>