import { useVueFlow, type Node } from '@vue-flow/core'
import { ref, watch, type Ref } from 'vue'
import { useIDStore } from '@/stores/idStore'

type DnDState = {
  draggedType: Ref<string | null>
  isDragOver: Ref<boolean>
  isDragging: Ref<boolean>
}

const state: DnDState = {
  draggedType: ref(null),
  isDragOver: ref(false),
  isDragging: ref(false)
}

export default function useDragAndDrop() {
  const { draggedType, isDragOver, isDragging } = state

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  const onDragStart = (event: DragEvent, type: string) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type)
      event.dataTransfer.effectAllowed = 'move'
    }

    draggedType.value = type
    isDragging.value = true

    document.addEventListener('drop', onDragEnd)
  }

  const onDragOver = (event: any) => {
    const _event = event as DragEvent
    _event.preventDefault()

    if (draggedType.value) {
      isDragOver.value = true

      if (_event.dataTransfer) {
        _event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  const onDragLeave = () => {
    isDragOver.value = false
  }

  const onDragEnd = () => {
    isDragging.value = false
    isDragOver.value = false
    draggedType.value = null
    document.removeEventListener('drop', onDragEnd)
  }

  const onDrop = (event: DragEvent) => {
    const position = screenToFlowCoordinate({ x: event.clientX, y: event.clientY })

    const id = useIDStore().getID

    const newNode: Node = {
      id: id,
      type: draggedType.value || 'default',
      position: position,
      label: 'Node'
    }
    if (draggedType.value === 'output') {
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
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop
  }
}
