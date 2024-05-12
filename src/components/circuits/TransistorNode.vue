<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Handle, type NodeProps, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import IconComponent from '@/assets/svgs/Transitor.svg?component'

import type { TransistorData } from '@/types'

const props = defineProps<NodeProps<TransistorData>>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

onMounted(() => {
  const id = props.id.split(' ')[1]
  updateNodeData<TransistorData>(props.id, {
    id: `Q${id}`,
    model: 'npn',
    type: 'transistor',
    description: 'NPN transistor',
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
  <NodeToolbar
    :is-visible="toolbarVisible"
    :position="data.toolbarPosition"
    style="display: flex; gap: 0.5rem; align-items: center"
  >
    <div class="flex flex-col gap-2">
      <button class="btn btn-error" @click="handleRemoveNode">x</button>
    </div>
  </NodeToolbar>

  <IconComponent />
  <div class="font-mono fixed right-2 top-1/2 transform translate-y-[-50%]">{{ props.data.id }}</div>

  <Handle :position="Position.Left" type="source" />
  <Handle :position="Position.Top" type="target" />
  <Handle :position="Position.Bottom" type="target" />
</template>
