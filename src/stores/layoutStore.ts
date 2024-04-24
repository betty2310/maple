import { defineStore } from 'pinia'

interface State {
  isShowLeftPanel: boolean
  isShowBottomPanel: boolean
}

export const useLayoutStore = defineStore('layoutStore', {
  state: (): State => {
    return {
      isShowLeftPanel: true,
      isShowBottomPanel: false
    }
  },
  actions: {
    toggleLeftPanel() {
      this.isShowLeftPanel = !this.isShowLeftPanel
    },
    toggleBottomPanel() {
      this.isShowBottomPanel = !this.isShowBottomPanel
    }
  }
})
