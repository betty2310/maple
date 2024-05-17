<script lang="ts" setup>
import { ref } from 'vue'
import { Settings } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import ToggleThemeDropdown from '@/components/ToggleThemeDropdown.vue'

const goal = ref(350)

type Data = typeof data[number]
const data = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 }
]
</script>

<template>
  <div>
    <Drawer>
      <DrawerTrigger as-child>
        <Button size="icon" variant="ghost">
          <Settings class="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div class="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div class="p-4 pb-0">
            <div class="flex items-center justify-between space-x-2">
              <span>Theme</span>
              <ToggleThemeDropdown />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose as-child>
              <Button variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  </div>

</template>