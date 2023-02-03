import { Item } from './models'
import { ChoiceComponent } from './ChoiceComponent'
import React from 'react'

interface Props {
  hidden: boolean
  selectedChoices: string[]
  handleChange: (choiceIndex: string) => void
  item: Item
}

export const ItemComponent = ({ handleChange, hidden, selectedChoices, item }: Props) => (
  <div hidden={hidden}>
    <h3>{item.description}</h3>
    {item.choices.map((choice, choiceIndex) => {
      return (
        <ChoiceComponent
          key={choiceIndex}
          checked={selectedChoices.includes(choiceIndex.toString()) ?? false}
          onChange={() => handleChange(choiceIndex.toString())}
          label={choice.label}
        />
      )
    })}
  </div>
)
