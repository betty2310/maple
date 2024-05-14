<template>
  <h1 class="text-xl font-semibold">
    Circuitcraft
  </h1>
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
    variant="default"
    @click="onRun"
  >
    <Play class="size-3.5" />
  </Button>

  <RouterLink v-if="loggedInUser === null" to="/signin">
    <Button size="xs">Sign in</Button>
  </RouterLink>
  <UserAvatarDropdown v-else :signout="sessionStore.signOut" :user="loggedInUser" />
</template>

<script lang="ts" setup>
import { ChevronDown, Play } from 'lucide-vue-next'
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

import { computed, ref, watch } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { useFetch } from '@vueuse/core'

import { handleAPI } from '@/logic/main'

import useRunStore from '@/stores/runStore'
import useOutputStore from '@/stores/outputStore'
import { useSessionStore } from '@/stores/sessionStore'

import { SimulationMode } from '@/types'

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
  const { isFetching, error, data } = await useFetch<string>(
    `${serverUrl}/api/Simulator`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(netlist.value)
    }
  )

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
</script>
