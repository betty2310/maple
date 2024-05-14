import { describe, expect, it } from 'vitest'
import { convertGraphToNetlist } from '@/logic/main'
import type { FlowExportObject } from '@vue-flow/core'

const simpleDCCircuit: FlowExportObject = {
  nodes: [
    {
      id: 'voltagesource 1',
      type: 'voltagesource',
      position: {
        x: 0,
        y: 285
      },
      data: {
        id: 'DC 1',
        type: 'voltageSource',
        description: 'Voltage source description',
        Dc: 1,
        toolbarPosition: 'right',
        toolbarVisible: false
      },
      label: 'Node'
    },
    {
      id: 'resistor 1',
      type: 'resistor',
      position: {
        x: 150,
        y: 90
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
    },
    {
      id: 'resistor 2',
      type: 'resistor',
      position: {
        x: 420,
        y: 255
      },
      data: {
        id: 'R2',
        type: 'resistor',
        description: 'resistor description',
        resistance: 1000,
        toolbarPosition: 'right',
        toolbarVisible: false
      },
      label: 'Node'
    },
    {
      id: 'output 1',
      type: 'output',
      position: {
        x: 135,
        y: 540
      },
      data: {},
      label: 'GROUND'
    }
  ],
  edges: [
    {
      id: 'vueflow__edge-voltagesource 1voltagesource 1__handle-bottom-output 1output 1__handle-top',
      type: 'custom',
      source: 'voltagesource 1',
      target: 'output 1',
      sourceHandle: 'voltagesource 1__handle-bottom',
      targetHandle: 'output 1__handle-top',
      data: {
        id: 0
      },
      label: ''
    },
    {
      id: 'vueflow__edge-resistor 1resistor 1__handle-left-voltagesource 1voltagesource 1__handle-top',
      type: 'custom',
      source: 'resistor 1',
      target: 'voltagesource 1',
      sourceHandle: 'resistor 1__handle-left',
      targetHandle: 'voltagesource 1__handle-top',
      data: {
        id: 1
      },
      label: ''
    },
    {
      id: 'vueflow__edge-resistor 2resistor 2__handle-left-resistor 1resistor 1__handle-right',
      type: 'custom',
      source: 'resistor 2',
      target: 'resistor 1',
      sourceHandle: 'resistor 2__handle-left',
      targetHandle: 'resistor 1__handle-right',
      data: {
        export: 'Voltage',
        id: 2
      },
      label: ''
    },
    {
      id: 'vueflow__edge-output 1output 1__handle-top-resistor 2resistor 2__handle-right',
      type: 'custom',
      source: 'output 1',
      target: 'resistor 2',
      sourceHandle: 'output 1__handle-top',
      targetHandle: 'resistor 2__handle-right',
      data: {
        id: 0
      },
      label: ''
    }
  ],
  position: [63.5404107226297, 37.66281976314502],
  zoom: 0.851453707748945,
  viewport: {
    x: 63.5404107226297,
    y: 37.66281976314502,
    zoom: 0.851453707748945
  }
}

export const simpleACCircuit: FlowExportObject = {
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

describe('ConvertGraphToNetList', () => {
  it('Should convert DC graph to netlist', () => {
    const netlist = convertGraphToNetlist(simpleDCCircuit)
    const trueValue = 'V1 1 0 1\nR1 2 1 1000\nR2 2 0 1000'
    expect(netlist).toEqual(trueValue)
  })
  it('Should convert AC graph to netlist', () => {
    const netlist = convertGraphToNetlist(simpleACCircuit)
    const trueValue = 'V1 1 0 dc 0 ac 1 sin(0 1 1000 0 0 0)\nC1 2 0 0.000001\nR1 2 1 1000'
    expect(netlist).toEqual(trueValue)
  })
})
