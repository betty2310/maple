<template>
  <div class="flex flex-col h-screen w-full">
    <header
      class="sticky top-0 z-30 flex h-[45px] w-full items-center gap-1 border-b bg-background px-4"
    >
      <ToolBar
        :content="{}"
        :id="undefined"
        :name="'Playground'"
        :showShareDialog="false"
        :can-edit="true"
      />
    </header>
    <aside class="pt-[45px] pb-[25px] fixed left-0 z-20 flex h-full flex-col border-r">
      <ActivityBar :panel="panelRef" :bottomPanelRef="bottomPanelRef" />
    </aside>
    <ResizablePanelGroup auto-save-id="app-layout-id-1" class="pl-[56px]" direction="vertical">
      <ResizablePanel :default-size="80">
        <ResizablePanelGroup auto-save-id="app-layout-id" direction="horizontal">
          <ResizablePanel
            ref="panelRef"
            :default-size="25"
            :min-size="10"
            :collapsedSize="0"
            collapsible
            style="overflow-y: auto"
          >
            <div class="bg-background overflow-y-auto">
              <Sidebar />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel :min-size="50" @drop="onDrop">
            <MainCircuit :obj="{}" :can-edit="true" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        ref="bottomPanelRef"
        :default-size="20"
        :max-size="70"
        :min-size="20"
        :collapsedSize="0"
        collapsible
      >
        <div class="h-full p-2 overflow-auto">
          <SimulationBottombar />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    <footer
      class="sticky bg-secondary text-secondary-foreground bottom-0 left-0 z-30 flex h-[25px] w-full items-center justify-between gap-1 px-4"
    >
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
import useDragAndDrop from '@/hooks/useDnDCircuitComponent'
import { ref, watch } from 'vue'

import { useLayoutStore } from '@/stores/layoutStore'
import SimulationBottombar from '@/components/SimulationBottombar.vue'
import { BottomPanelItem } from '@/enums'
const layoutStore = useLayoutStore()

const { onDrop } = useDragAndDrop()

const panelRef = ref<InstanceType<typeof ResizablePanel> | null>(null)
const bottomPanelRef = ref<InstanceType<typeof ResizablePanel> | null>(null)

watch(
  () => panelRef.value?.isCollapsed,
  (value) => {
    if (value) {
      layoutStore.sidebarItem = null
    }
  }
)

watch(
  () => bottomPanelRef.value?.isCollapsed,
  (value) => {
    if (value) {
      layoutStore.bottomPanelItem = null
    } else {
      layoutStore.bottomPanelItem = BottomPanelItem.Simulation
    }
  }
)
</script>
