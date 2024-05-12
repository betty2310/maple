<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { Handle, type NodeProps, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import IconOnComponent from '@/assets/svgs/switch_on.svg?component'
import IconOffComponent from '@/assets/svgs/switch_off.svg?component'

import type { SwitchData } from '@/types'

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

onMounted(() => {
  const id = props.id.split(' ')[1]
  updateNodeData<SwitchData>(props.id, {
    id: `S${id}`,
    type: 'switch',
    isOn: isSwitchOn.value,
    description: 'Switch',
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

const handleToggleSwitch = () => {
  isSwitchOn.value = !isSwitchOn.value
  updateNodeData<SwitchData>(props.id, {
    isOn: isSwitchOn.value,
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
      <button class="btn btn-error" @click="handleRemoveNode">x</button>
    </div>
    <div class="flex flex-col gap-2">
      <button class="btn btn-error" @click="handleToggleSwitch">Toggle</button>
    </div>
  </NodeToolbar>

  <IconOffComponent v-if="!isSwitchOn" />
  <IconOnComponent v-else />
  <div v-if="isSwitchOn">&#160;</div>

  <Handle :position="Position.Left" type="source" />
  <Handle :position="Position.Right" type="target" />
</template>
