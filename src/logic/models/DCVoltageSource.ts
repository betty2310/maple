import { Component } from './Component'

export class DCVoltageSource extends Component {
  voltage: number

  constructor(id: string, voltage: number) {
    super(id)
    this.voltage = voltage
  }
}
