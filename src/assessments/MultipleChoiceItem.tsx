import { Field } from 'formik'
import React, { ReactElement } from 'react'
import { Item } from './models'

interface Props {
  item: Item
  itemId: string
  visible: boolean
}

const MultipleChoiceItem = ({ item, itemId, visible }: Props): ReactElement => {
  return (
    <div hidden={!visible}>
      <h3>{item.description}</h3>
      <ul>
        {item.choices.map((choice, choiceId) => (
          <li key={choiceId}>
            <label>
              <Field name={`${itemId}.${choiceId}`} type="checkbox" />
              {choice.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MultipleChoiceItem
