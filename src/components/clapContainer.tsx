import React from 'react'

import styles from '../styles/index.module.css'

export const ClapContainer: React.FC<{
  children: JSX.Element[]
  setRef: React.Ref<HTMLButtonElement>
  handleClick: () => void
  restProps: unknown
}> = ({ children, setRef, handleClick, ...restProps }): JSX.Element => {
  return (
    <button
      ref={setRef}
      className={styles.clap}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </button>
  )
}
