import type { Position } from '@vue-flow/core'

interface ComponentData {
  id: string
  type: string
  description: string
  toolbarPosition?: Position
  toolbarVisible?: boolean
}

interface VoltageSourceData extends ComponentData {
  Dc: number
}

interface ResistorData extends ComponentData {
  resistance: number
}

export type { ComponentData, VoltageSourceData, ResistorData }
