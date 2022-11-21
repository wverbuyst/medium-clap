import { useCallback, useState } from 'react'

export const useDOMRef = () => {
  const [DOMRef, setRefState] = useState<any>({})

  const setRef = useCallback((node: HTMLElement | null) => {
    if (node && node.dataset && typeof node.dataset.refkey === 'string') {
      const key = node.dataset.refkey as string
      setRefState((previousState: any) => ({
        ...previousState,
        [key]: node,
      }))
    }
  }, [])

  return [DOMRef, setRef]
}
