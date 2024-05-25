<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Handle, type NodeProps, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import IconComponent from '@/assets/svgs/DCVoltageSource.svg'
import IconComponentLight from '@/assets/svgs/DCVoltageSourceLight.svg'

import type { VoltageSourceData } from '@/types'

const props = defineProps<NodeProps<VoltageSourceData>>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

const dc = ref(1.0) // base V
const pos = ref<Position>(Position.Top)
const neg = ref<Position>(Position.Bottom)

const voltageSourceData: VoltageSourceData = {
  id: `DC ${props.id.split(' ')[1]}`,
  description: 'Voltage source description',
  Dc: dc.value,
  toolbarPosition: Position.Right,
  toolbarVisible: false,
  pos: pos.value,
  neg: neg.value
}

onMounted(() => {
  updateNodeData<VoltageSourceData>(props.id, voltageSourceData)
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
</script>

<template>
  <!-- <div class="h-20 w-20 flex rounded-full items-center justify-center bg-orange-500 border border-slate-600">
        <div>+</div>
    </div> -->

  <NodeToolbar
    style="display: flex; gap: 0.5rem; align-items: center"
    :is-visible="toolbarVisible"
    :position="props.data.toolbarPosition"
  >
    <div class="flex flex-col gap-2">
      <Button size="xs" variant="destructive" @click="handleRemoveNode">x</Button>
    </div>
  </NodeToolbar>

  <div class="flex flex-row items-center justify-center">
    <div class="basis-1/4 font-mono">{{ props.data.id }}</div>
    <IconComponent class="basic-2/4" v-if="mode == 'dark'" />
    <IconComponentLight class="basic-2/4" v-else />

    <div class="basis-1/4 font-mono">&#160;</div>
  </div>

  <Handle :position="pos" type="target" />
  <Handle :position="neg" type="source" />
</template>
