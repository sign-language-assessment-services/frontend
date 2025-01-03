interface Props {
  src: string
}

export default async function Video({ src }: Props) {
  return <video src={src} style={{ maxHeight: 'inherit' }} controls muted />
}
