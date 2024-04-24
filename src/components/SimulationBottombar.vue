<template>
    <div role="tablist" class="tabs tabs-bordered">
        <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Table" />
        <div role="tabpanel" class="tab-content p-2">
            <div class="overflow-x-auto">
                <table class="table table-xs">
                    <thead>
                        <tr>
                            <th>{{ indexRow }}</th>
                            <th>V(out)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in outputData" :key="index">
                            <td>{{ inputData[index].toFixed(2) }}</td>
                            <td>{{ item.toFixed(2) }}</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>

        <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Graph" checked />
        <div role="tabpanel" class="tab-content p-10">
            <Line :data="data" :options="options" />
        </div>
    </div>

</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import useRunStore from '@/stores/runStore';
import useOutputStore from '@/stores/outputStore';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    type ChartData,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const data = ref<ChartData<'line'>>({
    datasets: [],
    labels: []
})

const options = ref({
    responsive: false,
    maintainAspectRatio: false
})

const outputStore = useOutputStore()
const runStore = useRunStore()

const indexRow = computed(() => {
    return runStore.getMode() === 1 ? "Time" : "DC"
})

const outputData = ref<number[]>([])
const inputData = ref<number[]>([])

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