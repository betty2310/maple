<script lang="ts" setup>
import { ref } from 'vue'
import { Background } from '@vue-flow/background'
import { ConnectionLineType, type DefaultEdgeOptions, type Node, useVueFlow, VueFlow } from '@vue-flow/core'
import useDragAndDrop from '@/hooks/useDnDCircuitComponent'
import useCircuitStore from '@/stores/circuitStore'

import ResistorNode from '@/components/circuits/ResistorNode.vue'
import VoltageSource from '@/components/circuits/VoltageSource.vue'
import CapacitorNode from '@/components/circuits/passive/CapacitorNode.vue'
import ACVoltage from '@/components/circuits/sources/ACVoltage.vue'

import { type ComponentData } from '@/types'
import CustomEdge from '@/CustomEdge.vue'
import GroundNode from '@/components/circuits/GroundNode.vue'
import InductorNode from '@/components/circuits/passive/InductorNode.vue'
import DiodeNode from '@/components/circuits/DiodeNode.vue'
import SwitchNode from '@/components/circuits/SwitchNode.vue'

type NodeTypes = 'resistor' | 'voltagesource' | 'ground'

type MyNode = Node<ComponentData, any, NodeTypes>

const { onConnect, addEdges, onPaneReady, onNodeClick, fromObject } = useVueFlow()

const { onDragOver, onDragLeave, isDragOver } = useDragAndDrop()

const nodes = ref<MyNode[]>([])

const edgeOptions: DefaultEdgeOptions = {
  type: 'custom',
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

// onMounted(async () => {
//   await fromObject(obj)
// })
</script>

<template>
  <!-- IMPORTANT here -->
  <!-- <div @drop="onDrop"> -->
  <!-- <CircuitsListBar /> -->
  <!-- <button class="btn" @click="logToObject">Log of vueflow</button>
      <button class="btn" @click="circuitStore.log">Log of my store</button> -->
  <VueFlow
    :nodes="nodes"
    :connectionLineType="ConnectionLineType.SmoothStep"
    :snapToGrid="true"
    :default-edge-options="edgeOptions"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
  >
    <div style="height: 100%; width: 100%">
      <Background
        :size="2"
        :gap="15"
        pattern-color="#BDBDBD"
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease'
        }"
      />
    </div>
    <!-- <MiniMap /> -->

    <!-- <Controls /> -->

    <template #node-ground="groundNodeProps">
      <GroundNode v-bind="groundNodeProps" />
    </template>

    <template #node-resistor="resistorNodeProps">
      <ResistorNode v-bind="resistorNodeProps" />
    </template>

    <template #node-capacitor="capacitorNodeProps">
      <CapacitorNode v-bind="capacitorNodeProps" />
    </template>

    <template #node-inductor="inductorNodeProps">
      <InductorNode v-bind="inductorNodeProps" />
    </template>

    <template #node-diode="diodeNodeProps">
      <DiodeNode v-bind="diodeNodeProps" />
    </template>

    <template #node-voltagesource="voltagesourceNodeProps">
      <VoltageSource v-bind="voltagesourceNodeProps" />
    </template>

    <template #node-acvoltagesource="acVoltageSourceNodeProps">
      <ACVoltage v-bind="acVoltageSourceNodeProps" />
    </template>

    <template #node-switch="switchSourceNodeProps">
      <SwitchNode v-bind="switchSourceNodeProps" />
    </template>

    <template #edge-custom="edgeProps">
      <CustomEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
  <!-- </div> -->
</template>
