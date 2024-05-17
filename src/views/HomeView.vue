<template>
  <div class="flex flex-col h-screen w-full">
    <header class="sticky top-0 z-30 flex h-[45px] w-full items-center gap-1 border-b bg-background px-4">
      <ToolBar />
    </header>
    <aside class="pt-[45px] pb-[25px] fixed left-0 z-20 flex h-full flex-col border-r">
      <ActivityBar :panel="panelRef" />
    </aside>
    <ResizablePanelGroup auto-save-id="app-layout-id" class="pl-[55px]" direction="horizontal">
      <ResizablePanel ref="panelRef" :default-size="25" :min-size="10" collapsible style="overflow-y: auto">
        <div class="bg-background overflow-y-auto">
          <Sidebar />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel :default-size="layoutStore.sidebarItem ? 75 : 100" :min-size="50" @drop="onDrop">
        <MainCircuit />
      </ResizablePanel>
    </ResizablePanelGroup>
    <footer
      class="sticky bg-secondary text-secondary-foreground bottom-0 left-0 z-30 flex h-[25px] w-full items-center justify-between gap-1 px-4">
      <StatusBar />
    </footer>
  </div>


</template>

<script lang="ts" setup>
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import ToolBar from '@/components/ToolBar.vue'
import ActivityBar from '@/components/ActivityBar.vue'
import StatusBar from '@/components/StatusBar.vue'
import MainCircuit from '@/components/MainCircuit.vue'
import Sidebar from '@/components/core/Sidebar/Sidebar.vue'
import { useLayoutStore } from '@/stores/layoutStore'
import useDragAndDrop from '@/hooks/useDnDCircuitComponent'
import { ref } from 'vue'


const { onDrop } = useDragAndDrop()

const layoutStore = useLayoutStore()
const panelRef = ref<InstanceType<typeof ResizablePanel> | null>(null)

</script>