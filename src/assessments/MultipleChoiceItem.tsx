import React, { ReactElement } from 'react'
import { Item } from './models'

interface Props {
  item: Item
  visible: boolean
}

const MultipleChoiceItem = ({ item, visible }: Props): ReactElement => {
  return (
    <div hidden={!visible}>
      <h3>{item.description}</h3>
      <ul>
        {item.choices.map((choice, index) => (
          <li key={index}>{choice.label}</li>
        ))}
      </ul>
    </div>
  )
}

export default MultipleChoiceItem
