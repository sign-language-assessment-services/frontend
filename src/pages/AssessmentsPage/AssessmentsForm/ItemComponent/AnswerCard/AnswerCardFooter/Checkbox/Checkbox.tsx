import React from 'react'

export const Checkbox = (props: { checked: boolean; onChange: () => void }) => (
  <input className="peer" type="checkbox" checked={props.checked} onChange={props.onChange} />
)
