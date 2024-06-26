<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { Handle, type NodeProps, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import IconComponent from '@/assets/svgs/Transistor.svg?component'

import type { TransistorData } from '@/types'

const props = defineProps<NodeProps<TransistorData>>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

const c = ref<Position>(Position.Top)
const e = ref<Position>(Position.Bottom)
const b = ref<Position>(Position.Left)

onMounted(() => {
  const id = props.id.split(' ')[1]
  updateNodeData<TransistorData>(props.id, {
    id: `Q${id}`,
    model: 'npn',
    description: 'NPN transistor',
    toolbarPosition: Position.Right,
    toolbarVisible: false,
    c: c.value,
    e: e.value,
    b: b.value
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

import { useColorMode } from '@vueuse/core'
import Button from '../ui/button/Button.vue'
const mode = useColorMode()
const color = ref<'white' | 'black'>('white')
color.value = mode.value === 'dark' ? 'white' : 'black'

watch(mode, (newVal) => {
  color.value = newVal === 'dark' ? 'white' : 'black'
})
</script>

<template>
  <NodeToolbar
    :is-visible="toolbarVisible"
    :position="data.toolbarPosition"
    style="display: flex; gap: 0.5rem; align-items: center"
  >
    <div class="flex flex-col gap-2">
      <Button size="xs" variant="destructive" @click="handleRemoveNode">x</Button>
    </div>
  </NodeToolbar>

  <IconComponent :style="{ fill: color }" />
  <div class="font-mono fixed right-2 top-1/2 transform translate-y-[-50%]">
    {{ props.data.id }}
  </div>

  <Handle :position="b" type="source" />
  <Handle :position="c" type="target" />
  <Handle :position="e" type="target" />
</template>
