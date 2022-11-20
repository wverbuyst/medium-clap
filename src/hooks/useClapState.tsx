import { useCallback, useReducer, useRef } from 'react'

import { INITIAL_STATE, MAXIMUM_USER_CLAP } from '../constants'
import { usePrevious } from './usePrevious'

const callFnsInSequence =
  (...fns: Function[]) =>
  (...args: unknown[]) =>
    fns.forEach((fn) => fn && fn(...args))

interface ClapAction {
  type: string
  payload?: unknown
}

interface ResetAction {
  type: string
  payload?: unknown
}

type Action = ClapAction | ResetAction

interface ClapState {
  count: number
  countTotal: number
  isClicked: boolean
}

const internalReducer = (state: ClapState, action: Action) => {
  const { count, countTotal } = state
  const { type, payload } = action
  switch (type) {
    case 'clap':
      return {
        count: Math.min(count + 1, MAXIMUM_USER_CLAP),
        countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal,
        isClicked: true,
      }
    case 'reset':
      return { ...state, payload }
    default:
      return state
  }
}

export const useClapState = (
  initialState = INITIAL_STATE,
  reducer = internalReducer
) => {
  const userInitialState = useRef(initialState)
  const [clapState, dispatch] = useReducer(reducer, initialState)
  const { count } = clapState

  const updateClapState = () => dispatch({ type: 'clap' })

  const getTogglerProps = ({
    onClick,
    ...otherProps
  }: { onClick?: () => void; otherProps?: unknown[] } = {}) => ({
    onClick: onClick
      ? callFnsInSequence(updateClapState, onClick)
      : callFnsInSequence(updateClapState),
    'aria-pressed': clapState.isClicked,
    ...otherProps,
  })

  const getCounterProps = ({ ...otherProps }) => ({
    count,
    'aria-valuemax': MAXIMUM_USER_CLAP,
    'aria-valuemin': 0,
    'aria-valuenow': count,
    ...otherProps,
  })

  const resetRef = useRef(0)
  const prevCount = usePrevious(count)
  const reset = useCallback(() => {
    if (prevCount !== count) {
      dispatch({ type: 'reset', payload: userInitialState.current })
      resetRef.current++
    }
  }, [prevCount, count, dispatch])

  return {
    clapState,
    updateClapState,
    getTogglerProps,
    getCounterProps,
    reset,
    resetDep: resetRef.current,
  }
}

useClapState.reducer = internalReducer
useClapState.types = {
  clap: 'clap',
  reset: 'reset',
}
