<script setup lang="ts">
import { Squares2X2Icon } from '@heroicons/vue/24/outline';
import { MagnifyingGlassCircleIcon } from '@heroicons/vue/24/outline';
import { ref, watch } from 'vue';
import { useLayoutStore } from '@/stores/layoutStore';
import useCircuitStore from '@/stores/circuitStore'
import CircuitsListBar from './CircuitsListBar.vue';
import PropertiesListBar from './PropertiesListBar.vue';
import type { Node } from '@vue-flow/core';

enum ActivityBarItems {
    Components = "Components",
    Properties = "Properties",
}

const layoutStore = useLayoutStore();
const panelItem = ref(ActivityBarItems.Components);

const handleClicked = (item: ActivityBarItems) => {
    if (panelItem.value === item) {
        layoutStore.toggleLeftPanel();
    } else {
        panelItem.value = item;
        layoutStore.isShowLeftPanel = true;
    }
};

const isCurrentPanel = (item: ActivityBarItems) => {
    return panelItem.value === item && layoutStore.isShowLeftPanel;
};
const selectedComponent = ref<Node | null>(null);
watch(() => useCircuitStore().selectedNode, (value) => {
    selectedComponent.value = value;
    // console.log(selectedComponent.value);
});
</script>

<template>
    <div class="flex-none bg-base-300 text-base-content py-4 px-1 fixed left-0 top-9 bottom-6">
        <div class="w-12 flex flex-col items-center space-y-2">
            <button class="btn focus:outline-none p-2" @click="handleClicked(ActivityBarItems.Components)"
                :class="isCurrentPanel(ActivityBarItems.Components) ? 'btn-primary' : 'btn-ghost'">
                <Squares2X2Icon class="h-6 w-8 text-centre-content" />
            </button>
            <button class="btn focus:outline-none p-2" @click="handleClicked(ActivityBarItems.Properties)"
                :class="isCurrentPanel(ActivityBarItems.Properties) ? 'btn-primary' : 'btn-ghost'">
                <MagnifyingGlassCircleIcon class="h-6 w-8 text-centre-content" />
            </button>
        </div>
    </div>
    <!-- <Transition name="slide-in-left"> -->
    <div v-if="layoutStore.isShowLeftPanel" class="bg-primary-content fixed left-14 top-9 bottom-6 w-96 flex">
        <div class="flex flex-col items-start w-full">
            <div class="font-bold m-4">{{ panelItem == ActivityBarItems.Components ? "Components" :
                "Property"
                }}</div>
            <div class="flex-1 w-full">
                <div v-if="panelItem == ActivityBarItems.Components">
                    <CircuitsListBar />
                </div>
                <div v-else-if="panelItem == ActivityBarItems.Properties">
                    <PropertiesListBar :selectedComponent="selectedComponent" />
                </div>
            </div>
        </div>
    </div>
    <!-- </Transition> -->
</template>

<style>
.slide-in-left-enter-active,
.slide-in-left-leave-active {
    transition: all 0.3s ease;
}

.slide-in-left-enter-from,
.slide-in-left-leave-to {
    transform: translateX(-100%);
}
</style>