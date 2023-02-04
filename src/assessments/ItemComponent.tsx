import { Item } from './models'
import { ChoiceComponent } from './ChoiceComponent'
import React from 'react'

interface Props {
  selectedChoices: string[]
  handleChange: (choiceIndex: string) => void
  item: Item
}

export const ItemComponent: React.FC<Props> = ({ handleChange, selectedChoices, item }) => (
  <div className="flex flex-grow justify-center items-stretch p-4">
    <div className="flex w-1/2 text-4xl items-center justify-center border-r-2 border-dotted p-6">
      <h3 className="flex justify-center items-center aspect-video border-2 p-6 w-[700px] bg-gray-50">
        {item.description}
      </h3>
    </div>
    <div className="flex w-1/2 flex-wrap items-center content-center gap-y-6 gap-x-4 p-8">
      {item.choices.map((choice, choiceIndex) => {
        return (
          <ChoiceComponent
            key={choiceIndex}
            checked={selectedChoices.includes(choiceIndex.toString()) ?? false}
            onChange={() => handleChange(choiceIndex.toString())}
            label={choice.label}
            choiceId={(choiceIndex + 1).toString()}
          />
        )
      })}
    </div>
  </div>
)
