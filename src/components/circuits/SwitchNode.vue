<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { Handle, type NodeProps, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import IconOnComponent from '@/assets/svgs/switch_on.svg?component'
import IconOffComponent from '@/assets/svgs/switch_off.svg?component'
import Button from '../ui/button/Button.vue'

import type { SwitchData } from '@/types'

import { useColorMode } from '@vueuse/core'
const mode = useColorMode()
const color = ref<'white' | 'black'>('white')
watch(mode, (newVal) => {
  color.value = newVal === 'dark' ? 'white' : 'black'
})

const props = defineProps<NodeProps<SwitchData>>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

const isSwitchOn = ref<boolean>(true)

watch(
  () => props.data.isOn,
  (value) => {
    isSwitchOn.value = value
  }
)
const pos = ref<Position>(Position.Left)
const neg = ref<Position>(Position.Right)
onMounted(() => {
  const id = props.id.split(' ')[1]
  updateNodeData<SwitchData>(props.id, {
    id: `S${id}`,
    isOn: isSwitchOn.value,
    description: 'Switch',
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

const handleToggleSwitch = () => {
  isSwitchOn.value = !isSwitchOn.value
  updateNodeData<SwitchData>(props.id, {
    isOn: isSwitchOn.value
  })
}
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
    <div class="flex flex-col gap-2">
      <Button size="xs" variant="secondary" @click="handleToggleSwitch">Toggle</Button>
    </div>
  </NodeToolbar>

  <IconOffComponent v-if="!isSwitchOn" :style="{ fill: color }" />
  <IconOnComponent v-else :style="{ fill: color }" />
  <div v-if="isSwitchOn">&#160;</div>

  <Handle :position="neg" type="source" />
  <Handle :position="pos" type="target" />
</template>
