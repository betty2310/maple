<template>
  <Tabs default-value="graph">
    <TabsList class="grid w-[400px] grid-cols-3">
      <TabsTrigger value="result"> result </TabsTrigger>
      <TabsTrigger value="graph"> graph </TabsTrigger>
      <TabsTrigger value="problem"> problems </TabsTrigger>
    </TabsList>
    <TabsContent value="result">
      <TableOutput :response="response" :response-keys="key" />
    </TabsContent>
    <TabsContent value="problem">
      <Problem />
    </TabsContent>
    <TabsContent value="graph">
      <LineChartComponent :response="response" :response-keys="key" />
    </TabsContent>
  </Tabs>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useSimulationResponseStore } from '@/stores/simulationResponseStore'
import LineChartComponent from '@/components/core/Bottombar/charts/LineChartComponent.vue'
import TableOutput from '@/components/core/Bottombar/TableOutput.vue'
import Problem from '@/components/core/Bottombar/Problem.vue'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const simulationResponseStore = useSimulationResponseStore()

const response = ref(simulationResponseStore.output)
const key = ref(simulationResponseStore.getResponseKeys())

watch(
  () => simulationResponseStore.output,
  (value) => {
    response.value = value
  }
)

watch(
  () => simulationResponseStore.getResponseKeys(),
  (value) => {
    key.value = value
  }
)
</script>
