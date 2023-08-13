import { Item } from '../../models/item'
import { MultipleChoiceComponent } from './MultipleChoiceComponent'
import React from 'react'
import { isMultipleChoice } from './typeGuards'
import { StaticItemComponent } from './StaticItemComponent'

interface Props {
  item: Item
  selectedChoices: string[]
  handleChange: (choiceIndex: string) => void
}

export const ItemComponent: React.FC<Props> = ({ item, selectedChoices, handleChange }) => {
  if (isMultipleChoice(item)) {
    return (
      <MultipleChoiceComponent
        selectedChoices={selectedChoices}
        handleChange={handleChange}
        item={item}
      />
    )
  }
  return <StaticItemComponent item={item} />
}
