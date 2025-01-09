interface Props {
  checked: boolean
  id: string
}

export default function Checkbox({ id, checked }: Props) {
  return <input className="peer" type="checkbox" name={id} defaultChecked={checked} />
}
