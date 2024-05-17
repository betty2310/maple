<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { Handle, type NodeProps, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import IconComponent from '@/assets/svgs/resistor.svg?component'
import { useColorMode } from '@vueuse/core'


import type { ComponentData } from '@/types'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  nodeProps: NodeProps<ComponentData>
  nodePrefix: string
  pos: Position
  neg: Position
}>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

const resistance = ref(1000)
const pos = ref<Position>(props.pos)
const neg = ref<Position>(props.neg)

onMounted(() => {
  const id = props.nodeProps.id.split(' ')[1]
  updateNodeData<ResistorData>(props.nodeProps.id, {
    id: `${props.nodePrefix}${id}`,
    type: 'resistor',
    description: 'resistor description',
    resistance: resistance.value,
    toolbarPosition: Position.Right,
    toolbarVisible: false,
    pos: pos.value,
    neg: neg.value
  })
})
const toolbarVisible = ref(props.nodeProps.data.toolbarVisible)

onNodeClick((event) => {
  if (event.node.id !== props.nodeProps.id) return
  toolbarVisible.value = !toolbarVisible.value
})

const handleRemoveNode = () => {
  removeNodes(props.nodeProps.id, true)
}

const mode = useColorMode();
const color = ref<'white' | 'black'>('white')

watch(mode, (newVal) => {
  color.value = newVal === 'dark' ? 'white' : 'black'
})
</script>

<template>
  <div class="font-mono">{{ props.nodeProps.data.id }}</div>


  <NodeToolbar style="display: flex; gap: 0.5rem; align-items: center" :is-visible="toolbarVisible"
               :position="props.nodeProps.data.toolbarPosition">
    <div class="flex flex-col gap-2">
      <Button variant="destructive" @click="handleRemoveNode">x</Button>
    </div>
  </NodeToolbar>

  <IconComponent :style="{fill: color}" />
  &#160;

  <Handle :position="pos" type="target" />
  <Handle :position="neg" type="source" />
</template>
