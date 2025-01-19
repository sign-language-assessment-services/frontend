import cx from 'classnames'
import Checkbox from './Checkbox/Checkbox'
import AnswerIdentifier from './AnswerIdentifier/AnswerIdentifier'

interface Props {
  checked: boolean
  choiceId: string
  choiceIndex: number
}

export default function AnswerCardFooter({ checked, choiceId, choiceIndex }: Props) {
  return (
    <span
      className={cx(
        'flex',
        'justify-center',
        'p-1',
        'gap-2',
        'border-t-2',
        'has-[:checked]:bg-blue-200',
        'has-[:checked]:border-blue-200',
        'group-hover:cursor-pointer',
      )}
    >
      <Checkbox checked={checked} id={choiceId} />
      <AnswerIdentifier choiceIndex={choiceIndex} />
    </span>
  )
}
