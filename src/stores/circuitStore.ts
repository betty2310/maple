import type { Edge, Node } from '@vue-flow/core'
import { defineStore } from 'pinia'

interface CircuitState {
  nodes: Node[]
  edges: Edge[]
}

const useCircuitStore = defineStore('circuitStore', {
  state: () => ({
    elements: []
  }),

  actions: {
    log() {
      console.log('onStore: ', this.elements)
    }
  }
})

export default useCircuitStore
