import { CircuitComponent } from '@/types'
import { defineStore } from 'pinia'

interface State {
  idMap: Map<CircuitComponent, number>
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
    }
  }
})
