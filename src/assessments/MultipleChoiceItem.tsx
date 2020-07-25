import React, { ReactElement } from 'react'
import { Item } from './models'

interface Props {
  item: Item
}

const MultipleChoiceItem = ({ item }: Props): ReactElement => (
  <>
    <h3>{item.description}</h3>
    <ul>
      {item.choices.map((choice, index) => (
        <li key={index}>{choice.label}</li>
      ))}
    </ul>
  </>
)

export default MultipleChoiceItem
