<template>
  <Tabs default-value="graph">
    <TabsList class="grid w-[200px] grid-cols-2">
      <TabsTrigger value="result"> result </TabsTrigger>
      <TabsTrigger value="graph"> graph </TabsTrigger>
    </TabsList>
    <TabsContent value="result" class="border border-red-500"> <TableOutput /> </TabsContent>
    <TabsContent value="graph"> <LineChartComponent /> </TabsContent>
  </Tabs>
  <!-- <div class="bg-background text-foreground">
    <div class="flex items-center justify-between px-4 py-2">
      <div class="flex space-x-4">
        <button
          v-for="(option, index) in options"
          :key="index"
          :class="{ 'btn-primary': activeOption === option }"
          class="btn btn-xs"
          @click="activeOption = option"
        >
          <LineChart v-if="option === 'Graph'" class="h-4 w-4 text-centre-content" />
          <Table v-if="option === 'Table'" class="h-4 w-4 text-centre-content" />
          {{ option }}
        </button>
      </div>
      <button class="btn btn-xs">
        <X class="h-4 w-4 text-centre-content" />
      </button>
    </div>
    <div class="flex-1 overflow-auto px-4 py-2">
      <LineChartComponent v-if="activeOption === 'Graph'" />
      <TableOutput v-if="activeOption === 'Table'" />
    </div>
  </div> -->
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { LineChart, Table, X } from 'lucide-vue-next'
import useOutputStore from '@/stores/simulationResponseStore'
import LineChartComponent from '@/components/charts/LineChartComponent.vue'
import TableOutput from '@/components/TableOutput.vue'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const options = ['Table', 'Graph']
const activeOption = ref('Table')

const outputStore = useOutputStore()

const outputData = ref<number[]>(outputStore.getValue())
const inputData = ref<number[]>(outputStore.getInput())

watch(
  () => outputStore.getValue(),
  (value) => {
    outputData.value = value
  }
)

watch(
  () => outputStore.getInput(),
  (value) => {
    inputData.value = value
  }
)
</script>
