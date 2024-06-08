import { SimulationMode, type ChartData, type SimulationResponseData } from '@/types'
import type { ExportNode } from '@/types/AnalysisType'
import { defineStore } from 'pinia'

interface state {
  output: ChartData[] | null
  mode: SimulationMode
  exportNodes: ExportNode[]
  statusCode: number | null
}
export const useSimulationResponseStore = defineStore('simulationResponseStore', {
  state: (): state => ({
    output: null,
    mode: SimulationMode.Transient,
    exportNodes: [],
    statusCode: null
  }),

  actions: {
    clear() {
      this.output = null
      this.exportNodes = []
      this.statusCode = null
    },
    setResponse(output: SimulationResponseData) {
      const a = output.map((data) => {
        const convertedData: ChartData = {
          input: data.input
        }

        const length = this.exportNodes.length
        const dataList = Object.values(data.exportNodes)
        for (let i = 0; i < length; i++) {
          const { node } = this.exportNodes[i]
          convertedData[node] = dataList[i]
        }
        return convertedData
      })
      this.output = a
    },
    getResponseKeys() {
      return this.output ? Object.keys(this.output[0]) : []
    }
  }
})
