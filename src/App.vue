<script lang="ts" setup>
import { ref } from 'vue'
import { Background } from '@vue-flow/background'
import { ConnectionLineType, VueFlow, useVueFlow, type DefaultEdgeOptions, type Node } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'
import ResisterNode from './circuit_components/ResisterNode.vue'
import CircuitsListBar from './components/CircuitsListBar.vue'
import useDragAndDrop from './hooks/useDnD'

const { onConnect, addEdges, onPaneReady } = useVueFlow()

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

const nodes = ref<Node[]>([])

const edgeOptions: DefaultEdgeOptions = {
  type: 'smoothstep',
}

onConnect(addEdges)

onPaneReady(({ fitView }) => {
  fitView()
})
</script>

<template>
  <div class="relative h-screen" @drop="onDrop">
    <CircuitsListBar />
    <VueFlow :nodes="nodes" :connectionLineType="ConnectionLineType.SmoothStep" :default-edge-options="edgeOptions"
      @dragover="onDragOver" @dragleave="onDragLeave">
      <div style="height: 100%; width: 100%">
        <Background :size="2" :gap="20" pattern-color="#BDBDBD" :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease',
        }" />
      </div>
      <!-- <MiniMap /> -->

      <!-- <Controls /> -->

      <template #node-custom="nodeProps">
        <CustomNode v-bind="nodeProps" />
      </template>

      <template #node-resister="nodeProps">
        <ResisterNode v-bind="nodeProps" />
      </template>
    </VueFlow>
  </div>
</template>