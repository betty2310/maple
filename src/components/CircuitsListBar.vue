<template>
  <aside>
    <div>
      <div class="flex flex-col space-y-4 content-center mx-8">
        <button class="btn" :draggable="true" @click="onAutoCreate('default')"
          @dragstart="onDragStart($event, 'default')">Default Node
        </button>
        <button class="btn" :draggable="true" @click="onAutoCreate('output')"
          @dragstart="onDragStart($event, 'output')">Ground
        </button>
        <button class="btn" :draggable="true" @click="onAutoCreate('resistor')"
          @dragstart="onDragStart($event, 'resistor')">Resistor
        </button>
        <button class="btn" :draggable="true" @click="onAutoCreate('voltagesource')"
          @dragstart="onDragStart($event, 'voltagesource')">DC Voltage
        </button>
        <button class="btn" :draggable="true" @click="onAutoCreate('acvoltagesource')"
          @dragstart="onDragStart($event, 'acvoltagesource')">AC Voltage
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import useDragAndDrop from '@/hooks/useDnDCircuitComponent';
import useCreate from '@/hooks/useCreatCircuitComponent'

const { onDragStart } = useDragAndDrop();
const { onAutoCreate } = useCreate();
</script>