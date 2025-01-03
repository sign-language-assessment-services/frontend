import { AvatarIcon } from '@/components/layout/header/userPanel/AvatarIcon'
import { getSession, oAuthConfig } from '@/lib/auth'
import { getTranslations } from 'next-intl/server'

export default async function UserProfileLink() {
  const session = await getSession()
  const userName = session!.user!.name
  const t = await getTranslations('UserPanel')

  return (
    <a
      href={`${oAuthConfig.issuer}/account?referrer=${oAuthConfig.clientId}`}
      title={t('manageProfile')}
      className="flex items-center gap-2 hover:drop-shadow-lg"
    >
      <span className="text-xs md:text-sm">{userName}</span>
      <AvatarIcon />
    </a>
  )
}
