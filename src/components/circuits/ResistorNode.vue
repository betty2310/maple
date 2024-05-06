<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Handle, Position, useVueFlow, type NodeProps } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import type { ResistorData } from '@/types';

const props = defineProps<NodeProps<ResistorData>>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

const resistance = ref(1000)

onMounted(() => {
  const id = props.id.split(' ')[1]
  updateNodeData<ResistorData>(props.id, {
    id: `R${id}`,
    type: 'resistor',
    description: 'resistor description',
    resistance: resistance.value,
    toolbarPosition: Position.Right,
    toolbarVisible: false,
  })
})
const toolbarVisible = ref(props.data.toolbarVisible)

onNodeClick((event) => {
  if (event.node.id !== props.id) return
  toolbarVisible.value = !toolbarVisible.value
})

const handleRemoveNode = () => {
  removeNodes(props.id, true)
}

</script>

<template>
  {{ props.data.id }}
  <NodeToolbar style="display: flex; gap: 0.5rem; align-items: center" :is-visible="toolbarVisible"
    :position="data.toolbarPosition">
    <div class="flex flex-col gap-2">
      <button class="btn btn-error" @click="handleRemoveNode">x</button>
    </div>
  </NodeToolbar>
  <div class="custom-node">
    <div>resistor</div>
  </div>
  <Handle type="source" :position="Position.Left" />
  <Handle type="target" :position="Position.Right" />
</template>

<style scoped>
.custom-node {
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  gap: 10px;
  background: blue;
  color: white;
  border: 1px solid black;
}
</style>