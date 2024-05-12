import { CircuitComponent } from '@/types'

function convertToCircuiComponent(type: string | undefined): CircuitComponent {
  let typeCircuit = CircuitComponent.Ground
  switch (type) {
    case 'resistor':
      typeCircuit = CircuitComponent.Resistor
      break
    case 'voltagesource':
      typeCircuit = CircuitComponent.DCVoltageSource
      break
    case 'acvoltagesource':
      typeCircuit = CircuitComponent.ACVoltageSource
      break
    case 'capacitor':
      typeCircuit = CircuitComponent.Capacitor
      break
    case 'inductor':
      typeCircuit = CircuitComponent.Inductor
      break
    case 'diode':
      typeCircuit = CircuitComponent.Diode
      break
    case 'switch':
      typeCircuit = CircuitComponent.Switch
      break
    default:
      typeCircuit = CircuitComponent.Ground
      break
  }
  return typeCircuit
}

export { convertToCircuiComponent }
