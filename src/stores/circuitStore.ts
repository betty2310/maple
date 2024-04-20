import { type Edge, type Node } from '@vue-flow/core'
import { defineStore } from 'pinia'

interface CircuitState {
  nodes: Node[]
  edges: Edge[]
  selectedNode: Node | null
}

const useCircuitStore = defineStore('circuitStore', {
  state: (): CircuitState => ({
    nodes: [],
    edges: [],
    selectedNode: null
  }),

  actions: {
    log() {
      console.log('onStore: ', this.selectedNode)
    },
    setSelectedNode(node: Node) {
      this.selectedNode = node
    },
    getSelectedNode(): Node | null {
      return this.selectedNode
    }
  }
})

export default useCircuitStore
