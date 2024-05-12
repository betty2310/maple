export class Component {
  id: string
  pos: string
  neg: string

  constructor(id: string) {
    this.id = `${id}`
    this.pos = ''
    this.neg = ''
  }

  toString(): string {
    if (this.pos === '0' && this.neg !== '0') {
      return `${this.id} ${this.neg} ${this.pos}`
    }
    return `${this.id} ${this.pos} ${this.neg}`
  }
}
