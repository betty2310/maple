import { Component } from '@/logic/models/Component'

export class Diode extends Component {
  // TODO: diode have model

  constructor(id: string) {
    super(id)
  }

  toString(): string {
    if (this.pos === '0' && this.neg !== '0') {
      return `${this.id} ${this.neg} ${this.pos} 1N914`
    }
    return `${this.id} ${this.pos} ${this.neg} 1N914`
  }
}