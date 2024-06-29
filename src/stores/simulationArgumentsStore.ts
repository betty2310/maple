import { defineStore } from 'pinia'

interface AcSweepArguments {
  initial: number
  final: number
  pointsPerDecade: number
}

interface DcSweepArguments {
  initial: number
  final: number
  delta: number
}

interface TransientArguments {
  step: number
  final: number
}

interface SimulatorArguments {
  acSweep: AcSweepArguments
  dcSweep: DcSweepArguments
  transient: TransientArguments
}

interface State {
  simulatorArguments: SimulatorArguments
}

const useSimulationArgumentsStore = defineStore('simulationArgumentsStore', {
  state: (): State => ({
    simulatorArguments: {
      acSweep: {
        initial: 0.001,
        final: 1000,
        pointsPerDecade: 5
      },
      dcSweep: {
        initial: 0,
        final: 3,
        delta: 0.1
      },
      transient: {
        step: 0.001,
        final: 0.1
      }
    }
  }),

  actions: {
    setAcSweep(args: AcSweepArguments) {
      this.simulatorArguments.acSweep = args
    },
    setDcSweep(args: DcSweepArguments) {
      this.simulatorArguments.dcSweep = args
    },
    setTransient(args: TransientArguments) {
      this.simulatorArguments.transient = args
    },
    resetAll() {
      this.$reset()
    },
    getSimulatorArguments(): SimulatorArguments {
      return this.simulatorArguments
    }
  },

  getters: {
    getAcSweep(): AcSweepArguments {
      return this.simulatorArguments.acSweep
    },
    getDcSweep(): DcSweepArguments {
      return this.simulatorArguments.dcSweep
    },
    getTransient(): TransientArguments {
      return this.simulatorArguments.transient
    }
  }
})

export default useSimulationArgumentsStore
