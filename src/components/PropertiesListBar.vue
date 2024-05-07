<template>
  <div>
    <div v-if="props.selectedComponent == null">
      <p>Select a component to view its properties</p>
    </div>
    <div v-else>
      <div class="overflow-x-auto">
        <table class="table">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{{ props.selectedComponent.data.id }}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{{ props.selectedComponent.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="divider"></div>
      <div class="grid grid-cols-2">
        <div>Description</div>
        <div>{{ props.selectedComponent.data.description }}</div>
      </div>
      <div class="divider"></div>
      <div v-if="props.selectedComponent.type == CircuitComponent.Resistor">
        <ResistorProperty
          :id="props.selectedComponent.id"
          :resistance="props.selectedComponent.data.resistance"
        />
      </div>
      <div v-else-if="props.selectedComponent.type == CircuitComponent.DCVoltageSource">
        <VoltageSourceProperty
          :id="props.selectedComponent.id"
          :dc="props.selectedComponent.data.Dc"
        />
      </div>
      <div v-else-if="props.selectedComponent.type == CircuitComponent.ACVoltageSource">
        <ACVoltageSoureProperty v-bind="props.selectedComponent.data as ACVoltageSourceData" />
      </div>
      <div v-else-if="props.selectedComponent.type == CircuitComponent.Capacitor">
        <CapacitorProperty v-bind="props.selectedComponent.data as CapacitorData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Node } from '@vue-flow/core'
import { CircuitComponent, type ACVoltageSourceData, type CapacitorData } from '@/types'
import ResistorProperty from './properties/ResistorProperty.vue'
import CapacitorProperty from './properties/CapacitorProperty.vue'
import VoltageSourceProperty from './properties/VoltageSourceProperty.vue'
import ACVoltageSoureProperty from './properties/ACVoltageSourceProperty.vue'

interface Props {
  selectedComponent: Node | null
}
const props = defineProps<Props>()
</script>
