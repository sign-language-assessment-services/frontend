import React from 'react'

interface Props {
  checked: boolean
  id: string
}

export const Checkbox = ({ id, checked }: Props) => (
  <input className="peer" type="checkbox" name={id} defaultChecked={checked} />
)
