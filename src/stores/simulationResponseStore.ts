import { SimulationMode } from '@/types'
import type { JsonWebKeyInput } from 'crypto'
import { defineStore } from 'pinia'

interface state {
  output: object,
  mode: SimulationMode,
  exportNodes: 
}

export const useSimulationResponseStore = defineStore('outputStore', {
  state: (): state => ({
    output: {},
    mode: SimulationMode.Transient
  }),

  actions: {
    setValue(value: number[]) {
      const min = 1e-6
      this.output = value.map((v) => (Math.abs(v) < min ? 0 : v))
    },
    getValue(): number[] {
      return this.output
    },
    setInput(value: number[]) {
      this.input = value
    },
    getInput(): number[] {
      return this.input
    },
    getMode(): SimulationMode {
      return this.mode
    },
    setMode(mode: SimulationMode) {
      this.mode = mode
    }
  }
})
