import { useEffect, useRef } from 'react'

export const useEffectAfterMountHook = (cb: any, deps: any) => {
  const componentJustMounted = useRef(true)

  useEffect(() => {
    if (!componentJustMounted.current) {
      return cb()
    }
    componentJustMounted.current = false
  }, deps)
}
