import { type Edge, type FlowExportObject, type Node } from '@vue-flow/core'
import { defineStore } from 'pinia'

interface CircuitState {
  nodes: Node[]
  edges: Edge[]
  selectedNode: Node | null
  currentCircuit: FlowExportObject | null
  isCircuitChanged: boolean
}

const useCircuitStore = defineStore('circuitStore', {
  state: (): CircuitState => ({
    nodes: [],
    edges: [],
    selectedNode: null,
    currentCircuit: null,
    isCircuitChanged: false
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
