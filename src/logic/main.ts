import type { Edge, FlowExportObject, Node } from '@vue-flow/core'
import useRunStore from '@/stores/runStore'
import { ACVoltageSource, Capacitor, Component, DCVoltageSource, Diode, Ground, Inductor, Resistor } from './models'
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
      case CircuitComponent.output:
        component = new Ground(node.id)
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
      console.log(typeof edge.data)
      edge.data.id = '0'
    } else {
      edge.data.id = `${++edgeId}`
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
    } else if (component instanceof Capacitor) {
      netlist.push(`${component.id} ${component.pos} ${component.neg} ${component.capacitance}`)
    } else if (component instanceof Inductor) {
      netlist.push(`${component.id} ${component.pos} ${component.neg} ${component.inductance}`)
    } else if (component instanceof Diode) {
      netlist.push(`${component.id} ${component.pos} ${component.neg} 1N914`)
    } else if (component instanceof DCVoltageSource) {
      netlist.push(`${component.id} ${component.pos} ${component.neg} ${component.voltage}`)
    } else if (component instanceof ACVoltageSource) {
      netlist.push(
        `${component.id} ${component.pos} ${component.neg} dc 0 ac 1 sin(0 ${component.VA} ${component.Freq} 0 0 ${component.Phase})`
      )
    }
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

  netlist = netlist + '\n.model 1N914 D(Is=1e-14 Rs=0 N=1 Bv=1e30 Cjo=0 M=0.5 tt=0)'
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
