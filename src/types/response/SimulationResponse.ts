export type ExportNodesSimulationResponse = {
  [key: string]: number
}

export type SimulationResponseData = {
  input: number
  exportNodes: ExportNodesSimulationResponse
}[]
