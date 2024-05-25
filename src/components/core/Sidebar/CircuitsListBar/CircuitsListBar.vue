<template>
  <div class="flex flex-col space-y-2 content-center mx-4">
    <CollapsibleItems name="Schematic connectors">
      <CircuitItem :circuit-component="CircuitComponent.Ground" name="Ground">
        <GroundIcon :style="{fill: color}" class="transform scale-50" />
      </CircuitItem>
    </CollapsibleItems>

    <CollapsibleItems name="Sources">
      <CircuitItem :circuit-component="CircuitComponent.DCVoltageSource" name="DC Voltage">
        <VoltageSourceIcon :style="{fill: color}" class="transform scale-50" />
      </CircuitItem>
      <CircuitItem :circuit-component="CircuitComponent.ACVoltageSource" name="AC Voltage">
        <VoltageSourceIcon :style="{fill: color}" class="transform scale-50" />
      </CircuitItem>
    </CollapsibleItems>

    <CollapsibleItems name="Passive">
      <CircuitItem :circuit-component="CircuitComponent.Resistor" name="Resistor">
        <ResistorIcon :style="{fill: color}" class="transform scale-50" />
      </CircuitItem>

      <CircuitItem :circuit-component="CircuitComponent.Capacitor" name="Capacitor">
        <CapacitorIcon :style="{fill: color}" class="transform scale-50" />
      </CircuitItem>

      <CircuitItem :circuit-component="CircuitComponent.Inductor" name="Inductor">
        <InductorIcon :style="{fill: color}" class="transform scale-50" />
      </CircuitItem>
    </CollapsibleItems>
    <CollapsibleItems name="Diodes">

      <CircuitItem :circuit-component="CircuitComponent.Diode" name="Diode">
        <DiodeIcon :style="{fill: color}" class="transform scale-50" />
      </CircuitItem>
    </CollapsibleItems>

    <CollapsibleItems name="Transistors">
      <CircuitItem :circuit-component="CircuitComponent.Transistor" name="Transistor npn">
        <TransistorIcon :style="{fill: color}" class="transform scale-50" />
      </CircuitItem>
    </CollapsibleItems>

    <CollapsibleItems name="Switches">
      <CircuitItem :circuit-component="CircuitComponent.Switch" name="Switch">
        <SwitchIcon :style="{fill: color}" class="transform scale-50" />
      </CircuitItem>
    </CollapsibleItems>
  </div>
</template>

<script lang="ts" setup>
import { CircuitComponent } from '@/types'
import CollapsibleItems from '@/components/core/Sidebar/CircuitsListBar/CollapsibleItems.vue'

import CircuitItem from '@/components/core/Sidebar/CircuitsListBar/CircuitItem.vue'
import GroundIcon from '@/assets/svgs/Ground.svg?component'
import ResistorIcon from '@/assets/svgs/resistor.svg?component'
import CapacitorIcon from '@/assets/svgs/Capacitor.svg?component'
import InductorIcon from '@/assets/svgs/Inductor.svg?component'
import DiodeIcon from '@/assets/svgs/Diode.svg?component'
import TransistorIcon from '@/assets/svgs/Transistor.svg?component'
import VoltageSourceIcon from '@/assets/svgs/VoltageSource.svg?component'
import SwitchIcon from '@/assets/svgs/switch_on.svg?component'

import { useColorMode } from '@vueuse/core'
import { ref, watch } from 'vue'

const mode = useColorMode()

const color = ref<'white' | 'black'>('white')

watch(mode, (newVal) => {
  color.value = newVal === 'dark' ? 'white' : 'black'
})
</script>
