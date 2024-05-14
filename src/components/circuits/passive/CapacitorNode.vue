<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Handle, type NodeProps, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import IconComponent from '@/assets/svgs/Capacitor.svg?component'

import type { CapacitorData } from '@/types'

const props = defineProps<NodeProps<CapacitorData>>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

const capacitance = ref(1e-6)
const pos = ref<Position>(Position.Left)
const neg = ref<Position>(Position.Right)

onMounted(() => {
  const id = props.id.split(' ')[1]
  updateNodeData<CapacitorData>(props.id, {
    id: `C${id}`,
    type: 'resistor',
    description: 'Capacitor',
    capacitance: capacitance.value,
    toolbarPosition: Position.Right,
    toolbarVisible: false,
    pos: pos.value,
    neg: neg.value
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
  <div class="font-mono">{{ props.data.id }}</div>
  <NodeToolbar
    style="display: flex; gap: 0.5rem; align-items: center"
    :is-visible="toolbarVisible"
    :position="data.toolbarPosition"
  >
    <div class="flex flex-col gap-2">
      <button class="btn btn-error" @click="handleRemoveNode">x</button>
    </div>
  </NodeToolbar>

  <IconComponent />
  &#160;

  <Handle :position="neg" type="source" />
  <Handle :position="pos" type="target" />
</template>
