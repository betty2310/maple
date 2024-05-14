<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Handle, type NodeProps, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import IconComponent from '@/assets/svgs/Ground.svg?component'


import type { ComponentData } from '@/types'

const props = defineProps<NodeProps<ComponentData>>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

const pos = ref<Position>(Position.Top)

onMounted(() => {
  const id = props.id.split(' ')[1]
  updateNodeData<ComponentData>(props.id, {
    id: `GND ${id}`,
    type: 'resistor',
    description: 'resistor description',
    toolbarPosition: Position.Right,
    toolbarVisible: false,
    pos: pos.value
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
  <NodeToolbar style="display: flex; gap: 0.5rem; align-items: center" :is-visible="toolbarVisible"
               :position="data.toolbarPosition">
    <div class="flex flex-col gap-2">
      <button class="btn btn-error" @click="handleRemoveNode">x</button>
    </div>
  </NodeToolbar>

  <IconComponent />

  <Handle :position="pos" type="target" />
</template>
