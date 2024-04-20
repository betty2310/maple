import type { FlowExportObject } from '@vue-flow/core'

const circuit = {
  nodes: [
    {
      id: 'node-0',
      type: 'voltagesource',
      position: {
        x: 230,
        y: 380
      },
      data: {
        type: 'voltageSource',
        description: 'Voltage source description',
        Dc: 1000
      },
      label: 'Node'
    },
    {
      id: 'node-1',
      type: 'resistor',
      position: {
        x: 30,
        y: 420
      },
      data: {
        type: 'resistor',
        description: 'resistor description',
        resistance: 1000
      },
      label: 'Node'
    }
  ],
  edges: [
    {
      id: 'vueflow__edge-node-0node-0__handle-bottom-node-1node-1__handle-right',
      type: 'smoothstep',
      source: 'node-0',
      target: 'node-1',
      sourceHandle: 'node-0__handle-bottom',
      targetHandle: 'node-1__handle-right',
      data: {},
      label: '',
      sourceX: 270,
      sourceY: 463,
      targetX: 118.75,
      targetY: 449
    }
  ],
  position: [210, -251.4],
  zoom: 1,
  viewport: {
    x: 210,
    y: -251.4,
    zoom: 1
  }
}

function convertGraphToNetlist(object: FlowExportObject) {
  const nodes = object.nodes
  const edges = object.edges
  nodes.forEach((node) => {
    console.log(node.data)
  })

  edges.forEach((edge) => {
    console.log(edge)
  })
}

export { convertGraphToNetlist }
