import { Component } from '@/logic/models/Component'

export class Switch extends Component {
  isOn: boolean

  constructor(id: string, isOn: boolean) {
    super(id)
    this.isOn = isOn
  }

  toString() {
    return `R${this.id} ${this.pos} ${this.neg} ${this.isOn ? 1e9 : 0}`
  }
}