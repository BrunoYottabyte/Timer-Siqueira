import { ActionTypes } from './actions'
import { produce } from 'immer'
import { addSeconds, differenceInSeconds, subSeconds } from 'date-fns'

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupedDate?: Date
  finishedDate?: Date
  paused?: boolean | string | Date
  lastDateIsPaused?: string | Date
  expectedTime?: Date
  stopWatch: boolean
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles?.push(action.payload.newCycle),
          (draft.activeCycleId = action.payload?.newCycle.id)
      })

    case ActionTypes.DELETE_CYCLE:
      return produce(state, (draft) => {
        draft.cycles = draft.cycles.filter(
          (cycle) => cycle.id !== action.payload.id,
        )
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (currentCycleIndex < 0) return state
      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interrupedDate = new Date()
      })
    }

    case ActionTypes.PAUSE_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (currentCycleIndex < 0) return state
      return produce(state, (draft) => {
        if (!draft.cycles[currentCycleIndex].paused) {
          draft.cycles[currentCycleIndex].paused = new Date()
          draft.cycles[currentCycleIndex].lastDateIsPaused = new Date()
          return
        }

        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(draft.cycles[currentCycleIndex].paused),
        )
        draft.cycles[currentCycleIndex].startDate = addSeconds(
          new Date(draft.cycles[currentCycleIndex].startDate),
          secondsDifference,
        )
        draft.cycles[currentCycleIndex].paused = null
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (currentCycleIndex < 0) return state
      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
