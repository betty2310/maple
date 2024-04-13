import { useVueFlow, type Node, type XYPosition } from '@vue-flow/core'
import { useIDStore } from '@/stores/idStore'

export default function useCreate() {
  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  const idStore = useIDStore();

  const onAutoCreate = (type: string) => {
    // TODO: hardcode the position of the new node
    // can update later using useWindowSize hook
    const pos : XYPosition = {
      x: 700 + 200 * Math.random(),
      y: 300 + 200 * Math.random()
    }
    const position = screenToFlowCoordinate(pos)

    const id = idStore.getID

    const newNode: Node = {
      id: id,
      type: type || 'default',
      position: position,
      label: 'Node'
    }
    if (type === 'output') {
      newNode.label = 'GROUND'
    }

    const { off } = onNodesInitialized(() => {
      updateNode(id, (node) => ({
        position: {
          x: node.position.x - node.dimensions.width / 2,
          y: node.position.y - node.dimensions.height / 2
        }
      }))

      off()
    })

    addNodes(newNode)
  }

  return {
    onAutoCreate
  }
}
