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
    default:
      typeCircuit = CircuitComponent.Ground
      break
  }
  return typeCircuit
}

export { convertToCircuiComponent }
