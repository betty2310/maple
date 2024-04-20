<script lang="ts" setup>
import { ref } from 'vue'
import { Background } from '@vue-flow/background'
import { ConnectionLineType, VueFlow, useVueFlow, type DefaultEdgeOptions, type Node } from '@vue-flow/core'
import CustomNode from '@/CustomNode.vue'
import useDragAndDrop from '@/hooks/useDnDCircuitComponent'
import useCircuitStore from '@/stores/circuitStore'

import ResistorNode from '@/components/circuits/ResistorNode.vue'
import VoltageSource from '@/components/circuits/VoltageSource.vue'

const { onConnect, addEdges, onPaneReady, onNodeClick } = useVueFlow()

const { onDragOver, onDragLeave, isDragOver } = useDragAndDrop()

const nodes = ref<Node[]>([])

const edgeOptions: DefaultEdgeOptions = {
  type: 'smoothstep',
}

onConnect((connection) => {
  addEdges(connection)

})

onPaneReady(({ fitView }) => {
  fitView()
})

const circuitStore = useCircuitStore()

onNodeClick((event) => {
  circuitStore.setSelectedNode(event.node as Node)
})

</script>

<template>

  <!-- IMPORTANT here -->
  <!-- <div @drop="onDrop"> -->
  <!-- <CircuitsListBar /> -->
  <!-- <button class="btn" @click="logToObject">Log of vueflow</button>
      <button class="btn" @click="circuitStore.log">Log of my store</button> -->
  <VueFlow :nodes="nodes" :connectionLineType="ConnectionLineType.SmoothStep" :snapToGrid="true"
    :default-edge-options="edgeOptions" @dragover="onDragOver" @dragleave="onDragLeave">
    <div style="height: 100%; width: 100%">
      <Background :size="2" :gap="15" pattern-color="#BDBDBD" :style="{
        backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
        transition: 'background-color 0.2s ease',
      }" />
    </div>
    <!-- <MiniMap /> -->

    <!-- <Controls /> -->

    <template #node-custom="nodeProps">
      <CustomNode v-bind="nodeProps" />
    </template>

    <template #node-resistor="nodeProps">
      <ResistorNode v-bind="nodeProps" :id="nodeProps.id" />
    </template>

    <template #node-voltagesource="nodeProps">
      <VoltageSource v-bind="nodeProps" :id="nodeProps.id" />
    </template>
  </VueFlow>
  <!-- </div> -->
</template>