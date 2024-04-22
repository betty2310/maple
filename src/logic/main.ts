import type { FlowExportObject } from '@vue-flow/core'

function convertGraphToNetlist(object: FlowExportObject): boolean {
  const nodes = object.nodes
  const edges = object.edges
  nodes.forEach((node) => {
    console.log(node.data)
  })

  edges.forEach((edge) => {
    console.log(edge)
  })
  return true
}

export { convertGraphToNetlist }
