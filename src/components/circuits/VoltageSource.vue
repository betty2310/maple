<script lang="ts" setup>
import { onMounted, ref, type PropType } from 'vue'
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import type { VoltageSourceData } from '@/types';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object as PropType<VoltageSourceData>,
    required: true,
  },
})

const { updateNodeData, onNodeClick, removeNodes } = useVueFlow()

const dc = ref(1.0) // base V

const voltageSourceData: VoltageSourceData = {
  id: `V${props.id}`,
  type: 'voltageSource',
  description: 'Voltage source description',
  Dc: dc.value,
  toolbarPosition: Position.Right,
  toolbarVisible: false,
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

</script>

<template>
  <!-- <div class="h-20 w-20 flex rounded-full items-center justify-center bg-orange-500 border border-slate-600">
        <div>+</div>
    </div> -->

  <NodeToolbar style="display: flex; gap: 0.5rem; align-items: center" :is-visible="toolbarVisible"
    :position="data.toolbarPosition">
    <div class="flex flex-col gap-2">
      <button class="btn btn-error" @click="handleRemoveNode">x</button>
    </div>
  </NodeToolbar>

  <div class="h-20 w-20 flex rounded-full items-center justify-center bg-orange-400 border border-slate-600">
    {{ props.data.id }}
  </div>
  <Handle type="target" :position="Position.Top" />
  <Handle type="source" :position="Position.Bottom" />
</template>

<style scoped>
.custom-node {
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  border-radius: 50%;
  /* make it a circle */
  flex-direction: column;
  gap: 10px;
  background: orange;
  color: white;
  border: 1px solid black;
}
</style>