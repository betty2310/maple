import { Component } from '@/logic/models/Component'

export class Switch extends Component {
  isOn: boolean

  constructor(id: string, isOn: boolean) {
    super(id)
    this.isOn = isOn
  }
}