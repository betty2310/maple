import { type Edge, type Node } from '@vue-flow/core'
import { defineStore } from 'pinia'

interface state {
  mode: 'Interactive' | 'Transient' | 'DC sweep'
}

const useRunStore = defineStore('runStore', {
  state: (): state => ({
    mode: 'Interactive'
  }),

  actions: {
    setMode(mode: 'Interactive' | 'Transient' | 'DC sweep') {
      this.mode = mode
    },
    getMode(): number {
      if (this.mode === 'Interactive') return 0
      else if (this.mode === 'Transient') return 1
      else if (this.mode === 'DC sweep') return 2
      else return -1
    }
  }
})

export default useRunStore
