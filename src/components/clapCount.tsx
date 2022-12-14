import React from 'react'

import styles from '../styles/index.module.css'

export const ClapCount: React.FC<{
  count: number
  setRef: any
  restProps: unknown
}> = ({ count, setRef, ...restProps }) => {
  return (
    <span ref={setRef} className={styles.count} {...restProps}>
      + {count}
    </span>
  )
}
