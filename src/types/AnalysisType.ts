export enum AnalysisType {
  Voltmeter,
  Ammeter
}

export type ExportNode = {
  type: AnalysisType
  node: string
}
