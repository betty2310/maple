<script setup lang="ts">
import { Squares2X2Icon, MagnifyingGlassCircleIcon, PlayIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
import { ref, watch } from 'vue';
import { useLayoutStore } from '@/stores/layoutStore';
import useCircuitStore from '@/stores/circuitStore'
import CircuitsListBar from './CircuitsListBar.vue';
import PropertiesListBar from './PropertiesListBar.vue';
import type { Node } from '@vue-flow/core';
import SimulationBottombar from './SimulationBottombar.vue';

enum ActivityBarItems {
    Components = "Components",
    Properties = "Properties",
    Simulation = "Simulation",
}

enum ActivityBottomBarItems {
    Simulation = "Simulation",
}

const layoutStore = useLayoutStore();
const panelItem = ref(ActivityBarItems.Components);
const panelBottomItem = ref(ActivityBottomBarItems.Simulation);

const handleLeftClicked = (item: ActivityBarItems) => {
    if (panelItem.value === item) {
        layoutStore.toggleLeftPanel();
    } else {
        panelItem.value = item;
        layoutStore.isShowLeftPanel = true;
    }
};

const handleBottomClicked = (item: ActivityBottomBarItems) => {
    if (panelBottomItem.value === item) {
        layoutStore.toggleBottomPanel();
    } else {
        panelBottomItem.value = item;
        layoutStore.isShowBottomPanel = true;
    }
};

const isCurrentPanel = (item: ActivityBarItems) => {
    return panelItem.value === item && layoutStore.isShowLeftPanel;
};
const isCurrentBottomPanel = (item: ActivityBottomBarItems) => {
    return panelBottomItem.value === item && layoutStore.isShowBottomPanel;
};
const selectedComponent = ref<Node | null>(null);
watch(() => useCircuitStore().selectedNode, (value) => {
    selectedComponent.value = value;
    // console.log(selectedComponent.value);
});
</script>

<template>
    <div class="bg-base-300 text-base-content py-4 px-1 fixed left-0 top-9 bottom-6 flex flex-col justify-between w-14">
        <div class="items-center space-y-2">
            <button class="btn focus:outline-none p-2" @click="handleLeftClicked(ActivityBarItems.Components)"
                :class="isCurrentPanel(ActivityBarItems.Components) ? 'btn-primary' : 'btn-ghost'">
                <Squares2X2Icon class="h-6 w-8 text-centre-content" />
            </button>
            <button class="btn focus:outline-none p-2" @click="handleLeftClicked(ActivityBarItems.Properties)"
                :class="isCurrentPanel(ActivityBarItems.Properties) ? 'btn-primary' : 'btn-ghost'">
                <MagnifyingGlassCircleIcon class="h-6 w-8 text-centre-content" />
            </button>
        </div>

        <div class="items-center space-y-2">
            <button class="btn focus:outline-none p-2" @click="handleBottomClicked(ActivityBottomBarItems.Simulation)"
                :class="isCurrentBottomPanel(ActivityBottomBarItems.Simulation) ? 'btn-primary' : 'btn-ghost'">
                <PlayIcon class="h-6 w-8 text-centre-content" />
            </button>
            <!-- Open the modal using ID.showModal() method -->
            <button class="btn focus:outline-none p-2 btn-ghost" onclick="my_modal_1.showModal()">
                <Cog6ToothIcon class="h-6 w-8 text-centre-content" />
            </button>
            <dialog id="my_modal_1" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Setting</h3>
                    <p class="py-4">Toggle dark/light theme</p>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
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
    <div v-if="layoutStore.isShowBottomPanel"
        class="fixed bottom-6 left-14 w-full h-2/5 overflow-auto z-10 bg-base-100 border border-t-2">
        <SimulationBottombar />
    </div>
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