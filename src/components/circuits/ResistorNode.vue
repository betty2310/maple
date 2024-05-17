<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { Handle, type NodeProps, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import IconComponent from '@/assets/svgs/resistor.svg?component'
import { useColorMode } from '@vueuse/core'


import type { ResistorData } from '@/types'
import BaseNode from '@/components/circuits/BaseNode.vue'

const props = defineProps<NodeProps<ResistorData>>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

const resistance = ref(1000)
const pos = ref<Position>(Position.Left)
const neg = ref<Position>(Position.Right)

onMounted(() => {
  const id = props.id.split(' ')[1]
  updateNodeData<ResistorData>(props.id, {
    id: `R${id}`,
    type: 'resistor',
    description: 'resistor description',
    resistance: resistance.value,
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

const mode = useColorMode();
const color = ref<'white' | 'black'>('white')

watch(mode, (newVal) => {
  color.value = newVal === 'dark' ? 'white' : 'black'
})
</script>

<template>
<!--  <div class="font-mono">{{ props.data.id }}</div>-->


<!--  <NodeToolbar style="display: flex; gap: 0.5rem; align-items: center" :is-visible="toolbarVisible"-->
<!--    :position="data.toolbarPosition">-->
<!--    <div class="flex flex-col gap-2">-->
<!--      <button class="btn btn-error" @click="handleRemoveNode">x</button>-->
<!--    </div>-->
<!--  </NodeToolbar>-->

<!--  <IconComponent :style="{fill: color}" />-->
<!--  &#160;-->

<!--  <Handle :position="pos" type="target" />-->
<!--  <Handle :position="neg" type="source" />-->
  <BaseNode :node-props="props" :neg="Position.Right" :pos="Position.Left" node-prefix="V"/>
</template>
