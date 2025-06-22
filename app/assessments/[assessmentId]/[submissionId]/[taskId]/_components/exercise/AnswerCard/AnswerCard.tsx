import cx from 'classnames'
import ChoiceContentContainer from './ChoiceLabel/ChoiceContentContainer'
import AnswerCardFooter from './AnswerCardFooter/AnswerCardFooter'
import { Choice } from '@/lib/models'

interface Props {
  checked: boolean
  choice: Choice
  choiceIndex: number
  readOnly: boolean
}

export default function AnswerCard({ checked, choice, choiceIndex, readOnly }: Props) {
  return (
    <div
      className={cx(
        'flex',
        'flex-shrink',
        'justify-center',
        'items-center',
        '2xl:max-w-[48%]',
        'max-w-xl',
        'group',
      )}
    >
      <div className={cx('group', 'w-full')}>
        <label
          className={cx(
            'flex',
            'flex-col',
            'justify-around',
            'border-4',
            'bg-gray-50',
            'has-[:checked]:border-blue-300',
            'has-[:checked]:bg-blue-200',
            'group-hover:cursor-pointer',
            'group-hover:drop-shadow-lg',
            'group-focus:drop-shadow-lg',
            'shadow-sm',
          )}
        >
          <ChoiceContentContainer choice={choice} />
          <AnswerCardFooter
            checked={checked}
            choiceId={choice.id}
            choiceIndex={choiceIndex}
            readOnly={readOnly}
          />
        </label>
      </div>
    </div>
  )
}
