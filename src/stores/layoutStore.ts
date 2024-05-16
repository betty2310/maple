import { defineStore } from 'pinia'
import { BottomPanelItem, SidebarItem } from '@/enums'

interface State {
  sidebarItem: SidebarItem | null
  bottomPanelItem: BottomPanelItem | null
}

export const useLayoutStore = defineStore('layoutStore', {
  state: (): State => {
    return {
      bottomPanelItem: null,
      sidebarItem: SidebarItem.Components
    }
  },
  getters: {
    isSidebarVisible(): boolean {
      return this.sidebarItem == null
    },
    isBottomPanelVisible(): boolean {
      return this.bottomPanelItem == null
    }
  },
  actions: {
    setSidebarItem(item: SidebarItem) {
      this.sidebarItem = item
    },
    setBottomPanelItem(item: BottomPanelItem) {
      this.bottomPanelItem = item
    },
    resetSidebarItem() {
      this.sidebarItem = null
    },
    hideBottomPanel() {
      this.bottomPanelItem = null
    }
  }
})
