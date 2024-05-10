import { Component } from './Component'

export class Resistor extends Component {
  resistance: number

  constructor(id: string, resistance: number) {
    super(id)
    this.resistance = resistance
  }
}

export class Capacitor extends Component {
  capacitance: number

  constructor(id: string, capacitance: number) {
    super(id)
    this.capacitance = capacitance
  }
}

export class Inductor extends Component {
  inductance: number

  constructor(id: string, inductance: number) {
    super(id)
    this.inductance = inductance
  }
}
