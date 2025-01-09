import cx from 'classnames'
import { getTranslations } from 'next-intl/server'

interface Props {
  choiceId: number
}

export default async function AnswerIdentifier({ choiceId }: Props) {
  const t = await getTranslations('Assessment')
  return (
    <span className={cx('text-base', 'text-sm', 'lg:text-xl', 'peer-checked:font-bold')}>
      {t('answer', { number: choiceId })}
    </span>
  )
}
