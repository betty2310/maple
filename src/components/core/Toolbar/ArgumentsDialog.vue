<script setup lang="ts">
import { ref } from 'vue'
import { Wrench } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useSimulationArgumentsStore from '@/stores/simulationArgumentsStore'

const simulatorStore = useSimulationArgumentsStore()

const acSweep = ref({ ...simulatorStore.getAcSweep })
const dcSweep = ref({ ...simulatorStore.getDcSweep })
const transient = ref({ ...simulatorStore.getTransient })

const isSave = ref(false)

const saveChanges = () => {
  isSave.value = true
  simulatorStore.setAcSweep(acSweep.value)
  simulatorStore.setDcSweep(dcSweep.value)
  simulatorStore.setTransient(transient.value)
  isSave.value = false
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="link"><Wrench class="w-4 h-4 mr-2" />edit</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Configure Sweeps</DialogTitle>
        <DialogDescription>
          Set the parameters for AC Sweep, DC Sweep, and Transient analysis.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <h3 class="font-semibold">AC Sweep</h3>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 w-1/3">
              <Label for="ac-initial" class="whitespace-nowrap">Initial:</Label>
              <Input id="ac-initial" v-model="acSweep.initial" type="number" class="w-full" />
            </div>
            <div class="flex items-center gap-2 w-1/3">
              <Label for="ac-final" class="whitespace-nowrap">Final:</Label>
              <Input id="ac-final" v-model="acSweep.final" type="number" class="w-full" />
            </div>
            <div class="flex items-center gap-2 w-1/3">
              <Label for="ac-points" class="whitespace-nowrap">Points/Decade:</Label>
              <Input
                id="ac-points"
                v-model="acSweep.pointsPerDecade"
                type="number"
                class="w-full"
              />
            </div>
          </div>
        </div>
        <div class="grid gap-2">
          <h3 class="font-semibold">DC Sweep</h3>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 w-1/3">
              <Label for="dc-initial" class="whitespace-nowrap">Initial:</Label>
              <Input id="dc-initial" v-model="dcSweep.initial" type="number" class="w-full" />
            </div>
            <div class="flex items-center gap-2 w-1/3">
              <Label for="dc-final" class="whitespace-nowrap">Final:</Label>
              <Input id="dc-final" v-model="dcSweep.final" type="number" class="w-full" />
            </div>
            <div class="flex items-center gap-2 w-1/3">
              <Label for="dc-delta" class="whitespace-nowrap">Delta:</Label>
              <Input id="dc-delta" v-model="dcSweep.delta" type="number" class="w-full" />
            </div>
          </div>
        </div>
        <div class="grid gap-2">
          <h3 class="font-semibold">Transient</h3>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 w-1/2">
              <Label for="trans-step" class="whitespace-nowrap">Step:</Label>
              <Input id="trans-step" v-model="transient.step" type="number" class="w-full" />
            </div>
            <div class="flex items-center gap-2 w-1/2">
              <Label for="trans-final" class="whitespace-nowrap">Final:</Label>
              <Input id="trans-final" v-model="transient.final" type="number" class="w-full" />
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" :variant="isSave ? 'ghost' : 'default'" @click="saveChanges"
          >Save</Button
        >
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
input[type='number'] {
  -moz-appearance: textfield;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
