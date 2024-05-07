import { Component } from './Component'

export class ACVoltageSource extends Component {
  VA: number
  Freq: number
  Phase: number
  AC_mag: number
  AC_phase: number

  constructor(id: string, VA: number, freq = 0, phase = 0, ac_mag = 0, ac_phase = 0) {
    super(id)
    this.VA = VA
    this.Freq = freq
    this.Phase = phase
    this.AC_mag = ac_mag
    this.AC_phase = ac_phase
  }
}

export class DCVoltageSource extends Component {
  voltage: number

  constructor(id: string, voltage: number) {
    super(id)
    this.voltage = voltage
  }
}
