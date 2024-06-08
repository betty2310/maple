import { CircuitComponent } from '@/types'

const supabaseProjectId = import.meta.env.VITE_SUPABASE_PROJECT_ID

function getToken() {
  const storageKey = `sb-${supabaseProjectId}-auth-token`
  const sessionDataString = localStorage.getItem(storageKey)
  const sessionData = JSON.parse(sessionDataString || 'null')
  const token = sessionData?.access_token

  return token
}

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
    case 'transistor':
      typeCircuit = CircuitComponent.Transistor
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

export { convertToCircuiComponent, getToken }
