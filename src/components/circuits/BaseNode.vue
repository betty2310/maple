<script lang="ts" setup>
import { onMounted, ref, watch, type FunctionalComponent, type SVGAttributes } from 'vue'
import { type NodeProps, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { useColorMode } from '@vueuse/core'

import type { ComponentData } from '@/types'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  nodeProps: NodeProps<ComponentData>
  nodePrefix: string
  pos?: Position
  neg?: Position
  showId?: boolean
  icon: FunctionalComponent<SVGAttributes, {}, any, {}>
  additionalData?: object
}>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

const pos = ref<Position>(props.pos ?? Position.Left)
const neg = ref<Position>(props.neg ?? Position.Right)

onMounted(() => {
  const id = props.nodeProps.id.split(' ')[1]
  updateNodeData(props.nodeProps.id, {
    id: `${props.nodePrefix}${id}`,
    toolbarPosition: Position.Right,
    toolbarVisible: false,
    pos: pos.value,
    neg: neg.value,
    ...props.additionalData
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

const mode = useColorMode()
const color = ref<'white' | 'black'>('white')

watch(mode, (newVal) => {
  color.value = newVal === 'dark' ? 'white' : 'black'
})
</script>

<template>
  <div class="items-center flex flex-col">
    <div v-if="props.showId" class="font-mono">{{ props.nodeProps.data.id }}</div>

    <NodeToolbar
      style="display: flex; gap: 0.5rem; align-items: center"
      :is-visible="toolbarVisible"
      :position="props.nodeProps.data.toolbarPosition"
    >
      <div class="flex flex-col gap-2">
        <Button size="xs" variant="destructive" @click="handleRemoveNode">x</Button>
      </div>
    </NodeToolbar>
    <component :is="props.icon" :style="{ fill: color }" />
    <div>&#160;</div>
    <slot name="handle"></slot>
  </div>
</template>
