import { AvatarIcon } from '@/components/layout/header/userPanel/AvatarIcon'
import { auth } from '@/lib/auth'
import { getTranslations } from 'next-intl/server'

export default async function UserProfileLink() {
  const session = await auth()
  const userName = session!.user!.name
  const t = await getTranslations('UserPanel')

  return (
    <a
      href={`${process.env.AUTH_KEYCLOAK_ISSUER_EXTERNAL}/account?referrer=${process.env.AUTH_KEYCLOAK_ID}`}
      title={t('manageProfile')}
      className="flex items-center gap-2 hover:drop-shadow-lg"
    >
      <span className="text-xs md:text-sm">{userName}</span>
      <AvatarIcon />
    </a>
  )
}
