import './App.css'

import { useState } from 'react'

import { ClapContainer } from './components/clapContainer'
import { ClapCount } from './components/clapCount'
import { ClapIcon } from './components/clapIcon'
import { CountTotal } from './components/countTotal'
import { useClapAnimation } from './hooks/useAnimation'
import { Action, ClapState, useClapState } from './hooks/useClapState'
import { useDOMRef } from './hooks/useDOMRef'
import { useEffectAfterMountHook } from './hooks/useEffectAfterMount'
import userStyles from './styles/userStyles.module.css'

const userInitialState = {
  count: 0,
  countTotal: 1000,
  isClicked: false,
}

function App() {
  const [timesClapped, setTimesClapped] = useState(0)
  const isClappedTooMuch = timesClapped >= 7

  const reducer = (state: ClapState, action: Action) => {
    if (action.type === useClapState.types.clap && isClappedTooMuch) {
      return state
    }
    return useClapState.reducer(state, action)
  }
  const { clapState, getTogglerProps, getCounterProps, reset, resetDep } =
    useClapState(userInitialState, reducer)
  const { count, countTotal, isClicked } = clapState

  const [DOMRef, setRef] = useDOMRef()
  const animationTimeline = useClapAnimation({
    clapEl: DOMRef.clapRef,
    countEl: DOMRef.clapCountRef,
    clapTotalEl: DOMRef.clapTotalRef,
  })

  useEffectAfterMountHook(() => {
    animationTimeline.replay()
  }, [count])

  const [uploadingReset, setUpload] = useState(false)
  useEffectAfterMountHook(() => {
    setUpload(true)
    setTimesClapped(0)
    const id = setTimeout(() => {
      setUpload(false)
    }, 3000)

    return () => clearTimeout(id)
  }, [resetDep])

  const handleClick = () => {
    setTimesClapped((t) => t + 1)
  }

  return (
    <div>
      <ClapContainer
        setRef={setRef}
        {...getTogglerProps({ onClick: handleClick, 'aria-pressed': false })}
        data-refkey="clapRef"
      >
        <ClapIcon isClicked={isClicked} />
        <ClapCount
          {...getCounterProps([])}
          setRef={setRef}
          data-refkey="clapCountRef"
        />
        <CountTotal
          countTotal={countTotal}
          setRef={setRef}
          data-refkey="clapTotalRef"
        />
      </ClapContainer>
      <section>
        <button onClick={reset} className={userStyles.resetBtn}>
          reset
        </button>
        <pre className={userStyles.resetMsg}>
          {JSON.stringify({ timesClapped, count, countTotal })}
        </pre>
        <pre className={userStyles.resetMsg}>
          {uploadingReset ? `uploading reset ${resetDep}...` : ''}
        </pre>
        <pre style={{ color: 'red' }}>
          {isClappedTooMuch ? 'You have clapped too much' : ''}
        </pre>
      </section>
    </div>
  )
}

export default App
