import { defineStore } from 'pinia'

interface State {
  id: number
}

export const useIDStore = defineStore('circuitComponentID', {
  state: (): State => {
    return {
      id: 0
    }
  },
  getters: {
    getID(state): string {
      return `node-${state.id++}`
    }
  }
})
