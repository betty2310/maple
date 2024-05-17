<template>
  <div class="flex flex-col h-screen w-full">
    <header class="sticky top-0 z-30 flex h-[45px] w-full items-center gap-1 border-b bg-background px-4">
      <ToolBar />
    </header>
    <aside class="pt-[45px] pb-[25px] fixed left-0 z-20 flex h-full flex-col border-r">
      <ActivityBar />
    </aside>
    <main class="pl-[55px] flex flex-1 overflow-auto">
      <div v-if="layoutStore.sidebarItem" class="w-72 bg-background overflow-y-auto">
        <Sidebar />
      </div>
      <div class="flex-1 overflow-auto" @drop="onDrop">
        <div class="h-full min-h-[50vh] bg-muted/50 border-r-2">
          <MainCircuit />
        </div>
      </div>
    </main>
    <footer
      class="sticky bg-secondary text-secondary-foreground bottom-0 left-0 z-30 flex h-[25px] w-full items-center justify-between gap-1 px-4">
      <StatusBar />
    </footer>
  </div>

</template>

<script setup>
import ToolBar from '@/components/ToolBar.vue'
import ActivityBar from '@/components/ActivityBar.vue'
import StatusBar from '@/components/StatusBar.vue'
import MainCircuit from '@/components/MainCircuit.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useLayoutStore } from '@/stores/layoutStore'
import useDragAndDrop from '@/hooks/useDnDCircuitComponent'


const { onDrop } = useDragAndDrop()

const layoutStore = useLayoutStore()
</script>