import { Item } from '../../models/item'
import { MultipleChoice } from '../../models/multipleChoice'

export const isMultipleChoice = (item: Item): item is MultipleChoice =>
  item.hasOwnProperty('choices')