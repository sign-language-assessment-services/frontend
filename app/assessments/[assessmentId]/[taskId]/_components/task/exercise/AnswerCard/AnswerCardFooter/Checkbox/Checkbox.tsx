import cx from 'classnames'

interface Props {
  checked: boolean
  id: string
}

export default function Checkbox({ id, checked }: Props) {
  return <input className={cx('peer')} type="checkbox" name={id} defaultChecked={checked} />
}
