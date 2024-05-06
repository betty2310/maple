<template>
    <div
        class="bg-base-200 text-base-content py-1 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <div class="flex items-center text-sm">
            <h1 class="text-xl font-bold">🍁</h1>
        </div>
        <div class="flex items-center text-sm mr-4">
            <button class="mr-4 focus:outline-none hover:bg-base-100" @click="onRun">
                <PlayIcon class="h-6 w-6 text-success" />
            </button>
            <div class="dropdown dropdown-bottom dropdown-end">
                <div tabindex="0" role="button" class="">{{ selected }}</div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a @click="selected = 'Interactive'">Interactive</a></li>
                    <li><a @click="selected = 'Transient'">Transient</a></li>
                    <li><a @click="selected = 'DC sweep'">DC sweep</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PlayIcon } from '@heroicons/vue/24/outline';
import { useVueFlow } from '@vue-flow/core'
import { handleAPI } from '@/logic/main';
import { ref, watch } from 'vue';
import { useFetch } from '@vueuse/core'

import useRunStore from '@/stores/runStore';

import useOutputStore from '@/stores/outputStore';

const { toObject } = useVueFlow()

const netlist = ref({})

const onRun = async () => {
    netlist.value = handleAPI(toObject())
    const { isFetching, error, data } = await useFetch<string>('http://localhost:5109/api/Simulator', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(netlist.value)
    })

    if (error.value) {
        console.error(error.value)
    }
    const outputStore = useOutputStore()
    if (data.value) {
        outputStore.setValue(JSON.parse(data.value).output)
        outputStore.setInput(JSON.parse(data.value).input)
    }
}

const selected = ref<"Interactive" | "Transient" | "DC sweep">('DC sweep')

const runStore = useRunStore()
watch(selected, () => {
    runStore.setMode(selected.value)
})
</script>