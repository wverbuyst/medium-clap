import React from 'react'

import styles from '../styles/index.module.css'

export const CountTotal: React.FC<{
  countTotal: number
  setRef: React.Ref<HTMLElement>
  restProps: unknown
}> = ({ countTotal, setRef, ...restProps }) => {
  return (
    <span ref={setRef} className={styles.total} {...restProps}>
      {countTotal}
    </span>
  )
}
