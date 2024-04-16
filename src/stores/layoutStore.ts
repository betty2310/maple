import { defineStore } from 'pinia'

interface State {
  isShowLeftPanel: boolean
}

export const useLayoutStore = defineStore('layoutStore', {
  state: (): State => {
    return {
      isShowLeftPanel: true
    }
  },
  actions: {
    toggleLeftPanel() {
      this.isShowLeftPanel = !this.isShowLeftPanel
    }
  }
})
