<template>
  <div class="flex flex-col space-y-4 content-center mx-8">
    <button
      :draggable="true"
      class="btn"
      @click="onAutoCreate(CircuitComponent.Ground)"
      @dragstart="onDragStart($event, CircuitComponent.Ground)"
    >
      Ground
    </button>
    <button
      :draggable="true"
      class="btn"
      @click="onAutoCreate(CircuitComponent.Resistor)"
      @dragstart="onDragStart($event, CircuitComponent.Resistor)"
    >
      Resistor
    </button>
    <button
      :draggable="true"
      class="btn"
      @click="onAutoCreate(CircuitComponent.Capacitor)"
      @dragstart="onDragStart($event, CircuitComponent.Capacitor)"
    >
      Capacitor
    </button>
    <button
      :draggable="true"
      class="btn"
      @click="onAutoCreate(CircuitComponent.Inductor)"
      @dragstart="onDragStart($event, CircuitComponent.Inductor)"
    >
      Inductor
    </button>
    <button
      :draggable="true"
      class="btn"
      @click="onAutoCreate(CircuitComponent.Diode)"
      @dragstart="onDragStart($event, CircuitComponent.Diode)"
    >
      Diode
    </button>
    <button
      :draggable="true"
      class="btn"
      @click="onAutoCreate(CircuitComponent.Transistor)"
      @dragstart="onDragStart($event, CircuitComponent.Transistor)"
    >
      NPN Transistor
    </button>
    <button
      :draggable="true"
      class="btn"
      @click="onAutoCreate(CircuitComponent.DCVoltageSource)"
      @dragstart="onDragStart($event, CircuitComponent.DCVoltageSource)"
    >
      DC Voltage
    </button>
    <button
      :draggable="true"
      class="btn"
      @click="onAutoCreate(CircuitComponent.ACVoltageSource)"
      @dragstart="onDragStart($event, CircuitComponent.ACVoltageSource)"
    >
      AC Voltage
    </button>
    <button
      :draggable="true"
      class="btn"
      @click="onAutoCreate(CircuitComponent.Switch)"
      @dragstart="onDragStart($event, CircuitComponent.Switch)"
    >
      Switch
    </button>
  </div>
</template>

<script setup lang="ts">
import useDragAndDrop from '@/hooks/useDnDCircuitComponent'
import useCreate from '@/hooks/useCreatCircuitComponent'
import { CircuitComponent } from '@/types'

const { onDragStart } = useDragAndDrop()
const { onAutoCreate } = useCreate()
</script>
