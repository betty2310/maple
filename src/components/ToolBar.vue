<template>
  <div class="flex justify-between items-center w-full">
    <div class="flex items-center gap-3">
      <AppIcon />
      <Badge v-if="isOnPlayground" variant="secondary">playground</Badge>
    </div>
    <div class="flex gap-2" v-if="!isOnPlayground">
      <div class="flex items-center justify-center gap-2">
        <Cloud v-if="!circuitStore.isCircuitChanged" class="w-4 h-4" />
        <CloudUpload v-else class="w-4 h-4" />
        <p class="text-sm">{{ props.name ?? 'CircuitCraft' }}</p>
      </div>

      <Button
        v-if="props.canEdit"
        :disabled="!circuitStore.isCircuitChanged || isOnSyncing"
        class="gap-1.5 text-sm"
        size="xs"
        variant="outline"
        @click="onSync"
      >
        <RefreshCcw :class="!isOnSyncing ? 'size-3.5' : 'size-3.5 animate-spin'" />
        sync
      </Button>

      <ShareDialog v-if="showShareDialog && props.id !== undefined" :project_id="props.id" />
    </div>
    <div class="flex items-center gap-3">
      <DropdownMenu class="ml-auto">
        <DropdownMenuTrigger as-child>
          <Button class="ml-auto gap-1.5 text-sm" size="xs" variant="ghost">
            {{ selected }}
            <ChevronDown class="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel>
            <div class="flex justify-between items-center">
              <div>Simulation mode</div>
              <ArgumensDialog />
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup v-model="selected">
            <DropdownMenuRadioItem :value="SimulationMode.Transient">
              Transient
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem :value="SimulationMode.DCSweep">
              DC sweep
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem :value="SimulationMode.ACSweep">
              AC sweep
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        class="gap-1.5 text-sm"
        size="xs"
        :variant="isFetching ? 'destructive' : 'default'"
        :disabled="isFetching"
        @click="onRun"
      >
        <RotateCcw v-if="isFetching" class="size-3.5 animate-spin" />
        <Play v-else class="size-3.5" />
        <p>{{ isFetching ? 'Running...' : 'Simulate' }}</p>
      </Button>

      <RouterLink v-if="loggedInUser === null" to="/signin">
        <Button size="xs" variant="outline">Sign in</Button>
      </RouterLink>
      <UserAvatarDropdown v-else :signout="sessionStore.signOut" :user="loggedInUser" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ChevronDown, Play, RefreshCcw, RotateCcw, Cloud, CloudUpload } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import UserAvatarDropdown from '@/components/ui/UserAvatarDropdown.vue'
import ShareDialog from '@/components/core/Toolbar/ShareDialog.vue'
import { Badge } from '@/components/ui/badge'
import AppIcon from '@/components/core/Toolbar/AppIcon.vue'
import ArgumensDialog from '@/components/core/Toolbar/ArgumentsDialog.vue'

import { computed, ref, watch, onMounted } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { useFetch } from '@vueuse/core'

import { handleAPI } from '@/logic/main'

import useRunStore from '@/stores/runStore'
import { useSimulationResponseStore } from '@/stores/simulationResponseStore'
import { useSessionStore } from '@/stores/sessionStore'
import useCircuitStore from '@/stores/circuitStore'

import { SimulationMode, type SimulationResponseData } from '@/types'
import type { Json } from '@/database/types'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

const props = defineProps<{
  content: Json | undefined
  id: number | undefined
  name: string | null | undefined
  showShareDialog: boolean
  canEdit: boolean
}>()

const isOnPlayground = ref(false)
onMounted(() => {
  const router = useRouter()
  isOnPlayground.value = router.currentRoute.value.name === 'playground' ? true : false
})

const netlist = ref({})
const selected = ref<SimulationMode>(SimulationMode.Transient)
const loggedInUser = computed(() => sessionStore.user)

const { toObject } = useVueFlow()
const sessionStore = useSessionStore()
const runStore = useRunStore()

watch(selected, () => {
  runStore.setMode(selected.value)
})

const isFetching = ref<boolean>(false)
const onRun = async () => {
  const responseStore = useSimulationResponseStore()
  responseStore.clear()
  netlist.value = handleAPI(toObject())
  isFetching.value = true
  const serverUrl = import.meta.env.VITE_SERVER_URL
  const { error, data, statusCode } = await useFetch<string>(`${serverUrl}/api/Simulator`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(netlist.value)
  })

  isFetching.value = false
  if (error.value) {
    responseStore.statusCode = statusCode.value
    toast({
      title: 'Circuit errror detected!',
      description: 'Please refer to the Diagnostics Panel for detailed information.',
      variant: 'destructive'
    })
    return
  }
  if (data.value) {
    toast({
      title: 'Circuit simulate successfully!',
      description: 'View results in the Simulation Panel.',
      variant: 'default'
    })
    // @ts-ignore
    responseStore.exportNodes = netlist.value.exportNodes
    responseStore.setResponse(JSON.parse(data.value) as SimulationResponseData)
    responseStore.mode = selected.value
  }
}

const isOnSyncing = ref(false)
const onSync = async () => {
  isOnSyncing.value = true
  if (!props.id) return
  const { data, error } = await supabase
    .from('projects')
    .update({
      content: circuitStore.currentCircuit as Json
    })
    .eq('id', props.id)
  isOnSyncing.value = false
  circuitStore.isCircuitChanged = false
}
const circuitStore = useCircuitStore()
</script>
