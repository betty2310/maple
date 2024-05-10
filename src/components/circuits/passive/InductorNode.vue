<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Handle, Position, useVueFlow, type NodeProps } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import IconComponent from '@/assets/svgs/Inductor.svg?component'

import type { InductorData } from '@/types'

const props = defineProps<NodeProps<InductorData>>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

const inductance = ref(1e-6)

onMounted(() => {
  const id = props.id.split(' ')[1]
  updateNodeData<InductorData>(props.id, {
    id: `L${id}`,
    type: 'inductor',
    description: 'Inductor',
    inductance: inductance.value,
    toolbarPosition: Position.Right,
    toolbarVisible: false
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

  <IconComponent class="mx-1" />
  &#160;

  <Handle type="source" :position="Position.Left" />
  <Handle type="target" :position="Position.Right" />
</template>
