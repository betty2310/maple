<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Node } from '@vue-flow/core'

import CircuitsListBar from '@/components/core/Sidebar/CircuitsListBar/CircuitsListBar.vue'
import PropertiesBar from '@/components/core/Sidebar/PropertiesBar/PropertiesBar.vue'

import { useLayoutStore } from '@/stores/layoutStore'
import useCircuitStore from '@/stores/circuitStore'
import { BottomPanelItem, SidebarItem } from '@/enums'
import SimulationBottombar from '@/components/SimulationBottombar.vue'

const layoutStore = useLayoutStore()

const sidebarItem = ref<SidebarItem | null>(null)
const bottomPanelItem = ref<BottomPanelItem | null>(null)
const selectedComponent = ref<Node | null>(null)

watch(
  () => layoutStore.sidebarItem,
  (value) => {
    sidebarItem.value = value
  }
)

watch(
  () => layoutStore.bottomPanelItem,
  (value) => {
    bottomPanelItem.value = value
  }
)

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
      <PropertiesBar :selectedComponent="selectedComponent" />
    </div>
  </div>
</template>

<style scoped></style>
