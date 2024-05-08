import { SimulationMode } from '@/types'
import { defineStore } from 'pinia'

interface state {
  mode: SimulationMode
}

const useRunStore = defineStore('runStore', {
  state: (): state => ({
    mode: SimulationMode.Transient
  }),

  actions: {
    setMode(mode: SimulationMode) {
      this.mode = mode
    },
    getMode(): number {
      if (this.mode === SimulationMode.Transient) return 0
      else if (this.mode === SimulationMode.DCSweep) return 1
      else if (this.mode === SimulationMode.ACSweep) return 2
      else return -1
    }
  }
})

export default useRunStore
