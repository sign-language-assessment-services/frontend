import React from 'react'

interface Props {
  checked: boolean
  onChange: () => void
  label: string
}

export const ChoiceComponent = ({ checked, label, onChange }: Props) => (
  <div>
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  </div>
)
