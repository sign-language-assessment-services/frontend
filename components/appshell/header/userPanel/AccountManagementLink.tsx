import AvatarIcon from '@/components/appshell/header/userPanel/AvatarIcon'
import { accountManagementUrl, auth } from '@/lib/auth'
import { getTranslations } from 'next-intl/server'
import cx from 'classnames'

export default async function AccountManagementLink() {
  const session = await auth()
  const userName = session!.user!.name
  const t = await getTranslations('UserPanel')

  return (
    <a
      href={accountManagementUrl}
      title={t('manageProfile')}
      className={cx('flex', 'items-center', 'gap-2', 'hover:drop-shadow-lg')}
    >
      <span className={cx('text-xs', 'md:text-sm')}>{userName}</span>
      <AvatarIcon />
    </a>
  )
}
