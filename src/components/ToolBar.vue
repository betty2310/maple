<template>
  <p class="leading-7 [&:not(:first-child)]:mt-6">{{ props.name ?? 'CircuitCraft' }}</p>
  <Button
    v-if="props.canEdit"
    :disabled="!circuitStore.isCircuitChanged || isOnSyncing"
    class="gap-1.5 text-sm"
    size="xs"
    variant="ghost"
    @click="onSync"
  >
    <RefreshCcw :class="!isOnSyncing ? 'size-3.5' : 'size-3.5 animate-spin'" />
  </Button>
  <DropdownMenu class="ml-auto">
    <DropdownMenuTrigger as-child>
      <Button class="ml-auto gap-1.5 text-sm" size="xs" variant="ghost">
        {{ selected }}
        <ChevronDown class="size-3.5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Simulation mode</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="selected">
        <DropdownMenuRadioItem :value="SimulationMode.Transient"> Transient </DropdownMenuRadioItem>
        <DropdownMenuRadioItem :value="SimulationMode.DCSweep"> DC sweep </DropdownMenuRadioItem>
        <DropdownMenuRadioItem :value="SimulationMode.ACSweep"> AC sweep </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>

  <Button class="gap-1.5 text-sm" size="xs" variant="default" @click="onRun">
    <Play class="size-3.5" />
  </Button>

  <ShareDialog v-if="showShareDialog" :project_id="props.id ?? 100" />

  <RouterLink v-if="loggedInUser === null" to="/signin">
    <Button size="xs">Sign in</Button>
  </RouterLink>
  <UserAvatarDropdown v-else :signout="sessionStore.signOut" :user="loggedInUser" />
</template>

<script lang="ts" setup>
import { ChevronDown, Play, RefreshCcw } from 'lucide-vue-next'
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

import { computed, ref, watch } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { useFetch } from '@vueuse/core'

import { handleAPI } from '@/logic/main'

import useRunStore from '@/stores/runStore'
import useOutputStore from '@/stores/outputStore'
import { useSessionStore } from '@/stores/sessionStore'
import useCircuitStore from '@/stores/circuitStore'

import { SimulationMode } from '@/types'
import type { Json } from '@/database/types'
import { supabase } from '@/lib/supabaseClient'

const props = defineProps<{
  content: Json | undefined
  id: number | undefined
  name: string | null | undefined
  showShareDialog: boolean
  canEdit: boolean
}>()

const netlist = ref({})
const selected = ref<SimulationMode>(SimulationMode.Transient)
const loggedInUser = computed(() => sessionStore.user)

const { toObject } = useVueFlow()
const sessionStore = useSessionStore()
const runStore = useRunStore()

watch(selected, () => {
  runStore.setMode(selected.value)
})

const onRun = async () => {
  netlist.value = handleAPI(toObject())
  const serverUrl = import.meta.env.VITE_SERVER_URL
  const { isFetching, error, data } = await useFetch<string>(`${serverUrl}/api/Simulator`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(netlist.value)
  })

  if (error.value) {
    console.error(error.value)
  }
  const outputStore = useOutputStore()
  if (data.value) {
    outputStore.setValue(JSON.parse(data.value).output)
    outputStore.setInput(JSON.parse(data.value).input)
    outputStore.setMode(selected.value)
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
  console.log(error)
  isOnSyncing.value = false
  circuitStore.isCircuitChanged = false
}
const circuitStore = useCircuitStore()
</script>
