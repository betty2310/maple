import type { Edge, FlowExportObject, Node } from '@vue-flow/core'
import useRunStore from '@/stores/runStore'
import { ACVoltageSource, DCVoltageSource, Ground, Resistor, type Component } from './models'
import { CircuitComponent } from '@/types'

function convertGraphToNetlist(circuit: FlowExportObject): string {
  const nodeMap: { [nodeId: string]: Component } = {}
  console.log(circuit)

  let idSourceComponent = 0

  // Create component objects from nodes list
  circuit.nodes.forEach((node: Node) => {
    let component: Component

    switch (node.type) {
      case CircuitComponent.Resistor:
        component = new Resistor(node.data.id, node.data.resistance)
        break
      case CircuitComponent.DCVoltageSource:
        component = new DCVoltageSource(`V${++idSourceComponent}`, node.data.Dc)
        break
      case CircuitComponent.output:
        component = new Ground(node.id)
        break
      case CircuitComponent.ACVoltageSource:
        component = new ACVoltageSource(`V${++idSourceComponent}`, node.data.VA)
        break
      default:
        throw new Error(`Unknown component type: ${node.type}`)
    }

    nodeMap[node.id] = component
  })

  // Update component connections based on edges
  let edgeId = 0
  circuit.edges.forEach((edge: Edge) => {
    const sourceNode = nodeMap[edge.source]
    const targetNode = nodeMap[edge.target]

    if (targetNode instanceof Ground || sourceNode instanceof Ground) {
      edge.data.id = 0
    } else {
      edge.data.id = ++edgeId
    }

    sourceNode.neg = edge.data.id
    targetNode.pos = edge.data.id
  })

  // Generate netlist string
  const netlist: string[] = []

  for (const nodeId in nodeMap) {
    const component = nodeMap[nodeId]

    if (component instanceof Resistor) {
      netlist.push(`${component.id} ${component.pos} ${component.neg} ${component.resistance}`)
    } else if (component instanceof DCVoltageSource) {
      netlist.push(`${component.id} ${component.pos} ${component.neg} ${component.voltage}`)
    }
  }

  return netlist.join('\n')
}

enum exportType {
  V,
  I
}

type exportNode = {
  type: exportType
  node: string
}

function getAnalysisType(edges: Edge[]): exportNode[] {
  const analysisType: exportNode[] = [] // i(R1) or v(1)

  edges.forEach((edge) => {
    if (edge.data.export === 'Voltage') {
      analysisType.push({
        type: exportType.V,
        node: edge.data.id
      })
    }
    if (edge.data === 'Current') {
      analysisType.push({
        type: exportType.I,
        node: edge.data.id
      })
    }
  })
  return analysisType
}

function handleAPI(circuit: FlowExportObject) {
  let netlist = convertGraphToNetlist(circuit)
  const title = 'Circuit Analysis\n'
  netlist = title + netlist
  const exportNodes = getAnalysisType(circuit.edges)
  netlist = netlist + `\n.END`
  const mode = useRunStore().getMode()

  return {
    netlist: netlist,
    title: title,
    exportNodes: exportNodes,
    mode: mode
  }
}

export { handleAPI, convertGraphToNetlist }
