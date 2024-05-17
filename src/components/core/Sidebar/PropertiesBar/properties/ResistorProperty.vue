<template>
    <div>Resistance</div>
    <div>
        <input type="number" class="input input-bordered w-auto" v-model="resistance" @change="handleUpdate" />
        <p> &Omega;</p>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import type { ResistorData } from '@/types';
const { updateNode, findNode } = useVueFlow();

interface ResistorProperty {
    resistance: number;
    id: string;
}

const props = defineProps<ResistorProperty>();

const resistance = ref(props.resistance);
watch(() => props.resistance, (value) => {
    resistance.value = value;
});

function handleUpdate() {
    let node = findNode(props.id);
    if (!node) return;
    node.data.resistance = resistance.value;
    updateNode<ResistorData>(props.id, node);
}
</script>