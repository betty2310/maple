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
        <ACVoltageSourceProperty v-bind="props.selectedComponent.data as ACVoltageSourceData"/>
      </div>
      <div v-else-if="props.selectedComponent.type == CircuitComponent.Capacitor">
        <CapacitorProperty v-bind="props.selectedComponent.data as CapacitorData" />
      </div>
      <div v-else-if="props.selectedComponent.type == CircuitComponent.Inductor">
        <InductorProperty v-bind="props.selectedComponent.data as InductorData" />
      </div>
      <div v-else-if="props.selectedComponent.type == CircuitComponent.Diode">
        <DiodeProperty v-bind="props.selectedComponent.data as DiodeData" />
      </div>
      <div v-else-if="props.selectedComponent.type == CircuitComponent.Switch">
        <SwitchProperty v-bind="props.selectedComponent.data as SwitchData" />
      </div>
      <div v-else-if="props.selectedComponent.type == CircuitComponent.Transistor">
        <TransistorProperty v-bind="props.selectedComponent.data as TransistorData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Node } from '@vue-flow/core'
import {
  type ACVoltageSourceData,
  type CapacitorData,
  CircuitComponent,
  type DiodeData,
  type InductorData,
  type SwitchData,
  type TransistorData
} from '@/types'
import ResistorProperty from '@/components/core/Sidebar/PropertiesBar/properties/ResistorProperty.vue'
import CapacitorProperty from '@/components/core/Sidebar/PropertiesBar/properties/CapacitorProperty.vue'
import VoltageSourceProperty from '@/components/core/Sidebar/PropertiesBar/properties/VoltageSourceProperty.vue'
import ACVoltageSourceProperty from '@/components/core/Sidebar/PropertiesBar/properties/ACVoltageSourceProperty.vue'
import InductorProperty from '@/components/core/Sidebar/PropertiesBar/properties/InductorProperty.vue'
import DiodeProperty from '@/components/core/Sidebar/PropertiesBar/properties/DiodeProperty.vue'
import SwitchProperty from '@/components/core/Sidebar/PropertiesBar/properties/SwitchProperty.vue'
import TransistorProperty from '@/components/core/Sidebar/PropertiesBar/properties/TransistorProperty.vue'

interface Props {
  selectedComponent: Node | null
}
const props = defineProps<Props>()
</script>
