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
            <div v-if="props.selectedComponent.data.type == 'resistor'">
                <ResistorProperty :id="props.selectedComponent.id"
                    :resistance="props.selectedComponent.data.resistance" />
            </div>
            <div v-else-if="props.selectedComponent.data.type == 'voltageSource'">
                <VoltageSourceProperty :id="props.selectedComponent.id" :dc="props.selectedComponent.data.Dc" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type Node } from '@vue-flow/core';
import ResistorProperty from './properties/ResistorProperty.vue';
import VoltageSourceProperty from './properties/VoltageSourceProperty.vue';

interface Props {
    selectedComponent: Node | null;
}
const props = defineProps<Props>()
</script>