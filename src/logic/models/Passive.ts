import { Component } from './Component'

export class Resistor extends Component {
  resistance: number

  constructor(id: string, resistance: number) {
    super(id)
    this.resistance = resistance
  }

  toString(): string {
    if (this.pos === '0' && this.neg !== '0') {
      return `${this.id} ${this.neg} ${this.pos} ${this.resistance}`
    }
    return `${this.id} ${this.pos} ${this.neg} ${this.resistance}`
  }
}

export class Capacitor extends Component {
  capacitance: number

  constructor(id: string, capacitance: number) {
    super(id)
    this.capacitance = capacitance
  }

  toString(): string {
    if (this.pos === '0' && this.neg !== '0') {
      return `${this.id} ${this.neg} ${this.pos} ${this.capacitance}`
    }
    return `${this.id} ${this.pos} ${this.neg} ${this.capacitance}`
  }
}

export class Inductor extends Component {
  inductance: number

  constructor(id: string, inductance: number) {
    super(id)
    this.inductance = inductance
  }

  toString(): string {
    if (this.pos === '0' && this.neg !== '0') {
      return `${this.id} ${this.neg} ${this.pos} ${this.inductance}`
    }
    return `${this.id} ${this.pos} ${this.neg} ${this.inductance}`
  }
}
