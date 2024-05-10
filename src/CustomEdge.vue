<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { EdgeProps } from '@vue-flow/core'
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, useVueFlow } from '@vue-flow/core'

const props = defineProps<EdgeProps>()

const path = computed(() => getSmoothStepPath(props))

const { findEdge } = useVueFlow()

type SelectedOption = 'Voltmeter' | 'Ammeter' | ''

const selectedOption = ref<SelectedOption>('');

const selectOption = (option: SelectedOption) => {
    selectedOption.value = option;
    let edge = findEdge(props.id)
    if (edge) {
        edge.data.export = option;
    }
};

const turnBack = () => {
    selectedOption.value = '';
    let edge = findEdge(props.id)
    if (edge) {
        edge.data = '';
    }
};
</script>



<script lang="ts">
export default {
    inheritAttrs: false,
}
</script>

<template>
    <BaseEdge :path="path[0]" :style="{stroke: '#D37987'}" />

    <EdgeLabelRenderer>
        <div :style="{
            pointerEvents: 'all',
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
        }" class="nodrag nopan">
            <details v-if="!selectedOption" class="dropdown">
                <summary class="btn btn-xs">+</summary>
                <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li><a @click="selectOption('Voltmeter')">Voltmeter</a></li>
                    <li><a @click="selectOption('Ammeter')">Ammeter</a></li>
                </ul>
            </details>
            <button v-else class="btn btn-xs btn-secondary" @click="turnBack">{{ selectedOption }}</button>
        </div>
    </EdgeLabelRenderer>
</template>

<style>
.edgebutton {
    border-radius: 999px;
    cursor: pointer;
}

.edgebutton:hover {
    box-shadow: 0 0 0 2px pink, 0 0 0 4px #f05f75;
}
</style>