import { Component } from './Component'

class Source extends Component {
  constructor(id: string) {
    super(id)
  }
}

export class ACVoltageSource extends Source {
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

  toString(): string {
    return `${this.id} ${this.pos} ${this.neg} dc 0 ac 1 sin(0 ${this.VA} ${this.Freq} 0 0 ${this.Phase})`

  }
}

export class DCVoltageSource extends Source {
  voltage: number

  constructor(id: string, voltage: number) {
    super(id)
    this.voltage = voltage
  }

  toString(): string {
    return `${this.id} ${this.pos} ${this.neg} ${this.voltage}`
  }
}
