import { Component } from '@/logic/models/Component'

export class Transistor extends Component {
  c: string
  b: string
  e: string
  subst: string
  model: string

  constructor(id: string, c: string, b: string, e: string, subst: string, model: string) {
    super(id)
    this.c = c
    this.b = b
    this.e = e
    this.subst = subst
    this.model = model
  }

  toString(): string {
    return `${this.id} ${this.c} ${this.b} ${this.e} ${this.subst} ${this.model}`
  }
}