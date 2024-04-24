import { defineStore } from 'pinia'

interface state {
  input: number[]
  output: number[]
}

const useOutputStore = defineStore('outputStore', {
  state: (): state => ({
    input: [],
    output: []
  }),

  actions: {
    setValue(value: number[]) {
      this.output = value
    },
    getValue(): number[] {
      return this.output
    },
    setInput(value: number[]) {
      this.input = value
    },
    getInput(): number[] {
      return this.input
    }
  }
})

export default useOutputStore
