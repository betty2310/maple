import { type Edge, type Node } from '@vue-flow/core'
import { defineStore } from 'pinia'

interface state {
  mode: 'Transient' | 'DC sweep'
}

const useRunStore = defineStore('runStore', {
  state: (): state => ({
    mode: 'Transient'
  }),

  actions: {
    setMode(mode: 'Transient' | 'DC sweep') {
      this.mode = mode
    },
    getMode(): number {
      if (this.mode === 'Transient') return 0
      else if (this.mode === 'DC sweep') return 1
      else return -1
    }
  }
})

export default useRunStore
