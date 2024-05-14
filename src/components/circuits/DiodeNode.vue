<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Handle, type NodeProps, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import IconComponent from '@/assets/svgs/Diode.svg?component'

import type { DiodeData } from '@/types'

const props = defineProps<NodeProps<DiodeData>>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()
const pos = ref<Position>(Position.Left)
const neg = ref<Position>(Position.Right)

onMounted(() => {
  const id = props.id.split(' ')[1]
  updateNodeData<DiodeData>(props.id, {
    id: `D${id}`,
    type: 'diode',
    description: 'Diode model 1N914',
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
    :is-visible="toolbarVisible"
    :position="data.toolbarPosition"
    style="display: flex; gap: 0.5rem; align-items: center"
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
