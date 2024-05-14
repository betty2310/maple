import type { Position } from '@vue-flow/core'
import { SimulationMode } from './SimulationMode'

enum CircuitComponent {
  Ground = 'ground',
  Resistor = 'resistor',
  DCVoltageSource = 'voltagesource',
  ACVoltageSource = 'acvoltagesource',
  Capacitor = 'capacitor',
  Inductor = 'inductor',
  Diode = 'diode',
  Switch = 'switch',
  Transistor = 'transistor',
  output = 'output'
}

interface ComponentData {
  id: string
  type: string
  description: string
  toolbarPosition?: Position
  toolbarVisible?: boolean
  pos?: Position
  neg?: Position
}

interface VoltageSourceData extends ComponentData {
  Dc: number
}

interface ACVoltageSourceData extends ComponentData {
  VA: number // Voltage (peak)
  Freq: number
  Phase: number
  AC_mag: number // AC analysis magnitude
  AC_phase: number
}

interface ResistorData extends ComponentData {
  resistance: number
}

interface CapacitorData extends ComponentData {
  capacitance: number
}

interface InductorData extends ComponentData {
  inductance: number
}

interface SwitchData extends ComponentData {
  isOn: boolean
}

interface TransistorData extends ComponentData {
  model: string
}

interface DiodeData extends ComponentData {
  IS?: string,
  RS?: string,
  N?: string,
  BV?: string,
  IBV?: string,
}

export type {
  ComponentData,
  VoltageSourceData,
  ResistorData,
  ACVoltageSourceData,
  CapacitorData,
  InductorData,
  DiodeData,
  TransistorData,
  SwitchData
}
export { CircuitComponent }

export { SimulationMode }
