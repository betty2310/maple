import { CircuitComponent } from '@/types'
import type { Node } from '@vue-flow/core'
import { defineStore } from 'pinia'

interface State {
  idMap: Map<CircuitComponent, number>
}

const getNumberFromString = (str: string): number => {
  const num = str.match(/\d+/)
  if (num === null) {
    return 0
  }
  return parseInt(num[0])
}

export const useIDStore = defineStore('circuitComponentID', {
  state: (): State => {
    return {
      idMap: new Map<CircuitComponent, number>()
    }
  },
  actions: {
    getID(component: CircuitComponent): string {
      if (!this.idMap.has(component)) {
        this.idMap.set(component, 1)
        return `${component} 1`
      } else {
        let id = this.idMap.get(component)
        if (id === undefined) {
          id = 0
        }
        this.idMap.set(component, id + 1)
        return `${component} ${id + 1}`
      }
    },
    syncID(nodes: Node[]): void {
      if (nodes === undefined) return
      nodes.forEach((node) => {
        if (node.data !== undefined) {
          const component = node.type as CircuitComponent
          if (node.data.id === undefined) {
            return
          }
          const currentId = getNumberFromString(node.data.id)
          this.idMap.set(component, Math.max(currentId, this.idMap.get(component) ?? 0) + 1)
        }
      })
    }
  }
})
