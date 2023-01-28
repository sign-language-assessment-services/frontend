import React from 'react'

export const Button = ({ callback }: { callback: () => void }) => {
  return (
    <button type="button" onClick={() => callback()}>
      Manage account
    </button>
  )
}
