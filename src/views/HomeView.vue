<template>
  <div class="flex flex-col h-screen">
    <div>
      <ToolBar />
    </div>
    <div class="flex flex-1">
      <ActivityBar />
      <div :class="layoutStore.isShowLeftPanel ? 'ml-[28rem]' : 'ml-14'" class="flex-auto mr-0 mb-6 mt-9"
           @drop="onDrop">
        <MainCircuit />
      </div>
    </div>
    <div>
      <StatusBar />
    </div>
  </div>
</template>

<script setup>
import ToolBar from '@/components/ToolBar.vue'
import ActivityBar from '@/components/ActivityBar.vue'
import StatusBar from '@/components/StatusBar.vue'
import MainCircuit from '@/components/MainCircuit.vue'
import { useLayoutStore } from '@/stores/layoutStore'
import useDragAndDrop from '@/hooks/useDnDCircuitComponent'


const { onDrop } = useDragAndDrop()

const layoutStore = useLayoutStore()
</script>