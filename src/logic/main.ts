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
import {
  type ACVoltageSourceData,
  CircuitComponent,
  type ComponentData,
  type TransistorData
} from '@/types'

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
        component = new Transistor(node.data.id, '', '', '', '0', 'mjd44h11')
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

    const sourceComponent = circuit.nodes.find(
      (node) => node.id === edge.source
    ) as Node<ComponentData>
    const targetComponent = circuit.nodes.find(
      (node) => node.id === edge.target
    ) as Node<ComponentData>

    const edgeSourceConnectPos = edge.sourceHandle?.split('-')[1]
    const edgeTargetConnectPos = edge.targetHandle?.split('-')[1]

    if (targetComponent.data?.pos === edgeTargetConnectPos) {
      targetNode.pos = edge.data.id
    } else {
      targetNode.neg = edge.data.id
    }

    if (sourceComponent.data?.pos === edgeSourceConnectPos) {
      sourceNode.pos = edge.data.id
    } else {
      sourceNode.neg = edge.data.id
    }

    if (sourceNode instanceof Transistor) {
      const transistorComponent = sourceComponent as Node<TransistorData>
      const edgeConnectPosition = edge.sourceHandle?.split('-')[1]
      if (edgeConnectPosition === transistorComponent.data?.b) {
        sourceNode.b = edge.data.id
      } else if (edgeConnectPosition === transistorComponent.data?.c) {
        sourceNode.c = edge.data.id
      } else if (edgeConnectPosition === transistorComponent.data?.e) {
        sourceNode.e = edge.data.id
      }
    }
    if (targetNode instanceof Transistor) {
      const transistorComponent = targetComponent as Node<TransistorData>
      const edgeConnectPosition = edge.targetHandle?.split('-')[1]
      console.log(edgeConnectPosition, transistorComponent.data)
      if (edgeConnectPosition === transistorComponent.data?.b) {
        targetNode.b = edge.data.id
      } else if (edgeConnectPosition === transistorComponent.data?.c) {
        targetNode.c = edge.data.id
      } else if (edgeConnectPosition === transistorComponent.data?.e) {
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

function getAnalysisType(circuit: FlowExportObject): exportNode[] {
  const analysisType: exportNode[] = [] // i(R1) or v(1)

  const edges = circuit.edges
  edges.forEach((edge) => {
    if (edge.data.export === 'Voltmeter') {
      analysisType.push({
        type: exportType.V,
        node: `${edge.data.id}`
      })
    }
    if (edge.data.export === 'Ammeter') {
      const sourceComponent = circuit.nodes.find(
        (node) => node.id === edge.source
      ) as Node<ComponentData>
      analysisType.push({
        type: exportType.I,
        node: `${sourceComponent.data?.id}`
      })
    }
  })
  console.log(analysisType)
  return analysisType
}

function handleAPI(circuit: FlowExportObject) {
  let netlist = convertGraphToNetlist(circuit)
  const title = 'Circuit Analysis\n'
  netlist = title + netlist
  const exportNodes = getAnalysisType(circuit)

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
