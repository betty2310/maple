<template>
  <div class="flex items-center mx-4">
    <label class="mr-2" for="input-field">Switch</label>
    <input v-model="isOn" class="toggle toggle-primary" type="checkbox" @change="handleUpdate" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import useCircuitStore from '@/stores/circuitStore'
import type { SwitchData } from '@/types'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'

const props = defineProps<SwitchData>()

const isOn = ref(props.isOn)
watch(
  () => props.isOn,
  (value) => {
    isOn.value = value
  }
)

const circuitStore = useCircuitStore()

function handleUpdate() {
  console.log(isOn.value)
  const node = circuitStore.getSelectedNode()
  if (!node) return
  node.data.isOn = isOn.value
}
</script>
