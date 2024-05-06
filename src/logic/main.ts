import type { Edge, FlowExportObject, Node } from '@vue-flow/core'
import useRunStore from '@/stores/runStore'

class Component {
  id: string
  pos: number
  neg: number

  constructor(id: string) {
    this.id = `${id}`
    this.pos = 0
    this.neg = 0
  }
}

class Resistor extends Component {
  resistance: number

  constructor(id: string, resistance: number) {
    super(id)
    this.resistance = resistance
  }
}

class VoltageSource extends Component {
  voltage: number

  constructor(id: string, voltage: number) {
    super(id)
    this.voltage = voltage
  }
}

class Ground extends Component {
  constructor(id: string) {
    super(id)
  }
}

function convertGraphToNetlist(circuit: FlowExportObject): string {
  const nodeMap: { [nodeId: string]: Component } = {}
  let nodeCounter = 0
  console.log(circuit)

  // Create component objects from nodes list
  circuit.nodes.forEach((node: Node) => {
    let component: Component

    switch (node.type) {
      case 'resistor':
        component = new Resistor(node.data.id, node.data.resistance)
        break
      case 'voltagesource':
        component = new VoltageSource(node.data.id, node.data.Dc)
        break
      case 'output':
        component = new Ground(node.id)
        break
      default:
        throw new Error(`Unknown component type: ${node.type}`)
    }

    nodeCounter++
    component.pos = nodeCounter
    nodeMap[node.id] = component
  })

  // Update component connections based on edges
  circuit.edges.forEach((edge: Edge) => {
    const sourceNode = nodeMap[edge.source]
    const targetNode = nodeMap[edge.target]

    if (targetNode instanceof Ground) {
      sourceNode.neg = 0
    } else if (sourceNode instanceof Ground) {
      targetNode.pos = 0
    } else {
      sourceNode.neg = targetNode.pos
    }
  })

  // Generate netlist string
  const netlist: string[] = []

  for (const nodeId in nodeMap) {
    const component = nodeMap[nodeId]

    if (component instanceof Resistor) {
      netlist.push(`${component.id} ${component.pos} ${component.neg} ${component.resistance}`)
    } else if (component instanceof VoltageSource) {
      netlist.push(`${component.id} ${component.pos} ${component.neg} ${component.voltage}`)
    }
  }

  return netlist.join('\n')
}

function getAnalysisType(edges: Edge[]): string[] {
  const analysisType: string[] = [] // i(R1) or v(1)

  edges.forEach((edge) => {
    if (edge.data === 'Voltage') {
      analysisType.push(`v(${edge.source})`)
    }
    if (edge.data === 'Current') {
      analysisType.push(`i(${edge.target})`)
    }
  })
  return analysisType
}

function handleAPI(circuit: FlowExportObject) {
  let netlist = convertGraphToNetlist(circuit)
  const title = 'Circuit Analysis\n'
  netlist = title + netlist
  const exportNode = getAnalysisType(circuit.edges)
  netlist = netlist + `\n.END`
  const mode = useRunStore().getMode()

  return {
    netlist: netlist,
    title: title,
    exportNode: exportNode[0],
    mode: mode
  }
}

export { handleAPI, convertGraphToNetlist }
