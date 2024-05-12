import type { Edge, FlowExportObject, Node } from '@vue-flow/core'
import useRunStore from '@/stores/runStore'
import {
  ACVoltageSource,
  Capacitor,
  Component,
  DCVoltageSource,
  Diode,
  Ground,
  Inductor,
  Resistor,
  Switch,
  Transistor
} from './models'
import { type ACVoltageSourceData, CircuitComponent } from '@/types'


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
      case CircuitComponent.Capacitor:
        component = new Capacitor(node.data.id, node.data.capacitance)
        break
      case CircuitComponent.Inductor:
        component = new Inductor(node.data.id, node.data.inductance)
        break
      case CircuitComponent.DCVoltageSource:
        component = new DCVoltageSource(`V${++idSourceComponent}`, node.data.Dc)
        break
      case CircuitComponent.Diode:
        component = new Diode(node.data.id)
        break
      case CircuitComponent.Transistor:
        component = new Transistor(node.data.id, '', '', '', '', 'mjd44h11')
        break
      case CircuitComponent.output:
        component = new Ground(node.id)
        break
      case CircuitComponent.Switch:
        component = new Switch(node.data.id, node.data.isOn)
        break
      case CircuitComponent.Ground:
        component = new Ground(node.id)
        break
      case CircuitComponent.ACVoltageSource:
        // eslint-disable-next-line no-case-declarations
        const data = node.data as ACVoltageSourceData
        component = new ACVoltageSource(`V${++idSourceComponent}`, data.VA, data.Freq, data.Phase)
        break
      default:
        throw new Error(`Unknown component type: ${node.type}`)
    }
    nodeMap[node.id] = component
  })

  let edgeId = 0
  circuit.edges.forEach((edge: Edge) => {
    const sourceNode = nodeMap[edge.source]
    const targetNode = nodeMap[edge.target]

    if (targetNode instanceof Ground || sourceNode instanceof Ground) {
      edge.data.id = '0'
    } else {
      edge.data.id = `${++edgeId}`
    }

    if (targetNode instanceof Ground) {
      sourceNode.neg = edge.data.id
      targetNode.pos = edge.data.id
    } else {
      sourceNode.neg = edge.data.id
      targetNode.pos = edge.data.id
    }


    console.log(sourceNode, targetNode, edge.data.id)

    if (sourceNode instanceof Transistor) {
      sourceNode.b = edge.data.id
    }
    if (targetNode instanceof Transistor) {
      if (edge.targetHandle?.includes('top')) {
        targetNode.c = edge.data.id
      }
      if (edge.targetHandle?.includes('bottom')) {
        targetNode.e = edge.data.id
      }
    }

  })

  // Generate netlist string
  const netlist: string[] = []

  for (const nodeId in nodeMap) {
    const component = nodeMap[nodeId]
    if (component instanceof Ground) continue
    netlist.push(component.toString())
  }
  console.log(netlist.join('\n'))
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
    if (edge.data.export === 'Voltmeter') {
      analysisType.push({
        type: exportType.V,
        node: `${edge.data.id}`
      })
    }
    if (edge.data === 'Ammeter') {
      analysisType.push({
        type: exportType.I,
        node: edge.data.id as string
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
