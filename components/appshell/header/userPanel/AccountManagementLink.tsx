import AvatarIcon from '@/components/appshell/header/userPanel/AvatarIcon'
import { auth, accountManagementUrl } from '@/lib/auth'
import { getTranslations } from 'next-intl/server'

export default async function AccountManagementLink() {
  const session = await auth()
  const userName = session!.user!.name
  const t = await getTranslations('UserPanel')

  return (
    <a
      href={accountManagementUrl}
      title={t('manageProfile')}
      className="flex items-center gap-2 hover:drop-shadow-lg"
    >
      <span className="text-xs md:text-sm">{userName}</span>
      <AvatarIcon />
    </a>
  )
}
