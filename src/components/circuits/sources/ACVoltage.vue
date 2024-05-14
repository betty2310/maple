<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Handle, type NodeProps, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import IconComponent from '@/assets/svgs/ACVoltageSource.svg?component'

import type { ACVoltageSourceData } from '@/types'

const props = defineProps<NodeProps<ACVoltageSourceData>>()

defineOptions({
  inheritAttrs: false
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

const pos = ref<Position>(Position.Top)
const neg = ref<Position>(Position.Bottom)

const voltageSourceData: ACVoltageSourceData = {
  id: `AC ${props.id.split(' ')[1]}`,
  type: 'acvoltagesource',
  description: 'AC (sin) Voltage source',
  VA: 1,
  Freq: 1000,
  AC_mag: 1,
  Phase: 0,
  AC_phase: 0,
  toolbarPosition: Position.Right,
  toolbarVisible: false,
  pos: pos.value,
  neg: neg.value
}

onMounted(() => {
  updateNodeData<ACVoltageSourceData>(props.id, voltageSourceData)
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
  <!-- <div class="h-20 w-20 flex rounded-full items-center justify-center bg-orange-500 border border-slate-600">
      <div>+</div>
  </div> -->
  <NodeToolbar style="display: flex; gap: 0.5rem; align-items: center" :is-visible="toolbarVisible"
               :position="props.data.toolbarPosition">
    <div class="flex flex-col gap-2">
      <button class="btn btn-error" @click="handleRemoveNode">x</button>
    </div>
  </NodeToolbar>
  <div class="flex flex-row items-center justify-center">
    <div class="basis-1/4 font-mono">{{ props.data.id }}</div>
    <IconComponent class="basic-2/4" />
    <div class="basis-1/4 font-mono">&#160;</div>
  </div>

  <!--    <div class="h-20 w-20 flex rounded-full items-center justify-center bg-orange-400 border border-slate-600">-->
  <!--        {{ props.data.id }}-->
  <!--    </div>-->
  <Handle :position="pos" type="target" />
  <Handle :position="neg" type="source" />
</template>
