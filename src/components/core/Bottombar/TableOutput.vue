<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import type { ChartData } from '@/types'
import { computed, onMounted } from 'vue'

const props = defineProps<{
  response: ChartData[] | null
  responseKeys: string[]
}>()

const headers = computed(() => {
  const keys = new Set<string>()
  if (props.response === null) return
  props.response.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== 'input') {
        keys.add(key)
      }
    })
  })
  return Object.fromEntries(Array.from(keys).map((key) => [key, null]))
})

const fitlerItems = (item: ChartData) => {
  if (item === null) return
  const { input, ...data } = item
  return data
}
</script>

<template>
  <Table v-if="props.response !== null">
    <TableHeader>
      <TableRow>
        <TableHead>Input</TableHead>
        <TableHead v-for="(value, key) in headers" :key="key">{{ key }}</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(item, index) in props.response" :key="index">
        <TableCell>{{ item.input }}</TableCell>
        <TableCell v-for="(value, key) in fitlerItems(item)" :key="key">
          <p>{{ value }}</p>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
