import { useCallback, useState } from 'react'

export const useDOMRef = () => {
  const [DOMRef, setRefState] = useState({})

  const setRef = useCallback((node: any) => {
    setRefState((previousState) => ({
      ...previousState,
      [node.dataset.refkey]: node,
    }))
  }, [])

  return [DOMRef, setRef]
}
