<template>
    <div>DC</div>
    <div>
        <input type="number" class="input input-bordered w-auto" v-model="dc" @change="handleUpdate" />
        <p> V </p>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import type { ResistorData } from '@/types';
const { updateNode, findNode } = useVueFlow();

interface VoltageSourceProperty {
    dc: number;
    id: string;
}

const props = defineProps<VoltageSourceProperty>();

const dc = ref(props.dc);
watch(() => props.dc, (value) => {
    dc.value = value;
});

function handleUpdate() {
    let node = findNode(props.id);
    if (!node) return;
    node.data.Dc = dc.value;
    updateNode<ResistorData>(props.id, node);
}
</script>