<script setup lang="ts">
import { ref, watch } from 'vue'

import { Cpu, Hammer, ZoomIn } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { BottomPanelItem, SidebarItem } from '@/enums'

import { useLayoutStore } from '@/stores/layoutStore'
import SettingDrawer from '@/components/ui/SettingDrawer.vue'
import { ResizablePanel } from '@/components/ui/resizable'


const props = defineProps<{
  panel: InstanceType<typeof ResizablePanel> | null
}>()


const layoutStore = useLayoutStore()
const sidebarItem = ref<SidebarItem | null>(null)
const bottomPanelItem = ref<BottomPanelItem | null>(null)

watch(() => layoutStore.sidebarItem, (value) => {
  sidebarItem.value = value
})

watch(() => layoutStore.bottomPanelItem, (value) => {
  bottomPanelItem.value = value
})

const handleSidebarItemClick = (item: SidebarItem) => {
  if (layoutStore.sidebarItem === item) {
    props.panel?.isCollapsed ? props.panel?.expand() : props.panel?.collapse()
    layoutStore.sidebarItem = null
  } else {
    layoutStore.setSidebarItem(item)
    if (props.panel?.isCollapsed) {
      props.panel?.expand()
    }
  }
}

const handleBottomPanelItemClick = (item: BottomPanelItem) => {
  if (layoutStore.bottomPanelItem === item) {
    layoutStore.hideBottomPanel()
  } else {
    layoutStore.setBottomPanelItem(item)
  }
}

</script>

<template>
  <nav class="grid gap-1 p-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            :variant="layoutStore.sidebarItem === SidebarItem.Components ? 'default' : 'ghost'"
            aria-label="Playground"
            class="rounded-lg"
            size="icon"
            @click="handleSidebarItemClick(SidebarItem.Components)"
          >
            <Cpu class="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent :side-offset="5" side="right">
          Components
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            :variant="layoutStore.sidebarItem === SidebarItem.Properties ? 'default' : 'ghost'"
            aria-label="Models"
            class="rounded-lg"
            size="icon"
            @click="handleSidebarItemClick(SidebarItem.Properties)"
          >
            <ZoomIn class="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent :side-offset="5" side="right">
          Properties
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  </nav>
  <nav class="mt-auto grid gap-1 p-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            :variant="bottomPanelItem === BottomPanelItem.Simulation ? 'default' : 'ghost'"
            aria-label="Simulation"
            class="rounded-lg"
            size="icon"
            @click="handleBottomPanelItemClick(BottomPanelItem.Simulation)"
          >
            <Hammer class="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent :side-offset="5" side="right">
          Simulation
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger as-child>
          <SettingDrawer />
        </TooltipTrigger>
        <TooltipContent :side-offset="5" side="right">
          Setting
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </nav>
</template>
