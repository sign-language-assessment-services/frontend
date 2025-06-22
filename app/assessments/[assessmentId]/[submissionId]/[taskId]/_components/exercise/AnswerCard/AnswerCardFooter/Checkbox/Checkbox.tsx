import cx from 'classnames'

interface Props {
  checked: boolean
  id: string
  readOnly: boolean
}

export default function Checkbox({ id, checked, readOnly }: Props) {
  return (
    <input
      className={cx('peer')}
      type="checkbox"
      name={id}
      defaultChecked={checked}
      disabled={readOnly}
    />
  )
}
