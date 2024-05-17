<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Node } from '@vue-flow/core'

import CircuitsListBar from '@/components/core/CircuitsListBar/CircuitsListBar.vue'
import PropertiesListBar from '@/components/PropertiesListBar.vue'

import { useLayoutStore } from '@/stores/layoutStore'
import useCircuitStore from '@/stores/circuitStore'
import { BottomPanelItem, SidebarItem } from '@/enums'
import SimulationBottombar from '@/components/SimulationBottombar.vue'

const layoutStore = useLayoutStore()

const sidebarItem = ref<SidebarItem | null>(null)
const bottomPanelItem = ref<BottomPanelItem | null>(null)
const selectedComponent = ref<Node | null>(null)

watch(() => layoutStore.sidebarItem, (value) => {
  sidebarItem.value = value
})

watch(() => layoutStore.bottomPanelItem, (value) => {
  bottomPanelItem.value = value
})

watch(
  () => useCircuitStore().selectedNode,
  (value) => {
    selectedComponent.value = value
  }
)
</script>

<template>
  <div class="h-full m-4">
    <div v-if="layoutStore.sidebarItem === SidebarItem.Components">
      <CircuitsListBar />
    </div>
    <div v-else-if="layoutStore.sidebarItem === SidebarItem.Properties">
      <PropertiesListBar :selectedComponent="selectedComponent" />
    </div>
  </div>
  <div
    v-if="bottomPanelItem === BottomPanelItem.Simulation"
    class="fixed bottom-6 left-14 right-0 h-2/5 overflow-auto z-10 bg-base-100 border border-t-2"
  >
    <SimulationBottombar />
  </div>
</template>

<style scoped>

</style>