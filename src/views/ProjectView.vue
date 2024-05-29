<template>
  <div v-if="project" class="flex flex-col h-screen w-full">
    <header
      class="sticky top-0 z-30 flex h-[45px] w-full items-center gap-1 border-b bg-background px-4"
    >
      <ToolBar
        :content="project?.content"
        :id="project?.id"
        :name="project?.name"
        :showShareDialog="showShareDialog"
        :can-edit="canEdit"
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
            <MainCircuit :obj="project.content" :can-edit="canEdit" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        ref="bottomPanelRef"
        :default-size="20"
        :max-size="60"
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
  <div v-else-if="message" class="flex items-center justify-center h-screen w-full">
    <div class="text-2xl">{{ message }}</div>
  </div>
  <div v-else class="flex items-center justify-center h-screen w-full">
    <div class="text-2xl">Loading...</div>
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
import { ref, watch, onMounted, onUnmounted } from 'vue'

import { useLayoutStore } from '@/stores/layoutStore'
import SimulationBottombar from '@/components/SimulationBottombar.vue'
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
    }
  }
)

import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import type { Json } from '@/database/types'
import { useSessionStore } from '@/stores/sessionStore'
import type { RealtimeChannel } from '@supabase/supabase-js'
const sessionStore = useSessionStore()

const route = useRoute()

const showShareDialog = ref(false)
const canEdit = ref(false)

const project = ref<{
  content: Json
  created_at: string
  id: number
  name: string | null
  updated_at: string | null
  user_id: string | null
  uuid: string | null
} | null>()

const message = ref<string | null>(null)

onMounted(async () => {
  message.value = null
  const { data: projectData, error } = await supabase
    .from('projects')
    .select('*')
    .eq('uuid', route.params.id)
  if (!projectData || projectData.length === 0) {
    message.value = 'Something went wrong. Please try again later.'
    return
  }

  if (sessionStore.user?.id === projectData[0].user_id) {
    showShareDialog.value = true
    canEdit.value = true
    project.value = projectData[0]
    return
  }

  const { data: projectShare } = await supabase
    .from('project_shares')
    .select('*')
    .eq('project_id', projectData[0].id)
    .single()

  if (!projectShare) {
    message.value = 'You do not have access to this project.'
    return
  }

  if (projectShare.type === 'PUBLIC') {
    project.value = projectData[0]
    return
  } else {
    if (sessionStore.user === null) {
      message.value = 'You need to login to access this project.'
      return
    } else {
      const userId = sessionStore.user.id
      const { data: projectShareUsers } = await supabase
        .from('project_share_users')
        .select('*')
        .eq('project_share_id', projectShare.id)
        .eq('user_id', userId)
        .single()
      if (!projectShareUsers) {
        message.value = 'You do not have access to this project.'
        return
      }
      if (projectShare.permisison === 'EDIT') {
        canEdit.value = true
      }
      project.value = projectData[0]
    }
  }
})

let channel: RealtimeChannel | null = null
// Create a function to handle inserts
// @ts-ignore
const handleUpdate = (payload) => {
  console.log('Change received!', payload)
  project.value = payload.new
}

onMounted(() => {
  channel = supabase.channel(`realtime:project:${route.params.id}`)
  // Listen to inserts
  channel
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'projects',
        filter: `uuid=eq.${route.params.id}`
      },
      handleUpdate
    )
    .subscribe()

  channel
    .on('presence', { event: 'sync' }, () => {
      const newState = channel?.presenceState()
      console.log('sync', newState)
    })
    .on('presence', { event: 'join' }, ({ key, newPresences }) => {
      console.log('join', key, newPresences)
    })
    .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      console.log('leave', key, leftPresences)
    })
})

onUnmounted(() => {
  if (channel) {
    supabase.removeChannel(channel)
  }
})
</script>