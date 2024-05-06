import { Component } from './Component'

export class Resistor extends Component {
  resistance: number

  constructor(id: string, resistance: number) {
    super(id)
    this.resistance = resistance
  }
}
