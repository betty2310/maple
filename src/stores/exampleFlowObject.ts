import type { FlowExportObject } from '@vue-flow/core'

export const obj: FlowExportObject = {
  nodes: [
    {
      id: 'acvoltagesource 1',
      type: 'acvoltagesource',
      position: {
        x: 135,
        y: 240
      },
      data: {
        id: 'AC 1',
        type: 'acvoltagesource',
        description: 'AC (sin) Voltage source',
        VA: 1,
        Freq: 1000,
        AC_mag: 1,
        Phase: 0,
        AC_phase: 0,
        toolbarPosition: 'right',
        toolbarVisible: false
      },
      label: 'Node'
    },
    {
      id: 'output 1',
      type: 'output',
      position: {
        x: 255,
        y: 480
      },
      data: {},
      label: 'GROUND'
    },
    {
      id: 'capacitor 1',
      type: 'capacitor',
      position: {
        x: 450,
        y: 285
      },
      data: {
        id: 'C1',
        type: 'resistor',
        description: 'Capacitor',
        capacitance: 0.000001,
        toolbarPosition: 'right',
        toolbarVisible: false
      },
      label: 'Node'
    },
    {
      id: 'resistor 1',
      type: 'resistor',
      position: {
        x: 330,
        y: 135
      },
      data: {
        id: 'R1',
        type: 'resistor',
        description: 'resistor description',
        resistance: 1000,
        toolbarPosition: 'right',
        toolbarVisible: false
      },
      label: 'Node'
    }
  ],
  edges: [
    {
      id: 'vueflow__edge-acvoltagesource 1acvoltagesource 1__handle-bottom-output 1output 1__handle-top',
      type: 'custom',
      source: 'acvoltagesource 1',
      target: 'output 1',
      sourceHandle: 'acvoltagesource 1__handle-bottom',
      targetHandle: 'output 1__handle-top',
      data: {
        id: 0
      },
      label: ''
    },
    {
      id: 'vueflow__edge-resistor 1resistor 1__handle-left-acvoltagesource 1acvoltagesource 1__handle-top',
      type: 'custom',
      source: 'resistor 1',
      target: 'acvoltagesource 1',
      sourceHandle: 'resistor 1__handle-left',
      targetHandle: 'acvoltagesource 1__handle-top',
      data: {
        id: 1
      },
      label: ''
    },
    {
      id: 'vueflow__edge-capacitor 1capacitor 1__handle-left-resistor 1resistor 1__handle-right',
      type: 'custom',
      source: 'capacitor 1',
      target: 'resistor 1',
      sourceHandle: 'capacitor 1__handle-left',
      targetHandle: 'resistor 1__handle-right',
      data: {
        export: 'Voltage',
        id: 2
      },
      label: ''
    },
    {
      id: 'vueflow__edge-output 1output 1__handle-top-capacitor 1capacitor 1__handle-right',
      type: 'custom',
      source: 'output 1',
      target: 'capacitor 1',
      sourceHandle: 'output 1__handle-top',
      targetHandle: 'capacitor 1__handle-right',
      data: {
        id: 0
      },
      label: ''
    }
  ],
  position: [0, 0],
  zoom: 1,
  viewport: {
    x: 0,
    y: 0,
    zoom: 1
  }
}
