<template>
    <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Setting</h3>
            <div class="grid grid-cols-2 items-center">

                <p class="py-4">Toggle dark/light theme</p>
                <label class="flex cursor-pointer gap-2">
                  <Sun class="h-6 w-6" />
                    <input type="checkbox" value="dark" class="toggle theme-controller" />
                  <Moon class="h-6 w-6" />
                </label>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
import { Moon, Sun } from 'lucide-vue-next'
</script>