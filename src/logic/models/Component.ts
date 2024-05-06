export class Component {
  id: string
  pos: string
  neg: string

  constructor(id: string) {
    this.id = `${id}`
    this.pos = ''
    this.neg = ''
  }
}
