import { SimulationMode } from '@/types'
import { defineStore } from 'pinia'

interface state {
  input: number[]
  output: number[]
  mode: SimulationMode
}

const useOutputStore = defineStore('outputStore', {
  state: (): state => ({
    input: [],
    output: [],
    mode: SimulationMode.Transient
  }),

  actions: {
    setValue(value: number[]) {
      this.output = value
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

export default useOutputStore
