interface ComponentData {
  type: string
  description: string
}

interface VoltageSourceData extends ComponentData {
  Dc: number
}

interface ResistorData extends ComponentData {
  resistance: number
}

export type { ComponentData, VoltageSourceData, ResistorData }
