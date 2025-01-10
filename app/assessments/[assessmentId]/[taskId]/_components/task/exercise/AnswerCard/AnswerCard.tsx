import cx from 'classnames'
import ChoiceContentContainer from './ChoiceLabel/ChoiceContentContainer'
import AnswerCardFooter from './AnswerCardFooter/AnswerCardFooter'
import { Choice } from '@/lib/models'

interface Props {
  checked: boolean
  choice: Choice
  choiceIndex: number
}

export default function AnswerCard({ checked, choice, choiceIndex }: Props) {
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
            'border-2',
            'bg-white',
            'has-[:checked]:border-blue-200',
            'has-[:checked]:bg-blue-200',
            'group-hover:cursor-pointer',
            'group-hover:drop-shadow-lg',
          )}
        >
          <ChoiceContentContainer choice={choice} />
          <AnswerCardFooter checked={checked} choiceId={choice.id} choiceIndex={choiceIndex} />
        </label>
      </div>
    </div>
  )
}
