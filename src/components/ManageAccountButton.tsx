import React from 'react'

export const ManageAccountButton = ({ callback }: { callback: () => void }) => {
  return (
    <button type="button" onClick={() => callback()}>
      Manage account
    </button>
  )
}
