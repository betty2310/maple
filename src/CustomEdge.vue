<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { EdgeProps } from '@vue-flow/core'
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, useVueFlow } from '@vue-flow/core'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const props = defineProps<EdgeProps>()

const path = computed(() => getSmoothStepPath(props))

const { findEdge, removeEdges } = useVueFlow()

type SelectedOption = 'Voltmeter' | 'Ammeter' | ''

const selectedOption = ref<SelectedOption>(props.data.export || '')

const selectOption = (option: SelectedOption) => {
  selectedOption.value = option
  let edge = findEdge(props.id)
  if (edge) {
    edge.data.export = option
  }
}

const turnBack = () => {
  selectedOption.value = ''
  let edge = findEdge(props.id)
  if (edge) {
    edge.data = {}
  }
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <BaseEdge :id="props.id" :path="path[0]" :style="{ stroke: '#D37987' }" />

  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`
      }"
      class="nodrag nopan"
    >
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="xs" variant="outline">
            {{ selectedOption === '' ? '+' : selectedOption }}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel>Select annotation</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup v-model="selectedOption">
            <DropdownMenuRadioItem @select="selectOption('Voltmeter')" value="Voltmeter">
              Voltmeter
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem @select="selectOption('Ammeter')" value="Ammeter">
              Ammeter
            </DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem @select="turnBack" value="">
              Remove annotation
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <Button size="xs" variant="destructive" @click="removeEdges(id)">Remove edge</Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </EdgeLabelRenderer>
</template>
